import sponsorshipBg from "@/Assets/boss.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSBossBeginningsHero } from "@/Types/cms";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const BossBeginningBanner = ({ data }: BossBeginningBannerProps) => {
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
          {data?.title ?? "Boss Beginnings"}
        </h2>

        <p className="text-white font-medium text-3xl pt-4 pb-3">
          {data?.sub_title ?? "A Business Shower"}
        </p>

        <p className="text-white text-xl text-center max-w-4xl mx-auto leading-[150%] pb-10">
          {data?.description ??
            "Celebrating and uplifting brand-new entrepreneurs in our community."}
        </p>

        <div className="flex justify-center items-center gap-4">
          <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-12 py-3 text-xl flex gap-2.5 items-center">
            Nominate a Business
            <RightSvg />
          </button>

          <button className="bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-12 py-3 text-xl flex gap-2.5 items-center">
            Become a Sponsor
            <RightSvg />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BossBeginningBanner;
