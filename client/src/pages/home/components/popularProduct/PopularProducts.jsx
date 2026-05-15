import { useState } from "react";
import Container from "../../../../shared/components/common/Container";
import ProductContainer from "./ProductContainer";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../../../../hooks/productApi.hook";

const PopularProducts = () => {
  const { data: productResponse } = useProducts({ limit: 50 });
  const products = productResponse?.data

  const popularProducts = products?.filter((i) => i.isPopular === true).length;
  const [showAll, setShowAll] = useState(false);

  return (
    <Container className="py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-[#1B3022] text-xl sm:text-[24px] font-semibold leading-8 mb-1 sm:mb-2">
            Popular Products
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-normal leading-5">
            Top-rated products this season
          </p>
        </div>

        {!showAll && popularProducts > 10 && (
          <button
            className="flex items-center text-[#F97316] text-sm font-semibold leading-5 gap-1 cursor-pointer shrink-0"
            onClick={() => setShowAll(true)}
          >
            View All <ArrowRight size={17} />
          </button>
        )}
      </div>

      <ProductContainer limit={showAll ? undefined : 10} />
    </Container>
  );
};

export default PopularProducts;
