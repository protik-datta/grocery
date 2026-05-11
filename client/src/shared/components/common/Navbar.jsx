import { useState } from "react";
import Container from "./Container";
import { assets } from "../../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import UserDropdown from "./UserDropdown";
import useCartStore from "../../../store/cartStore";

const navItems = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Products", path: "/products" },
  { id: 3, label: "Deals", path: "/deals" },
];

const Navbar = () => {
  const [user] = useState("Protik");
  const [userEmail] = useState("protik@gmail.com");
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const { openCart, items } = useCartStore();

  const navigate = useNavigate();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `text-[14px] font-normal leading-5 transition-colors duration-200
   ${isActive ? "text-[#F97316]" : "text-[#52525C] hover:text-black"}`;

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = search.trim();
    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setMobileSearch(false);
  };

  return (
    <>
      {/* Main nav bar */}
      <nav className="bg-white border-b border-[#E5E7EB] py-4 sticky top-0 z-50">
        <Container className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="w-24 md:w-30 shrink-0">
            <Link to="/">
              <img
                src={assets.logo}
                alt="logo"
                className="w-full h-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((i) => (
              <NavLink key={i.id} to={i.path} className={navLinkClass}>
                {i.label}
              </NavLink>
            ))}

            {/* Desktop search */}
            <form
              className="hidden md:flex flex-1 max-w-xs items-center bg-[#FFF7ED] border border-gray-100 rounded-full pl-4 pr-30 py-2 shadow-[0_0_0_1px_rgba(249,115,22,0.15)] focus-within:border-orange-200 transition"
              onSubmit={handleSearch}
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                placeholder="Search for groceries..."
                onChange={(e) => setSearch(e.target.value)}
                className="ml-2 w-full bg-transparent outline-none text-sm"
              />
            </form>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile search toggle */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-800 transition"
              onClick={() => setMobileSearch((o) => !o)}
              aria-label="Toggle search"
            >
              {mobileSearch ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Cart */}
            <div className="relative cursor-pointer" onClick={openCart}>
              <img src={assets.cart} alt="cart" className="w-5 h-5" />
              {!totalItems ? (
                ""
              ) : (
                <span className="bg-[#F97316] rounded-full flex items-center justify-center text-white text-[10px] w-4 h-4 absolute -top-3 -right-3">
                  {totalItems}
                </span>
              )}
            </div>

            {/* User / Login */}
            {user ? (
              <UserDropdown user={{ name: user, email: userEmail }} />
            ) : (
              <Link to="/login">
                <button className="bg-[#1B3022] px-4 py-2 text-white rounded-3xl cursor-pointer flex items-center gap-x-1 text-sm">
                  <User size={18} /> Sign Up
                </button>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMobileNav((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileNav ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>

        {/* Mobile search — slides down */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileSearch ? "max-h-16 py-2" : "max-h-0"}`}
        >
          <Container>
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[#FFF7ED] border border-gray-100 rounded-full px-4 py-2"
            >
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={search}
                onChange={(e) => e.target.value}
                className="ml-2 w-full bg-transparent outline-none text-sm"
                autoFocus={mobileSearch}
              />
            </form>
          </Container>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileNav(false)}
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${mobileNav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 border-b border-gray-100">
          <img src={assets.logo} alt="logo" className="w-24 mb-1" />
        </div>
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
          {navItems.map((i) => (
            <NavLink
              key={i.id}
              to={i.path}
              onClick={() => setMobileNav(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-lg text-[15px] transition ${isActive ? "text-[#F97316] bg-orange-50" : "text-gray-700 hover:bg-gray-50"}`
              }
            >
              {i.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
