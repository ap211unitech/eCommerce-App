import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/atoms/button";

const NotFound = () => {
  return (
    <div className="m-auto text-center overflow-x-hidden">
      <div className="mx-auto relative w-[300px] h-[300px] sm:w-[350px] md:w-[400px] sm:h-[350px]">
        <Image
          src="https://i.imgur.com/qIufhof.png"
          alt="Not found image"
          fill
        />
      </div>
      <p className="text-xl mb-5">This page could not be found</p>
      <Button className="mb-12 xl:mb-0 hover:bg-pink dark:hover:text-white transition-all duration-500">
        <Link href={"/"} className="gap-2 flex">
          <MoveLeft />
          Back to home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
