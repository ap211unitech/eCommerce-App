import CategoryCard from "@/components/molecules/CategoryCard";
import FeaturedProductCarousel from "@/components/molecules/FeaturedProduct";
import ProductCard from "@/components/molecules/ProductCard";
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

const Landing = async () => {
  const categories = await getCategories();

  return (
    <div>
      <FeaturedProductCarousel />
      <div className="m-8">
        {/* Latest Products */}
        <h1 className="text-2xl font-semibold uppercase tracking-wide">
          Latest products
        </h1>
        <div className=" my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {new Array(10).fill(3).map((i) => (
            <ProductCard key={i} />
          ))}
        </div>

        {/* Shop by category */}
        <h1 className="text-2xl font-semibold uppercase tracking-wide">
          Shop by category
        </h1>
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-5 relative">
          {categories.map((category) => (
            <CategoryCard key={category.categoryId} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
