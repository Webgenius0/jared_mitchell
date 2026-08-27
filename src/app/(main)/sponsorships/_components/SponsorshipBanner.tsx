"use client";
import { useState } from "react";
import sponsorshipBg from "@/Assets/sponsership.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSSponsorshipPageHero } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";

interface SponsorshipBannerProps {
  data: CMSSponsorshipPageHero;
}

const SponsorshipBanner = ({ data }: SponsorshipBannerProps) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const bgImage = data?.bg ?? sponsorshipBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="h-[400px] md:h-[440px] lg:h-[480px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          {data?.title ??
            "Partner With Us — Empower Creativity, Community, and Culture"}
        </h2>

        <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl text-center max-w-4xl mx-auto leading-[150%] py-4 md:py-5 lg:py-7">
          {data?.sub_title ??
            "At Our Social Image, every sponsorship fuels real opportunities for creators, small businesses, and local communities. Your support helps us host events, produce digital media, spotlight entrepreneurs, and empower the culture that drives our city forward."}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsSponsorModalOpen(true)}
            className="bg-primary-blue text-white border border-primary-blue rounded-full px-6 md:px-8 lg:px-10 xl:px-12 py-2 md:py-2.5 lg:py-3 text-sm md:text-base lg:text-lg xl:text-xl flex gap-2 md:gap-2.5 items-center"
          >
            Become a Sponsor
            <RightSvg />
          </button>

          <button className="bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-6 md:px-8 lg:px-10 xl:px-12 py-2 md:py-2.5 lg:py-3 text-sm md:text-base lg:text-lg xl:text-xl flex gap-2 md:gap-2.5 items-center">
            View Sponsorship Tiers
            <RightSvg />
          </button>
        </div>
      </div>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default SponsorshipBanner;
