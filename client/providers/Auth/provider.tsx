"use client";

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/atoms/use-toast";
import { AUTH_TOKEN_MAX_AGE } from "@/config/defaults";
import { AUTH_TOKEN } from "@/config/storage";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";
import { getErrorMessage } from "@/utils";

import { Provider } from "./context";
import * as T from "./types";

export const AuthProvider: T.AuthComponent = ({ children }) => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    client,
    data: userDetails,
    error: userError,
    refetch: refetchUserDetails,
    loading: userDetailsLoading,
  } = useQuery(queries.getUserDetail, {
    ssr: true,
    fetchPolicy: "network-only",
    refetchWritePolicy: "overwrite",
    onError: async () => {
      deleteCookie(AUTH_TOKEN);
    },
  });

  const user: T.UserDetailResponse | null =
    !userDetailsLoading && !userError ? userDetails?.getUserDetail : null;

  const [signInMutation, { loading: signInLoading }] = useMutation(
    mutations.signIn
  );

  const onSignIn = async (values: T.SignInMutationProps) => {
    try {
      const { data }: T.SignInResponse = await signInMutation({
        variables: values,
      });
      if (data?.signIn.token) {
        setCookie(AUTH_TOKEN, data?.signIn.token, {
          maxAge: AUTH_TOKEN_MAX_AGE,
        });
        client.resetStore();
        router.push("/");
        router.refresh();
        toast({
          description: `Successfully signed in !!`,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        description: `Uh oh! ${getErrorMessage(error)}`,
        variant: "destructive",
      });
    }
  };

  const onLogout = () => {
    try {
      deleteCookie(AUTH_TOKEN);
      refetchUserDetails();
      router.refresh();
      toast({
        title: "Good bye !! 👋👋",
        description: "Logged out successfully",
        variant: "success",
      });
    } catch (error) {}
  };

  return (
    <Provider
      value={{
        signInLoading,
        user,
        userDetailsLoading,
        userError,
        onSignIn,
        onLogout,
        refetchUserDetails,
      }}
    >
      {children}
    </Provider>
  );
};
