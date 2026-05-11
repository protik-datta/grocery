import Container from "../../../shared/components/common/Container";
import { assets } from "../../../assets/assets";

const Newsletter = () => {
  return (
    <Container>
      <div className="py-10">
        <div className="flex flex-col items-center w-full px-5 py-10 sm:px-12 sm:py-14 md:px-28 md:py-16 lg:px-68 lg:py-18 rounded-3xl bg-white shadow-sm">
          {/* message icon */}
          <div className="p-4 rounded-xl bg-transparent shadow">
            <img
              src={assets.message}
              alt="message box"
              className="object-contain"
            />
          </div>

          <h2 className="text-[#1B3022] text-center text-[24px] sm:text-[30px] font-semibold leading-9 py-6">
            Subscribe to our Newsletter
          </h2>

          <p className="text-gray-500 text-center text-base font-normal leading-6">
            Get weekly updates on fresh produce, seasonal offers, and exclusive
            discounts right to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row items-center pt-8 gap-4 w-full">
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-full box-border pt-4 pb-[16.5px] pl-5 pr-5 sm:pr-28 rounded-xl border border-gray-200 bg-white text-[#1B3022]/50 text-sm font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-[#1B3022]/20 overflow-hidden text-ellipsis"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-[#032E15] shadow-sm px-8 py-3.5 text-[16px] font-semibold leading-6 text-white cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Newsletter;
