import { Users } from "lucide-react";

import RegisterForm from "./form";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center m-4">
      {/* Header */}
      <div className="flex items-center gap-3 font-bold text-2xl">
        <Users size={40} />
        Register
      </div>
      {/* Secondary header */}
      <h3 className="mt-6 text-slate-400 font-semibold text-xl tracking-wide">
        Please create an account and get youself the best products from here
      </h3>
      {/* Form */}
      <RegisterForm />
    </div>
  );
};

export default Register;
