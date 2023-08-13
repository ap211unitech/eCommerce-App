import dynamic from "next/dynamic";

const RegisterTemplate = dynamic(
  () => import("@/components/templates/Register"),
  {
    loading: () => <p>Loading Register page...</p>,
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
