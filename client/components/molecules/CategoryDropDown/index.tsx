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

  const length = category.children.length;

  return (
    <>
      {Array.from({ length })
        .fill(length)
        .map((_, i) => {
          return (
            <div
              key={Math.random() * 1000}
              className={`pl-8 pr-14 py-4 ${i % 2 ? "bg-gray-200" : ""}`}
            >
              <PrintRecursive category={category.children[i]} />
            </div>
          );
        })}
    </>
  );
};

type RecursiveProps = {
  category: CategoriesResponse;
};

const PrintRecursive = ({ category }: RecursiveProps) => {
  return (
    <>
      <div
        key={category.categoryId}
        className={`${
          category.children.length > 0 ? "gap-1" : ""
        } flex flex-col`}
      >
        <div>
          <Link
            href={`/products?category=${category.categoryId}`}
            className={`
              ${
                category.children.length > 0
                  ? "text-pink font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              } text-md whitespace-nowrap
                `}
          >
            {category.name}
          </Link>
        </div>
        <div>
          {category.children.map((c) => (
            <PrintRecursive category={c} key={c.categoryId} />
          ))}
        </div>
      </div>
    </>
  );
};
