import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { assets, categoriesData } from "../../assets/assets";

const CategoryFilter = ({ isMobile = false, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const currentCategorySlug = categoryFromUrl || "all-categories";

  const minPriceFromUrl = searchParams.get("minPrice") || "";
  const maxPriceFromUrl = searchParams.get("maxPrice") || "";

  const navigate = useNavigate();

  const categories = useMemo(() => {
    return [
      { slug: "all-categories", name: "All Categories" },
      ...categoriesData,
    ];
  }, []);

  const activeName =
    categories.find((cat) => cat.slug === currentCategorySlug)?.name ||
    "All Categories";

  // handle category change
  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug === "all-categories") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    setSearchParams(params);
    onClose?.();
  };

  // handle price change
  const handlePriceChange = (type, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    setSearchParams(params);
  };

  // categories jsx
  const categoriesJSX = (
    <div className="flex flex-col gap-1.5">
      {categories.map((cat) => {
        const isActive = currentCategorySlug === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer font-normal ${
              isActive
                ? "bg-[#032E15] text-white font-medium"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );

  // price jsx
  const priceJSX = (
    <div className="flex items-center gap-3">
      <input
        type="number"
        placeholder="Min"
        value={minPriceFromUrl}
        onChange={(e) => handlePriceChange("minPrice", e.target.value)}
        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm text-[#1B3022] outline-none focus:border-[#032E15]"
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        placeholder="Max"
        value={maxPriceFromUrl}
        onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
        className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm text-[#1B3022] outline-none focus:border-[#032E15]"
      />
    </div>
  );

  // clear
  const clearBtn = (categoryFromUrl || minPriceFromUrl || maxPriceFromUrl) && (
    <button
      onClick={() => {
        setSearchParams({});
        onClose?.();
      }}
      className="w-full mt-4 py-2 text-red-500 text-sm font-medium border border-red-100 rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer"
    >
      Clear All Filters
    </button>
  );

  if (isMobile) {
    return (
      <div className="py-4">
        <h2 className="text-[#1B3022] text-[14px] font-semibold leading-5 mb-3">
          Categories
        </h2>
        {categoriesJSX}
        <div className="my-5 border-t border-gray-200" />
        <h3 className="text-[#1B3022] text-[14px] font-semibold leading-5 mb-3">
          Price Range
        </h3>
        {priceJSX}
        {clearBtn}
      </div>
    );
  }

  return (
    <div className="py-6.5">
      {/* top bar */}
      <div className="flex items-center">
        <img
          src={assets.home}
          alt="home"
          className="w-5 h-5 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="text-[#1B3022] text-[14px] font-medium leading-6">
          <span className="text-gray-500 px-2">/</span>
          {activeName}
        </p>
      </div>

      {/* filter card */}
      <div className="w-72 bg-white rounded-2xl border border-gray-100 p-4 mt-6">
        <div className="mb-4">
          <h2 className="text-[#1B3022] text-[14px] font-semibold leading-5">
            Categories
          </h2>
        </div>
        {categoriesJSX}
        <div className="my-6 border-t border-gray-200" />
        <div>
          <h3 className="text-[#1B3022] text-[14px] font-semibold leading-5 mb-3">
            Price Range
          </h3>
          {priceJSX}
        </div>
        {clearBtn}
      </div>
    </div>
  );
};

export default CategoryFilter;
