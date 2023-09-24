import { ApolloError } from "@apollo/client";
import { FC, PropsWithChildren } from "react";
import { z } from "zod";

import { signInFormSchema } from "@/validations";

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
};

export type AuthProviderProps = PropsWithChildren<{
  value: AuthContextProps;
}>;

export type SignInMutationProps = z.infer<typeof signInFormSchema>;

export type SignInResponse = {
  data?: {
    signIn: {
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

export type AuthContextProps = AuthState & {
  onSignIn: (value: SignInMutationProps) => void;
  refetchUserDetails: () => void;
};

export type AuthComponent = FC<PropsWithChildren<object>>;
