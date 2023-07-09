import { SignInPayload, SignUpPayload } from "../../../types/Auth";
import { signUp, signIn } from "../../../controllers/authController";

export const userResolvers = {
  Query: {},
  Mutation: {
    signUp: async (_: any, payload: SignUpPayload) => {
      return await signUp(payload);
    },
    signIn: async (_: any, payload: SignInPayload) => {
      return await signIn(payload);
    },
  },
};
