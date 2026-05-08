import React from "react";
import { assets } from "../../../assets/assets";
import Container from "../../../components/common/Container";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Container>
      <div className="py-8 md:py-13">
        <div className="relative rounded-2xl overflow-hidden h-132.5 sm:h-115 md:h-100 lg:h-140">
          {/* image */}
          <img
            src={assets.hero_bg}
            alt=""
            className="w-full h-full object-cover object-center"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(27,48,34,0.95)_0%,rgba(27,48,34,0.80)_40%,rgba(27,48,34,0.42)_100%)] md:bg-[linear-gradient(90deg,#1B3022_0%,rgba(27,48,34,0.70)_45%,rgba(27,48,34,0)_100%)]" />

          {/* content */}
          <div className="absolute inset-0 flex flex-col justify-center px-7 md:px-14 max-w-full md:max-w-[58%]">
            {/* badge */}
            <span className="flex items-center gap-1.5 w-fit px-3.5 py-1.5 rounded-full mb-5 bg-[rgba(255,184,106,0.18)] border border-[rgba(255,184,106,0.28)]">
              <img
                src={assets.leaf}
                alt=""
                className="w-4 h-4 object-contain"
              />
              <p className="text-[#FFB86A] text-xs font-medium tracking-wide whitespace-nowrap">
                Farm-Fresh & Organic
              </p>
            </span>

            {/* heading */}
            <h1 className="text-white dm font-bold leading-[1.15] mb-5 text-[38px] sm:text-[44px] md:text-[48px] lg:text-[60px]">
              Nourish your home <br />
              with <span className="text-[#FFB86A]">Earth's finest</span>
            </h1>

            {/* paragraph */}
            <p className="text-white/70 font-outfit text-[15px] md:text-base font-normal leading-relaxed mb-8 max-w-[320px] md:max-w-none">
              Fresh, organic groceries delivered from local farms to your
              doorstep. Quality you can taste, convenience you deserve.
            </p>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Link to="/products">
                <button className="flex items-center justify-center gap-2 w-43.75 sm:w-auto px-7 py-3.5 bg-[#FF8904] rounded-3xl text-white font-semibold text-[15px] cursor-pointer">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link to="/products">
                <button className="flex items-center justify-center w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 border border-white/30 bg-white/10 rounded-full text-white font-semibold text-[15px] transition hover:bg-white/20 cursor-pointer">
                  Browse Categories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
