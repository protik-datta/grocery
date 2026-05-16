import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import useCartStore from "../../store/cartStore";
import { useOrderMutation } from "../../hooks/orders.hook";

const Checkout = () => {
  const { items, deliveryFee, subtotal, totalAmount } = useCartStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);

  const { mutate: processOrder, isPending } = useOrderMutation();

  const [shippingAddress, setShippingAddress] = useState({
    label: "Home",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const payload = {
      items: items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
      })),
      shippingAddress: {
        label: shippingAddress.label,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
      },
      paymentMethod: paymentMethod,
    };
    processOrder(payload);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your cart is empty!</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1B3022] text-white px-6 py-2 rounded-xl"
          >
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Headers */}
          <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center border border-gray-100">
            {["Address", "Payment", "Review"].map((tabName, index) => {
              const step = index + 1;
              return (
                <button
                  key={step}
                  disabled={activeTab < step || isPending}
                  className={`flex items-center gap-2 pb-2 px-3 text-sm font-semibold transition-all ${activeTab === step ? "text-[#1B3022] border-b-2 border-[#1B3022]" : "text-gray-400"}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${activeTab === step ? "bg-[#1B3022] text-white" : "bg-gray-100"}`}
                  >
                    {step}
                  </span>
                  {tabName}
                </button>
              );
            })}
          </div>

          {/* Conditional Steps Rendering */}
          {activeTab === 1 && (
            <AddressStep
              shippingAddress={shippingAddress}
              handleInputChange={handleInputChange}
              onNext={() => setActiveTab(2)}
            />
          )}

          {activeTab === 2 && (
            <PaymentStep
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onBack={() => setActiveTab(1)}
              onNext={() => setActiveTab(3)}
            />
          )}

          {activeTab === 3 && (
            <ReviewStep
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
              items={items}
              onBack={() => setActiveTab(2)}
              onConfirm={handlePlaceOrder}
              isPending={isPending}
            />
          )}
        </div>

        {/* Right Side Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit space-y-4">
          <h3 className="text-[#1B3022] text-base font-bold border-b border-gray-50 pb-3">
            Order Summary
          </h3>
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#1B3022] font-medium">
                ৳{subtotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span className="text-[#1B3022] font-medium">৳{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1B3022] pt-3 border-t border-gray-100">
              <span>Total Amount</span>
              <span className="text-[#1B3022]">
                ৳{totalAmount().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
