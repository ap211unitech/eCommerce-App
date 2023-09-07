import { gql } from "apollo-server-express";

export const userTypes = gql`
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
