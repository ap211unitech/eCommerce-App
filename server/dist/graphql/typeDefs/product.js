"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.productTypes = (0, apollo_server_express_1.gql) `
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
    rating: String!
    isFeatured: Boolean!
    isArchived: Boolean!
    createdBy: User!
    updatedBy: User!
    createdAt: String!
    updatedAt: String!
  }

  type DeleteProductType {
    message: String!
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

    editProduct(
      productId: String!
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
      isFeatured: Boolean!
      isArchived: Boolean!
    ): Product!

    deleteProduct(productId: String!): DeleteProductType!
  }
`;
//# sourceMappingURL=product.js.map