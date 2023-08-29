import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <>
      <p className="text-center">
        <Loader className="animate-spin mx-auto mt-6 mb-3" />
        Loading page...
      </p>
    </>
  );
};

export default Loading;
