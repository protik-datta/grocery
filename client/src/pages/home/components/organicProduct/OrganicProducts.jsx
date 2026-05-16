import { PackageSearch, ServerCrash } from "lucide-react";
import { useState } from "react";
import Container from "../../../../shared/components/common/Container";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../../../../hooks/productApi.hook";
import ProductCard from "../../../../shared/ProductCard";
import Loader from "../../../../utils/Loader";

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="relative w-22 h-22 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-6">
      <PackageSearch size={40} className="text-[#1B3022]" strokeWidth={1.6} />
    </div>
    <h2 className="text-[18px] font-medium text-[#1B3022] mb-2">
      No organic products found
    </h2>
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

const ProductGrid = ({ products, isPending, isError }) => {
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

const OrganicProducts = () => {
  const {
    data: productResponse,
    isPending,
    isError,
  } = useProducts({ limit: 50 });
  const allProducts = productResponse?.data ?? [];
  const organicProducts = allProducts.filter((i) => i.isOrganic === true);

  const [showAll, setShowAll] = useState(false);
  const displayProducts = showAll
    ? organicProducts
    : organicProducts.slice(0, 10);

  return (
    <Container className="py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-[#1B3022] text-xl sm:text-[24px] font-semibold leading-8 mb-1 sm:mb-2">
            Organic Products
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-normal leading-5">
            Top-rated organic products this season
          </p>
        </div>

        {!showAll && organicProducts.length > 10 && (
          <button
            className="flex items-center text-[#F97316] text-sm font-semibold leading-5 gap-1 cursor-pointer shrink-0"
            onClick={() => setShowAll(true)}
          >
            View All <ArrowRight size={17} />
          </button>
        )}
      </div>

      <ProductGrid
        products={displayProducts}
        isPending={isPending}
        isError={isError}
      />
    </Container>
  );
};

export default OrganicProducts;
