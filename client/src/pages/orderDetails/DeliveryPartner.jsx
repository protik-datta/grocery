import { Phone } from "lucide-react";

const DeliveryPartner = ({ order }) => {
  return (
    <div className="pb-10 w-[50%]">
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between">
        {/* left */}
        <div className="flex items-start gap-2">
          <span className="bg-[#1B3022] rounded-full w-11 h-11 inline-flex items-center justify-center text-white font-medium text-[14px]">
            {order.deliveryPartner.name.charAt(0)}
          </span>

          <div className="flex flex-col">
            <span className="text-[#1B3022] text-[14px] font-semibold leading-5">
              {order.deliveryPartner.name}
            </span>
            <span className="text-[#6B7280] text-[12px] capitalize leading-4 font-normal">
              • Delivery Partner
            </span>
          </div>
        </div>
        {/* right */}
        <a
          className="bg-[#FAF7F2] rounded-xl p-2.5 cursor-pointer"
          href={`tel:${order.deliveryPartner.phone}`}
        >
          <Phone size={16} />
        </a>
      </div>
    </div>
  );
};

export default DeliveryPartner;
