"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { getEvents } from "@/lib/Services/cms_service";
import { Event } from "@/Types/cms";


const EventHighlight = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents("past")
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container py-20">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          Past Event Highlights
        </h2>
        <div className="h-[300px] flex items-center justify-center text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <section className="container py-20">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Past Event Highlights
      </h2>

      <p className="text-xl text-[#1D1D1F] text-center mb-12">
        Take a look back at some of our most memorable events and celebrations.
      </p>

      <div className="my-10">
        <div className="grid grid-cols-2 gap-5">
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
                  className="object-cover w-full h-[380px]"
                />
              </div>
              <div className="py-7 px-5">
                <h2 className="text-2xl text-primary-black font-semibold mb-2">
                  {event.title}
                </h2>

                <p className="mb-12 text-xl line-clamp-2">
                  {event.description}
                </p>

                <Button size={"lg"} className="!px-12 !h-[45px]">
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
