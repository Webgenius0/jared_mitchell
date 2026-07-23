"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RoundItem {
  id: string;
  avatarSeed: number;
  title: string;
  totalVotes: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const rounds: RoundItem[] = [
  {
    id: "1",
    avatarSeed: 11,
    title: "New Business profile Crated",
    totalVotes: "812 votes",
    startDate: "21-08-2026",
    endDate: "21-10-2026",
    active: true,
  },
  {
    id: "2",
    avatarSeed: 12,
    title: "New Business profile Crated",
    totalVotes: "812 votes",
    startDate: "21-08-2026",
    endDate: "21-10-2026",
    active: false,
  },
  {
    id: "3",
    avatarSeed: 13,
    title: "New Business profile Crated",
    totalVotes: "812 votes",
    startDate: "21-08-2026",
    endDate: "21-10-2026",
    active: false,
  },
  {
    id: "4",
    avatarSeed: 14,
    title: "New Business profile Crated",
    totalVotes: "812 votes",
    startDate: "21-08-2026",
    endDate: "21-10-2026",
    active: false,
  },
  {
    id: "5",
    avatarSeed: 15,
    title: "New Business profile Crated",
    totalVotes: "812 votes",
    startDate: "21-08-2026",
    endDate: "21-10-2026",
    active: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Avatar({ seed }: { seed: number }) {
  return (
    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex-shrink-0 overflow-hidden">
      <img
        src={`https://i.pravatar.cc/72?img=${seed}`}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const handleView = () => console.log("View all rounds");
  const handleViewProfile = (item: RoundItem) =>
    console.log("View profile", item);

  return (
    <div className=" bg-[#F5F6F8]">
      <div className=" bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Spotlight Round
          </h1>
          <button
            type="button"
            onClick={handleView}
            className="text-xs md:text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
          >
            View
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {rounds.map(item => (
            <div
              key={item.id}
              className={`grid grid-cols-[1.8fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 md:px-6 py-3.5 md:py-4 ${
                item.active ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar seed={item.avatarSeed} />
                <div className="min-w-0">
                  <p className="text-sm md:text-base text-slate-800 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    {item.totalVotes}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-slate-400">
                  Total Votes
                </p>
                <p className="text-sm md:text-base text-slate-700 mt-0.5">
                  {item.totalVotes}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-slate-400">
                  Start Date
                </p>
                <p className="text-sm md:text-base text-slate-700 mt-0.5">
                  {item.startDate}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-slate-400">
                  End Date
                </p>
                <p className="text-sm md:text-base text-slate-700 mt-0.5">
                  {item.endDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleViewProfile(item)}
                disabled={!item.active}
                className={`text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full transition-colors flex-shrink-0 ${
                  item.active
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
