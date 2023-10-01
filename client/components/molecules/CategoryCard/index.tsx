import Image from "next/image";
import Link from "next/link";

import { CategoriesResponse } from "./types";

type Props = {
  category: CategoriesResponse;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      href={`products?category=${category.categoryId}`}
      className="border rounded overflow-hidden shadow-lg w-full dark:bg-[#232222] relative"
    >
      <div className="w-full h-[310px] relative">
        <Image
          src="https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fHww&w=1000&q=80"
          alt="Category name"
          className="object-fill object-center"
          fill
          priority
        />
      </div>
      <div className="bg-black/[0.5] rounded absolute bottom-2 left-2 right-2 text-center p-2 text-white">
        {category.name}
        <p className="underline underline-offset-2 text-pink hover:opacity-90">
          Shop Now
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
