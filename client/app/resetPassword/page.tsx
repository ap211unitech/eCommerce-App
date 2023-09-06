import { Metadata } from "next";

import ResetPasswordTemplate from "@/components/templates/ResetPassword";

export const metadata: Metadata = {
  title: "Reset your password",
  description:
    "Reset your password and get youself the best products from here || eCommerce App for better performance with better tech stack",
};

const ResetPasswordPage = () => {
  return (
    <>
      <ResetPasswordTemplate />
    </>
  );
};

export default ResetPasswordPage;
