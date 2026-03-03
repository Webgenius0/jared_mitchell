import {
  FacebookSvg,
  InstagramSvg,
  LinkedinSvg,
  MusicSvg,
} from "@/Components/Svg/SvgContainer";

const exploreData = [
  "Home",
  "About",
  "Services",
  "Spotlight",
  "Events",
  "Shop",
];

const helpData = [
  "Help Center",
  "FAQ",
  "Getting Started",
  "Contact Support",
  "admin@oursocialimage.net",
];

const businessData = [
  "Sponsorships",
  "Partner With OSI",
  "Boss Beginnings",
  "Event Submissions",
  "partners@oursocialimage.net",
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
                <li key={idx} className="text-[#99A1AF] xl:text-lg">
                  {item}
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
                <li key={idx} className="text-[#99A1AF] xl:text-lg">
                  {item}
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
                  <li key={idx} className="text-[#99A1AF] xl:text-lg">
                    {item}
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
              <p className="text-[#99A1AF] xl:text-lg">
                press@oursocialimage.net
              </p>
            </div>

            <div className="flex gap-3 xl:gap-5 items-center mt-5 md:mt-8">
              <button className="cursor-pointer">
                <InstagramSvg />
              </button>
              <button className="cursor-pointer">
                <FacebookSvg />
              </button>
              <button className="cursor-pointer">
                <MusicSvg />
              </button>
              <button className="cursor-pointer">
                <LinkedinSvg />
              </button>
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
