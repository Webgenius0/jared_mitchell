"use client";

import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { PiUser } from "react-icons/pi";
import { CMSEventItem } from "@/Types/cms";
import { useRouter } from "next/navigation";

interface AboutThisEventProps {
  event: CMSEventItem;
}

export default function AboutThisEvent({ event }: AboutThisEventProps) {
  const router = useRouter();
  const activeTiers = event.ticket_tiers?.filter(t => t.is_active) ?? [];

  const eventTypeLabel = event.event_type
    ? event.event_type.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Event";

  const handleProceed = () => {
    router.push(`/events/${event.slug}/buy-ticket`);
  };

  return (
    <section className="py-10 xl:py-20">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4">
        {/* ── Left Column: Event Details ──────────────────────────────────── */}
        <div className="w-full lg:w-3/4 p-6 sm:p-8 rounded-[20px] bg-[#F5F5F7] flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className="section_title m-0">About This Event</h3>
            <div className="rounded-[30px] px-6 py-2 h-fit border-[0.5px] border-[#1977DD29] bg-[#1977DD1A] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full bg-[#1977DD]" />
              <p className="text-base font-normal text-[#1977DD]">
                {eventTypeLabel}
              </p>
            </div>
          </div>

          {/* Description */}
          {event.description ? (
            <div
              className="text-base md:text-lg xl:text-xl text-[#1D1D1F] leading-relaxed prose max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          ) : (
            <p className="text-base md:text-lg xl:text-xl text-gray-500 italic">
              No description provided for this event.
            </p>
          )}

          {/* Quick Details */}
          <div className="py-6 border-y border-gray-200">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Event Highlights
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-2 items-center">
                <CiCircleCheck className="text-[#1977DD] size-5 shrink-0" />
                <p className="text-base text-[#364153]">
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">
                    {event.status || "Published"}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <CiCircleCheck className="text-[#1977DD] size-5 shrink-0" />
                <p className="text-base text-[#364153]">
                  <strong>Hosted By:</strong> {event.hosted_by}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <CiCircleCheck className="text-[#1977DD] size-5 shrink-0" />
                <p className="text-base text-[#364153]">
                  <strong>Location:</strong> {event.venue_name}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <CiCircleCheck className="text-[#1977DD] size-5 shrink-0" />
                <p className="text-base text-[#364153]">
                  <strong>Timezone:</strong> {event.timezone}
                </p>
              </div>
            </div>
          </div>

          {/* Artists */}
          {event.event_artists && event.event_artists.length > 0 && (
            <div className="pb-2">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Featured Speakers &amp; Artists
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.event_artists.map(artist => (
                  <div
                    key={artist.id}
                    className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-sm border border-gray-100"
                  >
                    <img
                      src={artist.photo || "/user.png"}
                      alt={artist.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover w-[60px] h-[60px] shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-lg font-bold text-black truncate">
                        {artist.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {artist.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right Column: Static Ticket type Info + Action Button ── */}
        <div className="w-full lg:w-1/4 p-6 sm:p-8 rounded-[20px] bg-[#F5F5F7] h-fit flex flex-col gap-5">
          <h3 className="text-2xl font-semibold text-black">Ticket type</h3>

          {activeTiers.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No Ticket type available.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {activeTiers.map(tier => {
                const seatsLeft = tier.quantity_available - tier.quantity_sold;
                const isSoldOut = seatsLeft <= 0;
                const priceLabel =
                  parseFloat(tier.price) === 0
                    ? "Free"
                    : `$${parseFloat(tier.price).toFixed(2)}`;

                return (
                  <div
                    key={tier.id}
                    className={`w-full rounded-xl border border-gray-200/60 bg-white p-4 shadow-sm flex items-center justify-between gap-5 ${
                      isSoldOut ? "opacity-60" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-lg leading-tight text-gray-900">
                        {tier.name}
                      </p>
                      {tier.description && (
                        <p className="text-base py-4 text-[#364153] line-clamp-2 font-normal">
                          {tier.description}
                        </p>
                      )}
                      <div className="flex gap-1 items-center">
                        <PiUser className="size-3.5 text-gray-400" />
                        <p className="text-lg text-gray-400 font-normal">
                          {isSoldOut
                            ? "Sold out"
                            : `${seatsLeft} seats available`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-base leading-tight text-[#1977DD]">
                        {priceLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Active Action Button to proceed directly to the registration page */}
          <button
            type="button"
            onClick={handleProceed}
            className="w-full text-center py-3.5 bg-[#1977DD] text-white rounded-xl font-semibold hover:bg-[#1565C0] active:scale-[0.98] transition-all duration-200 shadow-sm mt-2"
          >
            Proceed to Buy Ticket
          </button>
        </div>
      </div>
    </section>
  );
}
