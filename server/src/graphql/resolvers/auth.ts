import {
  ConvertToVendorPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignInWithGooglePayload,
  SignUpPayload,
} from "../../types/Auth";
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getUserDetail,
  convertToVendor,
  signInWithGoogle,
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
    signInWithGoogle: async (_: any, payload: SignInWithGooglePayload) => {
      return await signInWithGoogle(payload);
    },
    forgotPassword: async (_: any, payload: ForgotPasswordPayload) => {
      return await forgotPassword(payload);
    },
    resetPassword: async (_: any, payload: ResetPasswordPayload) => {
      return await resetPassword(payload);
    },
    convertToVendor: async (
      _: any,
      payload: ConvertToVendorPayload,
      { req }: any
    ) => {
      await isAuthenticated(req);
      return await convertToVendor({ ...payload, userId: req.user.id });
    },
  },
};
