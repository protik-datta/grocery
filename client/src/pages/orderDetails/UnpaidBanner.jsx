import { AlertCircle } from "lucide-react";
import { useRetryPayment } from "../../hooks/orders.hook";

const UnpaidBanner = ({ order }) => {
  const { mutate: retryPayment, isPending } = useRetryPayment();

  return (
    <div className="flex items-center justify-between gap-4 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <AlertCircle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-[#1B3022] text-[14px] font-semibold">
            Payment Pending
          </p>
          <p className="text-[#6B7280] text-[12px]">
            Complete your payment to confirm this order
          </p>
        </div>
      </div>
      <button
        onClick={() => retryPayment(order._id)}
        disabled={isPending}
        className="shrink-0 px-4 py-2 bg-[#1B3022] text-white text-[13px] font-medium rounded-xl hover:bg-[#243d2c] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Redirecting..." : "Pay Now"}
      </button>
    </div>
  );
};

export default UnpaidBanner
