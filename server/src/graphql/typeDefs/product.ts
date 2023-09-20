import { gql } from "apollo-server-express";

export const productTypes = gql`
  type Mutation {
    createProduct(
      categoryId: String!
      name: String!
      description: String!
      specifications: String!
      gallery: [String!]!
      filters: String!
      variations: [String!]
      price: Int!
      avaliableQuantity: Int!
      discount: Int
    ): String!
  }
`;
