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
      className="h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          Business Launch Award{" "}
        </h2>

        <p className="text-white font-medium text-sm sm:text-lg md:text-2xl lg:text-3xl pt-3 sm:pt-4 pb-2 sm:pb-3 text-center px-2">
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
