import { gql } from "apollo-server-express";

export const userTypes = gql`
  type User {
    name: String!
    age: Int!
  }

  type Query {
    getAllUsers: User!
  }
`;
