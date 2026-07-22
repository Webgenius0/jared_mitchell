import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

// --- Mock Data ---
const upcomingEvents = [
  {
    id: 1,
    day: "12",
    month: "May",
    title: "Behind the screen vlog",
    category: "Video content",
  },
  {
    id: 2,
    day: "12",
    month: "May",
    title: "New album announcement",
    category: "Announcement",
  },
  {
    id: 3,
    day: "12",
    month: "May",
    title: "Behind the screen vlog",
    category: "Video content",
  },
  {
    id: 4,
    day: "12",
    month: "May",
    title: "Behind the screen vlog",
    category: "Video content",
  },
];

const bookingHistory = [
  {
    id: 1,
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
  {
    id: 2,
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
  {
    id: 3,
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
  {
    id: 4,
    attendee: "Rahim Khan",
    event: "Dhaka Tech Summit 2025",
    date: "2025-05-02",
    status: "Confirm",
    ticket: "TKT-001",
  },
];

const Page = () => {
  return (
    <div className=" font-sans text-gray-800">
      <div className=" space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming event
            </h2>
            <button className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">
              View all
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-500 rounded-lg w-12 h-12 flex-shrink-0">
                    <span className="text-base font-bold leading-none">
                      {event.day}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider mt-0.5">
                      {event.month}
                    </span>
                  </div>
                  {/* Event Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {event.category}
                    </p>
                  </div>
                </div>
                {/* Action Button */}
                <button className="bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-sm">
                  Buy Ticket
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BOOKING HISTORY SECTION ================= */}
        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Booking history
            </h2>
            <button className="bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-sm">
              Create account
            </button>
          </div>

          {/* Table Container for Responsiveness */}
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
                {bookingHistory.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-medium text-gray-600">
                      {row.attendee}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{row.event}</td>
                    <td className="py-4 px-6 text-gray-500">{row.date}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center bg-green-50 text-green-700 text-base font-medium px-2.5 py-1 rounded-md border border-green-100">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-gray-600">
                      {row.ticket}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-3 text-gray-400">
                        <button
                          className="hover:text-blue-600 transition"
                          title="View"
                        >
                          <Eye size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          className="hover:text-amber-600 transition"
                          title="Edit"
                        >
                          <Edit size={18} strokeWidth={1.5} />
                        </button>
                        <button
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
        </section>
      </div>
    </div>
  );
};

export default Page;
