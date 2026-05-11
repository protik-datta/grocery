import { useNavigate, useParams } from "react-router-dom";
import { dummyDashboardOrdersData, statusColors } from "../../assets/assets";
import Container from "../../shared/components/common/Container";
import { ArrowLeft } from "lucide-react";
import OrderMap from "./OrderMap";

const OrderDetails = () => {
  const { id } = useParams();
  const orderData = dummyDashboardOrdersData.find(
    (product) => product._id === id,
  );
  const navigate = useNavigate();
  const orderDate = new Date(orderData.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Container>
      <div className="py-8">
        {/* top button */}
        <button
          className="flex items-center gap-2 pb-6 text-[#6B7280] text-[14px] font-normal text-center leading-5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="text-[#6B7280]" />
          Back to Orders
        </button>

        {/* order */}
        <div className="flex items-center justify-between pb-7">
          {/* left */}
          <div>
            <h2 className="text-[#1B3022] text-[24px] font-semibold leading-8 pb-1">
              Order #{orderData.orderNumber}
            </h2>
            <p className="text-[#6B7280] text-[14px] font-normal leading-5">
              Placed on {orderDate}
            </p>
          </div>
          {/* right */}
          <div>
            <span
              className={`px-4 py-1.5 rounded-full text-[14px] font-semibold whitespace-nowrap ${statusColors[orderData.status] || "bg-gray-100 text-gray-700"}`}
            >
              {orderData.status}
            </span>
          </div>
        </div>

        {/* map location */}
        <OrderMap order={orderData}/>
      </div>
    </Container>
  );
};

export default OrderDetails;
