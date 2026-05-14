import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ShoppingBag,
  MapPin,
  ArrowUpRight,
  LogOut,
  X,
} from "lucide-react";
import { useLogout } from "../../../service/logout.api";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: ShoppingBag, label: "My Orders", path: "/orders" },
  { icon: MapPin, label: "Addresses", path: "/addresses" },
  { icon: ArrowUpRight, label: "Products", path: "/products" },
  { icon: ArrowUpRight, label: "Deals", path: "/deals" },
];

const dangerItems = [{ icon: LogOut, label: "Logout", path: "/logout" }];

export default function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const ref = useRef(null);

  // detect mobile
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // desktop outside-click close
  useEffect(() => {
    if (isMobile) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobile]);

  // lock body scroll on mobile drawer
  useEffect(() => {
    document.body.style.overflow = isMobile && open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, open]);

  const close = () => setOpen(false);

  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        <div className="w-7 h-7 bg-[#032E15] flex items-center justify-center text-white rounded-full text-[13px] font-medium">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <ChevronDown
          size={15}
          className={`text-gray-500 transition-transform duration-200 hidden md:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Mobile backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Desktop dropdown */}
      <div
        className={`absolute right-0 top-[calc(100%+10px)] w-52 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden origin-top-right transition-all duration-200 hidden md:block ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
      >
        <UserInfo user={user} />
        <ItemList items={menuItems} onClose={close} />
        <ItemList
          items={dangerItems}
          onClose={close}
          danger
          divider
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile slide-in drawer (from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        inert={!open ? true : undefined}
      >
        {/* drawer header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[15px] font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* drawer nav */}
        <div className="flex-1 overflow-y-auto py-2">
          <ItemList items={menuItems} onClose={close} mobile />
          <ItemList
            items={dangerItems}
            onClose={close}
            danger
            divider
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

/* Sub-components */

function UserInfo({ user }) {
  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <p className="text-sm font-medium text-gray-900">{user.name}</p>
      <p className="text-xs text-gray-400">{user.email}</p>
    </div>
  );
}

function ItemList({ items, onClose, mobile, danger, divider, onLogout }) {
  return (
    <div className={`${divider ? "border-t border-gray-100" : ""} py-1.5`}>
      {items.map(({ icon: Icon, label, path }) => {
        // 2. path extract koro
        const isLogout = label === "Logout";

        // Logout hole button, naile Link
        if (isLogout) {
          return (
            <button
              key={label}
              onClick={() => {
                onClose();
                onLogout();
              }}
              className={`flex items-center gap-3 px-4 w-full transition-colors ${mobile ? "py-3.5 text-[15px]" : "py-2.5 text-sm"} text-red-500 hover:bg-red-50`}
            >
              <Icon size={mobile ? 19 : 17} className="text-red-400" />
              {label}
            </button>
          );
        }

        return (
          <Link
            key={label}
            to={path} // 3. path ekhane set koro
            onClick={onClose}
            className={`flex items-center gap-3 px-4 w-full transition-colors ${mobile ? "py-3.5 text-[15px]" : "py-2.5 text-sm"} ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"}`}
          >
            <Icon
              size={mobile ? 19 : 17}
              className={danger ? "text-red-400" : "text-gray-400"}
            />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
