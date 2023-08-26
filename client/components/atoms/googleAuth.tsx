"use client";

import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/atoms/button";
import { GOOGLE_CLIENT_ID } from "@/config/defaults";

type Props = {
  children: ReactNode;
};

const GoogleAuthentication = ({ children }: Props) => {
  const [gapi, setGapi] = useState<any>(null);
  const [isLoadingGapi, setIsLoadingGapi] = useState(false);

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

  const handleSignIn = () => {
    if (!gapi) return;

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
        {isLoadingGapi ? <p>Loading...</p> : children}
      </Button>
    </>
  );
};

export default GoogleAuthentication;
