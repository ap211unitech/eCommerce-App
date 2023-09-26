import { ApolloError } from "@apollo/client";
import { FC, PropsWithChildren } from "react";
import { z } from "zod";

import { signInFormSchema, signUpFormSchema } from "@/validations";

export type UserRoles = "user" | "admin" | "vendor";

export type UserDetailResponse = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
};

export type AuthState = {
  signInLoading: boolean;
  user: UserDetailResponse | null;
  userError: ApolloError | undefined;
  userDetailsLoading: boolean;
  authWithGoogleLoading: boolean;
  signUpLoading: boolean;
};

export type AuthProviderProps = PropsWithChildren<{
  value: AuthContextProps;
}>;

export type SignInMutationProps = z.infer<typeof signInFormSchema>;
export type SignUpMutationProps = z.infer<typeof signUpFormSchema>;

export type SignInResponse = {
  data?: {
    signIn: {
      _id: string;
      name: string;
      email: string;
      mobile: string;
      role: UserRoles;
      token: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type SignUpResponse = {
  data?: {
    signUp: {
      _id: string;
      name: string;
      email: string;
      mobile: string;
      role: "user" | "admin" | "vendor";
      token: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type SignInWithGoogleResponse = {
  data?: {
    signInWithGoogle: {
      _id: string;
      name: string;
      email: string;
      mobile: string;
      role: UserRoles;
      token: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type AuthContextProps = AuthState & {
  onSignIn: (value: SignInMutationProps) => void;
  onSignUp: (value: SignUpMutationProps) => void;
  onAuthWithGoogle: (value: string) => void;
  onLogout: () => void;
  refetchUserDetails: () => void;
};

export type AuthComponent = FC<PropsWithChildren<object>>;
