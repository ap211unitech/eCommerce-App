import { gql } from "apollo-server-express";

export const categoryTypes = gql`
  type Category {
    categoryId: String!
    name: String!
    parentId: String
    createdBy: String!
    updatedBy: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getCategory: String!
  }

  type Mutation {
    createCategory(name: String!, parentId: String, filters: String): Category!

    editCategory(
      categoryId: String!
      name: String!
      parentId: String
      filters: String
    ): Category!
  }
`;
