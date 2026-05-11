import { useState } from "react";
import Container from "../../shared/components/common/Container";
import OrderCard from "./OrderCard";
import { dummyDashboardOrdersData } from "../../assets/assets";
import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [active, setActive] = useState(
    localStorage.getItem("activeLink") || "All Orders",
  );
  const navLink = [
    {
      id: 1,
      label: "All Orders",
    },
    {
      id: 2,
      label: "Placed",
    },
    {
      id: 3,
      label: "Out for Delivery",
    },
    {
      id: 4,
      label: "Delivered",
    },
  ];

  const order = dummyDashboardOrdersData.filter(
    (user) => user.user.email === "admin@example.com",
  );

  const navigate = useNavigate();

  return (
    <Container>
      {/* header */}
      <div className="py-8">
        <h2 className="text-[#1B3022] text-[24px] font-semibold leading-8">
          My Orders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3 py-6 md:w-1/2">
          {navLink.map((item) => (
            <button
              key={item.id}
              className={`px-4 py-2 rounded-xl ${active === item.label ? "bg-[#1B3022] text-white" : "bg-white text-[#6B7280]"} text-center text-[14px] font-medium leading-5 cursor-pointer`}
              onClick={() => {
                setActive(item.label);
                localStorage.setItem("activeLink", item.label);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {/* Order List Section */}
      <div className="flex flex-col gap-5 pb-20">
        {order
          .filter((item) =>
            active === "All Orders" ? true : item.status === active,
          )
          .map((item) => (
            <OrderCard key={item._id} order={item} />
          ))}
        {/* Jodi kono order na thake tar jonno ekti check */}
        {order.filter((item) =>
          active === "All Orders" ? true : item.status === active,
        ).length === 0 && (
          <div className="flex flex-col gap-3 items-center justify-center py-20 w-full">
            {/* Icon Wrapper */}
            <div className="text-gray-300">
              <Box size={64} strokeWidth={1} />
            </div>

            {/* Text Message */}
            <h3 className="text-[#1B3022] text-lg font-medium">
              No orders yet
            </h3>
            <p className="text-gray-500 text-sm">
              Start shopping to see your orders here
            </p>
            <button
              className="bg-[#1B3022] text-[#d7dbe4] px-5 py-2 rounded-2xl text-[14px] cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default OrderPage;
