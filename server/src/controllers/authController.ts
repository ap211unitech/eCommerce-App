import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { SignInPayload, SignUpPayload } from "../types/Auth";
import { validateSignUpInput } from "../validators/index";
import { INVALID_CREDENTIALS, USER_ALREADY_EXISTS } from "../constants/error";
import { errorHandler } from "../utils/errorHandler";
import User from "../models/User";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

// @Desc    Register New user through form data
// @Access  Public
export const signUp = async (payload: SignUpPayload) => {
  const { email, mobile, password } = payload;

  const error = validateSignUpInput(payload);
  if (error) {
    return errorHandler({ message: error, type: "ValidationError" });
  }

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { mobile }] });

  if (userExists) {
    return errorHandler({ ...USER_ALREADY_EXISTS, type: "ApolloError" });
  }

  // Hash Password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

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
    return errorHandler({ ...INVALID_CREDENTIALS, type: "ApolloError" });
  }

  // Verify Password
  const isMatch: boolean = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return errorHandler({ ...INVALID_CREDENTIALS, type: "ApolloError" });
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

// Generate Token
const generateToken = (id: mongoose.Types.ObjectId) => {
  const payload = { id };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};
