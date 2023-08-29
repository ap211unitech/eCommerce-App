import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const ProductNotFoundTemplate = dynamic(
  () => import("@/components/templates/Product/notFound"),
  {
    loading: () => (
      <p className="text-center">
        <Loader2 className="animate-spin mx-auto mt-6 mb-3" />
        Loading Product Not Found page...
      </p>
    ),
  }
);

const ProductNotFoundPage = () => {
  return (
    <>
      <ProductNotFoundTemplate />
    </>
  );
};

export default ProductNotFoundPage;
