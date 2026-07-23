"use client";

import React from "react";
import { Cloud, Briefcase, Sparkles, Ticket, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface ActivityItem {
  id: string;
  avatarSeed: number;
  title: string;
  subtitle: string;
}

interface UpcomingEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle: string;
  price: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const statCards: StatCard[] = [
  { label: "Total Votes", value: 0, icon: Cloud },
  { label: "Boss Beginning", value: 3, icon: Briefcase },
  { label: "Spotlight", value: 2, icon: Sparkles },
  { label: "My tickets", value: 0, icon: Ticket },
];

const bossBeginningActivity: ActivityItem[] = [
  {
    id: "1",
    avatarSeed: 11,
    title: "New Business profile Crated",
    subtitle: "Round 2 · 312 votes",
  },
  {
    id: "2",
    avatarSeed: 12,
    title: "Spotlight campaign approved",
    subtitle: "Round 2 · 450 votes",
  },
  {
    id: "3",
    avatarSeed: 13,
    title: "Spotlight campaign approved",
    subtitle: "Round 2 · 450 votes",
  },
];

const spotlightActivity: ActivityItem[] = [
  {
    id: "1",
    avatarSeed: 21,
    title: "Techkori summer campaign",
    subtitle: "Round 2 · 610 votes",
  },
  {
    id: "2",
    avatarSeed: 22,
    title: "ABC winter campaign",
    subtitle: "Round 1 · 610 votes",
  },
  {
    id: "3",
    avatarSeed: 23,
    title: "New work campaign",
    subtitle: "Round 2 · 610 votes",
  },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    day: "12",
    month: "May",
    title: "Football summit 2026",
    subtitle: "10:00 AM · New york",
    price: "$500",
  },
  {
    id: "2",
    day: "12",
    month: "May",
    title: "Artist Dance summit 2026",
    subtitle: "10:00 AM · London, USA",
    price: "$500",
  },
  {
    id: "3",
    day: "12",
    month: "May",
    title: "Football summit 2026",
    subtitle: "10:00 AM · New york",
    price: "$500",
  },
  {
    id: "4",
    day: "12",
    month: "May",
    title: "Football summit 2026",
    subtitle: "10:00 AM · New york",
    price: "$500",
  },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function StatCardItem({ label, value, icon: Icon }: StatCard) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2 mb-5 md:mb-6">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-blue-500" />
        </div>
        <span className="text-sm md:text-base text-slate-500">{label}</span>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

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

function ActivityCard({
  title,
  viewAllLabel = "View",
  items,
  onView,
  onViewProfile,
}: {
  title: string;
  viewAllLabel?: string;
  items: ActivityItem[];
  onView: () => void;
  onViewProfile: (item: ActivityItem) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm md:text-base font-semibold text-slate-900">
          {title}
        </h2>
        <button
          type="button"
          onClick={onView}
          className="text-xs md:text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors flex items-center gap-0.5"
        >
          {viewAllLabel}
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <Avatar seed={item.avatarSeed} />
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base text-slate-800 truncate">
                {item.title}
              </p>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                {item.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onViewProfile(item)}
              className="bg-emerald-50 text-emerald-600 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors flex-shrink-0"
            >
              View profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const handleView = (section: string) => console.log("View", section);
  const handleViewProfile = (item: ActivityItem) =>
    console.log("View profile", item);
  const handleBuy = (ev: UpcomingEvent) => console.log("Buy", ev);

  return (
    <div className=" bg-[#F5F6F8]">
      <div className=" space-y-6">
        <h1 className="text-lg md:text-xl text-slate-800">
          Welcome back, <span className="font-medium">John</span>
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {statCards.map(stat => (
            <StatCardItem key={stat.label} {...stat} />
          ))}
        </div>

        {/* Boss beginning + Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ActivityCard
            title="Boss beginning"
            items={bossBeginningActivity}
            onView={() => handleView("Boss beginning")}
            onViewProfile={handleViewProfile}
          />
          <ActivityCard
            title="Spotlight"
            items={spotlightActivity}
            onView={() => handleView("Spotlight")}
            onViewProfile={handleViewProfile}
          />
        </div>

        {/* Upcoming event */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-3">
            Upcoming event
          </h2>
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
                  <p className="text-sm md:text-base text-slate-800 truncate">
                    {ev.title}
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    {ev.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBuy(ev)}
                  className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                >
                  {ev.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
