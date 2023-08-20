"use client";

import { ReactNode, useEffect } from "react";

import { GOOGLE_CLIENT_ID } from "@/config/defaults";
import { Button } from "@/components/atoms/button";
import Head from "next/head";
import { gapi } from "gapi-script";

type Props = {
  children: ReactNode;
};

const GoogleAuthentication = ({ children }: Props) => {
  useEffect(() => {
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
  }, []);

  const handleSignIn = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2
      .signIn()
      .then((user: any) => {
        const idToken = user.getAuthResponse().id_token;
        console.log("Google login success. ID Token:", idToken);
      })
      .catch((error: any) => {
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
      >
        {children}
      </Button>
    </>
  );
};

export default GoogleAuthentication;
