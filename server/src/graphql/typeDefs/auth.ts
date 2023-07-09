import { gql } from "apollo-server-express";

export const userTypes = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    mobile: String!
    token: String!
    createdAt: String!
    updatedAt: String!
  }

  type ForgotPassword {
    message: String!
  }

  type Query {
    getAllUsers: User
  }

  type Mutation {
    signUp(
      email: String!
      password: String!
      name: String!
      mobile: String!
    ): User!

    signIn(email: String!, password: String!, mobile: String!): User!

    forgotPassword(email: String!, mobile: String!): ForgotPassword!
  }
`;
