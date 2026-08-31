"use client";

import Image from "next/image";
import useClientApi from "@/Hooks/useClientApi";
import { SpotlightCustomMediaItem, SpotlightOfTheWeekWinner } from "@/Types/cms";

type SpotlightType = "artist" | "business";

interface WinnerShowcaseProps {
  type: SpotlightType;
}

const WinnerShowcase = ({ type }: WinnerShowcaseProps) => {
  const { data: weekData, isLoading } = useClientApi({
    method: "get",
    key: ["spotlight-of-the-week-showcase", type],
    endpoint: "/v1/spotlight/weeks/spotlight-of-the-week",
    params: { type },
  });

  const winner: SpotlightOfTheWeekWinner | null =
    weekData?.data?.current_winner ?? null;
  const showcase = winner?.showcase;

  // Filter out excluded media
  const excludedIds = new Set(showcase?.excluded_media_ids || []);
  const media: SpotlightCustomMediaItem[] = (
    showcase?.custom_media || []
  ).filter((m) => !excludedIds.has(Number(m.id)));

  if (isLoading || !showcase || media.length === 0) {
    return null;
  }

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  return (
    <section className="container py-8 md:py-10 lg:py-12">
      <h2 className="section_title">
        {type === "artist" ? "Artist" : "Business"} Showcase
      </h2>

      {showcase.title && (
        <p className="text-lg md:text-xl lg:text-2xl font-semibold text-primary-black text-center mb-2">
          {showcase.title}
        </p>
      )}

      {showcase.description && (
        <p className="text-sm md:text-base lg:text-lg text-secondary-black text-center max-w-3xl mx-auto mb-6 md:mb-8">
          {showcase.description}
        </p>
      )}

      {/* Media Grid */}
      <div className="max-w-5xl mx-auto">
        {/* Videos first */}
        {videos.length > 0 && (
          <div
            className={`grid gap-4 mb-4 ${
              videos.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black"
              >
                <video
                  src={video.url}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div
            className={`grid gap-4 ${
              images.length === 1
                ? "grid-cols-1"
                : images.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {images.map((image) => (
              <figure
                key={image.id}
                className="relative w-full aspect-video rounded-2xl overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={image.file_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WinnerShowcase;
