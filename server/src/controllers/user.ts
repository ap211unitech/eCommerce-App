import { ValidationError, ApolloError } from "apollo-server-express";

import { SignUpPayload } from "../types/User";
import { validateSignUpInput } from "../validators/index";
import { USER_ALREADY_EXISTS } from "../constants/error";
import User from "../models/User";

// SignUp User
export const signUp = async (payload: SignUpPayload) => {
  const { email, mobile } = payload;

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

  const newUser = new User(payload);
  await newUser.save();

  return newUser;
};
