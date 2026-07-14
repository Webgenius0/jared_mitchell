import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { PiUser } from "react-icons/pi";
import { CMSEventItem } from "@/Types/cms";

interface AboutThisEventProps {
  event: CMSEventItem;
}

export default function AboutThisEvent({ event }: AboutThisEventProps) {
  const eventTypeLabel = event.event_type
    ? event.event_type.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Event";

  return (
    <section className="py-10 xl:py-20">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4">
        {/* Left Column: Description, Details & Artists */}
        <div className="w-full lg:w-3/4 p-6 sm:p-8 rounded-[20px] bg-[#F5F5F7] flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className="section_title m-0">About This Event</h3>
            <div className="rounded-[30px] px-6 py-2 h-fit border-[0.5px] border-[#1977DD29] bg-[#1977DD1A] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full bg-[#1977DD]"></div>
              <p className="text-base font-normal text-[#1977DD]">
                {eventTypeLabel}
              </p>
            </div>
          </div>

          {/* HTML Description */}
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

          {/* Event Features / Quick Details */}
          <div className="py-6 border-y border-gray-200">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Event Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Featured Artists/Speakers */}
          {event.event_artists && event.event_artists.length > 0 && (
            <div className="pb-2">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Featured Speakers & Artists
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

        {/* Right Column: Ticket tiers */}
        <div className="w-full lg:w-1/4 p-6 sm:p-8 rounded-[20px] bg-[#F5F5F7] h-fit flex flex-col gap-6">
          <h3 className="text-2xl font-semibold text-black">Tickets</h3>

          <div className="flex flex-col gap-4">
            {event.ticket_tiers && event.ticket_tiers.length > 0 ? (
              event.ticket_tiers
                .filter(tier => tier.is_active)
                .map(tier => {
                  const seatsLeft =
                    tier.quantity_available - tier.quantity_sold;
                  return (
                    <div
                      key={tier.id}
                      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-lg font-semibold text-black truncate">
                          {tier.name}
                        </h4>
                        <span className="font-bold text-[#1977DD] text-base shrink-0">
                          {parseFloat(tier.price) === 0
                            ? "Free"
                            : `$${tier.price}`}
                        </span>
                      </div>

                      {tier.description && (
                        <p className="text-sm text-gray-600 font-normal line-clamp-3">
                          {tier.description}
                        </p>
                      )}

                      <div className="flex gap-2 items-center text-gray-500 mt-1">
                        <PiUser className="shrink-0 size-4 text-[#1977DD]" />
                        <p className="text-xs font-normal">
                          {seatsLeft > 0
                            ? `${seatsLeft} tickets left`
                            : "Sold Out"}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-gray-500 text-sm italic">
                No tickets details available.
              </p>
            )}

            {/* Get Tickets Button */}
            {event.ticket_url && (
              <a
                href={event.ticket_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#1977DD] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors mt-2 inline-block shadow-sm"
              >
                Next proceeded
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
