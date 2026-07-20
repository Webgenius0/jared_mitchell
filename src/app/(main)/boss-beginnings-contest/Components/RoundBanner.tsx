import React from "react";
import aboutBg from "@/Assets/roundbg.png";
import { CMSBossBeginningsHero } from "@/Types/cms";

interface RoundBannerProps {
  data?: CMSBossBeginningsHero;
}

const RoundBanner = ({ data }: RoundBannerProps) => {
  const bgImage = data?.image ?? aboutBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center px-4 sm:px-6">
        <h2 className="text-[22px] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto text-balance px-2">
          {data?.title ?? "Brew & Bloom Café"}
        </h2>

        <p className="text-white font-medium text-xs sm:text-lg md:text-2xl lg:text-3xl pt-3 sm:pt-4 pb-2 sm:pb-3 text-center px-2 text-balance">
          {data?.sub_title ?? "Artisan coffee meets local florals"}
        </p>
      </div>
    </section>
  );
};

export default RoundBanner;
