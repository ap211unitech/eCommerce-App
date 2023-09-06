import { KeyRound } from "lucide-react";

const ResetPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center m-4 pb-10 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3 font-bold text-2xl">
        <KeyRound strokeWidth={"3"} size={44} />
        Reset your password
      </div>
      {/* Secondary header */}
      <h3 className="mt-6 text-slate-400 font-semibold text-xl tracking-wide">
        Reset your password and get youself the best products from here
      </h3>
      {/* Form */}
      <div className="w-[90%] md:w-[50%] xl:w-[40%]">
        {/* <ForgotPasswordForm /> */}
      </div>
    </div>
  );
};

export default ResetPassword;
