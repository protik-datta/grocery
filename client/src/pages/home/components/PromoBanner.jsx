import Container from "../../../shared/components/common/Container";
import { assets } from "../../../assets/assets";

const PromoBanner = () => {
  return (
    <Container>
      <div className="py-16">
        <div className="bg-[#032E15] rounded-2xl py-20 px-10 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* text content */}
          <div className="flex flex-col items-start gap-5 max-w-xl w-full">
            <h2 className="text-white dm text-[28px] sm:text-[36px] font-normal leading-10">
              Get fresh groceries in minutes
            </h2>

            <p className="text-white/70 text-base font-normal leading-6">
              Download the Instacart app for exclusive deals, real-time
              tracking, and the freshest selection delivered right to your door.
            </p>

            {/* buttons */}
            <div className="flex gap-7 pt-5">
              <button className="flex flex-col items-center justify-center px-6 py-3.25 rounded-f-xl bg-white rounded-2xl font-medium text-[14px] md:text-[16px] text-black cursor-pointer">
                App Store
              </button>
              <button className="flex flex-col items-center justify-center px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-[14px] md:text-[16px] text-white cursor-pointer">
                Google Play
              </button>
            </div>
          </div>

          {/* image */}
          <img
            src={assets.delivery_truck}
            alt=""
            className="w-full max-w-xs sm:max-w-sm md:w-120 md:h-46.25 object-contain"
          />
        </div>
      </div>
    </Container>
  );
};

export default PromoBanner;
