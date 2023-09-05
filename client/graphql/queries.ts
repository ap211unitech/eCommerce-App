import { gql } from "@apollo/client";

/** ********** Categories Queries ************/

// Get all categories (Public)
export const getCategory = gql`
  query GetCategory {
    getCategory
  }
`;

/** ********** Profile Queries ************/

// Get logged-in user detail (Private)
export const getUserDetail = gql`
  query GetUserDetail {
    getUserDetail {
      _id
      name
      email
      mobile
      role
      createdAt
      updatedAt
    }
  }
`;
