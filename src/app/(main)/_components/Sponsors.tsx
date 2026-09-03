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

  const hasSponsors = logos.length > 0;

  return (
    <section className="py-6 md:py-8 lg:py-10 xl:py-20">
      {hasSponsors ? (
        <>
          <h2 className="section_title text-center mb-2 md:mb-2.5 lg:mb-3 xl:mb-8">
            {title || data?.title || "Powered by our community partners"}
          </h2>

          <div className="flex flex-col gap-3 my-3 lg:my-4">
            <SponsorSlider logos={logos} />

            {showButton && (
              <div className="flex justify-center mt-4">
                <Button onClick={() => setIsSponsorModalOpen(true)}>
                  Become a Sponsor
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="section_title mb-3 md:mb-4">
            BECOME A FOUNDING COMMUNITY PARTNER
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-6">
            Help Our Social Image expand opportunities for independent artists,
            local businesses, entrepreneurs, and community-driven organizations.
          </p>

          <Button onClick={() => setIsSponsorModalOpen(true)}>
            VIEW PARTNERSHIP OPPORTUNITIES
          </Button>
        </div>
      )}

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default Sponsors;
