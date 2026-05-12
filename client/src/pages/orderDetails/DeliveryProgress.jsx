import {
  Package,
  HomeIcon,
  Clock,
  Check,
  Truck,
} from "lucide-react";

const DeliveryProgress = ({ order }) => {
  const allStatuses = [
    { label: "Placed", Icon: Clock },
    { label: "Confirmed", Icon: Check },
    { label: "Assigned", Icon: Truck },
    { label: "Packed", Icon: Package },
    { label: "Out for Delivery", Icon: Truck },
    { label: "Delivered", Icon: HomeIcon },
  ];

  const currentIdx = allStatuses.findIndex(
    (s) => s.label.trim().toLowerCase() === order.status?.trim().toLowerCase(),
  );

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className='py-10'>
      <div className="bg-white border border-gray-100 rounded-2xl p-8 w-full">
        <h3 className="text-[18px] font-semibold text-[#1B3022] mb-6">
          Delivery progress
        </h3>

        <div>
          {allStatuses.map(({ label, Icon }, i) => {
            const isDone = i <= currentIdx;
            const isCurrent = i === currentIdx;
            const isLast = i === allStatuses.length - 1;

            const historyEntry = order.statusHistory?.find(
              (h) =>
                h.status?.trim().toLowerCase() === label.trim().toLowerCase(),
            );

            return (
              <div key={label} className="flex gap-3.5">
                {/* Left: icon + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0
                    ${isDone ? "bg-[#1B3022] text-white" : "bg-[#FAF7F2] text-[#6B7280]"}
                    ${isCurrent ? "ring-4 ring-gray-200" : ""}
                  `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 min-h-15 ${
                        isDone && !isCurrent ? "bg-[#1B3022]" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>

                {/* Right: label + time */}
                <div className={`pt-1.5 ${!isLast ? "pb-7" : ""}`}>
                  <p
                    className={`text-[14px] font-semibold ${
                      isDone ? "text-[#1B3022]" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </p>

                  {historyEntry?.timestamp && (
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {formatDateTime(historyEntry.timestamp)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryProgress;
