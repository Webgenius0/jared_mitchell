import { CMSEventItem } from "@/Types/cms";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { PiCalendarBlank, PiTag, PiUser } from "react-icons/pi";

interface EventDetailsBannerProps {
  event: CMSEventItem;
}

export default function EventDetailsBanner({ event }: EventDetailsBannerProps) {
  const formatDateRange = (start: string, end: string, tz: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const sameDay =
      startDate.toLocaleDateString("en-US", { timeZone: tz }) ===
      endDate.toLocaleDateString("en-US", { timeZone: tz });

    if (sameDay) {
      const formattedStart = startDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
      });
      const formattedEnd = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
      });
      return `${formattedStart} - ${formattedEnd} ${tz}`;
    }

    const formattedStart = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
    const formattedEnd = endDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
    return `${formattedStart} - ${formattedEnd} ${tz}`;
  };

  const eventTypeLabel = event.event_type
    ? event.event_type.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Event";

  return (
    <section
      className="relative py-20 lg:py-[200px] bg-primary-blue bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/60"
      role="img"
      aria-label={`${event.title} cover image`}
      style={{
        backgroundImage: `url(${event.cover_image_url})`,
      }}
    >
      <div className="relative z-10 flex flex-col justify-center items-center px-4">
        {/* Event Type Badge */}
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-5">
          <PiTag className="size-4" />
          {eventTypeLabel}
        </span>

        <h3 className="text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold text-center text-white max-w-4xl">
          {event.title}
        </h3>
        <div className="flex flex-wrap justify-center mt-5 gap-x-8 gap-y-3">
          <div className="flex gap-2 items-center">
            <PiCalendarBlank className="text-white shrink-0 size-5" />
            <p className="text-lg sm:text-xl text-white font-normal">
              {formatDateRange(event.starts_at, event.ends_at, event.timezone)}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <GrLocation className="text-white shrink-0 size-5" />
            <p className="text-lg sm:text-xl text-white font-normal">
              {event.venue_name}
              {event.address && ` — ${event.address}`}
              {` • ${event.city}, ${event.state}`}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <PiUser className="text-white shrink-0 size-5" />
            <p className="text-lg sm:text-xl text-white font-normal">
              By {event.hosted_by}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
