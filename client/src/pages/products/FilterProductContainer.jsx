import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { sortOptions } from "../../assets/assets";
import {
  SearchX,
  X,
  ChevronDown,
  Check,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../../shared/ProductCard";
import { useCategories, useProducts } from "../../hooks/productApi.hook";
import Loader from '../../utils/Loader';

const FilterProductContainer = ({ onFilterOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const filters = useMemo(
    () => ({
      category,
      minPrice,
      maxPrice,
      sort,
      page,
      limit: 20,
    }),
    [category, minPrice, maxPrice, sort, page],
  );

  // API Integration
  const { data: categoriesResponse, isLoading: catLoading } = useCategories();

  const { data: productResponse, isLoading: prodLoading } =
    useProducts(filters);

  const apiCategories = categoriesResponse?.data || [];
  const products = productResponse?.data || [];
  const pagination = productResponse?.pagination || {};
  const totalFound = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 1;
  const hasNextPage = pagination?.hasNextPage || false;
  const hasPrevPage = pagination?.hasPrevPage || false;

  const categoryName = useMemo(() => {
    if (!category) return "All";

    if (!apiCategories || apiCategories.length === 0) {
      return "Loading...";
    }

    const foundCategory = apiCategories.find(
      (item) => item.slug?.toLowerCase() === category.toLowerCase(),
    );

    return foundCategory ? foundCategory.name : "All";
  }, [category, apiCategories]);

  const activeSort =
    sortOptions.find((o) => o.value === sort) || sortOptions[0];

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", 1);
    setSearchParams(params);
    setDropdownOpen(false);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number array with ellipsis logic
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
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
            {totalFound} products found
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

      {/* Loading */}
      {(catLoading || prodLoading) && (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-gray-500 text-sm"><Loader/></div>
        </div>
      )}

      {/* Products */}
      {!prodLoading && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 py-6 lg:py-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : null}

      {/* Pagination */}
      {!prodLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPrevPage}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-[#1B3022] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-sm text-gray-400"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-[#1B3022] text-white"
                    : "border border-gray-200 bg-white text-[#1B3022] hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ),
          )}

          {/* Next */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-[#1B3022] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Empty State */}
      {!prodLoading && products.length === 0 && (
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
