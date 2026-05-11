import { useState } from "react";
import Container from "../../shared/components/common/Container";
import CategoryFilter from "./CategoryFilter";
import FilterProductContainer from "./FilterProductContainer";

const Products = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Container>
      {/* Desktop */}
      <div className="hidden lg:flex items-start gap-8">
        <aside className="w-1/4 sticky top-3 self-start">
          <CategoryFilter />
        </aside>
        <main className="w-3/4">
          <FilterProductContainer />
        </main>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <FilterProductContainer onFilterOpen={() => setFilterOpen(true)} />
      </div>

      {/* Mobile Filter Modal */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-[#1B3022] text-[16px] font-semibold">
                Filters
              </h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="px-5 pb-8">
              <CategoryFilter isMobile onClose={() => setFilterOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Products;
