"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { PiCalendarBlank } from "react-icons/pi";
import { RxShare1 } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getUpcomingEvents } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";
import Link from "next/link";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
      <section className="section">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          Upcoming Events
        </h2>
        <div className="mt-5 md:my-10 h-[300px] flex items-center justify-center text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Upcoming Events
      </h2>

      <div className="mt-5 md:my-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1536: { slidesPerView: 4 },
          }}
        >
          {events.map(event => (
            <SwiperSlide key={event.id}>
              <div className="w-full rounded-xl xl:rounded-[20px] bg-[#F5F5F7] custom_shadow border border-gray-200 overflow-hidden mx-3">
                <div className="relative w-full">
                  <div className="absolute size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]" />
                  <Image
                    src={event.cover_image_url}
                    width={500}
                    height={300}
                    alt={event.title}
                    className="object-cover w-full h-[250px] xl:h-[300px]"
                  />
                </div>

                <div className="py-4 xl:py-7 px-3 xl:px-5">
                  <h2 className="text-xl text-primary-black font-semibold">
                    {event.title}
                  </h2>

                  <p className="text-lg xl:text-xl text-primary-black flex items-center gap-2 mt-1 xl:mt-2">
                    <PiCalendarBlank className="text-primary-blue" />
                    {formatDate(event.starts_at)}
                  </p>

                  <p className="text-lg xl:text-xl text-primary-black flex items-center gap-2 mt-1 xl:mt-2">
                    <GrLocation className="text-primary-blue" />
                    {event.city}, {event.state}
                  </p>

                  <div className="pb-4 my-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-6 aspect-square rounded-full bg-white custom_shadow custom_border">
                          <FaRegHeart className="size-[18px] text-primary-black" />
                        </div>
                        <span className="text-secondary-black text-xl">
                          {event.like_count.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-6 aspect-square rounded-full bg-white custom_shadow custom_border">
                          <FiBookmark className="size-[18px] text-primary-black" />
                        </div>
                        <span className="text-secondary-black text-xl">
                          Save
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-6 aspect-square rounded-full bg-white custom_shadow custom_border">
                          <RxShare1 className="size-[18px] text-primary-black" />
                        </div>
                        <span className="text-secondary-black text-xl">
                          Share
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Button size="lg">View Event Details</Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingEvents;
