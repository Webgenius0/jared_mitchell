"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import sponsorshipBg from "@/Assets/boss.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSBossBeginningsHero } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";

const CREATE_BUSINESS_URL = "/dashboard/boss_beginning/business/create-business";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const BossBeginningBanner = ({ data }: BossBeginningBannerProps) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const { token } = useAuth();
  const router = useRouter();
  const bgImage = data?.image ?? sponsorshipBg.src;

  const handleNominate = () => {
    if (token) {
      router.push(CREATE_BUSINESS_URL);
    } else {
      toast.error("Please login to nominate a business");
      router.push(
        `/auth/login?redirect=${encodeURIComponent(CREATE_BUSINESS_URL)}`,
      );
    }
  };

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="min-h-[500px] py-16 md:py-20 lg:py-24 bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          {data?.title ?? "Boss Beginnings"}
        </h2>

        <p className="text-white font-medium text-xl sm:text-2xl lg:text-3xl pt-4 pb-3 text-center px-2">
          {data?.sub_title ?? "A Business Shower"}
        </p>

        <p className="text-white text-sm sm:text-base lg:text-xl text-center max-w-4xl mx-auto leading-[150%] pb-8 sm:pb-10 px-2">
          {data?.description ??
            "Celebrating and uplifting brand-new entrepreneurs in our community."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleNominate}
            className="w-full sm:w-auto bg-primary-blue text-white border border-primary-blue rounded-full px-6 sm:px-8 lg:px-12 py-3 text-base sm:text-lg lg:text-xl flex gap-2.5 items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            Nominate a Business
            <RightSvg />
          </button>

          <button
            onClick={() => setIsSponsorModalOpen(true)}
            className="w-full sm:w-auto bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-6 sm:px-8 lg:px-12 py-3 text-base sm:text-lg lg:text-xl flex gap-2.5 items-center justify-center"
          >
            Become a Sponsor
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

export default BossBeginningBanner;
