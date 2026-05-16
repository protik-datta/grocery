import Container from "../../../shared/components/common/Container";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/productApi.hook";
import Loader from "../../../utils/Loader";
import { LayoutGrid, ServerCrash } from "lucide-react";

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="w-22 h-22 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-6">
      <LayoutGrid size={40} className="text-[#1B3022]" strokeWidth={1.6} />
    </div>
    <h2 className="text-[18px] font-medium text-[#1B3022] mb-2">
      No categories found
    </h2>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      Check back later for new categories
    </p>
  </div>
);

const ErrorState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="w-22 h-22 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <ServerCrash size={40} className="text-red-400" strokeWidth={1.6} />
    </div>
    <h2 className="text-[18px] font-medium text-[#1B3022] mb-2">
      Something went wrong
    </h2>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      Failed to load categories. Please try again later.
    </p>
  </div>
);

const Categories = () => {
  const { data: categoryResponse, isPending, isError } = useCategories();
  const categories = categoryResponse?.data ?? [];

  const navigate = useNavigate();

  const onCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
  };

  return (
    <Container className="py-16">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-[#1B3022] text-[24px] font-semibold leading-8 mb-2">
          Browse Categories
        </h2>
        <p className="text-gray-500 text-sm font-normal leading-5">
          Find exactly what you need using our categories
        </p>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="py-16 flex justify-center">
          <Loader size="lg" />
        </div>
      )}

      {/* Category Grid */}
      {!isPending && (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-x-3 gap-y-5">
          {isError && <ErrorState />}

          {!isError && categories.length === 0 && <EmptyState />}

          {!isError &&
            categories.map((item) => (
              <div
                className="flex flex-col items-center justify-center cursor-pointer group"
                key={item.slug}
                onClick={() => onCategoryClick(item.slug)}
              >
                <div className="flex w-26 h-26 p-2 flex-col justify-center items-center rounded-2xl bg-[#FFEDD4] group-hover:bg-[#fde0b0] transition-colors duration-200">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-[#52525C] text-center text-xs font-medium leading-3.75">
                  {item.name}
                </p>
              </div>
            ))}
        </div>
      )}
    </Container>
  );
};

export default Categories;
