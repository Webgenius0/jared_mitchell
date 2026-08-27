"use client";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CMSSponsorshipPageFooter } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";

interface BecomeSponsorProps {
  data: CMSSponsorshipPageFooter;
}

const BecomeSponsor = ({ data }: BecomeSponsorProps) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  return (
    <section className="py-10 md:py-14 lg:py-16 xl:py-20 bg-primary-blue text-center">
      <div className="container">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[140%] mb-4 md:mb-4 lg:mb-5">
          {data?.title ?? "Become a Sponsor Today"}
        </h2>

        <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-white leading-[150%] max-w-[1200px] mx-auto">
          {data?.sub_title ??
            "Partner with Our Social Image and let us broadcast your message across our community. Whether you want weekly promotion or full-scale visibility, our sponsorships give your brand a powerful place in culture, creativity, and community growth."}
        </p>

        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="bg-white border-2 border-[#D1D5DC] rounded-full flex items-center justify-center px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 md:py-3 lg:py-4 gap-1 text-primary-blue text-sm md:text-base lg:text-lg xl:text-xl font-medium mx-auto mt-4 md:mt-5 lg:mt-6"
        >
          Sign Up as a Sponsor
          <BsArrowRight className="size-6" />
        </button>
      </div>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default BecomeSponsor;
