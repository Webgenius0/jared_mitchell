"use client";
import React, { useState } from "react";
import { CMSPartner } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";

interface SponsorsProps {
  data?: CMSPartner | any;
  title?: string;
  showButton?: boolean;
}

const Sponsors = ({ data, title, showButton = true }: SponsorsProps) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const logos =
    data?.metadata?.map((m: any, i: number) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) ?? [];

  if (logos.length === 0) return null;

  return (
    <section className="py-10 md:py-12 lg:py-14 xl:py-20">
      <h2 className="section_title text-center mb-3 md:mb-4 lg:mb-5 xl:mb-8">
        {title || data?.title || "Powered by our community partners"}
      </h2>

      <div className="flex flex-col gap-5 my-5">
        <SponsorSlider logos={logos} />

        {showButton && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setIsSponsorModalOpen(true)}>
              Become a Sponsor
            </Button>
          </div>
        )}
      </div>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default Sponsors;
