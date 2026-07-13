"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { getPastEvents } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";


const EventHighlight = () => {
  const [events, setEvents] = useState<CMSEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPastEvents()
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
              className="rounded-[20px] bg-white custom_shadow custom_border overflow-hidden"
            >
              <div className="relative w-full">
                <div className="absolute size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]" />
                <Image
                  src={event.cover_image_url}
                  width={500}
                  height={300}
                  alt={event.title}
                  className="object-cover w-full h-[200px] md:h-[280px] xl:h-[380px]"
                />
              </div>
              <div className="py-4 md:py-7 px-4 md:px-5">
                <h2 className="text-lg md:text-xl xl:text-2xl text-primary-black font-semibold mb-2 line-clamp-1">
                  {event.title}
                </h2>

                <p className="mb-6 md:mb-12 text-sm md:text-base xl:text-xl line-clamp-2">
                  {event.description}
                </p>

                <Button size={"lg"} className="!px-8 md:!px-12 !h-[36px] md:!h-[45px] text-sm md:text-base">
                  View Recap
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventHighlight;
