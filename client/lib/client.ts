import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { cookies, headers } from "next/headers";

import { BACKEND_URL } from "@/config/defaults";
import { AUTH_TOKEN } from "@/config/storage";

const setHeaders = () => {
  const token = cookies().get(AUTH_TOKEN)?.value;
  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
};

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: BACKEND_URL,
      headers: setHeaders(),
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
