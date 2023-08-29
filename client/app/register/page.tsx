import { Metadata } from "next";

import RegisterTemplate from "@/components/templates/Register";

export const metadata: Metadata = {
  title: "Register yourself in Quickmart",
  description:
    "Please create an account and get youself the best products from here || eCommerce App for better performance with better tech stack",
};

const RegisterPage = () => {
  return (
    <>
      <RegisterTemplate />
    </>
  );
};

export default RegisterPage;
