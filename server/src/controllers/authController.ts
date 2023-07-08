import { ValidationError, ApolloError } from "apollo-server-express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { SignUpPayload } from "../types/User";
import { validateSignUpInput } from "../validators/index";
import { USER_ALREADY_EXISTS } from "../constants/error";
import User from "../models/User";

dotenv.config({ path: __dirname + "/../../.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtsecret";

// @Desc    Register New user through formdata
// @Access  Public
export const signUp = async (payload: SignUpPayload) => {
  const { email, mobile, password } = payload;

  const error = validateSignUpInput(payload);
  if (error) {
    throw new ValidationError(error);
  }

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { mobile }] });

  if (userExists) {
    const { message, code } = USER_ALREADY_EXISTS;
    throw new ApolloError(message, code);
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

// Generate Token
const generateToken = (id: mongoose.Types.ObjectId) => {
  const payload = { id };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
};
