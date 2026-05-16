import { PackageSearch, ServerCrash } from "lucide-react";
import ProductCard from "../../../../shared/ProductCard";
import Loader from "../../../../utils/Loader";

const EmptyState = ({ message = "No products found." }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="relative w-22 h-22 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-6">
      <PackageSearch size={40} className="text-[#1B3022]" strokeWidth={1.6} />
    </div>
    <h2 className="text-[18px] font-medium text-[#1B3022] mb-2">{message}</h2>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      Check back later for new arrivals
    </p>
  </div>
);

const ErrorState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="relative w-22 h-22 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <ServerCrash size={40} className="text-red-400" strokeWidth={1.6} />
    </div>
    <h2 className="text-[18px] font-medium text-[#1B3022] mb-2">
      Something went wrong
    </h2>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      Failed to load products. Please try again later.
    </p>
  </div>
);

const ProductContainer = ({ products = [], isPending, isError }) => {
  if (isPending) {
    return (
      <div className="py-16 flex justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
      {isError && <ErrorState />}

      {!isError && products.length === 0 && <EmptyState />}

      {!isError &&
        products.map((item) => <ProductCard key={item._id} product={item} />)}
    </div>
  );
};

export default ProductContainer;
