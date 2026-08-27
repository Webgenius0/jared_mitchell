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
      className="min-h-[400px] md:min-h-[440px] py-10 md:py-12 lg:py-16 xl:py-20 bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
                    <Link
              href="/"
              className="flex items-center cursor-pointer"
            >
              <Image
                src={logo2}
                alt="OSI logo"
                className="h-16 md:h-18 lg:h-24 xl:h-60 w-auto mb-3 md:mb-4"
                priority
              />
            </Link>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[130%] text-white text-center max-w-[968px] mx-auto">
          {data?.title ?? "OSI Top Business Award"}
        </h2>

        <p className="text-white font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-3 md:pt-4 pb-2 md:pb-3 text-center px-2">
          {data?.sub_title ?? "A Business Shower"}
        </p>

        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center max-w-4xl mx-auto leading-[150%] pb-6 sm:pb-8 lg:pb-10 px-2">
          {data?.description ??
            "Celebrating and uplifting brand-new entrepreneurs in our community."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleNominate}
            title={
              restricted
                ? "Only business accounts can nominate a business"
                : undefined
            }
            className={`w-full sm:w-auto bg-primary-blue text-white border border-primary-blue rounded-full px-5 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg xl:text-xl flex gap-2 md:gap-2.5 items-center justify-center transition-opacity ${
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
            className="w-full sm:w-auto bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-5 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg xl:text-xl flex gap-2 md:gap-2.5 items-center justify-center"
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
