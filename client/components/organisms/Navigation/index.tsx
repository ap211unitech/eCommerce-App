import { ChevronsRight, ShoppingCartIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/atoms/button";
import { CategoryDropDown } from "@/components/molecules/CategoryDropDown";
import MainLogo from "@/components/molecules/MainLogo";
import SearchBar from "@/components/molecules/SearchBar";
import ThemeDropDown from "@/components/molecules/Theme";
import { AUTH_TOKEN } from "@/config/storage";
import * as queries from "@/graphql/queries";
import { QUERY_TAGS } from "@/graphql/tags";
import { getClient } from "@/lib/client";
import { getErrorMessage } from "@/utils";

import { CategoriesResponse } from "./types";
import { UserActions } from "./userActions";

// Fetch all categories
const getCategories = async () => {
  try {
    const { data } = await getClient().query({
      query: queries.getCategory,
      context: {
        fetchOptions: {
          next: { tags: QUERY_TAGS.categories() },
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
    <div className="border-b-[3px] border-pink pb-6 lg:pb-0 relative">
      <div className="flex flex-col justify-between items-center lg:flex-row">
        <div className="lg:flex flex-row lg:justify-between items-center">
          <Link href={"/"}>
            <MainLogo />
          </Link>
          <div className="hidden xl:flex flex-row items-center justify-center gap-6 px-2 pt-4 lg:pt-0">
            {categories.slice(0, 4).map((c) => (
              <div key={c.categoryId} className="pt-1 relative group">
                <Link
                  href={`/products?category=${c.categoryId}`}
                  className="uppercase dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-semibold text-sm group-hover:border-b-[3.5px] border-pink pb-[1.35rem] pr-[0.4rem]"
                >
                  {c.name}
                </Link>
                <div className="group-hover:absolute group-hover:flex flex-row hidden -left-[100%] top-[3.2rem] z-10 bg-primary-foreground animate-fadeIn">
                  <CategoryDropDown category={c} />
                </div>
              </div>
            ))}
            <Link
              href={`/categories/explore`}
              className="uppercase flex items-center justify-center gap-[1px] hover:gap-1 transition-all dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-800 cursor-pointer font-semibold text-sm pt-1"
              key={Math.random() * 100}
            >
              <span>Explore</span>
              <span>
                <ChevronsRight size={20} />
              </span>
            </Link>
          </div>
        </div>
        <div className="lg:flex xl:flex-row xl:justify-between xl:items-center px-8 gap-4 w-full lg:w-auto">
          <SearchBar />
          <div className="flex gap-4 justify-center items-center mt-4 lg:mt-0 flex-wrap-reverse md:flex-nowrap">
            <Link href={`/categories/explore`} className="xl:hidden">
              <Button>
                <span>Explore</span>
                <span>
                  <ChevronsRight size={20} />
                </span>
              </Button>
            </Link>
            <UserActions token={cookies().get(AUTH_TOKEN)?.value} />
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
      </div>
    </div>
  );
};

export default Navigation;
