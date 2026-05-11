import { Link, useSearchParams } from "react-router-dom";
import Container from "../../shared/components/common/Container";
import { assets, dummyProducts } from "../../assets/assets";
import ProductCard from "../../shared/ProductCard";
import { SearchX, X } from "lucide-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const filteredProducts = dummyProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()) ||
      product.description.toLowerCase().includes(query.toLowerCase().trim()),
  );

  return (
    <Container>
      {/* breadcrumbs */}
      <div className="flex items-center flex-wrap gap-y-1 text-sm py-4 sm:py-6">
        <Link
          to="/"
          className="flex items-center text-gray-400 hover:text-[#032E15] transition-colors"
        >
          <img
            src={assets.home}
            alt="home"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain"
          />
        </Link>
        <span className="px-2 text-[#032E15]">/</span>
        <Link
          to="/products"
          className="text-[#032E15] transition-colors font-medium"
        >
          Search Result
        </Link>
      </div>

      {/* heading */}
      <div className="-mb-3 sm:-mb-5">
        <h1 className="text-[#1B3022] text-[18px] sm:text-[22px] md:text-[24px] font-medium leading-snug wrap-break-word">
          Search for "{query}"
        </h1>
        <p className="text-[#6B7280] text-[13px] sm:text-[14px] font-normal leading-5 mt-1">
          {filteredProducts.length} item
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-20 md:mb-40 sm:gap-4 lg:gap-6 py-5 sm:py-6 lg:py-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="min-h-[55vh] sm:min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-10">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-5 sm:mb-6">
            <SearchX
              size={32}
              className="text-[#1B3022] sm:w-9 sm:h-9 md:w-10 md:h-10"
              strokeWidth={1.6}
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1B3022] flex items-center justify-center">
              <X size={11} color="#fff" strokeWidth={2.5} />
            </span>
          </div>

          <h2 className="text-[18px] sm:text-[20px] font-medium text-[#1B3022] mb-2">
            No products found
          </h2>

          <p className="text-[13px] sm:text-[14px] text-[#6B7280] mb-6 sm:mb-7 max-w-[260px] sm:max-w-xs leading-relaxed">
            Try adjusting your filters or search terms to find what you're
            looking for
          </p>

          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1B3022] text-white text-[13px] sm:text-[14px] font-medium rounded-lg hover:bg-[#243d2c] transition-colors"
          >
            ← Back to all products
          </button>
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
