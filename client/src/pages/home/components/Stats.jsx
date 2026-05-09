import Container from "../../../components/common/Container";
import { assets } from "../../../assets/assets";

const data = [
  {
    id: 1,
    icon: assets.bus,
    heading: "Free Delivery",
    paragraph: "Orders over $20",
  },
  {
    id: 2,
    icon: assets.leaf_1,
    heading: "100% Organic",
    paragraph: "Certified products",
  },
  {
    id: 3,
    icon: assets.clock,
    heading: "Same Day",
    paragraph: "Express delivery",
  },
  {
    id: 4,
    icon: assets.protection,
    heading: "Secure Pay",
    paragraph: "Safe checkout",
  },
];

const Stats = () => {
  return (
    <Container>
      <div className="bg-white border border-gray-200/80 rounded-xl grid grid-cols-2 md:grid-cols-4 divide-y-[0.5px] md:divide-y-0 divide-x-[0.5px] divide-gray-200/80">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-4 py-4 md:py-7 md:px-6 md:justify-center"
          >
            {/* icon — same UI */}
            <div className="bg-[#FAF7F2] rounded-lg p-2 md:p-2.5 shrink-0">
              <img
                src={item.icon}
                alt=""
                className="w-5 h-5 md:w-auto md:h-auto"
              />
            </div>

            {/* headings */}
            <div className="flex flex-col">
              <h4 className="text-[#1B3022] text-[13px] md:text-[14px] font-semibold leading-5">
                {item.heading}
              </h4>
              <p className="text-[#6B7280] text-[11px] md:text-[12px] font-normal leading-4">
                {item.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Stats;
