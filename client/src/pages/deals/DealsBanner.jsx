import { assets } from "../../assets/assets";

const DealsBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center self-stretch py-8 sm:py-10 px-6 sm:px-12 lg:px-20 bg-linear-to-r from-[#F97316] to-[#EA580C] text-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src={assets.flash}
          alt=""
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />

        <h3 className="text-white text-xl sm:text-2xl lg:text-[30px] font-semibold leading-tight sm:leading-9">
          Flash Deals
        </h3>

        <img
          src={assets.flash}
          alt=""
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
      </div>

      <p className="text-white/80 text-sm sm:text-base font-normal leading-5 sm:leading-6 mt-3 max-w-md sm:max-w-xl">
        Limited-time offers on your favorite organic products. Grab{" "}
        <br className="hidden sm:block" />
        them before they're gone!
      </p>
    </div>
  );
};

export default DealsBanner;
