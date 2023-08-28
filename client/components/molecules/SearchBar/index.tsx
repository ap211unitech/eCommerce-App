"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

type Props = {
  isFocused?: boolean;
};

const SearchBar = ({ isFocused = false }: Props) => {
  const [isInputFocused, setIsInputFocused] = useState(isFocused);

  return (
    <div
      className={`flex items-center w-[400px] rounded-md  ${
        isInputFocused ? "ring-[1.3px] ring-pink" : ""
      }`}
    >
      <Button
        variant={"outline"}
        className="border-r-0 rounded-r-none pointer-events-none px-2"
      >
        <Search color="gray" />
      </Button>
      <Input
        type="text"
        autoFocus={isInputFocused}
        placeholder="Search for products, brands and more..."
        autoComplete="off"
        className="border-l-0 rounded-l-none focus-visible:ring-0 px-0"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
