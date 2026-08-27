import React from "react";
import aboutBg from "@/Assets/about.jpg";
import { CMSBossBeginningsHero } from "@/Types/cms";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const BossBegginingsConstestBanner = ({ data }: BossBeginningBannerProps) => {
  const bgImage = data?.image ?? aboutBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="h-[240px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          OSI Top Business Award{" "}
        </h2>

        <p className="text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-3xl pt-2 sm:pt-3 lg:pt-4 pb-1.5 sm:pb-2 lg:pb-3 text-center px-2">
          {"Multi-Round Playoff System • Scalable • Fair • Community-Driven"}
        </p>

        {/* <p className="text-white text-xl text-center max-w-4xl mx-auto leading-[150%] pb-10">
          {"Fountain Square, Indianapolis"}
        </p> */}
      </div>
    </section>
  );
};

export default BossBegginingsConstestBanner;
