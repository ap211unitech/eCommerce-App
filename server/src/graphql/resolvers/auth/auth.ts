import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "../../../types/Auth";
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
} from "../../../controllers/authController";

export const userResolvers = {
  Query: {},
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
  },
};
