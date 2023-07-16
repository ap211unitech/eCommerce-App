import { gql } from "apollo-server-express";

export const addressTypes = gql`
  type UserAddress {
    _id: ID!
    userId: String!
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

  type Query {
    getAddress: String!
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
  }
`;
