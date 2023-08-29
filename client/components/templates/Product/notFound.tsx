import { AlertTriangle, ArrowBigLeft, ArrowBigRight } from "lucide-react";

import { Button } from "@/components/atoms/button";
import SearchBar from "@/components/molecules/SearchBar";

const ProductNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-4 pb-10 pt-2">
        {/* Header */}
        <div className="flex items-center gap-3 font-bold text-2xl">
          <AlertTriangle size={50} strokeWidth={2} className="text-red-600" />
          No such product exists
        </div>
        {/* Secondary header */}
        <h3 className="mt-6 text-slate-400 font-semibold text-xl tracking-wide">
          There is no such product. You need to explore products here
        </h3>
        {/* Search Bar */}
        <div className="my-10">
          <SearchBar isFocused />
          {/* Buttons */}
          <div className="my-4 flex flex-1 gap-4">
            <Button variant={"outline"} className="w-1/3 gap-2">
              <ArrowBigLeft />
              Go back
            </Button>
            <Button className="w-2/3 gap-2">
              Explore
              <ArrowBigRight className="fill-secondary" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductNotFound;
