import { cookies, headers } from "next/headers";

import { AUTH_TOKEN } from "@/config/storage";

export const getHeaders = () => {
  const token = cookies().get(AUTH_TOKEN)?.value;
  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
};
