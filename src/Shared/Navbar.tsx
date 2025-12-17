"use client";
import Container from "@/Components/Common/Container";
import { ProfileSvg, SearchSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", path: "home" },
  { label: "About", path: "about" },
  { label: "Service", path: "services" },
  { label: "Spotlight", path: "spotlight" },
  { label: "Events", path: "events" },
  { label: "Shop", path: "shop" },
  { label: "Sponsorships", path: "sponsorships" },
  { label: "Boss Beginnings", path: "boss-beginnings" },
  { label: "Dashboard", path: "dashboard" },
  { label: "Contact", path: "contact" },
];

const Navbar = () => {
  const [lang, setLang] = useState("en");

  return (
    <nav className="py-5 border-b">
      <Container>
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-10 items-center">
            <h3>OSI</h3>

            <ul className="flex gap-3 items-center">
              {navLinks?.map(link => (
                <Link key={link?.path} href={link?.path}>
                  {link?.label}
                </Link>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex gap-10 items-center">
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setLang("en")}
                className={`px-5 py-2 cursor-pointer rounded-lg ${
                  lang === "en" ? "bg-[#155DFC] text-white" : "text-[#161C24]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={`px-5 py-2 text-white cursor-pointer rounded-lg ${
                  lang === "es" ? "bg-[#155DFC] text-white" : "text-[#161C24]"
                }`}
              >
                ES
              </button>
            </div>

            <div className="flex gap-3 items-center">
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
