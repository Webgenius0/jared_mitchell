import Link from "next/link";
import {
  FacebookSvg,
  InstagramSvg,
  LinkedinSvg,
  MusicSvg,
} from "@/Components/Svg/SvgContainer";

const exploreData = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Spotlight", path: "/spotlight-artist" },
  { label: "Events", path: "/events" },
  { label: "Shop", path: "/shop" },
];

const helpData = [
  { label: "Help Center", path: "/contact" },
  { label: "FAQ", path: "/contact" },
  { label: "Getting Started", path: "/services" },
  { label: "Contact Support", path: "/contact" },
  {
    label: "admin@oursocialimage.net",
    path: "mailto:admin@oursocialimage.net",
  },
];

const businessData = [
  { label: "Sponsorships", path: "/sponsorships" },
  { label: "Partner With OSI", path: "/sponsorships" },
  { label: "OSI Top Business Launch Award", path: "/boss-beginnings" },
  { label: "Event Submissions", path: "/events" },
  {
    label: "partners@oursocialimage.net",
    path: "mailto:partners@oursocialimage.net",
  },
];

const socialData = [
  {
    label: "Instagram",
    path: "https://www.instagram.com/oursocialimage",
    Icon: InstagramSvg,
  },
  {
    label: "Facebook",
    path: "https://www.facebook.com/oursocialimage",
    Icon: FacebookSvg,
  },
  {
    label: "TikTok",
    path: "https://www.tiktok.com/@oursocialimage",
    Icon: MusicSvg,
  },
  {
    label: "LinkedIn",
    path: "https://www.linkedin.com/company/oursocialimage",
    Icon: LinkedinSvg,
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#18181B] text-white pt-7 md:pt-10 lg:pt-14 pb-5 md:pb-7 xl:pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 xl:gap-12">
          {/* First Column */}
          <div className="xl:col-span-2 space-y-3 md:space-y-5 ">
            <h3 className="text-white font-medium text-lg xl:text-xl mb-3">
              Image Features & Visibility
            </h3>

            <p className="text-[#99A1AF] xl:text-lg max-w-md">
              OSI is a digital platform supporting creators, entrepreneurs, and
              community-driven businesses through curated visibility,
              storytelling, and exposure.
            </p>

            <p className="text-[#99A1AF] xl:text-lg max-w-md">
              Features are not guaranteed and selection varies. Our Social Image
              LLC is not a talent agency, financial advisor, or legal
              representative. Platform services are promotional in nature.
            </p>
          </div>

          {/* Second Column */}
          <div className="">
            <h3 className="text-white font-medium text-lg xl:text-xl mb-3">
              Explore OSI
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {exploreData?.map((item, idx) => (
                <li key={idx} className="xl:text-lg">
                  <Link
                    href={item.path}
                    className="text-[#99A1AF] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Third Column */}
          <div className="">
            <h3 className="text-white font-medium text-lg xl:text-xl mb-3">
              Help & Support
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {helpData?.map((item, idx) => (
                <li key={idx} className="xl:text-lg">
                  <Link
                    href={item.path}
                    className="text-[#99A1AF] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Forth Column */}
          <div className="space-y-7">
            <div>
              <h3 className="text-white font-medium text-lg xl:text-xl mb-3">
                For Creators & Businesses
              </h3>
              <ul className="space-y-2">
                {businessData?.map((item, idx) => (
                  <li key={idx} className="xl:text-lg">
                    <Link
                      href={item.path}
                      className="text-[#99A1AF] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium text-lg xl:text-xl  mb-1">
                Our Social Image LLC
              </h3>
              <p className="text-[#99A1AF] xl:text-lg">Indianapolis, IN</p>
            </div>

            <div>
              <h3 className="text-white font-medium text-lg xl:text-xl mb-1">
                Media & Press
              </h3>
              <a
                href="mailto:press@oursocialimage.net"
                className="text-[#99A1AF] xl:text-lg hover:text-white transition-colors duration-200 cursor-pointer"
              >
                press@oursocialimage.net
              </a>
            </div>

            <div className="flex gap-3 xl:gap-5 items-center mt-5 md:mt-8">
              {socialData?.map(({ label, path, Icon }) => (
                <a
                  key={label}
                  href={path}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="text-[#99A1AF] mt-5 md:mt-12" />

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-center justify-between pt-4 md:pt-6">
          <p className="flex flex-wrap justify-center gap-2 md:gap-3 items-center text-[#99A1AF] text-sm lg:text-base">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Cookie Policy</span>
            <span>Accessibility</span>
          </p>

          <p className="text-gray-300 text-sm lg:text-base">
            &copy; 2025 Our Social Image LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
