import { SignUpPayload } from "../../../types/User";
import { signUp } from "../../../controllers/user";

export const userResolvers = {
  Query: {
    getAllUsers: () => {
      return [
        {
          name: "Arjun",
          email: "abcd",
          password: "aaaa",
        },
      ];
    },
  },
  Mutation: {
    signUp: async (_: any, payload: SignUpPayload) => {
      return await signUp(payload);
    },
  },
};
