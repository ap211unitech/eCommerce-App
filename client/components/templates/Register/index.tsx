import { Users } from "lucide-react";
import Link from "next/link";

import Separator from "@/components/atoms/separator";
import RegisterForm from "./form";
import { Button } from "@/components/atoms/button";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center m-4 pb-10 pt-2">
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
      <div className="w-[40%]">
        <RegisterForm />
        <div className="mt-4">
          Already have an account ?{" "}
          <Link
            className="text-pink hover:underline underline-offset-2"
            href={"/login"}
          >
            Sign In
          </Link>
        </div>
        {/* Seprator */}
        <Separator>or continue with</Separator>
        <Button className="w-full">Sign Up with Google</Button>
      </div>
    </div>
  );
};

export default Register;
