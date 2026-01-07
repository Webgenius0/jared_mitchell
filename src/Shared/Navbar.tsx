"use client";
import Container from "@/Components/Common/Container";
import { ProfileSvg, SearchSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Service", path: "/services" },
  { label: "Spotlight", path: "/spotlight" },
  { label: "Events", path: "/events" },
  { label: "Shop", path: "/shop" },
  { label: "Sponsorships", path: "/sponsorships" },
  { label: "Boss Beginnings", path: "/boss-beginnings" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");
  const pathname = usePathname();

  return (
    <nav className="py-3 md:py-4 xl:py-6 border-b border-[#0000001C] sticky top-0 z-50 bg-white">
      <Container>
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-10 2xl:gap-14 items-center">
            <Link
              href="/"
              className="text-[#2A2929] font-poppins text-xl font-semibold cursor-pointer"
            >
              OSI
            </Link>

            <ul className="hidden xl:flex gap-7 items-center">
              {navLinks?.map(link => {
                const isActive = pathname === link?.path;

                return (
                  <Link
                    key={link?.path}
                    href={link?.path}
                    className={`${
                      isActive
                        ? "text-secondary-blue font-medium"
                        : "text-[#2A2929]"
                    }`}
                  >
                    {link?.label}
                  </Link>
                );
              })}
            </ul>
          </div>

          {/* Right */}
          <div className="flex gap-7 md:gap-10 2xl:gap-16 items-center">
            <div className="flex items-center rounded-lg border border-[#E4E4E7]">
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
              <Link href={"/auth/choose-role"}>
                <ProfileSvg />
              </Link>

              <button
                onClick={() => setOpen(!isOpen)}
                className="bg-primary-blue text-white size-8 lg:size-9 rounded grid xl:hidden place-items-center cursor-pointer"
              >
                <FaBars className="text-lg lg:text-[22px]" />
              </button>
            </div>
          </div>
        </div>
      </Container>

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
          className="text-[#2A2929] font-poppins text-xl font-semibold cursor-pointer"
        >
          OSI
        </Link>

        <ul className="flex flex-col gap-5 mt-7">
          {navLinks?.map(link => {
            const isActive = pathname === link?.path;

            return (
              <Link
                key={link?.path}
                href={link?.path}
                onClick={() => setOpen(false)}
                className={`${
                  isActive
                    ? "text-secondary-blue font-medium"
                    : "text-[#2A2929]"
                }`}
              >
                {link?.label}
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
