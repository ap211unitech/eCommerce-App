import { Metadata } from "next";

import ForgotPasswordTemplate from "@/components/templates/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot your password? Don't worry. You can restore it.",
  description:
    "Reset your password and get youself the best products from here || eCommerce App for better performance with better tech stack",
};

const ForgotPasswordPage = () => {
  return (
    <>
      <ForgotPasswordTemplate />
    </>
  );
};

export default ForgotPasswordPage;
