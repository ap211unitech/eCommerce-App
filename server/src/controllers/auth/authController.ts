import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../../types/Auth";
import {
  isValidEmail,
  isValidMobile,
  validateSignUpInput,
} from "../../validators/index";
import {
  INVALID_CREDENTIALS,
  NO_SUCH_USER_EXISTS,
  USER_ALREADY_EXISTS,
} from "../../constants/error";
import { APOLLO_ERROR, VALIDATION_ERROR } from "../../constants/errorTypes";
import { errorHandler } from "../../utils/errorHandler";

import { generateToken, hashData, sendOTP, verifyOTP } from "./helpers";

import User from "../../models/User";

dotenv.config({ path: __dirname + "/../../.env" });

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
    role: newUser.role,
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
  const { identity, password } = payload;

  // Check if user exists
  const user = await User.findOne({
    $or: [{ email: identity }, { mobile: identity }],
  });
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
    role: user.role,
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
