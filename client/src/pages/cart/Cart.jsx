import { X, Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import useCartStore from '../../store/cartStore';

const Cart = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity } =
    useCartStore();

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-105 bg-white z-500 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#032E15]/8 rounded-xl">
              <ShoppingCart size={20} className="text-[#032E15]" />
            </div>
            <div>
              <h2 className="text-[#1B3022] text-[18px] font-semibold leading-tight">
                Your Cart
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                <ShoppingCart size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="text-[#1B3022] font-semibold text-base">
                  Your cart is empty
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Add some products to get started
                </p>
              </div>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf7f2]/80 transition-colors"
              >
                {/* Image */}
                <div className="w-16 h-16 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#1B3022] text-sm font-medium truncate">
                    {product.name}
                  </p>
                  <p className="text-[#6B7280] text-xs mt-0.5">
                    ৳{product.price} / {product.unit}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product._id, quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus size={11} className="text-gray-600" />
                    </button>
                    <span className="text-[#1B3022] text-sm font-semibold w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product._id, quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center transition-colors cursor-pointer border-gray-200 border"
                    >
                      <Plus size={11} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Price + Delete */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <p className="text-[#1B3022] text-sm font-bold">
                    ৳{(product.price * quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(product._id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group"
                  >
                    <Trash2
                      size={14}
                      className="text-gray-300 group-hover:text-red-400 transition-colors"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="text-[#1B3022] font-medium">
                ৳{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1B3022] pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#F97316] transition-all text-white font-semibold text-[15px] py-4 rounded-2xl flex items-center justify-center gap-2 mt-2 cursor-pointer">
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
