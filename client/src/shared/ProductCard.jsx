import { Plus } from "lucide-react";
import { assets } from "../assets/assets";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addItem, items } = useCartStore();
  const cartItem = items.find((i) => i.product._id === product._id);
  const quantity = cartItem?.quantity || 0;

  const navigate = useNavigate();
  return (
    <div
      className="group bg-white rounded-2xl w-full flex flex-col items-start shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden"
      onClick={() => navigate(`/products/${product.category}/${product.slug}`)}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-square flex items-center justify-center">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[#F97316] text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
            {product.discount}% OFF
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-[80%] h-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 mt-2 sm:mt-3 w-full flex flex-col">
        <h2 className="text-[#3F3F46] font-outfit text-xs sm:text-sm font-normal leading-tight line-clamp-2">
          {product.name}
        </h2>

        <div className="flex items-center mt-1 gap-x-1">
          <img src={assets.star} alt="rating" className="w-3 h-3" />
          <span className="text-[#1B3022] font-outfit text-xs font-medium leading-4">
            {product.rating}
          </span>
          <span className="text-[#6B7280] font-outfit text-xs font-normal leading-4">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 sm:mt-3">
          {/* Price Section */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-x-1">
              <h4 className="text-[#1B3022] font-outfit text-xs sm:text-sm font-semibold leading-4">
                ৳{product.price}
              </h4>
              <span className="text-[10px] font-normal text-gray-500 font-outfit">
                /{product.unit}
              </span>
            </div>
            <del className="text-gray-400 font-outfit text-[11px] font-normal leading-3">
              ৳{product.originalPrice}
            </del>
          </div>

          {/* Add Button */}
          <button
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-white font-bold shadow-sm transition-all active:scale-95 cursor-pointer ${
              quantity > 0
                ? "bg-[#032E15] hover:bg-[#1B3022]"
                : "bg-[#F97316] hover:bg-orange-600"
            }`}
            onClick={() => addItem(product)}
          >
            {quantity > 0 ? (
              <span className="text-xs font-bold">{quantity}</span>
            ) : (
              <Plus size={15} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
