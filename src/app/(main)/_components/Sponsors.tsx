"use client";

import React from "react";
import Link from "next/link";
import { CMSPartner } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";
import SponsorSlider from "@/Components/Common/SponsorSlider";

interface SponsorsProps {
  data?: CMSPartner | any;
  title?: string;
  showButton?: boolean;
}

const Sponsors = ({ data, title, showButton = true }: SponsorsProps) => {
  const rawSponsors =
    data?.metadata ?? data?.items ?? data?.sponsors ?? data?.partners ?? [];

  const logos =
    (Array.isArray(rawSponsors) ? rawSponsors : []).map((m: any, i: number) => ({
      id: i + 1,
      image: m.image || m.logo || m.url || m.src,
      link: m.link || m.href || m.url || "#",
      alt: m.title || m.name || "Community partner logo",
      title: m.title || m.name || "Community partner",
    })) ?? [];

  const hasSponsors = logos.length > 0;
  const sectionTitle = title || data?.title || "Our Community Partners";

  return (
    <section className="py-6 md:py-8 lg:py-10 xl:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="section_title mb-3 md:mb-4">{sectionTitle}</h2>

        {hasSponsors ? (
          <>
            <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
              Our Social Image is proud to work with businesses and
              organizations that support artists, entrepreneurs, and stronger
              communities.
            </p>
            <SponsorSlider logos={logos} />

            {showButton && (
              <div className="mt-6 flex justify-center">
                <Button asChild size="default">
                  <Link href="/sponsorships">Become a Community Partner</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-base leading-relaxed text-black/70 md:text-lg">
              Founding Partners Coming Soon. Be among the first organizations to
              help local talent and growing businesses gain meaningful
              visibility.
            </p>

            <Button asChild size="default">
              <Link href="/sponsorships">Become a Community Partner</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sponsors;
