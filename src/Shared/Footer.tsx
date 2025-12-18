import Container from "@/Components/Common/Container";
import {
  FacebookSvg,
  InstagramSvg,
  LinkedinSvg,
  MusicSvg,
  TwitterSvg,
  YoutubeSvg,
} from "@/Components/Svg/SvgContainer";

const exploreData = [
  "Home",
  "About",
  "Services",
  "Spotlight Hub",
  "Events",
  "Shop",
  "Sponsorships",
  "Boss Beginnings",
  "Contact",
  "Member Dashboard",
];

const helpData = [
  "Frequently Asked Questions (FAQ)",
  "Getting Started Guide",
  "OSI Membership Handbook",
  "Event Submission Guidelines",
  "Spotlight Submission Rules",
  "Creator & Business Resource Center",
  "Report an Issue",
  "Contact Support: admin@oursocialimage.net",
  "Phone: 1-800-OSI-HELP",
];

const legalData = [
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Policy",
  "Refund & Return Policy",
  "Data Processing & GDPR Compliance",
  "Accessibility Statement (ADA Compliance)",
  "Community & User Conduct Policy",
  "Sponsorship Agreement Terms",
  "Content Ownership & Licensing",
  "AI Disclosure & Transparency Policy",
];

const businessData = [
  "Our Social Image LLC",
  "Indianapolis, IN",
  "Hours of Operation:Mon–Fri, 9am–6pm EST",
  "Media & Press Inquiries:press@oursocialimage.net",
  "Partnership Inquiries:partners@oursocialimage.net",
  "Shop",
  "Sponsorships",
  "Boss Beginnings",
  "Contact",
  "Member Dashboard",
];

const Footer = () => {
  return (
    <footer className="bg-[#18181B] text-white pt-14 pb-10">
      <Container>
        <div className="grid grid-cols-5 gap-10">
          {/* First Column */}
          <div className="space-y-5">
            <div>
              <h3 className="text-white font-medium text-2xl mb-3">
                Our Social Image (OSI)
              </h3>
              <p className="text-[#99A1AF] text-lg">
                Empowering creators, small businesses, and community leaders
                through digital storytelling, technology, and culture-driven
                visibility.
              </p>
            </div>

            <hr className="text-[#99A1AF]" />

            <div>
              <h3 className="text-white font-medium text-2xl mb-3">
                Our Mission
              </h3>
              <p className="text-[#99A1AF] text-lg">
                To elevate the voices of entrepreneurs, artists, and community
                innovators by providing tools, exposure, and automated digital
                support that turn vision into opportunity.
              </p>
            </div>

            <div className="flex gap-3 items-center mt-12">
              <InstagramSvg />
              <YoutubeSvg />
              <FacebookSvg />
              <TwitterSvg />
              <MusicSvg />
              <LinkedinSvg />
            </div>
          </div>

          {/* Second Column */}
          <div>
            <h3 className="text-white font-medium text-2xl mb-3">
              Explore OSI
            </h3>
            <ul className="space-y-3">
              {exploreData?.map((item, idx) => (
                <li key={idx} className="text-[#99A1AF] text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h3 className="text-white font-medium text-2xl mb-3">
              Help & Support
            </h3>
            <ul className="space-y-3">
              {helpData?.map((item, idx) => (
                <li key={idx} className="text-[#99A1AF] text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Forth Column */}
          <div>
            <h3 className="text-white font-medium text-2xl mb-3">Legal</h3>
            <ul className="space-y-3">
              {legalData?.map((item, idx) => (
                <li key={idx} className="text-[#99A1AF] text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Fifth Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-medium text-2xl mb-3">
                Business Details
              </h3>
              <ul className="space-y-3">
                {businessData?.map((item, idx) => (
                  <li key={idx} className="text-[#99A1AF] text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium text-2xl mb-3">
                Newsletter Signup
              </h3>

              <p className="text-[#99A1AF] text-lg">
                Stay connected. Receive stories, events, spotlights, and growth
                tools directly to your inbox.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter your email"
                className="block w-full rounded-full bg-[#1D293D] px-4 py-2 outline-none border border-[#314158] placeholder:text-center"
              />
              <button className="bg-secondary-blue text-white px-4 py-2 rounded-full block w-full cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="text-[#99A1AF] mt-12" />

        <p className="text-center pt-7 text-gray-300">
          &copy; 2025 Our Social Image LLC. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
