"use client";
import React from "react";
import { Download, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUpcomingEvents } from "@/Hooks/api/cms_api";
import { useEventRegistrations } from "@/Hooks/api/dashboard_api";
import { CMSEventItem, EventRegistration } from "@/Types/cms";
import { downloadBookingReceipt } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BookingStatus = "Confirm" | "Pending" | "Cancelled";

/* ------------------------------------------------------------------ */
/*  Status helpers                                                     */
/* ------------------------------------------------------------------ */

const statusStyles: Record<BookingStatus, string> = {
  Confirm: "bg-green-50 text-green-700 border-green-100",
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Cancelled: "bg-red-50 text-red-600 border-red-100",
};

const toBookingStatus = (status: string): BookingStatus => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "Pending";
    case "cancelled":
    case "canceled":
      return "Cancelled";
    case "confirmed":
    case "paid":
    default:
      return "Confirm";
  }
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatEventDate = (startsAt: string) => {
  const date = new Date(startsAt);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }),
  };
};

const formatEventMeta = (event: CMSEventItem) => {
  const time = new Date(event.starts_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const place = [event.city, event.state].filter(Boolean).join(", ");
  return `${time}${place ? ` · ${place}` : ""}`;
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTotal = (registration: EventRegistration) => {
  const { total, currency } = registration.billing;
  return `${currency ?? "USD"} ${Number(total ?? 0).toFixed(2)}`;
};

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error } = getUpcomingEvents();
  const {
    data: registrationsData,
    isLoading: isRegistrationsLoading,
    error: registrationsError,
  } = useEventRegistrations();

  const upcomingEvents = (data?.data?.events as CMSEventItem[] | undefined) ?? [];
  const registrations =
    (registrationsData?.data?.registrations as EventRegistration[] | undefined) ??
    [];

  const handleViewAll = () => router.push("/events");
  const handleBuyTicket = (event: CMSEventItem) =>
    router.push(`/events/${event.slug}`);
  const handleView = (registration: EventRegistration) =>
    router.push(`/events/${registration.event.slug}`);
  const handleEdit = (registration: EventRegistration) =>
    router.push(`/events/${registration.event.slug}/buy-ticket`);
  const handleDelete = (registration: EventRegistration) =>
    console.log("Delete", registration);
  const handleDownload = (registration: EventRegistration) =>
    downloadBookingReceipt(registration);

  return (
    <div className=" font-sans text-gray-800">
      <div className=" space-y-8">
        {/* Upcoming events */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming event
            </h2>
            <button
              onClick={handleViewAll}
              className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
            >
              View all
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Failed to load upcoming events.
            </p>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No upcoming events right now.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {upcomingEvents.map(event => {
                const { day, month } = formatEventDate(event.starts_at);
                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-500 rounded-lg w-12 h-12 flex-shrink-0">
                        <span className="text-base font-bold leading-none">
                          {day}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wider mt-0.5">
                          {month}
                        </span>
                      </div>
                      {/* Event Details */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatEventMeta(event)}
                        </p>
                      </div>
                    </div>
                    {/* Action Button */}
                    <button
                      onClick={() => handleBuyTicket(event)}
                      className="bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-sm"
                    >
                      Buy Ticket
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Booking history */}
        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Booking history
            </h2>
          </div>

          {isRegistrationsLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : registrationsError ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Failed to load booking history.
            </p>
          ) : registrations.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No bookings yet.
            </p>
          ) : (
            /* Table Container for Responsiveness */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/75 border-b border-gray-100 text-gray-800 text-lg font-semibold">
                    <th className="py-4 px-6">Attendee</th>
                    <th className="py-4 px-6">Event</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Ticket</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {registrations.map(registration => (
                    <tr
                      key={registration.id}
                      className="hover:bg-gray-50/50 transition"
                    >
                      <td className="py-4 px-6 font-medium text-gray-600">
                        {registration.attendee.first_name}{" "}
                        {registration.attendee.last_name}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {registration.event.title}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {formatDate(registration.timeline.created_at)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center text-base font-medium px-2.5 py-1 rounded-md border ${
                            statusStyles[toBookingStatus(registration.status)]
                          }`}
                        >
                          {toBookingStatus(registration.status)}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-gray-600">
                        {registration.booking_reference}
                        <p className="font-sans text-xs text-gray-400 mt-0.5">
                          {formatTotal(registration)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-3 text-gray-400">
                          <button
                            onClick={() => handleView(registration)}
                            className="hover:text-blue-600 transition"
                            title="View"
                          >
                            <Eye size={18} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleEdit(registration)}
                            className="hover:text-amber-600 transition"
                            title="Buy again"
                          >
                            <Edit size={18} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleDownload(registration)}
                            className="hover:text-emerald-600 transition"
                            title="Download receipt"
                          >
                            <Download size={18} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleDelete(registration)}
                            className="hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;
