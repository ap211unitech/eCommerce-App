"use client";

import { createContext } from "react";

import { AuthContextProps, AuthProviderProps, AuthState } from "./types";

const initialState: AuthState = {
  signInLoading: false,
  user: null,
  userDetailsLoading: false,
  userError: undefined,
};

export const Context = createContext<AuthContextProps>({
  ...initialState,
  onSignIn: () => {},
  refetchUserDetails: () => {},
});

export const Provider = ({ value, children }: AuthProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
