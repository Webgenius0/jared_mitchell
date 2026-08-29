"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useClientApi from "@/Hooks/useClientApi";
import { FiAward, FiMapPin } from "react-icons/fi";
import { Button } from "@/Components/Common/Button";
import {
  ArtistSpotlightDetail,
  BusinessSpotlightDetail,
  CMSSpotlight,
  SpotlightCustomMediaItem,
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

  // Prefer description from showcase, then details, then CMS fallback
  const showcaseDescription = winner?.showcase?.description || "";
  const description =
    showcaseDescription ||
    (type === "artist"
      ? artistDetails?.full_artist_story ||
        artistDetails?.short_bio ||
        artistDetails?.why_spotlighted ||
        artistDetails?.community_message
      : businessDetails?.full_story ||
        businessDetails?.short_description ||
        businessDetails?.why_spotlighted ||
        businessDetails?.community_message) ||
    winner?.description ||
    data?.description ||
    "";

  // Showcase media (custom_media from showcase, excluding any excluded_media_ids)
  const excludedIds = new Set(winner?.showcase?.excluded_media_ids || []);
  const showcaseMedia: SpotlightCustomMediaItem[] = (
    winner?.showcase?.custom_media || []
  ).filter(m => !excludedIds.has(Number(m.id)));

  // Headshot from spotlight media
  const headshotSrc = spotlight?.media?.headshot || null;

  const detailsHref = spotlight ? `/spotlight-${type}/${spotlight.id}` : null;

  const showSkeleton = isLoading;
  const showEmpty = !isLoading && (isError || !winner);

  return (
    <section className="container py-8 md:py-10 lg:py-12 2xl:py-16">
      <h2 className="section_title 2xl:text-5xl">{title}</h2>

      <p className="section_sub_title">{subTitle}</p>

      <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-5 md:mb-6 lg:mb-7 xl:mb-9">
        {TABS.map(tab => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setType(tab.value)}
            aria-pressed={type === tab.value}
            className={cn(
              "px-6 md:px-8 lg:px-10 xl:px-11 py-2 md:py-2.5 lg:py-3 rounded-full text-xs md:text-sm lg:text-base font-medium transition-all duration-300",
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
        <div className="overflow-hidden max-w-[940px] w-full mx-auto bg-white custom_border custom_shadow animate-pulse">
          <div className="w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[440px] bg-secondary-gray" />
          <div className="p-4 md:p-5 lg:p-6 xl:p-10 space-y-2.5 lg:space-y-3">
            <div className="h-7 md:h-9 w-1/2 rounded-lg bg-secondary-gray" />
            <div className="h-4 w-1/4 rounded bg-secondary-gray" />
            <div className="h-4 w-full rounded bg-secondary-gray" />
            <div className="h-4 w-3/4 rounded bg-secondary-gray" />
            <div className="h-12 w-44 rounded-full bg-secondary-gray" />
          </div>
        </div>
      ) : showEmpty ? (
        <div className="max-w-[940px] w-full mx-auto bg-white custom_border custom_shadow p-6 md:p-8 lg:p-10 xl:p-16 flex flex-col items-center text-center">
          <div className="size-10 md:size-12 lg:size-14 rounded-full bg-primary-blue/10 flex items-center justify-center mb-3 lg:mb-4">
            <FiAward className="size-6 md:size-7 text-primary-blue" />
          </div>
          <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-primary-black">
            {isError
              ? "Couldn't load the spotlight"
              : `No ${type} spotlight winner yet`}
          </h3>
          <p className="text-xs md:text-sm lg:text-base text-secondary-black/70 mt-2 max-w-md">
            {isError
              ? "Something went wrong while loading this week's winner. Please try again later."
              : `The ${type} winner for this week hasn't been announced. Check back soon!`}
          </p>
        </div>
      ) : (
        <div
          key={type}
          className="group overflow-hidden  w-full mx-auto bg-white custom_border custom_shadow fade-up"
        >
          <figure className="relative w-full overflow-hidden bg-secondary-gray">
            {/* Main media area: show headshot + showcase media if available */}
            {showcaseMedia.length > 0 ? (
              <div className="w-full">
                {/* Showcase media grid */}
                <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[440px] overflow-hidden">
                  {showcaseMedia
                    .slice(0, 1)
                    .map((media) =>
                      media.type === "video" ? (
                        <video
                          key={media.id}
                          src={media.url}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster={
                            typeof imageSrc === "string" ? imageSrc : undefined
                          }
                        />
                      ) : (
                        <Image
                          key={media.id}
                          src={media.url}
                          fill
                          sizes="(max-width: 940px) 100vw, 940px"
                          alt={name || "Spotlight winner"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ),
                    )}
                </div>

                {/* Headshot + remaining showcase media thumbnails row */}
                {(headshotSrc || showcaseMedia.length > 1) && (
                  <div className="flex items-center gap-3 p-3 md:p-4">
                    {headshotSrc && (
                      <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                        <Image
                          src={headshotSrc}
                          fill
                          sizes="96px"
                          alt={`${name} headshot`}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex gap-2 overflow-x-auto">
                      {showcaseMedia.slice(1).map(media => (
                        <div
                          key={media.id}
                          className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0"
                        >
                          {media.type === "video" ? (
                            <video
                              src={media.url}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <Image
                              src={media.url}
                              fill
                              sizes="80px"
                              alt="Showcase media"
                              className="object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback: show the main image with headshot overlay */
              <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[440px]">
                <Image
                  src={imageSrc}
                  fill
                  sizes="(max-width: 940px) 100vw, 940px"
                  alt={name || "Spotlight winner"}
                  className="size-full transition-transform duration-700 group-hover:scale-105 object-cover object-center"
                />
              </div>
            )}

            {winner && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary-black text-xs md:text-sm font-medium px-3 py-1.5 rounded-full z-10">
                <span aria-hidden className="text-amber-500">
                  🏆
                </span>
                Winner · Week {winner.week_number}
              </span>
            )}
          </figure>

          <div className="p-4 md:p-5 lg:p-6 xl:p-10 text-left">
            {name && (
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-1.5 md:mb-2">
                {name}
              </h3>
            )}

            {cityState && (
              <p className="inline-flex items-center gap-1.5 text-xs md:text-sm lg:text-base text-black/50 mb-3 lg:mb-4">
                <FiMapPin className="size-4 shrink-0" />
                {cityState}
              </p>
            )}

            {description && (
              <p className="text-secondary-black text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed">
                {description}
              </p>
            )}

            <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-8">
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
