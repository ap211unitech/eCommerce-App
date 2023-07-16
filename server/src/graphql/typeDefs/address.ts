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
