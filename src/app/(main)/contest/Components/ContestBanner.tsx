import aboutBg from "@/Assets/about.jpg";
import { CMSBossBeginningsHero } from "@/Types/cms";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const ContestBanner = ({ data }: BossBeginningBannerProps) => {
  const bgImage = data?.image ?? aboutBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          {"Spotlights"}
        </h2>

        <p className="text-white font-medium text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-3xl pt-1.5 sm:pt-2 lg:pt-3 pb-1 sm:pb-1.5 text-center px-2">
          {"Multi-Round Playoff System • Scalable • Fair • Community-Driven"}
        </p>

        {/* <p className="text-white text-xl text-center max-w-4xl mx-auto leading-[150%] pb-10">
          {"Fountain Square, Indianapolis"}
        </p> */}
      </div>
    </section>
  );
};

export default ContestBanner;
