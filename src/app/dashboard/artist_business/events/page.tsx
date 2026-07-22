"use client";

import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface UpcomingEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle: string;
}

type BookingStatus = "Confirm" | "Pending" | "Cancelled";

interface Booking {
  id: string;
  attendee: string;
  event: string;
  date: string;
  status: BookingStatus;
  ticket: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    day: "12",
    month: "May",
    title: "Behind the screen vlog",
    subtitle: "Video content",
  },
  {
    id: "2",
    day: "12",
    month: "May",
    title: "New album announcement",
    subtitle: "Announcement",
  },
  {
    id: "3",
    day: "12",
    month: "May",
    title: "Behind the screen vlog",
    subtitle: "Video content",
  },
  {
    id: "4",
    day: "12",
    month: "May",
    title: "Behind the screen vlog",
    subtitle: "Video content",
  },
];

const bookings: Booking[] = [
  {
    id: "1",
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
  {
    id: "2",
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
  {
    id: "3",
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
  {
    id: "4",
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
];

const statusStyles: Record<BookingStatus, string> = {
  Confirm: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-500",
  Cancelled: "bg-red-50 text-red-500",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

const columns = ["Attendee", "Event", "Date", "Status", "Ticket", "Actions"];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const handleViewAll = () => console.log("View all events");
  const handleBuyTicket = (e: UpcomingEvent) => console.log("Buy ticket", e);
  const handleCreateAccount = () => console.log("Create account");
  const handleView = (b: Booking) => console.log("View", b);
  const handleEdit = (b: Booking) => console.log("Edit", b);
  const handleDelete = (b: Booking) => console.log("Delete", b);

  return (
    <div className=" bg-[#F5F6F8] ">
      <div className=" space-y-6">
        {/* Upcoming event */}
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

          <div className="divide-y divide-slate-100">
            {upcomingEvents.map(ev => (
              <div
                key={ev.id}
                className="flex items-center gap-4 py-3.5 first:pt-1 last:pb-1"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-sm md:text-base font-semibold text-blue-500 leading-none">
                    {ev.day}
                  </span>
                  <span className="text-[10px] md:text-xs text-blue-400 leading-none mt-0.5">
                    {ev.month}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-medium text-slate-800 truncate">
                    {ev.title}
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    {ev.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBuyTicket(ev)}
                  className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                >
                  Buy Ticket
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking history */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              Booking history
            </h2>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
            >
              Create account
            </button>
          </div>

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
                {bookings.map(b => (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {b.attendee}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.event}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.date}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.ticket}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          type="button"
                          title="View"
                          onClick={() => handleView(b)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => handleEdit(b)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(b)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
