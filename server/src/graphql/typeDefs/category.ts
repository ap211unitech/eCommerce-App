import { gql } from "apollo-server-express";

export const categoryTypes = gql`
  type Category {
    categoryId: String!
    name: String!
    parentId: String
    createdBy: User!
    updatedBy: User!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createCategory(name: String!, parentId: String, filters: String): Category!
  }
`;
