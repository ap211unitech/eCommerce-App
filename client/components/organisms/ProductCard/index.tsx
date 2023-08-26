import { Button } from "@/components/atoms/button";
import Image from "next/image";
import { Heart } from "lucide-react";

const ProductCard = () => {
  return (
    <div className="rounded overflow-hidden shadow-lg w-full">
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
          <Button className="w-1/4" variant={"outline"}>
            <Heart color="red" />
          </Button>
          <Button className="w-3/4">Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
