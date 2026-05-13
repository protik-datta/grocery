import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight, MapPin } from "lucide-react";
import Container from '../../shared/components/common/Container';

const steps = [
  { icon: CheckCircle, label: "Order Confirmed" },
  { icon: ShoppingBag, label: "Processing" },
  { icon: MapPin, label: "On the way" },
];

const PaymentSuccess = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    el.style.strokeDashoffset = "0";
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const el = circleRef.current;
    if (el) el.style.strokeDashoffset = "0";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F7F5] font-outfit flex flex-col overflow-hidden">
      {/* Top accent bar */}
      <div className="w-full bg-linear-to-r from-[#1B3022] via-[#2D5438] to-[#4A8C5C]" />

      <Container>
        <div className="flex flex-col items-center justify-center py-10 px-4">
          {/* Success icon */}
          <div className="relative mb-8">
            {/* Outer ring pulse */}
            <div className="absolute inset-0 rounded-full bg-[#1B3022]/10 animate-ping scale-125" />
            <div className="relative w-24 h-24 rounded-full bg-[#1B3022] flex items-center justify-center shadow-lg shadow-[#1B3022]/30">
              <svg
                viewBox="0 0 52 52"
                className="w-12 h-12"
                style={{ overflow: "visible" }}
              >
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
                <path
                  ref={circleRef}
                  d="M14 27l8 8 16-16"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 40,
                    strokeDashoffset: 40,
                    transition: "stroke-dashoffset 0.6s ease 0.3s",
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[#1B3022] text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-3">
            Payment Successful!
          </h1>
          <p className="text-[#1B3022]/60 text-[15px] text-center max-w-sm leading-relaxed mb-10">
            Thank you for your order. We've received your payment and will start
            processing right away.
          </p>

          {/* Order card */}
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#1B3022]/10 overflow-hidden shadow-sm mb-8">
            {/* Card header */}
            <div className="bg-[#1B3022] px-6 py-4 flex items-center justify-between">
              <span className="text-white font-medium text-sm">
                Order Details
              </span>
              <span className="text-white/60 text-xs font-outfit">
                #ORD-2025-8471
              </span>
            </div>

            {/* Card body */}
            <div className="divide-y divide-[#1B3022]/8">
              {[
                { label: "Payment Method", value: "Online Payment" },
                { label: "Estimated Delivery", value: "2–4 Business Days" },
                { label: "Status", value: "Confirmed", highlight: true },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-6 py-3.5"
                >
                  <span className="text-[#1B3022]/50 text-[13px]">{label}</span>
                  <span
                    className={`text-[13px] font-medium ${
                      highlight
                        ? "text-[#2D7A4A] bg-[#2D7A4A]/10 px-2.5 py-0.5 rounded-full text-xs"
                        : "text-[#1B3022]"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress steps */}
          <div className="w-full max-w-md mb-10">
            <div className="flex items-center justify-between relative">
              {/* connector line */}
              <div className="absolute left-0 right-0 top-4 h-px bg-[#1B3022]/15 z-0" />
              <div
                className="absolute left-0 top-4 h-px bg-[#1B3022] z-0 transition-all duration-700"
                style={{ width: "50%" }}
              />

              {steps.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 z-10"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      i === 0
                        ? "bg-[#1B3022] text-white"
                        : i === 1
                          ? "bg-[#1B3022] text-white"
                          : "bg-white border border-[#1B3022]/20 text-[#1B3022]/30"
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      i < 2 ? "text-[#1B3022]" : "text-[#1B3022]/30"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <Link
              to="/orders"
              className="flex-1 w-full flex items-center justify-center gap-2 bg-[#1B3022] text-white text-[14px] font-medium py-3 rounded-xl hover:bg-[#2D5438] transition-colors"
            >
              <ShoppingBag size={15} />
              Track My Order
            </Link>
            <Link
              to="/"
              className="flex-1 w-full flex items-center justify-center gap-2 bg-white border border-[#1B3022]/15 text-[#1B3022] text-[14px] font-medium py-3 rounded-xl hover:bg-[#1B3022]/5 transition-colors"
            >
              Continue Shopping
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Help text */}
          <p className="mt-8 text-[#1B3022]/40 text-[13px] text-center">
            Questions?{" "}
            <a
              href="mailto:support@example.com"
              className="underline underline-offset-2 hover:text-[#1B3022] transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </Container>
    </main>
  );
};

export default PaymentSuccess;
