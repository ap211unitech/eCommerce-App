import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const LoginTemplate = dynamic(() => import("@/components/templates/Login"), {
  loading: () => (
    <p className="text-center">
      <Loader2 className="animate-spin mx-auto mt-6 mb-3" />
      Loading Login page...
    </p>
  ),
});
const LoginPage = () => {
  return (
    <>
      <LoginTemplate />
    </>
  );
};

export default LoginPage;
