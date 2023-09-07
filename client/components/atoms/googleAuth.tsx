"use client";

import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/atoms/button";
import { AUTH_TOKEN_MAX_AGE, GOOGLE_CLIENT_ID } from "@/config/defaults";
import { AUTH_TOKEN } from "@/config/storage";
import * as mutations from "@/graphql/mutations";
import { getErrorMessage } from "@/utils";

import { SignInWithGoogleResponse } from "./types";
import { useToast } from "./use-toast";

type Props = {
  type: "signIn" | "signUp";
};

const GoogleAuthentication = ({ type }: Props) => {
  const [gapi, setGapi] = useState<any>(null);
  const [isLoadingGapi, setIsLoadingGapi] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const [signInWithGoogleMutation, { loading }] = useMutation(
    mutations.signInWithGoogle
  );

  useEffect(() => {
    const onLoad = async () => {
      const loadedGapi = (await import("gapi-script")).gapi;
      setGapi(loadedGapi);
      setIsLoadingGapi(false);
    };
    setIsLoadingGapi(true);
    onLoad();
  }, []);

  useEffect(() => {
    if (gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        gapi.load("auth2", () => {
          gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID,
          });
        });
      };
      document.head.appendChild(script);
    }
  }, [gapi]);

  const onSubmitToken = async (token: string) => {
    try {
      const { data }: SignInWithGoogleResponse = await signInWithGoogleMutation(
        {
          variables: { token },
        }
      );
      if (data?.signInWithGoogle.token) {
        setCookie(AUTH_TOKEN, data?.signInWithGoogle.token, {
          maxAge: AUTH_TOKEN_MAX_AGE,
        });
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

  const handleSignIn = () => {
    if (!gapi) return;

    const auth2 = gapi.auth2.getAuthInstance();
    auth2
      .signIn()
      .then(async (user: any) => {
        const idToken = user.getAuthResponse().id_token;
        await onSubmitToken(idToken);
      })
      .catch((error: unknown) => {
        console.error("Google login failed:", error);
      });
  };

  return (
    <>
      <Head>
        <meta name="google-signin-client_id" content={GOOGLE_CLIENT_ID} />
      </Head>
      <Button
        className="w-full flex justify-center items-center"
        onClick={handleSignIn}
        disabled={loading}
      >
        {isLoadingGapi ? (
          <p>Loading...</p>
        ) : (
          <>
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Image
                src="https://img.freepik.com/free-icon/search_318-265146.jpg?q=10&h=200"
                alt="Google icon"
                width="20"
                height="20"
              />
            )}
            {type === "signIn" && (
              <span className="ml-2">
                {loading ? <>Signing in...</> : <>Sign In with Google</>}
              </span>
            )}
            {type === "signUp" && (
              <span className="ml-2">
                {loading ? <>Creating account...</> : <>Sign Up with Google</>}
              </span>
            )}
          </>
        )}
      </Button>
    </>
  );
};

export default GoogleAuthentication;
