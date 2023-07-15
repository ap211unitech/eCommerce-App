import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../../types/Auth";
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getUserDetail,
} from "../../controllers/auth/authController";

import { isAuthenticated } from "../../middlewares/authMiddleware";

export const userResolvers = {
  Query: {
    getUserDetail: async (_: any, payload: any, { req }: any) => {
      await isAuthenticated(req);
      return await getUserDetail(req.user.id);
    },
  },
  Mutation: {
    signUp: async (_: any, payload: SignUpPayload) => {
      return await signUp(payload);
    },
    signIn: async (_: any, payload: SignInPayload) => {
      return await signIn(payload);
    },
    forgotPassword: async (_: any, payload: ForgotPasswordPayload) => {
      return await forgotPassword(payload);
    },
    resetPassword: async (_: any, payload: ResetPasswordPayload) => {
      return await resetPassword(payload);
    },
    convertToVendor: async (_: any, payload: any, { req }: any) => {
      return { message: "Request sent" };
    },
  },
};
