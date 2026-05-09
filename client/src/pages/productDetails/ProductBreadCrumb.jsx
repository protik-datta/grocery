import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Container from "../../components/common/Container";
import { ArrowLeft } from "lucide-react";

const ProductBreadCrumb = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="flex flex-col items-start gap-6">
        {/* breadcrumbs */}
        <div className="flex items-center flex-wrap gap-y-1 text-sm">
          {/* home */}
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

          {/* divider */}
          <span className="px-2 text-gray-300">/</span>

          {/* products */}
          <Link
            to="/products"
            className="text-gray-500 hover:text-[#032E15] transition-colors font-medium"
          >
            Products
          </Link>

          {/* divider */}
          <span className="px-2 text-gray-300">/</span>

          {/* category */}
          <Link
            to={`/products?category=${product.category}`}
            className="text-gray-500 hover:text-[#032E15] transition-colors font-medium capitalize"
          >
            {product.category.replace("-", " & ")}
          </Link>

          {/* divider */}
          <span className="px-2 text-gray-300">/</span>

          {/* current product */}
          <p className="text-[#1B3022] font-semibold line-clamp-1">
            {product.name}
          </p>
        </div>

        {/* back */}
        <button
          className="flex items-center text-gray-500 hover:text-black transition-colors gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft
            size={20}
            className="text-gray-400 hover:text-[#032E15] transition-colors"
          />
          <span>Back</span>
        </button>
      </div>
    </Container>
  );
};

export default ProductBreadCrumb;
