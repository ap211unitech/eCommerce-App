import { LogIn } from "lucide-react";
import Link from "next/link";

import Separator from "@/components/atoms/separator";
import LoginForm from "./form";
import { Button } from "@/components/atoms/button";
import Image from "next/image";

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
        <div className="mt-4">
          Don&apos;t have an account ?{" "}
          <Link
            className="text-pink hover:underline underline-offset-2"
            href={"/register"}
          >
            Sign Up
          </Link>
        </div>
        {/* Seprator */}
        <Separator>or continue with</Separator>
        <Button className="w-full flex justify-center items-center">
          <Image
            src="https://img.freepik.com/free-icon/search_318-265146.jpg?q=10&h=200"
            alt="Google icon"
            width="20"
            height="20"
          />
          <span className="ml-2">Sign In with Google</span>{" "}
        </Button>
      </div>
    </div>
  );
};

export default Login;
