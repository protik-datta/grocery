import { ArrowLeft, CheckCircle, ShoppingBag } from "lucide-react";

const ReviewStep = ({
  shippingAddress,
  paymentMethod,
  items,
  onBack,
  onConfirm,
  isPending,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <ShoppingBag className="text-[#032E15]" size={22} />
        <h3 className="text-[#1B3022] text-lg font-bold">Review Your Order</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf7f2]/80 p-4 rounded-2xl text-sm text-[#1B3022]">
        <div>
          <h4 className="font-bold text-gray-400 uppercase text-xs tracking-wider">
            Shipping To ({shippingAddress.label})
          </h4>
          <p className="mt-1 font-medium">
            {shippingAddress.address}, {shippingAddress.city}
          </p>
          <p className="text-xs text-gray-500">
            {shippingAddress.state} - {shippingAddress.zip}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-400 uppercase text-xs tracking-wider">
            Payment Method
          </h4>
          <p className="mt-1 font-bold capitalize text-[#1B3022]">
            {paymentMethod === "card"
              ? "Online Payment"
              : "Cash on Delivery"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-gray-500 text-xs">
          Items ({items.length})
        </h4>
        {items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex justify-between items-center text-sm pb-2 border-b border-gray-50"
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </span>
              <p className="font-medium text-[#1B3022] text-[14px]">
                {product.name}{" "}
                <span className="text-gray-400 font-normal ml-1 text-[12px]">
                  x {quantity}
                </span>
              </p>
            </div>
            <p className="font-bold text-[#1B3022]">
              ৳{(product.price * quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          disabled={isPending}
          className="text-gray-500 text-[13px] font-semibold flex items-center gap-1 hover:text-gray-700 disabled:opacity-50"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="bg-[#1B3022] transition-all text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 cursor-pointer text-[13px] disabled:bg-gray-400"
        >
          {isPending ? "Placing Order..." : "Confirm & Place Order"}
          {!isPending && <CheckCircle size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
