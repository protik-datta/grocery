import { CreditCard, ArrowLeft, ArrowRight } from "lucide-react";

const PaymentStep = ({ paymentMethod, setPaymentMethod, onBack, onNext }) => {
  const methods = [
    {
      id: "cash",
      name: "Cash on Delivery",
      desc: "Pay with cash upon delivery",
    },
    {
      id: "card",
      name: "Online Payment",
      desc: "bKash, Nagad, Card via SSLCommerz",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <CreditCard className="text-[#032E15]" size={22} />
        <h3 className="text-[#1B3022] text-lg font-bold">
          Select Payment Method
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${paymentMethod === method.id ? "border-[#1B3022] bg-[#1B3022]/5" : "border-gray-100 hover:border-gray-200"}`}
          >
            <input
              type="radio"
              name='payment'
              checked={paymentMethod === method.id}
              onChange={() => setPaymentMethod(method.id)}
              className="mt-1 accent-[#1B3022]"
            />
            <div>
              <p className="text-sm font-bold text-[#1B3022]">{method.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{method.desc}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-gray-500 font-medium flex items-center gap-1 hover:text-gray-700 text-[13px]"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={onNext}
          className="bg-[#1B3022] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2 text-[13px]"
        >
          Review Order <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
