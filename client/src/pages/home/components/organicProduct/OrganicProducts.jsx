import { useState } from "react";
import Container from "../../../../components/common/Container";
import { ArrowRight } from "lucide-react";
import OrganicProductContainer from "./OrganicProductContainer";
import { dummyProducts } from "../../../../assets/assets";

const OrganicProducts = () => {
  const organicProducts = dummyProducts.filter(
    (i) => i.isOrganic === true,
  ).length;
  const [showAll, setShowAll] = useState(false);

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

        {!showAll && organicProducts > 10 && (
          <button
            className="flex items-center text-[#F97316] text-sm font-semibold leading-5 gap-1 cursor-pointer shrink-0"
            onClick={() => setShowAll(true)}
          >
            View All <ArrowRight size={17} />
          </button>
        )}
      </div>

      <OrganicProductContainer limit={showAll ? undefined : 10} />
    </Container>
  );
};

export default OrganicProducts;
