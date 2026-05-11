import Container from "./Container";
import { assets, footerData } from "../../../assets/assets";
import { Link } from "react-router-dom";

const socialIcons = footerData.brand.socials;
const links = footerData.sections;
const contact = footerData.contact;
const bottom = footerData.bottom;

const Footer = () => {
  return (
    <footer className="bg-[#1B3022]">
      <Container>
        <div className="pt-12 pb-6 flex flex-col lg:flex-row items-start justify-start gap-30">
          {/* 1st column — Brand */}
          <div className="flex flex-col items-start max-w-xs">
            <img src={assets.footer_logo} alt="Logo" />

            <p className="text-white/70 font-outfit text-[14px] font-normal leading-5 self-stretch pt-4">
              Bringing fresh, organic groceries straight from local farms to
              your doorstep. Nourish your home with Earth's finest.
            </p>

            {/* Social links */}
            <div className="flex items-start gap-3 mt-6.5">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="rounded-lg bg-white/10 p-2.5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <img src={item.icon} alt="social icon" className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:flex lg:flex-row lg:gap-x-30 w-full lg:w-auto">
            {links.map((section, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h3 className="text-white font-semibold text-sm">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.to || link.href || "#"}
                        className="text-white/70 font-outfit text-[14px] font-normal leading-5 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h3 className="text-white font-semibold text-sm">Contact Us</h3>
              <ul className="flex flex-col gap-2">
                {contact.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <Icon className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                      <span className="text-white/70 font-outfit text-[14px] font-normal leading-5">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/50 font-outfit text-[13px]">
            {bottom.copyright}
          </p>
          <div className="flex items-center gap-5">
            {bottom.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-white/50 font-outfit text-[13px] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
