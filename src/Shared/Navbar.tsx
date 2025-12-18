"use client";
import Container from "@/Components/Common/Container";
import { ProfileSvg, SearchSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [lang, setLang] = useState("en");
  const pathname = usePathname();

  return (
    <nav className="py-6 border-b border-[#0000001C] sticky top-0 z-50 bg-white">
      <Container>
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-14 items-center">
            <h3 className="text-[#2A2929] font-poppins text-xl font-semibold">
              OSI
            </h3>

            <ul className="flex gap-7 items-center">
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
          <div className="flex gap-16 items-center">
            <div className="flex items-center rounded-lg border border-[#E4E4E7]">
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-1.5 cursor-pointer rounded-lg ${
                  lang === "en"
                    ? "bg-secondary-blue text-white font-medium"
                    : "text-[#161C24]"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLang("es")}
                className={`px-4 py-1.5 cursor-pointer rounded-lg ${
                  lang === "es"
                    ? "bg-secondary-blue text-white font-medium"
                    : "text-[#161C24]"
                }`}
              >
                ES
              </button>
            </div>

            <div className="flex gap-5 items-center">
              <button>
                <SearchSvg />
              </button>
              <button>
                <ProfileSvg />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
