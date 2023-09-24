import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { CategoriesResponse } from "@/components/organisms/Navigation/types";
import * as queries from "@/graphql/queries";
import { QUERY_TAGS } from "@/graphql/tags";
import { getClient } from "@/lib/client";
import { getErrorMessage } from "@/utils";

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

const ExploreCategories = async () => {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-center items-center gap-3 font-bold text-2xl my-4">
        <LayoutGrid size={40} />
        <span>Explore all categories...</span>
      </div>
      <Tabs
        defaultValue={categories[0].categoryId}
        className="w-full flex gap-4 md:gap-10 flex-1"
      >
        <TabsList className="flex-col h-full w-1/4 md:w-1/5 lg:w-1/6 2xl:w-1/12">
          {categories.map((category) => {
            return (
              <TabsTrigger
                value={category.categoryId}
                key={category.categoryId}
                className="w-full"
              >
                {category.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {categories.map((category) => {
          return (
            <TabsContent
              value={category.categoryId}
              key={category.categoryId}
              className="w-3/4 md:w-4/5 lg:w-5/6 2xl:w-11/12 pb-12 -my-6"
            >
              <SubCategories categories={category.children} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

const SubCategories = ({
  categories,
}: {
  categories: CategoriesResponse[];
}) => {
  return (
    <>
      {categories.map((category) => {
        return (
          <>
            <Link
              href={`/products?category=${category.categoryId}`}
              key={category.categoryId}
              className={`${
                category.children.length === 0
                  ? "flex flex-col justify-center items-center gap-2 mt-4"
                  : "inline-block"
              } hover:opacity-70`}
            >
              {category.children.length === 0 && (
                <Image
                  src={
                    "https://thumbs.dreamstime.com/b/blue-jeans-isolated-white-34440719.jpg"
                  }
                  alt={`${category.name} image`}
                  width={120}
                  height={260}
                  className="w-[110px] sm:w-auto"
                />
              )}
              <p
                className={`${
                  category.children.length > 0
                    ? "font-semibold text-xl pt-6"
                    : "w-[110px] text-center"
                }`}
              >
                {category.name}
              </p>
            </Link>
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8 gap-y-4 items-start flex-wrap">
              <SubCategories categories={category.children} />
            </div>
          </>
        );
      })}
    </>
  );
};

export default ExploreCategories;
