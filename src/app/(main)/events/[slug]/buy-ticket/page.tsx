"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventBySlug, useEventRegister } from "@/Hooks/api/cms_api";
import { CMSEventItem, EventTicketTier } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";
import EventDetailsBanner from "../../_Components/Eventsdetails/EventDetailsBanner";
import { GrLocation } from "react-icons/gr";
import { PiCalendarBlank, PiUser } from "react-icons/pi";
import toast from "react-hot-toast";

export default function BuyTicketPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, isLoading, error } = getEventBySlug(slug ?? "");
  const { mutate: registerEvent, isPending } = useEventRegister();

  const event = data?.data as CMSEventItem | undefined;

  // ── Form state ──────────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [tierId, setTierId]       = useState<number | "">("");
  const [quantity, setQuantity]   = useState(1);

  // ── Derived helpers ──────────────────────────────────────────────────────────
  const activeTiers = useMemo(
    () => event?.ticket_tiers?.filter(t => t.is_active) ?? [],
    [event]
  );

  const selectedTier: EventTicketTier | undefined = useMemo(
    () => activeTiers.find(t => t.id === tierId),
    [activeTiers, tierId]
  );

  const subtotal   = selectedTier ? parseFloat(selectedTier.price) * quantity : 0;
  const serviceFee = selectedTier ? parseFloat(selectedTier.service_fee) * quantity : 0;
  const total      = subtotal + serviceFee;

  const formatDateRange = (start: string, end: string, tz: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const date = s.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: tz,
    });
    const startTime = s.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
    const endTime = e.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
    return { date, timeRange: `${startTime} - ${endTime} ${tz}` };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tierId) {
      toast.error("Please select a ticket type.");
      return;
    }
    if (!firstName || !lastName || !email || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload: Record<string, any> = {
      event_id:       event?.id,
      ticket_tier_id: tierId,
      first_name:     firstName,
      last_name:      lastName,
      email,
      phone_number:   phone,
      quantity,
    };

    registerEvent(payload, {
      onSuccess: (res: any) => {
        if (res?.success) {
          router.push(`/events/${slug}`);
        }
      },
    });
  };

  // ── Loading / error states ───────────────────────────────────────────────────
  if (isLoading) return <PageLoader />;

  if (error || !event) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Event Not Found</h2>
          <a href="/events" className="text-[#1977DD] underline">Browse Events</a>
        </div>
      </section>
    );
  }

  const { date, timeRange } = formatDateRange(event.starts_at, event.ends_at, event.timezone);

  return (
    <>
      {/* ── Same Banner as Event Details page ─────────────────────────────── */}
      <EventDetailsBanner event={event} />

      {/* ── Main booking body ─────────────────────────────────────────────── */}
      <section className="py-10 xl:py-16 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Attendee form ───────────────────────────────────────── */}
            <div className="w-full lg:w-[60%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-7">
                Attendee Information
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone_number"
                    type="tel"
                    required
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition"
                  />
                </div>

                {/* Ticket type — selectable cards */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Type <span className="text-red-500">*</span>
                  </label>

                  {activeTiers.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No ticket tiers available.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {activeTiers.map(tier => {
                        const seatsLeft = tier.quantity_available - tier.quantity_sold;
                        const isSoldOut = seatsLeft <= 0;
                        const isSelected = tierId === tier.id;
                        const priceLabel =
                          parseFloat(tier.price) === 0
                            ? "Free"
                            : `$${parseFloat(tier.price).toFixed(2)}`;

                        return (
                          <button
                            key={tier.id}
                            type="button"
                            disabled={isSoldOut}
                            onClick={() => setTierId(tier.id)}
                            className={[
                              "w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all",
                              isSelected
                                ? "border-[#1977DD] bg-[#EBF4FF] shadow-sm"
                                : "border-gray-200 bg-gray-50 hover:border-[#1977DD]/40 hover:bg-blue-50/30",
                              isSoldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <div className="flex items-center justify-between gap-3">
                              {/* Radio circle + name */}
                              <div className="flex items-center gap-3 min-w-0">
                                <span
                                  className={[
                                    "shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                                    isSelected
                                      ? "border-[#1977DD] bg-[#1977DD]"
                                      : "border-gray-300 bg-white",
                                  ].join(" ")}
                                >
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                                  )}
                                </span>
                                <div className="min-w-0">
                                  <p className="font-semibold text-gray-900 text-sm truncate">
                                    {tier.name}
                                  </p>
                                  {tier.description && (
                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                      {tier.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Price + seats */}
                              <div className="text-right shrink-0">
                                <p
                                  className={[
                                    "font-bold text-base",
                                    isSelected ? "text-[#1977DD]" : "text-gray-800",
                                  ].join(" ")}
                                >
                                  {priceLabel}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {isSoldOut ? "Sold out" : `${seatsLeft} left`}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Hidden input keeps the value in the form for validation feedback */}
                  <input type="hidden" name="ticket_tier_id" value={tierId} />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={e => setQuantity(Number(e.target.value))}
                      className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition pr-10 cursor-pointer"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      ▾
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="complete_booking_btn"
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#1977DD] text-white py-3.5 rounded-xl font-semibold text-base hover:bg-[#1565C0] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1 shadow-md"
                >
                  {isPending ? "Processing…" : "Complete Booking"}
                </button>
              </form>
            </div>

            {/* ── RIGHT: Order summary ──────────────────────────────────────── */}
            <div className="w-full lg:w-[40%] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:sticky lg:top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                {/* Date */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-medium text-gray-500 shrink-0">Date</span>
                  <span className="text-gray-800 text-right">{date}</span>
                </div>
                {/* Time */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-medium text-gray-500 shrink-0">Time</span>
                  <span className="text-gray-800 text-right">{timeRange}</span>
                </div>
                {/* Location */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-medium text-gray-500 shrink-0">Location</span>
                  <span className="text-gray-800 text-right">
                    {event.city}, {event.state}
                  </span>
                </div>

                <hr className="border-gray-100 my-2" />

                {/* Ticket row */}
                {selectedTier && (
                  <>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="font-medium text-gray-800">
                          {selectedTier.name}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5">Qty: {quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900 shrink-0">
                        {parseFloat(selectedTier.price) === 0
                          ? "Free"
                          : `$${(parseFloat(selectedTier.price) * quantity).toFixed(2)}`}
                      </span>
                    </div>
                    <hr className="border-gray-100 my-1" />
                  </>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center gap-4 text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Service fee */}
                <div className="flex justify-between items-center gap-4 text-gray-600">
                  <span>
                    Service Fee{" "}
                    {selectedTier && parseFloat(selectedTier.service_fee) > 0
                      ? `(${(
                          (parseFloat(selectedTier.service_fee) /
                            parseFloat(selectedTier.price)) *
                          100
                        ).toFixed(0)}%)`
                      : ""}
                  </span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>

                <hr className="border-gray-200 my-2" />

                {/* Total */}
                <div className="flex justify-between items-center gap-4 text-base font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#1977DD] text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Mini event meta */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <PiCalendarBlank className="shrink-0 text-[#1977DD]" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GrLocation className="shrink-0 text-[#1977DD]" />
                  <span>{event.venue_name} — {event.city}, {event.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PiUser className="shrink-0 text-[#1977DD]" />
                  <span>Hosted by {event.hosted_by}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
