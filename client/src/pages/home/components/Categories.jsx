import Container from "../../../components/common/Container";
import { categoriesData } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const onCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  return (
    <Container className="py-16">
      {/* heading */}
      <div className="mb-8">
        <h2 className="text-[#1B3022] text-[24px] font-semibold leading-8 mb-2">
          Browse Categories
        </h2>
        <p className="text-gray-500 text-sm font-normal leading-5">
          Find exactly what you need using
        </p>
      </div>

      {/* category card */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-x-3 gap-y-5">
        {categoriesData.map((item) => (
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            key={item.slug}
            onClick={() => onCategoryClick(item.slug)}
          >
            <div className="flex w-26 h-26 p-2 flex-col justify-center items-start rounded-2xl bg-[#FFEDD4]">
              <img src={item.image} alt={item.name} className="object-cover" />
            </div>

            <p className="mt-4 text-[#52525C] text-center text-xs font-medium leading-3.75">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
