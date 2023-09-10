import { LayoutGrid } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { CategoriesResponse } from "@/components/organisms/Navigation/types";
import * as queries from "@/graphql/queries";
import { getClient } from "@/lib/client";
import { getErrorMessage } from "@/utils";

// Fetch all categories
const getCategories = async () => {
  try {
    const { data } = await getClient().query({
      query: queries.getCategory,
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
        className="w-full flex gap-4 flex-1"
      >
        <TabsList className="flex-col h-full w-1/12">
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
              className="w-11/12 my-0"
            >
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
              Explore categories {category.name}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ExploreCategories;
