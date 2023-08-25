import { Button } from "@/components/atoms/button";
import ThemeDropDown from "@/components/molecules/Theme";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  const categories = ["Men", "Women", "Kids", "Beauty", "More", "Items"];

  return (
    <div className="flex flex-row justify-between items-center border-b-[2px] dark:border-gray-300 border-gray-800">
      <div className="flex flex-row justify-between items-center">
        <Link href={"/"}>
          {" "}
          <h1 className="text-pink px-6 py-4 font-semibold text-2xl cursor-pointer">
            Quickmart
          </h1>
        </Link>
        <div className="flex flex-row justify-between items-center gap-6 px-2">
          {categories.map((c) => (
            <p
              className="dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700 cursor-pointer uppercase font-semibold text-sm"
              key={Math.random() * 100}
            >
              {c}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-8 gap-6">
        <Link href={"/login"}>
          <Button variant={"outline"}>Login</Button>
        </Link>
        <Link href={"/register"}>
          <Button variant={"secondary"}>Register</Button>
        </Link>
        <Button className="flex items-center gap-1 relative">
          <ShoppingCartIcon />
          <p className="absolute right-[-7px] top-[-7px] text-white bg-pink rounded-full w-4 h-4 flex justify-center items-center p-3">
            5
          </p>
          Cart
        </Button>
        <ThemeDropDown />
      </div>
    </div>
  );
};

export default Navigation;
