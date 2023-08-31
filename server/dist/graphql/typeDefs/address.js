"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.addressTypes = (0, apollo_server_express_1.gql) `
  type UserAddress {
    _id: ID!
    user: String!
    userName: String!
    mobile: String!
    pincode: String!
    state: String!
    address: String!
    locality: String!
    city: String!
    type: String!
    isDefault: Boolean!
  }

  type DeleteAddressType {
    message: String!
  }

  type Query {
    getAddress: [UserAddress!]
  }

  type Mutation {
    addAddress(
      userName: String!
      mobile: String!
      pincode: String!
      state: String!
      address: String!
      locality: String!
      city: String!
      type: String!
      isDefault: Boolean
    ): UserAddress!

    editAddress(
      addressId: String!
      userName: String!
      mobile: String!
      pincode: String!
      state: String!
      address: String!
      locality: String!
      city: String!
      type: String!
      isDefault: Boolean
    ): UserAddress!

    deleteAddress(addressId: String!): DeleteAddressType!
  }
`;
//# sourceMappingURL=address.js.map