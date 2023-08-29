import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <>
      <p className="text-center font-bold text-2xl">
        <Loader className="animate-spin mx-auto mt-6 mb-3" />
        Loading page...
      </p>
    </>
  );
};

export default Loading;
