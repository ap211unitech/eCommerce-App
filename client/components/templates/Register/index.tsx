import { Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import RegisterForm from "./form";

import Separator from "@/components/atoms/separator";
import GoogleAuthentication from "@/components/atoms/googleAuth";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center m-4 pb-10 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3 font-bold text-2xl">
        <Users size={40} strokeWidth={2.5} />
        Register
      </div>
      {/* Secondary header */}
      <h3 className="mt-6 text-slate-400 font-semibold text-xl tracking-wide">
        Please create an account and get youself the best products from here
      </h3>
      {/* Form */}
      <div className="w-[90%] md:w-[50%] xl:w-[40%]">
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
        <GoogleAuthentication>
          <Image
            src="https://img.freepik.com/free-icon/search_318-265146.jpg?q=10&h=200"
            alt="Google icon"
            width="20"
            height="20"
          />
          <span className="ml-2">Sign Up with Google</span>{" "}
        </GoogleAuthentication>
      </div>
    </div>
  );
};

export default Register;
