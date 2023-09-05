/** ********** Auth Mutations ************/

import { gql } from "@apollo/client";

// Register user with formData (Public)
export const signUp = gql`
  mutation signUp(
    $name: String!
    $password: String!
    $email: String!
    $mobile: String!
  ) {
    signUp(name: $name, email: $email, password: $password, mobile: $mobile) {
      _id
      name
      email
      mobile
      role
      token
      createdAt
      updatedAt
    }
  }
`;
