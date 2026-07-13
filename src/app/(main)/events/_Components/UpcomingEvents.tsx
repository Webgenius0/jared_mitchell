"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { GrLocation } from "react-icons/gr";
import { PiCalendarBlank, PiUser } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi";
import { getUpcomingEvents } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";
import Link from "next/link";
import DOMPurify from "dompurify";

const EVENT_TYPE_LABELS: Record<string, string> = {
  featured: "Featured",
  pop_up: "Pop-Up",
  workshop: "Workshop",
  networking: "Business Event",
};

const formatDateRange = (startStr: string, endStr: string) => {
  const start = new Date(startStr);
  const datePart = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!endStr) return `${datePart} • ${startTime}`;

  const end = new Date(endStr);
  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${datePart} • ${startTime} - ${endTime}`;
};

// Strip HTML tags to plain text, then sanitize — safe for line-clamped preview text.
// Use this (not the raw-HTML version) inside cards, since injecting real HTML
// into a line-clamp preview can break the clamp or leave dangling tags when truncated.
const sanitizeToPlainText = (html: string) => {
  if (typeof window === "undefined") return html; // SSR guard
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  return clean;
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState<CMSEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingEvents()
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container py-10 md:py-16 xl:py-20">
        <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold text-center">
          Upcoming Events
        </h2>
        <div className="h-[200px] md:h-[300px] flex items-center justify-center text-base md:text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      <section className="container py-10 md:py-16 xl:py-20">
        <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold text-center">
          Upcoming Events
        </h2>
        <p className="section_sub_title text-center mt-2">
          Discover workshops, markets, and community gatherings near you.
        </p>

        <div className="my-6 md:my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {events.map(event => (
              <div
                key={event.id}
                className="rounded-[20px] bg-white custom_shadow custom_border overflow-hidden flex flex-col"
              >
                {/* Image with badges */}
                <div className="relative w-full">
                  <Image
                    src={event.cover_image_url}
                    width={500}
                    height={300}
                    alt={event.title}
                    className="object-cover w-full h-[180px] md:h-[200px] xl:h-[220px]"
                  />

                  <span className="absolute top-3 left-3 bg-white/95 text-primary-black text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {EVENT_TYPE_LABELS[event.event_type] ?? event.event_type}
                  </span>

                  {event.is_featured && (
                    <span className="absolute top-3 right-3 bg-primary-blue text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <HiOutlineSparkles className="text-xs" />
                      Spotlight Eligible
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="py-5 md:py-6 px-4 md:px-5 flex flex-col flex-1">
                  <h2 className="text-lg md:text-xl xl:text-2xl text-primary-black font-semibold line-clamp-1">
                    {event.title}
                  </h2>

                  <p className="text-sm md:text-base text-primary-black flex items-center gap-2 mt-3">
                    <PiCalendarBlank className="text-primary-blue shrink-0" />
                    <span className="truncate">
                      {formatDateRange(event.starts_at, event.ends_at)}
                    </span>
                  </p>

                  <p className="text-sm md:text-base text-primary-black flex items-center gap-2 mt-2">
                    <GrLocation className="text-primary-blue shrink-0" />
                    <span className="truncate">
                      {event.city}, {event.state}
                    </span>
                  </p>

                  {event.hosted_by && (
                    <p className="text-sm md:text-base text-primary-black flex items-center gap-2 mt-2">
                      <PiUser className="text-primary-blue shrink-0" />
                      <span className="truncate">
                        Hosted by {event.hosted_by}
                      </span>
                    </p>
                  )}

                  {event.description && (
                    <p className="text-sm md:text-base text-secondary-black mt-3 line-clamp-2">
                      {sanitizeToPlainText(event.description)}
                    </p>
                  )}

                  <div className="mt-5 pt-1">
                    <Link href={`/events/${event.slug}`} className="block">
                      <Button size="lg" className="w-full rounded-full">
                        View Event <span aria-hidden>→</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button size="xl">View All Events</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingEvents;
