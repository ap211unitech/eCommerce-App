import { gql } from "apollo-server-express";

export const productTypes = gql`
  type Mutation {
    createProduct: String!
  }
`;
