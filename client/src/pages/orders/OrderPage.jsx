import { useState } from "react";
import Container from "../../shared/components/common/Container";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { PackageSearch, ServerCrash } from "lucide-react";
import { useMyOrders } from "../../hooks/orders.hook";
import Loader from "../../utils/Loader";

const navLinks = [
  { id: 1, label: "All Orders" },
  { id: 2, label: "Placed" },
  { id: 3, label: "Confirmed" },
  { id: 4, label: "Out for Delivery" },
  { id: 5, label: "Delivered" },
];

const EmptyState = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-22 h-22 rounded-full bg-[#E8F0EA] flex items-center justify-center mb-6">
      <PackageSearch size={40} className="text-[#1B3022]" strokeWidth={1.6} />
    </div>
    <h3 className="text-[#1B3022] text-[18px] font-medium mb-2">
      No orders yet
    </h3>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed mb-7">
      Start shopping to see your orders here
    </p>
    <button
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3022] text-white text-[14px] font-medium rounded-lg hover:bg-[#243d2c] transition-colors cursor-pointer"
      onClick={() => navigate("/products")}
    >
      Start Shopping
    </button>
  </div>
);

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-22 h-22 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <ServerCrash size={40} className="text-red-400" strokeWidth={1.6} />
    </div>
    <h3 className="text-[#1B3022] text-[18px] font-medium mb-2">
      Something went wrong
    </h3>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      Failed to load your orders. Please try again later.
    </p>
  </div>
);

const OrderPage = () => {
  const { data: orderResponse, isPending, isError } = useMyOrders();

  const orders = orderResponse?.data ?? [];

  const [active, setActive] = useState(
    localStorage.getItem("activeOrderTab") || "All Orders",
  );

  const filteredOrders = orders.filter((item) =>
    active === "All Orders" ? true : item.status === active,
  );

  const navigate = useNavigate();

  return (
    <Container>
      {/* Header */}
      <div className="py-8">
        <h2 className="text-[#1B3022] text-[24px] font-semibold leading-8">
          My Orders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-3 py-6 md:w-2/3">
          {navLinks.map((item) => (
            <button
              key={item.id}
              className={`px-4 py-2 rounded-xl text-center text-[14px] font-normal leading-5 cursor-pointer transition-colors ${
                active === item.label
                  ? "bg-[#1B3022] text-white"
                  : "bg-white text-[#6B7280]"
              }`}
              onClick={() => {
                setActive(item.label);
                localStorage.setItem("activeOrderTab", item.label);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isPending && (
        <div className="py-20 flex justify-center">
          <Loader size="lg" />
        </div>
      )}

      {/* Error */}
      {isError && <ErrorState />}

      {/* Order List */}
      {!isPending && !isError && (
        <div className="flex flex-col gap-5 pb-20">
          {filteredOrders.length === 0 ? (
            <EmptyState navigate={navigate} />
          ) : (
            filteredOrders.map((item) => (
              <OrderCard key={item._id} order={item} />
            ))
          )}
        </div>
      )}
    </Container>
  );
};

export default OrderPage;
