import Carousel from "@/components/atoms/carousel";
import ProductCard from "@/components/organisms/ProductCard";

const Landing = () => {
  return (
    <div>
      <Carousel />
      <div className="m-8">
        <h1 className="text-2xl font-semibold">Featured products </h1>
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {new Array(10).fill(3).map((i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
