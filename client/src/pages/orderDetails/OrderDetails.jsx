import { useNavigate, useParams } from "react-router-dom";
import { dummyDashboardOrdersData, statusColors } from "../../assets/assets";
import Container from "../../shared/components/common/Container";
import { ArrowLeft } from "lucide-react";
import OrderMap from "./OrderMap";
import DeliveryProgress from "./DeliveryProgress";
import DeliveryPartner from "./DeliveryPartner";
import DeliveryAddress from "./DeliveryAddress";
import OrderProductDetails from "./OrderProductDetails";

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
          className="flex items-center gap-2 pb-6 text-[#6B7280] text-[14px] font-normal leading-5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="text-[#6B7280]" />
          Back to Orders
        </button>

        {/* order header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-7">
          <div>
            <h2 className="text-[#1B3022] text-[20px] sm:text-[24px] font-semibold leading-8 pb-1">
              Order #{orderData.orderNumber}
            </h2>
            <p className="text-[#6B7280] text-[14px] font-normal leading-5">
              Placed on {orderDate}
            </p>
          </div>
          <div>
            <span
              className={`px-4 py-1.5 rounded-full text-[14px] font-semibold whitespace-nowrap ${statusColors[orderData.status] || "bg-gray-100 text-gray-700"}`}
            >
              {orderData.status}
            </span>
          </div>
        </div>

        {/* main content */}
        <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
          {/* left column */}
          <div className="w-full min-w-0">
            <OrderMap order={orderData} />
            <DeliveryProgress order={orderData} />
            <DeliveryPartner order={orderData} />
          </div>
          {/* right sidebar */}
          <div className="w-full lg:w-87.5 lg:shrink-0">
            <DeliveryAddress order={orderData} />
            <OrderProductDetails order={orderData} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetails;
