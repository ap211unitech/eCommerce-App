import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const ProductTemplate = dynamic(
  () => import("@/components/templates/Product"),
  {
    loading: () => (
      <p className="text-center">
        <Loader2 className="animate-spin mx-auto mt-6 mb-3" />
        Loading Product page...
      </p>
    ),
  }
);

const ProductPage = () => {
  return (
    <>
      <ProductTemplate />
    </>
  );
};

export default ProductPage;
