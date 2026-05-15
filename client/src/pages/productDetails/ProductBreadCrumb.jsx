import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Container from "../../shared/components/common/Container";
import { ArrowLeft } from "lucide-react";

const ProductBreadCrumb = ({ product }) => {
  const navigate = useNavigate();

  const categorySlug = product?.category?.slug || product?.category || "";
  const categoryName = product?.category?.name || categorySlug || "Category";

  return (
    <Container>
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-center flex-wrap gap-y-1 text-sm">
          {/* Home */}
          <Link
            to="/"
            className="flex items-center text-gray-400 hover:text-[#032E15] transition-colors"
          >
            <img
              src={assets.home}
              alt="home"
              className="w-5 h-5 object-contain"
            />
          </Link>

          <span className="px-2 text-gray-300">/</span>

          {/* Products */}
          <Link
            to="/products"
            className="text-gray-500 hover:text-[#032E15] transition-colors font-medium"
          >
            Products
          </Link>

          <span className="px-2 text-gray-300">/</span>

          {/* Category - .replace use korar age string check kora hoyeche */}
          <Link
            to={`/products?category=${categorySlug}`}
            className="text-gray-500 hover:text-[#032E15] transition-colors font-medium capitalize"
          >
            {typeof categoryName === "string"
              ? categoryName.replace(/-/g, " & ")
              : "Category"}
          </Link>

          <span className="px-2 text-gray-300">/</span>

          {/* Current Product */}
          <p className="text-[#1B3022] font-semibold line-clamp-1">
            {product?.name}
          </p>
        </div>

        {/* Back Button */}
        <button
          className="flex items-center text-gray-500 hover:text-black transition-colors gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="text-gray-400" />
          <span>Back</span>
        </button>
      </div>
    </Container>
  );
};

export default ProductBreadCrumb;
