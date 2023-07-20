import { gql } from "apollo-server-express";

export const categoryTypes = gql`
  type Mutation {
    createCategory(name: String!, parentId: String): String!
  }
`;
