import { SignUpPayload } from "./types";

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
    signUp: (_: any, payload: SignUpPayload) => {
      return payload;
    },
  },
};
