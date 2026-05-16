import { MapPin, ArrowRight } from "lucide-react";

const AddressStep = ({ shippingAddress, handleInputChange, onNext }) => {
  const isFormValid =
    shippingAddress.address && shippingAddress.city && shippingAddress.zip;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <MapPin className="text-[#032E15]" size={22} />
        <h3 className="text-[#1B3022] text-lg font-bold">Delivery Address</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Address Label
          </label>
          <input
            type="text"
            name="label"
            value={shippingAddress.label}
            onChange={handleInputChange}
            placeholder="Home"
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022] text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            placeholder="Dhanmondi 32"
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022] text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            placeholder="Dhaka"
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022] text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
            placeholder="Dhaka Division"
            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022] text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            name="zip"
            value={shippingAddress.zip}
            onChange={handleInputChange}
            placeholder="1212"
            className="w-full md:w-1/2 p-3 rounded-xl border border-gray-200 outline-none focus:border-[#1B3022] text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="bg-[#1B3022] disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-xl flex items-center text-[13px] gap-2 cursor-pointer transition-all"
        >
          Continue to Payment <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AddressStep;
