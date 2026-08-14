"use client";

import { Button } from "@/Components/Common/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiAward, FiMapPin } from "react-icons/fi";
import useClientApi from "@/Hooks/useClientApi";
import {
  ArtistSpotlightDetail,
  BusinessSpotlightDetail,
  CMSSpotlight,
  SpotlightOfTheWeekWinner,
} from "@/Types/cms";
import fallbackImage from "../../../Assets/spotlightBg.png";

type SpotlightType = "artist" | "business";

interface ArtistSpotlightCardProps {
  data?: CMSSpotlight;
}

const TABS: { label: string; value: SpotlightType }[] = [
  { label: "Artist", value: "artist" },
  { label: "Business", value: "business" },
];

export default function ArtistSpotlightCard({
  data,
}: ArtistSpotlightCardProps) {
  const [type, setType] = useState<SpotlightType>("artist");

  // Spotlight of the week — refetches automatically when the tab changes.
  const {
    data: weekData,
    isLoading,
    isError,
  } = useClientApi({
    method: "get",
    key: ["spotlight-of-the-week", type],
    endpoint: "/v1/spotlight/weeks/spotlight-of-the-week",
    params: { type },
  });

  const winner: SpotlightOfTheWeekWinner | null =
    weekData?.data?.current_winner ?? null;
  const spotlight = winner?.spotlight;

  // Fetch the full profile so we can show a real story/description. Gated on
  // `weekData?.data?.type` so a stale winner from the previous tab can never
  // be paired with the new tab's type.
  const { data: detailsData } = useClientApi({
    method: "get",
    key: ["spotlight-of-the-week-details", type, spotlight?.id],
    endpoint: spotlight ? `/v1/spotlight/details/${type}/${spotlight.id}` : "",
    enabled: !!spotlight && weekData?.data?.type === type,
  });

  const details = detailsData?.data?.spotlight as
    | ArtistSpotlightDetail
    | BusinessSpotlightDetail
    | undefined;

  const title = data?.title || "Last week spotlight Winner";
  const subTitle =
    data?.sub_title || "A story from our community making an impact.";

  const name = spotlight?.name || "";
  const cityState = [spotlight?.city, spotlight?.state]
    .filter(Boolean)
    .join(", ");

  const imageSrc =
    spotlight?.media?.headshot ||
    spotlight?.media?.artwork_photos?.[0] ||
    spotlight?.media?.behind_scenes_photo ||
    fallbackImage;

  const artistDetails = details as ArtistSpotlightDetail | undefined;
  const businessDetails = details as BusinessSpotlightDetail | undefined;

  // Real story data only — no fabricated fallback text. The description
  // paragraph is hidden when there is no content to show.
  const description =
    (type === "artist"
      ? artistDetails?.full_artist_story ||
        artistDetails?.short_bio ||
        artistDetails?.why_spotlighted ||
        artistDetails?.community_message
      : businessDetails?.full_story ||
        businessDetails?.short_description ||
        businessDetails?.why_spotlighted ||
        businessDetails?.community_message) ||
    data?.description ||
    "";

  const detailsHref = spotlight ? `/spotlight-${type}/${spotlight.id}` : null;

  const showSkeleton = isLoading;
  const showEmpty = !isLoading && (isError || !winner);

  return (
    <section className="container py-10 md:py-14 2xl:py-16">
      <h2 className="section_title 2xl:text-5xl">{title}</h2>

      <p className="section_sub_title">{subTitle}</p>

      {/* Artist / Business tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-7 md:mb-9">
        {TABS.map(tab => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setType(tab.value)}
            aria-pressed={type === tab.value}
            className={cn(
              "px-8 md:px-11 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300",
              type === tab.value
                ? "bg-primary-blue text-white shadow-md shadow-primary-blue/25 scale-[1.02]"
                : "bg-white text-secondary-black border border-[#D1D5DC] hover:border-primary-blue hover:text-primary-blue",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {showSkeleton ? (
        <div className="overflow-hidden max-w-[940px] w-full mx-auto rounded-2xl md:rounded-3xl bg-white custom_border custom_shadow animate-pulse">
          <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] bg-secondary-gray" />
          <div className="p-6 md:p-8 lg:p-10 space-y-3">
            <div className="h-7 md:h-9 w-1/2 rounded-lg bg-secondary-gray" />
            <div className="h-4 w-1/4 rounded bg-secondary-gray" />
            <div className="h-4 w-full rounded bg-secondary-gray" />
            <div className="h-4 w-3/4 rounded bg-secondary-gray" />
            <div className="h-12 w-44 rounded-full bg-secondary-gray" />
          </div>
        </div>
      ) : showEmpty ? (
        <div className="max-w-[940px] w-full mx-auto rounded-2xl md:rounded-3xl bg-white custom_border custom_shadow p-10 md:p-16 flex flex-col items-center text-center">
          <div className="size-14 md:size-16 rounded-full bg-primary-blue/10 flex items-center justify-center mb-4">
            <FiAward className="size-6 md:size-7 text-primary-blue" />
          </div>
          <h3 className="text-lg md:text-2xl font-semibold text-primary-black">
            {isError
              ? "Couldn't load the spotlight"
              : `No ${type} spotlight winner yet`}
          </h3>
          <p className="text-sm md:text-base text-secondary-black/70 mt-2 max-w-md">
            {isError
              ? "Something went wrong while loading this week's winner. Please try again later."
              : `The ${type} winner for this week hasn't been announced. Check back soon!`}
          </p>
        </div>
      ) : (
        <div
          key={type}
          className="group overflow-hidden  w-full mx-auto rounded-2xl md:rounded-3xl bg-white custom_border custom_shadow fade-up"
        >
          <figure className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] overflow-hidden bg-secondary-gray">
            <Image
              src={imageSrc}
              fill
              sizes="(max-width: 940px) 100vw, 940px"
              alt={name || "Spotlight winner"}
              className=" size-full transition-transform duration-700 group-hover:scale-105 object-contain object-center"
            />

            {winner && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary-black text-xs md:text-sm font-medium px-3 py-1.5 rounded-full">
                <span aria-hidden className="text-amber-500">
                  🏆
                </span>
                Winner · Week {winner.week_number}
              </span>
            )}
          </figure>

          <div className="p-6 md:p-8 lg:p-10 text-left">
            {name && (
              <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold text-primary-black mb-2">
                {name}
              </h3>
            )}

            {cityState && (
              <p className="inline-flex items-center gap-1.5 text-sm md:text-base text-black/50 mb-4">
                <FiMapPin className="size-4 shrink-0" />
                {cityState}
              </p>
            )}

            {description && (
              <p className="text-secondary-black text-sm md:text-base lg:text-lg leading-relaxed">
                {description}
              </p>
            )}

            <div className="mt-6 md:mt-8">
              {detailsHref ? (
                <Link href={detailsHref}>
                  <Button>Spotlight details</Button>
                </Link>
              ) : (
                <Button disabled>Spotlight details</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
