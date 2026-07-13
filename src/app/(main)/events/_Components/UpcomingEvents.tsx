"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { PiCalendarBlank } from "react-icons/pi";
import { RxShare1 } from "react-icons/rx";
import { getEvents } from "@/lib/Services/cms_service";
import { Event } from "@/Types/cms";
import Link from "next/link";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents("upcoming")
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container py-10 md:py-16 xl:py-20">
        <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
          Upcoming Events
        </h2>
        <div className="h-[200px] md:h-[300px] flex items-center justify-center text-base md:text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gray-100">
      <section className="container py-10 md:py-16 xl:py-20">
        <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
          Upcoming Events
        </h2>

        <div className="my-6 md:my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {events.map(event => (
              <div className="rounded-[20px] bg-white custom_shadow custom_border overflow-hidden">
                <div className="relative w-full">
                  <div className="absolute size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]" />                <Image
                    src={event.cover_image_url}
                    width={500}
                    height={300}
                    alt={event.title}
                    className="object-cover w-full h-[200px] md:h-[250px] xl:h-[300px]"
                  />
                </div>

                <div className="py-5 md:py-7 px-4 md:px-5">
                  <h2 className="text-lg md:text-xl xl:text-2xl text-primary-black font-semibold line-clamp-1">
                    {event.title}
                  </h2>

                  <p className="text-base md:text-lg xl:text-xl text-primary-black flex items-center gap-2 mt-2">
                    <PiCalendarBlank className="text-primary-blue shrink-0" />
                    <span className="truncate">{formatDate(event.starts_at)}</span>
                  </p>

                  <p className="text-base md:text-lg xl:text-xl text-primary-black flex items-center gap-2 mt-2">
                    <GrLocation className="text-primary-blue shrink-0" />
                    <span className="truncate">{event.city}, {event.state}</span>
                  </p>

                  <div className="pb-3 md:pb-4 my-3 md:my-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="flex items-center justify-center size-[26px] md:size-[30px] rounded-full bg-white custom_shadow custom_border">
                          <FaRegHeart className="size-[14px] md:size-[18px] text-primary-black" />
                        </div>

                        <span className="text-secondary-black text-sm md:text-base xl:text-xl">
                          {event.like_count.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="flex items-center justify-center size-[26px] md:size-[30px] rounded-full bg-white custom_shadow custom_border">
                          <FiBookmark className="size-[14px] md:size-[18px] text-primary-black" />
                        </div>

                        <span className="text-secondary-black text-sm md:text-base xl:text-xl">Save</span>
                      </div>

                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="flex items-center justify-center size-[26px] md:size-[30px] rounded-full bg-white custom_shadow custom_border">
                          <RxShare1 className="size-[14px] md:size-[18px] text-primary-black" />
                        </div>

                        <span className="text-secondary-black text-sm md:text-base xl:text-xl">
                          Share
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <Button size="lg">View Event Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button size="xl">Load More Events</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingEvents;
