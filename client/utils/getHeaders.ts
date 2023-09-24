import { cookies, headers } from "next/headers";

import { AUTH_TOKEN } from "@/config/storage";

// This is used for server side fetching
export const getHeaders = () => {
  try {
    const token = cookies().get(AUTH_TOKEN)?.value;
    return {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    };
  } catch (error) {
    return {};
  }
};
