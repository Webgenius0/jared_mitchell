"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getUpcomingEvents } from "@/Hooks/api/cms_api";
import { Download, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import CancelTicketModal from "@/Components/Common/CancelTicketModal";
import {
  useCancelEventRegistration,
  useEventRegistrations,
} from "@/Hooks/api/dashboard_api";
import { CMSEventItem, EventRegistration } from "@/Types/cms";
import { downloadBookingReceipt } from "@/lib/utils";


type BookingStatus = "Confirm" | "Pending" | "Cancelled";

const statusStyles: Record<BookingStatus, string> = {
  Confirm: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-500",
  Cancelled: "bg-red-50 text-red-500",
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

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

const columns = ["Attendee", "Event", "Date", "Status", "Ticket", "Actions"];


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


export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cancellingRegistration, setCancellingRegistration] =
    useState<EventRegistration | null>(null);
  const { data, isLoading, error } = getUpcomingEvents();
  const {
    data: registrationsData,
    isLoading: isRegistrationsLoading,
    error: registrationsError,
  } = useEventRegistrations();
  const { mutateAsync: cancelRegistration, isPending: isCancelling } =
    useCancelEventRegistration();

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
  const handleCancel = (registration: EventRegistration) =>
    setCancellingRegistration(registration);
  const handleDownload = (registration: EventRegistration) =>
    downloadBookingReceipt(registration);

  const confirmCancel = async () => {
    if (!cancellingRegistration) return;
    await cancelRegistration(
      {
        endpoint: `/v1/event-registrations/${cancellingRegistration.id}/cancel`,
      },
      {
        onSuccess: (res: any) => {
          if (res?.success) {
            setCancellingRegistration(null);
            queryClient.invalidateQueries({
              queryKey: ["event-registrations"],
            });
          }
        },
      },
    );
  };

  return (
    <div className=" bg-[#F5F6F8]">
      <div className=" space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm md:text-base font-semibold text-slate-900">
              Upcoming event
            </h2>
            <button
              type="button"
              onClick={handleViewAll}
              className="text-xs md:text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
            >
              View all
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-sm text-slate-400 text-center py-10">
              Failed to load upcoming events.
            </p>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">
              No upcoming events right now.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcomingEvents.map(event => {
                const { day, month } = formatEventDate(event.starts_at);
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 py-3.5 first:pt-1 last:pb-1"
                  >
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-sm md:text-base font-semibold text-blue-500 leading-none">
                        {day}
                      </span>
                      <span className="text-[10px] md:text-xs text-blue-400 leading-none mt-0.5">
                        {month}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-medium text-slate-800 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                        {formatEventMeta(event)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBuyTicket(event)}
                      className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                    >
                      Buy Ticket
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              Booking history
            </h2>
          </div>

          {isRegistrationsLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : registrationsError ? (
            <p className="text-sm text-slate-400 text-center py-10">
              Failed to load booking history.
            </p>
          ) : registrations.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">
              No bookings yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    {columns.map(col => (
                      <th
                        key={col}
                        className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrations.map(registration => (
                    <tr
                      key={registration.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                        {registration.attendee.first_name}{" "}
                        {registration.attendee.last_name}
                      </td>
                      <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                        {registration.event.title}
                      </td>
                      <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                        {formatDate(registration.timeline.created_at)}
                      </td>
                      <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                        <StatusBadge
                          status={toBookingStatus(registration.status)}
                        />
                      </td>
                      <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                        {registration.booking_reference}
                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatTotal(registration)}
                        </p>
                      </td>
                      <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            type="button"
                            title="View"
                            onClick={() => handleView(registration)}
                            className="text-slate-400 hover:text-blue-500 transition-colors"
                          >
                            <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          </button>
                          {/* <button
                            type="button"
                            title="Buy again"
                            onClick={() => handleEdit(registration)}
                            className="text-slate-400 hover:text-blue-500 transition-colors"
                          >
                            <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          </button> */}
                        <button
                          type="button"
                          title="Download receipt"
                          onClick={() => handleDownload(registration)}
                          className="text-slate-400 hover:text-emerald-500 transition-colors"
                        >
                          <Download className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        {toBookingStatus(registration.status) !==
                          "Cancelled" && (
                          <button
                            type="button"
                            title="Cancel ticket"
                            onClick={() => handleCancel(registration)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          </button>
                        )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <CancelTicketModal
        open={!!cancellingRegistration}
        onClose={() => setCancellingRegistration(null)}
        eventTitle={cancellingRegistration?.event.title}
        bookingReference={cancellingRegistration?.booking_reference}
        isPending={isCancelling}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
