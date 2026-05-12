import { assets } from "../../assets/assets";

const DeliveryAddress = ({ order }) => {
  const address = order?.shippingAddress;

  return (
    <div className="bg-white p-5 flex flex-col w-full rounded-2xl border border-gray-100">
      <h3 className="flex items-center gap-2 text-[14px] text-[#1B3022] font-semibold">
        <img src={assets.location} alt="Location" />
        Delivery Address
      </h3>

      {/* address details */}
      <div className="text-[14px] text-[#6B7280] font-normal leading-5 pt-3 flex flex-col gap-1">
        <p>{address?.label}</p>

        <p>{address?.address}</p>
        <p>
          {address?.city}, {address?.state} {address?.zip}
        </p>
        <p>{address?.country}</p>
      </div>
    </div>
  );
};

export default DeliveryAddress;
