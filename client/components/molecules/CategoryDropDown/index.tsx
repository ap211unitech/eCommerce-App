import Link from "next/link";

import { CategoriesResponse } from "@/components/organisms/Navigation/types";

type Props = {
  category: {
    categoryId: string;
    name: string;
    children: CategoriesResponse[];
  };
};

export const CategoryDropDown = ({ category }: Props) => {
  if (category.children.length === 0) return <></>;

  return (
    <div className="absolute top-[1.39rem] z-10 bg-white animate-fadeIn px-4 py-2">
      {printRecursive(category.children, 0)}
    </div>
  );
};

const printRecursive = (categories: CategoriesResponse[], i: number) => {
  return categories.map((c) => {
    return (
      <div key={c.categoryId} style={{ paddingLeft: i * 20 }}>
        <Link
          href={`/products?category=${c.categoryId}`}
          className={`${
            i === 0 ? "text-pink font-semibold" : "text-gray-500"
          } text-sm`}
        >
          {c.name}
        </Link>
        {printRecursive(c.children, i + 1)}
      </div>
    );
  });
};
