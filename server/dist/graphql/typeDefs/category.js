"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.categoryTypes = (0, apollo_server_express_1.gql) `
  type Category {
    categoryId: String!
    name: String!
    parentId: String
    filter: String!
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
//# sourceMappingURL=category.js.map