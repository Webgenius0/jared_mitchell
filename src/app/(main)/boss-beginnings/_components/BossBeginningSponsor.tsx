"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getActiveSeasonRounds, getEventSponsors } from "@/Hooks/api/cms_api";
import { resolveMediaUrl } from "@/lib/utils";
import { ActiveSeasonSponsor, EventSponsor } from "@/Types/cms";
import Spornsorimage from "../../../../Assets/spossor.png";

type BossBeginningSponsorProps = {
  variant?: "season" | "events";
};

type SponsorLogo = {
  id: number;
  image: string;
  name?: string;
};

export default function BossBeginningSponsor({
  variant = "season",
}: BossBeginningSponsorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: seasonData } = getActiveSeasonRounds(variant === "season");
  const { data: eventsData } = getEventSponsors(variant === "events");

  const sponsor: ActiveSeasonSponsor | null =
    seasonData?.data?.season?.sponsor ?? null;
  const eventSponsors: EventSponsor[] = eventsData?.data?.sponsors ?? [];

  // Resolve the logos to display — a single one for the season sponsor, a
  // list for the event sponsors.
  const logos: SponsorLogo[] =
    variant === "events"
      ? eventSponsors
          .map(s => ({
            id: s.id,
            image: resolveMediaUrl(s.logo),
            name: s.name,
          }))
          .filter(l => !!l.image)
      : sponsor?.logo
        ? [
            {
              id: sponsor.id,
              image: resolveMediaUrl(sponsor.logo),
              name: sponsor.name,
            },
          ]
        : [];

  // Clamped index used for both the visible logo and the dots so they stay in
  // sync even if the sponsor list changes on refetch.
  const safeIndex = Math.min(currentIndex, Math.max(0, logos.length - 1));
  const currentLogo = logos[safeIndex];

  // Auto-advance the sponsors every few seconds.
  useEffect(() => {
    if (logos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % logos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <section>
      <div className="container mx-auto">
        <h2 className="section_title text-center mb-4 md:mb-6 lg:mb-8 xl:mb-10">
          Sponsor the event
        </h2>
        <p className="text-black font-normal text-center text-sm md:text-base lg:text-lg">
          Take a look back at some of our most memorable events and
          celebrations.
        </p>
        <div className="pt-6 md:pt-8 lg:pt-10">
          {logos.length > 1 ? (
            // Multiple sponsors — auto-slide with pagination dots
            <div>
              <div className="relative max-w-3xl mx-auto">
                <div key={currentLogo.id} className="fade-up">
                  <Image
                    src={currentLogo.image}
                    alt={currentLogo.name || "sponsor"}
                    height={500}
                    width={500}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
                {logos.map((logo, i) => (
                  <button
                    key={logo.id}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to sponsor ${i + 1}`}
                    aria-current={i === safeIndex ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === safeIndex
                        ? "w-8 bg-primary-blue"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : logos.length === 1 ? (
            <div className="max-w-xl mx-auto">
              <Image
                src={logos[0].image}
                alt={logos[0].name || "sponsor"}
                height={500}
                width={500}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <Image
                src={Spornsorimage}
                alt="sponsor"
                height={500}
                width={500}
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
