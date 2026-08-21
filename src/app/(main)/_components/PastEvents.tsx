"use client";

import Link from "next/link";
import Image from "next/image";
import { CMSEventItem } from "@/Types/cms";
import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { getPastEvents } from "@/lib/Services/cms_service";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const ITEMS_PER_PAGE = 6;

const PastEvents = () => {
  const [events, setEvents] = useState<CMSEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPastEvents()
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2 className="section_title 2xl:text-5xl">Past Event Highlights</h2>
        <div className="h-[300px] flex items-center justify-center text-xl text-gray-400">
          Loading events...
        </div>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div id="past-events-home" className="container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Past Event Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 my-4 md:my-8">
        {paginatedEvents.map(event => (
          <div
            key={event.id}
            className="rounded-[20px] custom_border custom_shadow bg-[#F5F5F7] overflow-hidden"
          >
            <div className="relative flex items-center justify-center w-full h-[260px]">
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
            <Link key={event.slug} href={`/events/${event.slug}?from=past`}>
              <div className="text-lg md:text-xl text-primary-blue flex items-center gap-2 px-4 md:px-6 py-3 md:py-5">
                View Details
                <GoArrowRight />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center size-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <HiChevronLeft className="size-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                document
                  .getElementById("past-events-home")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex items-center justify-center size-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary-blue text-white shadow-md"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center size-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <HiChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PastEvents;
