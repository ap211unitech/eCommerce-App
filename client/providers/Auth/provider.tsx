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

  const [signInMutation, { loading: signInLoading }] = useMutation(
    mutations.signIn
  );

  const [signUpMutation, { loading: signUpLoading }] = useMutation(
    mutations.signUp
  );

  const [signInWithGoogleMutation, { loading: authWithGoogleLoading }] =
    useMutation(mutations.signInWithGoogle);

  const user: T.UserDetailResponse | null =
    !userDetailsLoading && !userError ? userDetails?.getUserDetail : null;

  const onSignIn = async (values: T.SignInMutationProps) => {
    try {
      const { data }: T.SignInResponse = await signInMutation({
        variables: values,
      });
      if (data?.signIn.token) {
        setCookie(AUTH_TOKEN, data?.signIn.token, {
          maxAge: AUTH_TOKEN_MAX_AGE,
        });
        refetchUserDetails();
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

  const onSignUp = async (values: T.SignUpMutationProps) => {
    try {
      const { data }: T.SignUpResponse = await signUpMutation({
        variables: values,
      });
      if (data?.signUp.token) {
        setCookie(AUTH_TOKEN, data?.signUp.token, {
          maxAge: AUTH_TOKEN_MAX_AGE,
        });
        refetchUserDetails();
        router.push("/");
        router.refresh();
        toast({
          description: `Account created successfully !!`,
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

  const onAuthWithGoogle = async (token: string) => {
    try {
      const { data }: T.SignInWithGoogleResponse =
        await signInWithGoogleMutation({
          variables: { token },
        });
      if (data?.signInWithGoogle.token) {
        setCookie(AUTH_TOKEN, data?.signInWithGoogle.token, {
          maxAge: AUTH_TOKEN_MAX_AGE,
        });
        refetchUserDetails();
        router.push("/");
        router.refresh();
        toast({
          description: `Successfully signed in !! 😉`,
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
        authWithGoogleLoading,
        signUpLoading,
        onSignIn,
        onSignUp,
        onAuthWithGoogle,
        onLogout,
        refetchUserDetails,
      }}
    >
      {children}
    </Provider>
  );
};
