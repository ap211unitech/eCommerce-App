import { gql } from "apollo-server-express";

export const productTypes = gql`
  type Product {
    productId: String!
    category: Category!
    name: String!
    slug: String!
    description: String!
    gallery: [String!]!
    variations: [String!]!
    specifications: String!
    filters: String!
    price: Int!
    avaliableQuantity: Int!
    discount: Int!
    rating: Int!
    isFeatured: Boolean!
    isArchived: Boolean!
    createdBy: User!
    updatedBy: User!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getAllProducts: [Product!]
  }

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
    ): Product!
  }
`;
