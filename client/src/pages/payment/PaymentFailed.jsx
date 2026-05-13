import { useEffect } from "react";
import { Link } from "react-router-dom";
import { XCircle, RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
import Container from "../../shared/components/common/Container";

const PaymentFailed = () => {
  useEffect(() => {
    // Scroll lock apply kora jate page fixed thake
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <main className="fixed inset-0 w-full h-full bg-[#FFF9F9] font-outfit flex flex-col overflow-hidden touch-none">
      {/* Top accent bar (Red for failure) */}
      <div className="w-full h-1.5 bg-linear-to-r from-[#991B1B] via-[#DC2626] to-[#EF4444] shrink-0" />

      <Container className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center py-10 px-4 w-full">
          {/* Failure Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse scale-125" />
            <div className="relative w-24 h-24 rounded-full bg-[#991B1B] flex items-center justify-center shadow-lg shadow-red-900/20">
              <XCircle size={48} className="text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[#1B3022] text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-3">
            Payment Failed!
          </h1>
          <p className="text-gray-500 text-[15px] text-center max-w-sm leading-relaxed mb-10">
            We couldn't process your payment. This could be due to insufficient
            funds or a temporary bank issue.
          </p>

          {/* Error Details Card */}
          <div className="w-full max-w-md bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm mb-8">
            <div className="bg-red-50 px-6 py-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600" />
              <span className="text-red-700 font-medium text-sm">
                Error Information
              </span>
            </div>

            <div className="divide-y divide-gray-50">
              {[
                { label: "Reason", value: "Transaction declined by bank" },
                { label: "Reference ID", value: "#FAIL-2025-0921" },
                { label: "Status", value: "Failed", highlight: true },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-6 py-3.5"
                >
                  <span className="text-gray-400 text-[13px]">{label}</span>
                  <span
                    className={`text-[13px] font-medium ${highlight ? "text-red-600 font-semibold" : "text-[#1B3022]"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <button
              onClick={() => window.location.reload()} // Simple retry logic
              className="flex-1 w-full flex items-center justify-center gap-2 bg-[#1B3022] text-white text-[14px] font-medium py-3 rounded-xl hover:opacity-95 transition-all active:scale-95"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
            <Link
              to="/checkout"
              className="flex-1 w-full flex items-center justify-center gap-2 bg-white border border-[#1B3022]/15 text-[#1B3022] text-[14px] font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={15} />
              Go to Checkout
            </Link>
          </div>

          {/* Support line */}
          <p className="mt-8 text-gray-400 text-[13px] text-center">
            If your money was deducted, it will be refunded within 3-5 days.{" "}
            <Link
              to="/support"
              className="text-[#1B3022] font-medium underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
};

export default PaymentFailed;
