"use client";
import React, { useState } from "react";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import { CMSPartner } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";
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
    })) || sponsorsData;

  return (
    <section className="py-20">
      <h2 className="section_title text-center mb-5 md:mb-8">
        {title || data?.title || "Powered by our community partners"}
      </h2>

      <div className="flex flex-col gap-5 my-5">
        <SponsorSlider logos={logos} />
        {/* <SponsorSlider logos={logos} reverse={true} /> */}
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
