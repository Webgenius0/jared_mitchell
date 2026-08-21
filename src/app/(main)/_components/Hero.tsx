"use client";
import Link from "next/link";
import { useState } from "react";
import { CMSHero } from "@/Types/cms";
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";

const Hero = ({ data }: { data?: CMSHero }) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  return (
    <section className="container text-center pt-5 md:pt-6 xl:pt-3 2xl:pt-4">
      <h1 className="text-primary-black text-3xl md:text-4xl xl:text-[44px] font-bold xl:leading-[48px] tracking-[-1.28px] pb-2 xl:pb-0">
        {data?.title}
      </h1>

      <p className="text-secondary-black text-base md:text-lg xl:text-xl lg:mt-3">
        {data?.sub_title}
      </p>

      <div className="flex items-center justify-center my-3 md:my-10  overflow-hidden max-w-6xl mx-auto">
        <CustomVideoPlayer
          videoSrc={data?.video || "/home/hero-video.mp4"}
          className="max-h-[420px]"
        />
      </div>

      <p className="text-secondary-black md:text-base lg:text-lg">
        {data?.description}
      </p>

      <div className="space-x-2 md:space-x-3 mt-2 md:mt-3">
        <Link href="/auth/login">
          <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-4 md:px-6 xl:px-8 py-1 md:py-1.5 xl:py-2 text-sm lg:text-lg font-medium transition-all">
            Join OSI
          </button>
        </Link>

        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="bg-white text-primary-blue border border-[#D1D5DC] rounded-full px-4 md:px-6 xl:px-8 py-1 md:py-1.5 xl:py-2 text-sm lg:text-lg font-medium transition-all"
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
