const OrderProductDetails = ({ order }) => {
  return (
    <div className="p-5 bg-white flex flex-col gap-3 my-5 rounded-2xl border border-gray-100 w-full">
      <span className="text-[#1B3022] text-[14px] font-semibold leading-5 pb-2">
        Items ({order?.items?.length || 0})
      </span>
      {/* product items */}
      <div className="flex flex-col items-start gap-2 border-b border-gray-200 w-full pb-4">
        {order?.items?.map((item,index) => (
          <div key={index} className="flex items-center gap-3 w-full">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[#1B3022] text-[14px] font-semibold leading-5">
                {item.name}
              </span>
              <span className="text-[#6B7280] text-[12px] font-normal leading-4">
                Quantity: {item.quantity}
              </span>
            </div>
            <span className="text-[#1B3022] text-[14px] font-semibold leading-5">
              ৳{item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      {/* amount */}
      <div className='py-2 flex flex-col gap-1 border-b border-gray-200 pb-4 w-full'>
        {/* total amount */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[#6B7280] text-[14px] font-normal leading-5">
            Subtotal
          </span>
          <span className="text-[#1B3022] text-[14px] font-normal leading-6">
            ৳{order?.subtotal.toFixed(2)}
          </span>
        </div>
        {/* delivery fee */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[#6B7280] text-[14px] font-normal leading-5">
            Delivery
          </span>
          <span className="text-[#1B3022] text-[14px] font-normal leading-6">
            {order?.deliveryFee === 0 ? "Free" : `৳${order?.deliveryFee.toFixed(2)}`}
          </span>
        </div>
        {/* tax */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[#6B7280] text-[14px] font-normal leading-5">
            Tax
          </span>
          <span className="text-[#1B3022] text-[14px] font-normal leading-6">
            ৳{order?.tax.toFixed(2)}
          </span>
        </div>
      </div>
      {/* total amount */}
      <div className="flex items-center justify-between w-full pt-1">
        <span className="text-[#1B3022] text-[16px] font-semibold leading-5">
          Total
        </span>
        <span className="text-[#1B3022] text-[16px] font-semibold leading-5">
          ৳{order?.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderProductDetails;
