import sponsorshipBg from "@/Assets/boss.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSBossBeginningsHero } from "@/Types/cms";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const WinnerDetailsBanner = ({ data }: BossBeginningBannerProps) => {
  const bgImage = data?.image ?? sponsorshipBg.src;

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
          {"Brew & Bloom Café"}
        </h2>

        <p className="text-white font-medium text-3xl pt-4 pb-3">
          {"Artisan coffee meets local florals"}
        </p>

        <p className="text-white text-xl text-center max-w-4xl mx-auto leading-[150%] pb-10">
          {"Fountain Square, Indianapolis"}
        </p>
      </div>
    </section>
  );
};

export default WinnerDetailsBanner;
