import { LogIn } from "lucide-react";
import Link from "next/link";

import GoogleAuthentication from "@/components/atoms/googleAuth";
import Separator from "@/components/atoms/separator";

import LoginForm from "./form";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center m-4 pb-10 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3 font-bold text-2xl">
        <LogIn strokeWidth="3" size={40} />
        Sign In
      </div>
      {/* Secondary header */}
      <h3 className="mt-6 text-slate-400 font-semibold text-xl tracking-wide">
        Login and get youself the best products from here
      </h3>
      {/* Form */}
      <div className="w-[90%] md:w-[50%] xl:w-[40%]">
        <LoginForm />
        <div className="mt-4 flex items-center justify-between">
          <div>
            Don&apos;t have an account ?{" "}
            <Link
              className="text-pink hover:underline underline-offset-2"
              href={"/register"}
            >
              Sign Up
            </Link>
          </div>
          <div>
            <Link
              className="text-pink hover:underline underline-offset-2"
              href={"/forgotPassword"}
            >
              Forgot Password ?
            </Link>
          </div>
        </div>
        {/* Seprator */}
        <Separator>or continue with</Separator>
        <GoogleAuthentication type="signIn" />
      </div>
    </div>
  );
};

export default Login;
