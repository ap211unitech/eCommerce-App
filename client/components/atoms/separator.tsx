import React from "react";

type Props = {
  children: React.ReactNode;
};

const Separator = ({ children }: Props) => {
  return (
    <div>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">{children}</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
    </div>
  );
};

export default Separator;
