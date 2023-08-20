import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const RegisterTemplate = dynamic(
  () => import("@/components/templates/Register"),
  {
    loading: () => (
      <p className="text-center">
        <Loader2 className="animate-spin mx-auto mt-6 mb-3" />
        Loading Register page...
      </p>
    ),
  }
);

const RegisterPage = () => {
  return (
    <>
      <RegisterTemplate />
    </>
  );
};

export default RegisterPage;
