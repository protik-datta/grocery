import { useNavigate, useParams } from "react-router-dom";
import { statusColors } from "../../assets/assets";
import Container from "../../shared/components/common/Container";
import { ArrowLeft, ServerCrash } from "lucide-react";
import OrderMap from "./OrderMap";
import DeliveryProgress from "./DeliveryProgress";
import DeliveryPartner from "./DeliveryPartner";
import DeliveryAddress from "./DeliveryAddress";
import OrderProductDetails from "./OrderProductDetails";
import { useMyOrdersById } from "../../hooks/orders.hook";
import Loader from "../../utils/Loader";
import UnpaidBanner from "./UnpaidBanner";

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-22 h-22 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <ServerCrash size={40} className="text-red-400" strokeWidth={1.6} />
    </div>
    <h3 className="text-[#1B3022] text-[18px] font-medium mb-2">
      Order not found
    </h3>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      This order doesn't exist or could not be loaded.
    </p>
  </div>
);

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: orderResponse, isPending, isError } = useMyOrdersById(id);
  const orderData = orderResponse?.data;

  console.log(orderData);

  const orderDate = orderData
    ? new Date(orderData.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const isUnpaid =
    orderData?.paymentMethod === "card" && orderData?.isPaid === false;

  return (
    <Container>
      <div className="py-8">
        {/* Back button */}
        <button
          className="flex items-center gap-2 pb-6 text-[#6B7280] text-[14px] font-normal leading-5 cursor-pointer"
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft size={16} className="text-[#6B7280]" />
          Back to Orders
        </button>

        {/* Loading */}
        {isPending && (
          <div className="py-20 flex justify-center">
            <Loader size="lg" />
          </div>
        )}

        {!isPending && (isError || !orderData) && <ErrorState />}

        {/* Order content */}
        {!isPending && !isError && orderData && (
          <>
            {/* Unpaid banner */}
            {isUnpaid && <UnpaidBanner order={orderData} />}

            {/* Order header */}
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
                  className={`px-4 py-1.5 rounded-full text-[14px] font-semibold whitespace-nowrap ${
                    statusColors[orderData.status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {orderData.status}
                </span>
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
              {/* Left column */}
              <div className="w-full min-w-0">
                <OrderMap order={orderData} />
                <DeliveryProgress order={orderData} />
                <DeliveryPartner order={orderData} />
              </div>
              {/* Right sidebar */}
              <div className="w-full lg:w-87.5 lg:shrink-0">
                <DeliveryAddress order={orderData} />
                <OrderProductDetails order={orderData} />
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default OrderDetails;
