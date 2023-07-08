import { gql } from "apollo-server-express";

export const userTypes = gql`
  type User {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getAllUsers: [User!]!
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!): User!
  }
`;
