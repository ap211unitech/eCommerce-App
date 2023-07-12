import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../types/Auth";
import {
  isValidEmail,
  isValidMobile,
  validatePassword,
  validateSignUpInput,
} from "../validators/index";
import {
  INCORRECT_OTP,
  INVALID_CREDENTIALS,
  NO_OTP_FOUND,
  NO_SUCH_USER_EXISTS,
  OTP_EXPIRED,
  USER_ALREADY_EXISTS,
} from "../constants/error";
import { APOLLO_ERROR, VALIDATION_ERROR } from "../constants/errorTypes";
import { errorHandler } from "../utils/errorHandler";
import { generateOTP } from "../utils/generateOTP";

import User from "../models/User";
import OtpSchema from "../models/Otp";

import { forgotPasswordEmail } from "../utils/mail";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

// @Desc    Register New user through form data
// @Access  Public
export const signUp = async (payload: SignUpPayload) => {
  const { email, mobile, password } = payload;

  const error = validateSignUpInput(payload);
  if (error) {
    return errorHandler({ message: error, type: VALIDATION_ERROR });
  }

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { mobile }] });

  if (userExists) {
    return errorHandler({ ...USER_ALREADY_EXISTS, type: APOLLO_ERROR });
  }

  // Hash Password
  const hashedPassword = await hashData(password);

  const newUser = new User({ ...payload, password: hashedPassword });
  await newUser.save();

  // Generate token
  const token = generateToken(newUser._id);

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    mobile: newUser.mobile,
    // @ts-ignore
    createdAt: newUser.createdAt,
    // @ts-ignore
    updatedAt: newUser.updatedAt,
    token,
  };
};

// @Desc    Login user through form data
// @Access  Public
export const signIn = async (payload: SignInPayload) => {
  const { email, mobile, password } = payload;

  // Check if user exists
  const user = await User.findOne({ $or: [{ email }, { mobile }] });
  if (!user) {
    return errorHandler({ ...INVALID_CREDENTIALS, type: APOLLO_ERROR });
  }

  // Verify Password
  const isMatch: boolean = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return errorHandler({ ...INVALID_CREDENTIALS, type: APOLLO_ERROR });
  }

  // Generate token
  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    // @ts-ignore
    createdAt: user.createdAt,
    // @ts-ignore
    updatedAt: user.updatedAt,
    token,
  };
};

// @Desc    Forgot Password (Sending OTP to email/mobile)
// @Access  Public
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { email, mobile } = payload;

  // Check If valid email
  if (isValidEmail(email)) {
    await sendOTP({ type: "email", payload });
    return { message: "OTP Sent Successfully to your email address" };
  }

  // Check If valid mobile number
  if (isValidMobile(mobile)) {
    await sendOTP({ type: "mobile", payload });
    return { message: "OTP Sent Successfully to your mobile" };
  }

  return errorHandler({ ...NO_SUCH_USER_EXISTS, type: APOLLO_ERROR });
};

// @Desc    Reset Password (OTP and newPassword as input)
// @Access  Public
export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { email, mobile } = payload;

  // Check If valid email
  if (isValidEmail(email)) {
    await verifyOTP({ type: "email", payload });
    return { message: "Password reset successfully" };
  }

  // Check If valid mobile number
  if (isValidMobile(mobile)) {
    await verifyOTP({ type: "mobile", payload });
    return { message: "Password reset successfully" };
  }

  return errorHandler({ ...NO_SUCH_USER_EXISTS, type: APOLLO_ERROR });
};

/********************************** Helper Functions **********************************/

// Generate Token
const generateToken = (id: mongoose.Types.ObjectId) => {
  const payload = { id };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};

// Hash Data
const hashData = async (payload: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedData = await bcryptjs.hash(payload, salt);
  return hashedData;
};

// OTP Sending Process
const sendOTP = async ({
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

  //TODO: Send Email/Send SMS
  if (type === "email") {
    await forgotPasswordEmail({ to: user.email, otp: newOTP });
  }
};

// Verify OTP and Change Password
const verifyOTP = async ({
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
};
