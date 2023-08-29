import { Metadata } from "next";

import LoginTemplate from "@/components/templates/Login";

export const metadata: Metadata = {
  title: "Sign In yourself in Quickmart",
  description:
    "Login and get youself the best products from here || eCommerce App for better performance with better tech stack",
};

const LoginPage = () => {
  return (
    <>
      <LoginTemplate />
    </>
  );
};

export default LoginPage;
