"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/atoms/button";

const ProductCard = () => {
  const heartRef = useRef<SVGSVGElement | null>(null);

  const handleWishList = () => {
    if (heartRef.current) {
      heartRef.current.classList.toggle("animate-heartAnimationFill");
    }
  };

  return (
    <div className="rounded overflow-hidden shadow-lg w-full dark:bg-[#232222]">
      <div className="w-full h-[310px] relative">
        <Image
          src="https://fastly.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE"
          alt="Featured Quickmart Product"
          objectFit="cover"
          objectPosition="center"
          fill
        />
      </div>
      <div className="px-4 py-2">
        <div className="font-semibold text-xl">Product Name</div>
        <p>Sizes: S, M, L, XL </p>
        {/* This is Label could be used later */}
        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"></span> */}
        <div className="flex items-center flex-1 gap-4 pt-4 mb-2">
          <Button
            className="w-1/4 dark:bg-[#1a1a1a] dark:hover:bg-[#313131]"
            variant={"outline"}
            onClick={handleWishList}
          >
            <Heart ref={heartRef} color="red" />
          </Button>
          <Button className="w-3/4">Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
