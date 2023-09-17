"use client";

import { Heart } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/atoms/button";
import { ActualToolTip } from "@/components/atoms/tooltip";

export const AddToWishList = () => {
  const heartRef = useRef<SVGSVGElement | null>(null);

  const handleWishList = () => {
    if (heartRef.current) {
      heartRef.current.classList.toggle("animate-heartAnimationFill");
    }
  };

  return (
    <ActualToolTip content="Add to wishlist">
      <Button
        className="w-1/4 dark:bg-[#1a1a1a] dark:hover:bg-[#313131]"
        variant={"outline"}
        onClick={handleWishList}
      >
        <Heart ref={heartRef} color="red" />
      </Button>
    </ActualToolTip>
  );
};
