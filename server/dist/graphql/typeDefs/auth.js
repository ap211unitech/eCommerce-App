"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypes = (0, apollo_server_express_1.gql) `
  type User {
    _id: ID!
    name: String!
    email: String!
    mobile: String!
    role: String!
    token: String
    createdAt: String!
    updatedAt: String!
  }

  type ForgotPassword {
    message: String!
  }

  type ResetPassword {
    message: String!
  }

  type ConvertToVendor {
    message: String!
  }

  type Query {
    getUserDetail: User!
  }

  type Mutation {
    signUp(
      email: String!
      password: String!
      name: String!
      mobile: String!
    ): User!

    signIn(identity: String!, password: String!): User!

    signInWithGoogle(token: String!): User!

    forgotPassword(identity: String!): ForgotPassword!

    resetPassword(
      identity: String!
      otp: String!
      newPassword: String!
    ): ResetPassword!

    convertToVendor(title: String!, body: String!): ConvertToVendor!
  }
`;
//# sourceMappingURL=auth.js.map