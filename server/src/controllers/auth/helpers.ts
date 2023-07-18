import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { ForgotPasswordPayload, ResetPasswordPayload } from "../../types/Auth";
import { validatePassword } from "../../validators/index";
import {
  INCORRECT_OTP,
  NO_OTP_FOUND,
  NO_SUCH_USER_EXISTS,
  OTP_EXPIRED,
} from "../../constants/error";
import { APOLLO_ERROR, VALIDATION_ERROR } from "../../constants/errorTypes";
import { errorHandler } from "../../utils/errorHandler";
import { generateOTP } from "../../utils/generateOTP";

import User from "../../models/User";
import OtpSchema from "../../models/Otp";

import { forgotPasswordEmail } from "../../utils/mail";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

/********************************** Helper Functions **********************************/

// Generate Token
export const generateToken = (id: mongoose.Schema.Types.ObjectId) => {
  const payload = { id };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};

// Hash Data
export const hashData = async (payload: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedData = await bcryptjs.hash(payload, salt);
  return hashedData;
};

// OTP Sending Process
export const sendOTP = async ({
  type,
  payload,
}: {
  type: "email" | "mobile";
  payload: ForgotPasswordPayload;
}) => {
  const { email, mobile } = payload;

  // Check if any user exists for that email/mobile
  const user =
    type === "email"
      ? await User.findOne({ email })
      : await User.findOne({ mobile });

  if (!user) {
    return errorHandler({ ...NO_SUCH_USER_EXISTS, type: APOLLO_ERROR });
  }

  // Clear Old records
  await OtpSchema.deleteMany({ userId: user._id });

  // Generate OTP
  const newOTP = generateOTP();

  // Hash OTP
  const hashedOTP = await hashData(newOTP);

  // Save in OTP Schema
  await OtpSchema.create({
    userId: user._id,
    otp: hashedOTP,
    expiresAt: Date.now() + 600000, // 10 min
  });

  if (type === "email") {
    await forgotPasswordEmail({ to: user.email, otp: newOTP });
  } else if (type === "mobile") {
    //TODO: Send SMS
  }
};

// Verify OTP and Change Password
export const verifyOTP = async ({
  type,
  payload,
}: {
  type: "email" | "mobile";
  payload: ResetPasswordPayload;
}) => {
  const { email, mobile, otp, newPassword } = payload;

  // Find User
  const user =
    type === "email"
      ? await User.findOne({ email })
      : await User.findOne({ mobile });

  if (!user) {
    return errorHandler({ ...NO_SUCH_USER_EXISTS, type: APOLLO_ERROR });
  }

  // Find OTP
  const findOTP = await OtpSchema.findOne({ userId: user._id });

  // Check if OTP exists for that userID
  if (!findOTP) {
    return errorHandler({ ...NO_OTP_FOUND, type: APOLLO_ERROR });
  }

  // Check if OTP is not expired
  if (findOTP.expiresAt.getTime() < Date.now()) {
    // Delete OTP if expired
    await OtpSchema.deleteMany({ userId: user._id });
    return errorHandler({ ...OTP_EXPIRED, type: APOLLO_ERROR });
  }

  // Check if OTP matched
  const matchOTP: boolean = await bcryptjs.compare(otp, findOTP.otp);

  if (!matchOTP) {
    return errorHandler({ ...INCORRECT_OTP, type: APOLLO_ERROR });
  }

  // Validate Password
  const error = validatePassword(newPassword);
  if (error) {
    return errorHandler({ message: error, type: VALIDATION_ERROR });
  }

  // Hash Password
  const hashedPassword = await hashData(newPassword);

  user.password = hashedPassword;
  await user.save();

  // Delete OTP when password changed
  await OtpSchema.deleteMany({ userId: user._id });
};
