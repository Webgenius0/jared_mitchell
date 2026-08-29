"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import sponsorshipBg from "@/Assets/boss.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSBossBeginningsHero } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { isBusinessUser } from "@/lib/utils";
import { isUserSubscribed } from "@/Hooks/api/subscription_api";
import Image from "next/image";
import Link from "next/link";
import logo2 from "@/Assets/logo2.png";

const CREATE_BUSINESS_URL =
  "/dashboard/boss_beginning/business/create-business";

interface BossBeginningBannerProps {
  data: CMSBossBeginningsHero;
}

const BossBeginningBanner = ({ data }: BossBeginningBannerProps) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const { token, user } = useAuth();
  const router = useRouter();
  const bgImage = data?.image ?? sponsorshipBg.src;

  const isBusiness = isBusinessUser(user);
  // Logged-in non-business accounts are not allowed to nominate.
  const restricted = Boolean(token) && !isBusiness;

  const handleNominate = () => {
    if (!token) {
      toast.error("Please login to nominate a business");
      router.push(
        `/auth/login?redirect=${encodeURIComponent(CREATE_BUSINESS_URL)}`,
      );
      return;
    }
    if (!isBusiness) {
      toast.error("Only business accounts can nominate a business");
      return;
    }
    if (!isUserSubscribed(user)) {
      toast.error("An active subscription is required to nominate a business");
      router.push("/pricing");
      return;
    }
    router.push(CREATE_BUSINESS_URL);
  };

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="min-h-[320px] md:min-h-[360px] py-8 md:py-10 lg:py-12 xl:py-20 bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
                    <Link
              href="/"
              className="flex items-center cursor-pointer"
            >
              <Image
                src={logo2}
                alt="OSI logo"
                className="h-14 md:h-15 lg:h-20 xl:h-60 w-auto mb-2 md:mb-3"
                priority
              />
            </Link>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          {data?.title ?? "OSI Top Business Award"}
        </h2>

        <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl pt-2 md:pt-3 pb-1.5 md:pb-2 text-center px-2">
          {data?.sub_title ?? "A Business Shower"}
        </p>

        <p className="text-white text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl text-center max-w-4xl mx-auto leading-[150%] pb-5 sm:pb-6 lg:pb-8 px-2">
          {data?.description ??
            "Celebrating and uplifting brand-new entrepreneurs in our community."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleNominate}
            title={
              restricted
                ? "Only business accounts can nominate a business"
                : undefined
            }
            className={`w-full sm:w-auto bg-primary-blue text-white border border-primary-blue rounded-full px-4 sm:px-5 lg:px-7 xl:px-12 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base xl:text-xl flex gap-2 md:gap-2 items-center justify-center transition-opacity ${
              restricted
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }`}
          >
            Nominate a Business
            <RightSvg />
          </button>

          <button
            onClick={() => setIsSponsorModalOpen(true)}
            className="w-full sm:w-auto bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-4 sm:px-5 lg:px-7 xl:px-12 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base xl:text-xl flex gap-2 md:gap-2 items-center justify-center"
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
