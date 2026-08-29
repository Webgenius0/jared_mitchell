"use client";
import { useState } from "react";
import { CMSAboutJoin } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";
import Link from "next/link";

const JoinMovement = ({ data }: { data?: CMSAboutJoin }) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <section className="pt-3 md:pt-3 lg:pt-4 xl:pt-25 pb-6 lg:pb-8 container">
      <h2 className="section_title !mb-3.5 md:!mb-4 lg:!mb-5 xl:!mb-10">
        {data?.title || "Join the Movement. Be Seen. Be Heard. Be Supported."}
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-2.5 md:gap-3">
        <Link href="/auth/login">
          <button className="text-xs bg-primary-blue text-white border border-primary-blue rounded-full px-3.5 md:px-4 lg:px-6 xl:px-12 py-1.5 md:py-1.5 lg:py-2 xl:py-3 md:text-sm lg:text-base xl:text-xl font-medium">
            Join OSI
          </button>
        </Link>

        <button
          onClick={() => setIsSponsorModalOpen(true)}
          className="text-xs bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-3.5 md:px-4 lg:px-6 xl:px-12 py-1.5 md:py-1.5 lg:py-2 xl:py-3 md:text-sm lg:text-base xl:text-xl font-medium"
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
