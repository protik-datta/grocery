import { useState } from "react";
import Container from "../../components/common/Container";
import ProductCard from "../../shared/ProductCard";
import { ArrowRight } from "lucide-react";

const RelatedProducts = ({ products, category }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#1B3022] text-[20px] md:text-[24px] font-semibold leading-8">
              Related Products
            </h2>
            <p className="text-[#6B7280] text-[14px] leading-5 font-normal pt-1">
              More from{" "}
              <span className="capitalize">
                {category.split("-").join(" & ")}
              </span>
            </p>
          </div>

          {!showAll && products.length > 5 && (
            <button
              className="flex items-center text-[#F97316] text-sm font-semibold leading-5 gap-1 cursor-pointer shrink-0"
              onClick={() => setShowAll(true)}
            >
              View All <ArrowRight size={17} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 py-5">
          {(showAll ? products : products.slice(0, 5)).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RelatedProducts;
