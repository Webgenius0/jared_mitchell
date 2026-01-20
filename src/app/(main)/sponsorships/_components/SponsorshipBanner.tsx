import sponsorshipBg from "@/Assets/sponsership.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";

const SponsorshipBanner = () => {
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${sponsorshipBg.src})
        `,
      }}
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          Partner With Us — Empower Creativity, Community, and Culture
        </h2>

        <p className="text-white text-xl text-center max-w-4xl mx-auto leading-[150%] py-7">
          At Our Social Image, every sponsorship fuels real opportunities for
          creators, small businesses, and local communities. Your support helps
          us host events, produce digital media, spotlight entrepreneurs, and
          empower the culture that drives our city forward.
        </p>

        <div className="flex justify-center items-center gap-4">
          <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-12 py-3 text-xl flex gap-2.5 items-center">
            Become a Sponsor
            <RightSvg />
          </button>

          <button className="bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-12 py-3 text-xl flex gap-2.5 items-center">
            View Sponsorship Tiers
            <RightSvg />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SponsorshipBanner;
