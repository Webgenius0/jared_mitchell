import sponsorshipBg from "@/Assets/boss.png";
import { CMSBossBeginningsHero } from "@/Types/cms";
import bgimage from "../../../../Assets/home/Gemini_Generated_Image_pgfbsvpgfbsvpgfb.jpg"

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const MainChoseBanner = ({ data }: BossBeginningBannerProps) => {
  // const bgImage = data?.image ?? sponsorshipBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgimage.src})
        `,
      }}
      className="h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px] bg-no-repeat bg-top-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center px-4 sm:px-6">
        <p className="text-white font-semibold text-sm pb-1 sm:pb-2 text-center px-2 text-balance">
          {"YOUR VOICE CAN HELP BUILD A LOCAL BUSINESS"}
        </p>
        <h2 className="text-[22px] sm:text-4xl capitalize md:text-5xl lg:text-6xl font-bold leading-[130%] text-white text-center mx-auto text-balance px-2">
          {"How the Community Chooses the Winner"}
        </h2>

        <p className="text-white font-medium text-sm sm:text-lg md:text-2xl lg:text-3xl pt-3 sm:pt-4 pb-2 sm:pb-3 text-center px-2 text-balance">
          {
            "The OSI Top Business Award is more than a competition. It gives local business owners a public stage to share their stories, demonstrate their value, earn community support, and build momentum that can continue long after the final vote."
          }
        </p>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-4xl mx-auto leading-[150%] pb-6 sm:pb-8 md:pb-10 px-2">
          {"Community Voting • Transparent Criteria • Local Impact"}
        </p>
      </div>
    </section>
  );
};

export default MainChoseBanner;
