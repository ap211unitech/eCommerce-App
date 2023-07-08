"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypes = (0, apollo_server_express_1.gql) `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    mobile: String!
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
  }
`;
//# sourceMappingURL=user.js.map