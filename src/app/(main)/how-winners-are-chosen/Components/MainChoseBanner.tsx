import sponsorshipBg from "@/Assets/boss.png";
import { CMSBossBeginningsHero } from "@/Types/cms";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const MainChoseBanner = ({ data }: BossBeginningBannerProps) => {
  const bgImage = data?.image ?? sponsorshipBg.src;

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
          {"Brew & Bloom Café"}
        </h2>

        <p className="text-white font-medium text-sm sm:text-lg md:text-2xl lg:text-3xl pt-3 sm:pt-4 pb-2 sm:pb-3 text-center px-2 text-balance">
          {"Artisan coffee meets local florals"}
        </p>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-4xl mx-auto leading-[150%] pb-6 sm:pb-8 md:pb-10 px-2">
          {"Fountain Square, Indianapolis"}
        </p>
      </div>
    </section>
  );
};

export default MainChoseBanner;
