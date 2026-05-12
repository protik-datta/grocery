import { ChevronRight } from "lucide-react";
import { assets, statusColors } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const navigate = useNavigate();

  return (
    <div className="w-full md:w-2/3 flex items-stretch justify-between bg-white p-5 rounded-2xl cursor-pointer hover:shadow transition-all border border-gray-100" onClick={()=> navigate(`/orders/${order._id}`)}>
      {/* Left side */}
      <div className="flex flex-col items-start">
        <h3 className="text-[#1B3022] text-[14px] font-medium leading-5">
          Order #{order.orderNumber}
        </h3>

        <div className="pt-0.5 flex items-center gap-2">
          <img
            src={assets.calender}
            alt=""
            className="w-3 h-3 object-contain"
          />
          <span className="text-[#6B7280] text-[12px] font-normal leading-4">
            {orderDate}
          </span>
        </div>

        <div className="flex items-center pt-3 gap-2">
          {order.items.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-contain rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]"
            />
          ))}
        </div>

        <p className="text-[#6B7280] text-[14px] font-normal leading-5 pt-6">
          {order.items.length} {order.items.length > 1 ? "items" : "item"}
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-between items-end min-w-max">
        <div className="flex justify-end h-fit">
          <div className="flex gap-2 items-center">
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}
            >
              {order.status}
            </span>
            <ChevronRight size={16} className="text-[#6B7280]" />
          </div>
        </div>

        <div className="text-end">
          <p className="text-[#1B3022] text-[14px] font-semibold leading-5">
            ৳{order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
