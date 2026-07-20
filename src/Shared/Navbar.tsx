"use client";
import { SearchSvg } from "@/Components/Svg/SvgContainer";
import useAuth from "@/Hooks/useAuth";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Service", path: "/services" },
  {
    label: "Spotlight",
    path: "",
    subMenu: [
      { label: "Artist Spotlight", path: "/spotlight-artist" },
      { label: "Businesses Spotlight", path: "/spotlight-business" },
      { label: "Contest", path: "/contest" },
    ],
  },
  { label: "Events", path: "/events" },
  { label: "Shop", path: "/shop" },
  { label: "Pricing", path: "/pricing" },
  { label: "Sponsorships", path: "/sponsorships" },
  {
    label: "Boss Beginnings",
    path: "",
    subMenu: [
      { label: "Boss Beginnings", path: "/boss-beginnings" },
      {
        label: "How Winners Are Chosen",
        path: "/how-winners-are-chosen",
      },
      {
        label: "Boss Beginnings Contest",
        path: "/boss-beginnings-contest",
      },
    ],
  },
  { label: "Dashboard", path: "" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [lang, setLang] = useState<string>("en");
  const pathname = usePathname();
  const { user } = useAuth();
  const { openCart, cartCount } = useCart();

  // Ref around the desktop nav links so we can detect outside clicks
  // and close whichever submenu is open.
  const navListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!openSubmenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navListRef.current &&
        !navListRef.current.contains(event.target as Node)
      ) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSubmenu]);

  // Safety net: close the submenu and mobile sidebar whenever the route changes
  useEffect(() => {
    setOpenSubmenu(null);
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="py-3 md:py-4 xl:py-5 border-b border-[#0000001C] sticky top-0 z-50 bg-white">
      <div className="container">
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-10 2xl:gap-14 items-center">
            <Link
              href="/"
              className="text-[#2A2929] font-poppins text-xl font-semibold cursor-pointer"
            >
              OSI
            </Link>

            <ul ref={navListRef} className="hidden xl:flex gap-7 items-center">
              {navLinks?.map(link => {
                const isActive = pathname === link?.path;
                const hasSubMenu = Boolean(link?.subMenu?.length);
                const isSubmenuOpen = openSubmenu === link?.label;

                return (
                  <li key={link?.label} className="relative">
                    <Link
                      href={link?.path}
                      onClick={e => {
                        if (hasSubMenu) {
                          // Submenu links don't navigate anywhere themselves,
                          // they just toggle their dropdown.
                          e.preventDefault();
                          setOpenSubmenu(prev =>
                            prev === link?.label ? null : link?.label,
                          );
                        } else {
                          setOpenSubmenu(null);
                        }
                      }}
                      className={`relative ${
                        isActive
                          ? "text-secondary-blue font-medium"
                          : "text-[#2A2929]"
                      }`}
                    >
                      {link?.label}

                      {/* Sub Menu */}
                      {hasSubMenu && isSubmenuOpen && (
                        <div className="absolute top-full mt-3 left-0 bg-white z-50 shadow rounded-xl px-4 w-55">
                          {link?.subMenu?.map(subItem => {
                            const isActiveSubmenu = pathname === subItem?.path;

                            return (
                              <Link
                                key={subItem?.path}
                                href={subItem?.path}
                                onClick={() => setOpenSubmenu(null)}
                                className={`block py-3 border-b border-gray-300 last:border-b-0 duration-300 transition-all hover:text-primary-blue ${
                                  isActiveSubmenu
                                    ? "text-secondary-blue"
                                    : "text-[#2A2929]"
                                }`}
                              >
                                {subItem?.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right */}
          <div className="flex gap-7 md:gap-10 2xl:gap-16 items-center">
            <div className="hidden md:flex items-center rounded-lg border border-[#E4E4E7]">
              <button
                onClick={() => setLang("en")}
                className={`px-3 md:px-3.5 lg:px-4 py-1 lg:py-1.5 cursor-pointer rounded-lg text-sm md:text-base ${
                  lang === "en"
                    ? "bg-secondary-blue text-white font-medium"
                    : "text-[#161C24]"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLang("es")}
                className={`px-3 md:px-3.5 lg:px-4 py-1 lg:py-1.5 cursor-pointer rounded-lg text-sm md:text-base ${
                  lang === "es"
                    ? "bg-secondary-blue text-white font-medium"
                    : "text-[#161C24]"
                }`}
              >
                ES
              </button>
            </div>

            <div className="flex gap-3 md:gap-4 xl:gap-5 items-center">
              <button>
                <SearchSvg />
              </button>

              {/* Cart Icon */}
              <button
                onClick={openCart}
                className="relative p-2 text-gray-700 hover:text-black transition"
              >
                <FiShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1977DD] text-white text-[10px] font-bold rounded-full size-4.5 flex items-center justify-center leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <p className="size-11 rounded-full grid place-items-center bg-blue-500/20 font-bold text-black capitalize text-lg">
                  {user?.profile?.name?.at(0)}
                </p>
              ) : (
                <Link
                  href="/auth/register"
                  className="bg-primary-blue text-white py-1.5 px-4 rounded-lg cursor-pointer"
                >
                  Sign Up
                </Link>
              )}

              <button
                onClick={() => setOpen(!isOpen)}
                className="bg-primary-blue text-white size-8 lg:size-9 rounded grid xl:hidden place-items-center cursor-pointer"
              >
                <FaBars className="text-lg lg:text-[22px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-primary-black/30 backdrop-blur-sm transition-opacity duration-300 xl:hidden z-[999] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-500 transition-transform fixed top-0 z-[999] left-0 bg-white p-5 lg:p-7 shadow-lg overflow-y-auto border-r border-gray-200 max-h-screen min-h-screen w-[250px] lg:w-[270px] xl:hidden`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[#2A2929] font-poppins text-xl font-semibold cursor-pointer"
        >
          OSI
        </Link>

        <ul className="flex flex-col gap-5 mt-7">
          {navLinks?.map(link => {
            const isActive = pathname === link?.path;
            const hasSubMenu = Boolean(link?.subMenu?.length);
            const isSubmenuOpen = openSubmenu === link?.label;

            return (
              <li key={link?.label}>
                <Link
                  href={link?.path}
                  onClick={e => {
                    if (hasSubMenu) {
                      e.preventDefault();
                      setOpenSubmenu(prev =>
                        prev === link?.label ? null : link?.label,
                      );
                    } else {
                      setOpen(false);
                    }
                  }}
                  className={`${
                    isActive
                      ? "text-secondary-blue font-medium"
                      : "text-[#2A2929]"
                  }`}
                >
                  {link?.label}
                </Link>

                {hasSubMenu && isSubmenuOpen && (
                  <ul className="flex flex-col gap-3 mt-3 ml-3 border-l border-gray-200 pl-3">
                    {link?.subMenu?.map(subItem => {
                      const isActiveSubmenu = pathname === subItem?.path;

                      return (
                        <li key={subItem?.path}>
                          <Link
                            href={subItem?.path}
                            onClick={() => {
                              setOpenSubmenu(null);
                              setOpen(false);
                            }}
                            className={`text-sm ${
                              isActiveSubmenu
                                ? "text-secondary-blue"
                                : "text-[#2A2929]"
                            }`}
                          >
                            {subItem?.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
