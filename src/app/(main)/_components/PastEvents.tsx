"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { getEvents } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";
import Link from "next/link";

const PastEvents = () => {
  const [events, setEvents] = useState<CMSEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents("past")
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          Past Event Highlights
        </h2>
        <div className="h-[300px] flex items-center justify-center text-xl text-gray-400">
          Loading events...
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Past Event Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 my-5 md:my-10">
        {events.map(event => (
          <div
            key={event.id}
            className="rounded-[20px] custom_border custom_shadow bg-[#F5F5F7] overflow-hidden"
          >
            <div className="relative flex items-center justify-center w-full h-[300px]">
              <Image
                src={event.cover_image_url}
                width={500}
                height={300}
                alt={event.title}
                className="size-full object-cover"
              />
              <div className="absolute flex items-end pl-6 pb-4 top-0 left-0 size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]">
                <div className="space-y-2">
                  <h4 className="text-xl md:text-2xl font-semibold text-white">
                    {event.title}
                  </h4>
                  <p className="text-primary-gray text-lg md:text-xl tracking-wider">
                    {event.city}, {event.state}
                  </p>
                </div>
              </div>
            </div>
            <Link key={event.slug} href={`/events/${event.slug}`}>
              <div className="text-lg md:text-xl text-primary-blue flex items-center gap-2 px-4 md:px-6 py-3 md:py-5">
                View Details
                <GoArrowRight />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
