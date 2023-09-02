import { ChevronsRight, Github, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/atoms/button";
import { ActualToolTip as Tooltip } from "@/components/atoms/tooltip";
import { CategoryDropDown } from "@/components/molecules/CategoryDropDown";
import MainLogo from "@/components/molecules/MainLogo";
import SearchBar from "@/components/molecules/SearchBar";
import ThemeDropDown from "@/components/molecules/Theme";
import * as query from "@/graphql/queries";
import { getClient } from "@/lib/client";
import { getErrorMessage } from "@/utils";

import { CategoriesResponse } from "./types";

// Fetch all categories
const getCategories = async () => {
  try {
    const { data } = await getClient().query({
      query: query.getCategory,
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });
    const categories: CategoriesResponse[] = JSON.parse(data.getCategory);
    return categories;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const Navigation = async () => {
  const categories = await getCategories();

  return (
    <div className="flex flex-row justify-between items-center shadow-xl">
      <div className="flex flex-row justify-between items-center">
        <Link href={"/"}>
          <MainLogo />
        </Link>
        <div className="flex flex-row justify-between items-center gap-6 px-2">
          {categories.slice(0, 4).map((c) => (
            <div key={c.categoryId} className="pt-1 relative group">
              <Link
                href={`/products?category=${c.categoryId}`}
                className="uppercase dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-semibold text-sm group-hover:border-b-[3.5px] border-pink pb-[1.35rem] px-[0.4rem]"
              >
                {c.name}
              </Link>
              <div className="group-hover:absolute group-hover:block hidden">
                <CategoryDropDown category={c} />
              </div>
            </div>
          ))}
          <Link
            href={`/categories/explore`}
            className="flex items-center justify-center gap-[1px] hover:gap-1 transition-all dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-semibold text-sm pt-1"
            key={Math.random() * 100}
          >
            <span>Explore</span>
            <span>
              <ChevronsRight size={20} />
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-8 gap-4">
        <SearchBar />
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
        <Tooltip content="Github repository">
          <Link
            href={"https://github.com/ap211unitech/eCommerce-App"}
            target="_blank"
          >
            <Button className="px-3">
              <Github />
            </Button>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navigation;
