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

// Login user with formData (Public)
export const signIn = gql`
  mutation signIn($identity: String!, $password: String!) {
    signIn(identity: $identity, password: $password) {
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

// Login/Create user with Google (Public)
export const signInWithGoogle = gql`
  mutation SignInWithGoogle($token: String!) {
    signInWithGoogle(token: $token) {
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

// Send OTP email to given identity (Public)
export const forgotPassword = gql`
  mutation ForgotPassword($identity: String!) {
    forgotPassword(identity: $identity) {
      message
    }
  }
`;

// Reset password for given identity and OTP (Public)
export const resetPassword = gql`
  mutation ResetPassword(
    $identity: String!
    $otp: String!
    $newPassword: String!
  ) {
    resetPassword(identity: $identity, otp: $otp, newPassword: $newPassword) {
      message
    }
  }
`;
