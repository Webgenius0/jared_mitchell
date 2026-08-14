"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { getPastEvents } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";

import Link from "next/link";

const formatOverlayDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const formatRowDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const EventHighlight = () => {
  const [events, setEvents] = useState<CMSEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPastEvents()
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  const sanitizeToPlainText = (html: string) => {
    if (typeof window === "undefined") return html;
    const clean = (html || "").replace(/<[^>]*>?/gm, "");
    return clean;
  };

  if (loading) {
    return (
      <section className="container py-10 md:py-16 xl:py-20">
        <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
          Past Event Highlights
        </h2>
        <div className="h-[200px] md:h-[300px] flex items-center justify-center text-base md:text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10 md:py-16 xl:py-20">
      <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
        Past Event Highlights
      </h2>

      <p className="text-base md:text-lg xl:text-xl text-[#1D1D1F] text-center mb-6 md:mb-8 xl:mb-12 max-w-[90%] md:max-w-[70%] mx-auto">
        Take a look back at some of our most memorable events and celebrations.
      </p>

      <div className="my-6 md:my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {events.map(event => (
            <div
              key={event.id}
              className="group rounded-[20px] bg-white custom_shadow custom_border overflow-hidden"
            >
              {/* Image with title + date overlay (shown on hover) */}
              <div className="relative w-full h-[200px] md:h-[280px] xl:h-[380px] overflow-hidden">
                <Image
                  src={event.cover_image_url}
                  fill
                  alt={event.title}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Darkening overlay — fades in on hover */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay content — fades + slides in on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h2 className="text-white text-xl md:text-2xl xl:text-3xl font-bold line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    {event.title}
                  </h2>
                  {event.starts_at && (
                    <p className="text-white/90 text-sm md:text-base mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      {formatOverlayDate(event.starts_at)}
                    </p>
                  )}
                </div>
              </div>

              {/* Content below the image */}
              <div className="py-4 md:py-7 px-4 md:px-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-primary-black font-semibold line-clamp-1">
                    {event.title}
                  </h3>
                  {event.starts_at && (
                    <span className="shrink-0 text-xs md:text-sm text-secondary-black whitespace-nowrap mt-1">
                      Date: {formatRowDate(event.starts_at)}
                    </span>
                  )}
                </div>

                {event.description && (
                  <p className="text-sm md:text-base text-secondary-black mt-3 line-clamp-2">
                    {sanitizeToPlainText(event.description)}
                  </p>
                )}

                <Link
                  href={`/events/${event.slug}?from=past`}
                  className="block"
                >
                  <Button
                    size={"lg"}
                    className="!px-8 md:!px-12 !h-[36px] md:!h-[45px] text-sm md:text-base mt-5"
                  >
                    View Recap
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventHighlight;
