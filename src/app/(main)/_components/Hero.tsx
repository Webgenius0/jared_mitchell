"use client";
import Link from "next/link";
import { useState } from "react";
import { CMSHero } from "@/Types/cms";
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";

const Hero = ({ data }: { data?: CMSHero }) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  return (
    <section className="container text-center pt-4 md:pt-4 lg:pt-5 xl:pt-3 2xl:pt-4">
      <h1 className="text-primary-black text-2xl md:text-xl lg:text-2xl xl:text-[44px] font-bold xl:leading-[48px] tracking-[-1.28px] pb-1 xl:pb-0">
        {data?.title}
      </h1>

      <p className="text-secondary-black text-sm md:text-sm lg:text-base xl:text-xl lg:mt-1.5">
        {data?.sub_title}
      </p>

      <div className="flex items-center justify-center my-1.5 md:my-4 lg:my-5 overflow-hidden  mx-auto">
        <CustomVideoPlayer
          videoSrc={data?.video || "/home/hero-video.mp4"}
          className=""
        />
      </div>

      <p className="text-secondary-black text-sm md:text-sm lg:text-base">
        {data?.description}
      </p>

      <div className="space-x-1.5 md:space-x-2 lg:space-x-2.5 mt-1.5 md:mt-2">
        <Link href="/auth/login">
          <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-3 md:px-3 lg:px-5 xl:px-8 py-1 md:py-1 lg:py-1.5 xl:py-2 text-xs md:text-xs lg:text-sm xl:text-lg font-medium transition-all">
            Join OSI
          </button>
        </Link>

        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="bg-white text-primary-blue border border-[#D1D5DC] rounded-full px-3 md:px-3 lg:px-5 xl:px-8 py-1 md:py-1 lg:py-1.5 xl:py-2 text-xs md:text-xs lg:text-sm xl:text-lg font-medium transition-all"
        >
          Sponsor Us
        </button>
      </div>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default Hero;
