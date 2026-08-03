"use client";
import { SearchSvg } from "@/Components/Svg/SvgContainer";
import useAuth from "@/Hooks/useAuth";
import { getUserDashboardRoute } from "@/lib/utils";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  // { label: "Sponsorships", path: "/sponsorships" },
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
  // { label: "Dashboard", path: "" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearToken } = useAuth();
  const { openCart, cartCount } = useCart();

  // Ref around the desktop nav links so we can detect outside clicks
  // and close whichever submenu is open.
  const navListRef = useRef<HTMLUListElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    clearToken();
    setUserDropdownOpen(false);
    router.push("/");
  };

  useEffect(() => {
    if (!openSubmenu && !userDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Using "click" (not "mousedown") so that Link navigation inside the
      // mobile sidebar's submenu fires before this handler can unmount it.
      if (
        navListRef.current &&
        !navListRef.current.contains(event.target as Node)
      ) {
        setOpenSubmenu(null);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openSubmenu, userDropdownOpen]);

  // Safety net: close the submenu and mobile sidebar whenever the route changes
  useEffect(() => {
    setOpenSubmenu(null);
    setOpen(false);
    setUserDropdownOpen(false);
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
                    {hasSubMenu ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSubmenu(prev =>
                            prev === link?.label ? null : link?.label,
                          )
                        }
                        className={`cursor-pointer ${
                          isActive
                            ? "text-secondary-blue font-medium"
                            : "text-[#2A2929]"
                        }`}
                      >
                        {link?.label}
                      </button>
                    ) : (
                      <Link
                        href={link?.path}
                        onClick={() => setOpenSubmenu(null)}
                        className={`${
                          isActive
                            ? "text-secondary-blue font-medium"
                            : "text-[#2A2929]"
                        }`}
                      >
                        {link?.label}
                      </Link>
                    )}

                    {/* Sub Menu — sibling of the trigger, not nested inside it */}
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
                <div ref={userDropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="size-11 rounded-full grid place-items-center overflow-hidden bg-blue-500/20 font-bold text-black capitalize text-lg cursor-pointer hover:bg-blue-500/30 transition-colors duration-200"
                  >
                    {user?.profile?.avatar ? (
                      <Image
                        src={user.profile.avatar}
                        alt={user?.profile?.name || "User"}
                        width={44}
                        height={44}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span>{user?.profile?.name?.at(0)}</span>
                    )}
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <Link
                        href={getUserDashboardRoute(user) || "/dashboard"}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-blue transition-colors duration-200"
                      >
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </Link>

                      <hr className="my-1 border-gray-100" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors duration-200"
                      >
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/register"
                  className="bg-primary-blue text-white py-1.5 px-4 rounded-lg cursor-pointer hover:bg-primary-blue/90 transition-colors duration-200"
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
                {hasSubMenu ? (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSubmenu(prev =>
                        prev === link?.label ? null : link?.label,
                      )
                    }
                    className={`flex items-center justify-between gap-2 w-full cursor-pointer ${
                      isActive
                        ? "text-secondary-blue font-medium"
                        : "text-[#2A2929]"
                    }`}
                  >
                    {link?.label}
                    <svg
                      className={`size-3.5 shrink-0 transition-transform duration-300 ${
                        isSubmenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={link?.path}
                    onClick={() => setOpen(false)}
                    className={
                      isActive
                        ? "text-secondary-blue font-medium"
                        : "text-[#2A2929]"
                    }
                  >
                    {link?.label}
                  </Link>
                )}

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
