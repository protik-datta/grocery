import { useState } from "react";
import { assets } from "../../assets/assets";
import Container from "../../shared/components/common/Container";
import useCartStore from "../../store/cartStore";

const ProductInfoDetails = ({ product }) => {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <Container>
      <div className="py-5">
        <div className="flex flex-col lg:flex-row items-start bg-white rounded-2xl border border-gray-100 py-6 gap-y-6 lg:gap-x-40">
          {/* product image */}
          <div className="w-full lg:w-1/3 flex justify-center lg:block">
            <div className="relative inline-flex">
              <img
                src={product.image}
                alt={product.name}
                className="w-60 h-60 lg:w-95 lg:h-95 lg:ml-20 object-contain"
              />
              <span className="absolute px-2.5 py-1 -top-1 -left-10 lg:left-4 bg-[#F97316] rounded-3xl text-white text-[12px] font-semibold leading-4">
                {product.discount}% OFF
              </span>
            </div>
          </div>

          {/* product details */}
          <div className="px-6 lg:p-10 w-2/3">
            <p className="capitalize text-[#6B7280] font-medium text-[12px] leading-5 mb-2">
              {product.category.replace("-", " & ")}
            </p>
            <h2 className="text-[#1B3022] text-[30px] font-semibold leading-9">
              {product.name}
            </h2>

            {/* star and reviews */}
            <div className="flex items-center gap-2 py-3">
              <div className="flex">
                {[...Array(Math.round(product.rating))].map((_, index) => (
                  <img
                    key={index}
                    src={assets.star}
                    alt="rating"
                    className="w-3 h-3"
                  />
                ))}
              </div>
              <span className="text-[#1B3022] text-[14px] font-medium leading-5">
                {product.rating}
              </span>
              <span className="text-[#6B7280] text-[14px] font-medium leading-5">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* price */}
            <div className="flex items-baseline gap-x-2 mt-5">
              <h2 className="text-[#1B3022] text-[36px] font-semibold leading-10">
                ${(product.price * quantity).toFixed(2)}
              </h2>
              <span className="text-[#6B7280] line-through text-[18px] font-normal leading-7">
                ${(product.originalPrice * quantity).toFixed(2)}
              </span>
              <span className="text-[#6B7280] text-[14px] font-normal leading-5">
                /{product.unit}
              </span>
            </div>

            {/* description */}
            <p className="text-[#6B7280] text-[16px] font-normal leading-6 mt-5">
              {product.description}
            </p>

            {/* stock */}
            <p className="text-[#22C55E] text-[14px] font-medium leading-5 mt-7">
              ✓ In Stock ({product.stock} available)
            </p>

            {/* quantity and cart button */}
            <div className="flex items-center gap-3 sm:gap-6 py-5 w-2/3">
              {/* Quantity Selector - Fixed width on all screens */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-xl font-light"
                >
                  −
                </button>
                <span className="w-8 sm:w-10 text-center text-[14px] font-semibold text-[#1B3022]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-xl font-light"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex justify-center bg-[#F97316] py-3 sm:py-3.5 px-6 sm:px-8 rounded-2xl items-center gap-2 transition-all hover:bg-[#ea6605] active:scale-95 cursor-pointer"
              >
                <img
                  src={assets.cart}
                  alt="cart"
                  className="brightness-0 invert w-5 h-5"
                />
                <h4 className="text-white text-[13px] sm:text-sm font-semibold whitespace-nowrap">
                  Add to Cart
                </h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductInfoDetails;
