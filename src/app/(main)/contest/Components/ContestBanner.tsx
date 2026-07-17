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
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          {"Spotlights"}
        </h2>

        <p className="text-white font-medium text-3xl pt-4 pb-3">
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
