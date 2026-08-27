"use client";
import { useState } from "react";
import { CMSAboutJoin } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";
import Link from "next/link";

const JoinMovement = ({ data }: { data?: CMSAboutJoin }) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <section className="pt-4 md:pt-4 lg:pt-5 xl:pt-25 pb-8 lg:pb-10 container">
      <h2 className="section_title !mb-5 md:!mb-6 lg:!mb-7 xl:!mb-10">
        {data?.title || "Join the Movement. Be Seen. Be Heard. Be Supported."}
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
        <Link href="/auth/login">
          <button className="text-xs md:text-sm bg-primary-blue text-white border border-primary-blue rounded-full px-4 md:px-5 lg:px-8 xl:px-12 py-1.5 md:py-2 xl:py-3 md:text-base lg:text-lg xl:text-xl font-medium">
            Join OSI
          </button>
        </Link>

        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="text-xs md:text-sm bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-4 md:px-5 lg:px-8 xl:px-12 py-1.5 md:py-2 xl:py-3 md:text-base lg:text-lg xl:text-xl font-medium"
        >
          Become a Sponsor
        </button>
      </div>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default JoinMovement;
