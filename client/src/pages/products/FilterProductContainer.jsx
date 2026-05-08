import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyProducts, sortOptions } from "../../assets/assets";
import {
  SearchX,
  X,
  ChevronDown,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "../../shared/ProductCard";

const sortFns = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "top-rated": (a, b) => b.rating - a.rating,
  "a-z": (a, b) => a.name.localeCompare(b.name),
};

const FilterProductContainer = ({ onFilterOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") || "a-z";

  const categoryName = useMemo(() => {
    if (!category) return "All";
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [category]);

  const filteredProducts = useMemo(() => {
    const filtered = dummyProducts.filter((product) => {
      const categoryMatch =
        !category || product.category.toLowerCase() === category.toLowerCase();

      const price = Number(product.price);

      const priceMatch =
        (!minPrice || price >= Number(minPrice)) &&
        (!maxPrice || price <= Number(maxPrice));

      return categoryMatch && priceMatch;
    });

    return sortFns[sort] ? [...filtered].sort(sortFns[sort]) : filtered;
  }, [category, minPrice, maxPrice, sort]);

  const activeSort =
    sortOptions.find((o) => o.value === sort) || sortOptions[0];

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="py-8 lg:py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[#1B3022] text-[20px] lg:text-[24px] font-semibold leading-8">
            {categoryName} Products
          </h3>
          <p className="text-[#6B7280] text-[14px] font-normal leading-5 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Filters button (mobile) */}
          {onFilterOpen && (
            <button
              onClick={onFilterOpen}
              className="lg:hidden flex items-center gap-2 h-11 px-4 bg-white rounded-2xl border border-gray-200 text-[#1B3022] text-sm font-medium"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center justify-between gap-3 w-40 sm:w-44 lg:w-56 h-11 px-4 bg-white rounded-2xl border border-gray-200 text-[#1B3022] text-sm font-medium"
            >
              <span className="truncate">{activeSort.label}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-lg z-50 overflow-hidden">
                {sortOptions.map((option) => {
                  const isActive = sort === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer ${
                        isActive
                          ? "bg-[#032E15] text-white font-medium"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isActive && <Check size={14} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 py-6 lg:py-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
          <div className="relative w-22 h-22 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-6">
            <SearchX size={40} className="text-[#1B3022]" strokeWidth={1.6} />
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1B3022] flex items-center justify-center">
              <X size={13} color="#fff" strokeWidth={2.5} />
            </span>
          </div>

          <h2 className="text-[20px] font-medium text-[#1B3022] mb-2">
            No products found
          </h2>

          <p className="text-[14px] text-[#6B7280] mb-7 max-w-70 leading-relaxed">
            Try adjusting your filters or search terms to find what you're
            looking for
          </p>

          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3022] text-white text-[14px] font-medium rounded-lg hover:bg-[#243d2c] transition-colors"
          >
            ← Back to all products
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterProductContainer;
