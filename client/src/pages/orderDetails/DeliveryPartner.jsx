import { Phone, Truck } from "lucide-react";

const DeliveryPartner = ({ order }) => {
  const partner = order?.deliveryPartner;

  // ✅ partner না থাকলে placeholder দেখাও
  if (!partner) {
    return (
      <div className="pb-10 w-full">
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3">
          <div className="bg-[#E8F0EA] rounded-full w-11 h-11 inline-flex items-center justify-center shrink-0">
            <Truck size={20} className="text-[#1B3022]" strokeWidth={1.6} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#1B3022] text-[14px] font-semibold leading-5">
              Not assigned yet
            </span>
            <span className="text-[#6B7280] text-[12px] leading-4 font-normal">
              • Delivery Partner
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10 w-full">
      <div className="bg-white rounded-2xl p-5 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="bg-[#1B3022] rounded-full w-11 h-11 inline-flex items-center justify-center text-white font-medium text-[14px] shrink-0">
            {partner.name.charAt(0).toUpperCase()}
          </span>
          <div className="flex flex-col">
            <span className="text-[#1B3022] text-[14px] font-semibold leading-5">
              {partner.name}
            </span>
            <span className="text-[#6B7280] text-[12px] leading-4 font-normal">
              • Delivery Partner
            </span>
          </div>
        </div>

        {/* Right — phone থাকলেই দেখাবে */}
        {partner.phone && (
          <a
            href={`tel:${partner.phone}`}
            className="bg-[#FAF7F2] rounded-xl p-2.5 cursor-pointer hover:bg-[#f0ebe3] transition-colors"
          >
            <Phone size={16} className="text-[#1B3022]" />
          </a>
        )}
      </div>
    </div>
  );
};

export default DeliveryPartner;
