"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: "completed" | "active" | "upcoming";
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    title: "Open Nominations",
    date: "Weeks 1–2 (2 Weeks Total)",
    status: "completed",
    description:
      "Businesses submit nominations to enter the competition. Up to 100 businesses can secure a spot.",
  },
  {
    id: 2,
    title: "Momentum Round",
    date: "Weeks 3–4 (2 Weeks Total)",
    status: "active",
    description:
      "Community engagement determines which businesses build enough momentum to advance. Top 60 move forward.",
  },
  {
    id: 3,
    title: "Community Impact Round",
    date: "Weeks 5–6 (2 Weeks Total)",
    status: "upcoming",
    description:
      "Businesses demonstrate how they serve the community. Top 30 advance based on impact and engagement.",
  },
  {
    id: 4,
    title: "Innovation Showcase",
    date: "Weeks 7–8 (2 Weeks Total)",
    status: "upcoming",
    description:
      "Businesses present their unique value proposition. Top 15 advance to the expert review stage.",
  },
  {
    id: 5,
    title: "Final Championship",
    date: "Weeks 9–10 (2 Weeks Total)",
    status: "upcoming",
    description:
      "The top 8 businesses present their complete vision. Winners are selected by judges and community.",
  },
];

interface QuarterlyCycle {
  id: number;
  label: string;
  dateRange: string;
  isActive: boolean;
}

const QUARTERLY_CYCLES: QuarterlyCycle[] = [
  { id: 1, label: "Q1 2025", dateRange: "Jan 1 - Mar 31", isActive: true },
  { id: 2, label: "Q2 2025", dateRange: "Apr 1 - Jun 30", isActive: false },
  { id: 3, label: "Q3 2025", dateRange: "Jul 1 - Sep 30", isActive: false },
  { id: 4, label: "Q4 2025", dateRange: "Oct 1 - Dec 31", isActive: false },
];

const statusConfig = {
  completed: {
    bg: "bg-emerald-50 border-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    badgeText: "Completed",
    icon: CheckCircle,
    iconColor: "text-emerald-600",
  },
  active: {
    bg: "bg-blue-50 border-blue-500",
    badge: "bg-blue-100 text-blue-700",
    badgeText: "Active Now",
    icon: TrendingUp,
    iconColor: "text-blue-600",
  },
  upcoming: {
    bg: "bg-gray-50 border-gray-200",
    badge: "bg-gray-100 text-gray-500",
    badgeText: "Upcoming",
    icon: Clock,
    iconColor: "text-gray-400",
  },
};

export default function LeaderboardTab() {
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  return (
    <div className="space-y-6">
      {/* Timeline header card */}
      <div className="rounded-2xl border border-black/10 bg-white">
        <div className="bg-[#2563EB] rounded-t-2xl px-6 py-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="size-7" />
            <h2 className="text-xl font-semibold">Q1 2025 Timeline</h2>
          </div>
          <p className="text-sm text-white/80">
            Track the current quarter's progress and see what's happening when.
          </p>
        </div>

        {/* Quarter progress */}
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-black">
                Quarter Progress
              </h3>
              <p className="text-[13px] text-black/50">
                January 1 - March 31, 2025
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] text-[12px] font-medium">
              <Clock size={14} />
              -258 days remaining
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-black mb-2">
            <span>Overall Progress</span>
            <span className="text-[#2563EB] font-medium">100%</span>
          </div>
          <div className="w-full h-2.5 bg-[#2563EB] rounded-full mb-2" />
          <p className="text-[12px] text-black/45">Week 50 of 12</p>
        </div>

        {/* Timeline events */}
        <div className="p-6 space-y-4">
          {TIMELINE_EVENTS.map((event) => {
            const cfg = statusConfig[event.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={event.id}
                className={`p-4 rounded-xl border-2 ${cfg.bg} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`size-10 flex items-center justify-center rounded-xl ${cfg.iconColor} bg-white/80`}
                    >
                      <StatusIcon className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-medium text-black">
                        {event.title}
                      </h4>
                      <p className="text-[12px] text-black/45">{event.date}</p>
                      <p className="text-[13px] text-black/60 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-md text-[11px] font-medium ${cfg.badge}`}
                  >
                    {cfg.badgeText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Dates */}
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h3 className="text-base font-semibold text-black mb-4">Key Dates</h3>
        <div className="space-y-0 divide-y divide-black/5">
          {[
            { date: "January 1, 2025", event: "Q1 quarter begins, nominations open" },
            { date: "February 15, 2025", event: "Nominations close, voting begins" },
            { date: "March 15, 2025", event: "Final round voting ends" },
            { date: "March 25, 2025", event: "Winner announced" },
            { date: "March 31, 2025", event: "Q1 quarter ends" },
          ].map((item, idx) => (
            <div key={idx} className="py-4 flex items-start gap-3">
              <Calendar className="size-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-medium text-black">{item.date}</p>
                <p className="text-[13px] text-black/60">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What happens after winning */}
      <div className="rounded-2xl border border-black/10 bg-blue-50 p-6">
        <h3 className="text-base font-semibold text-black mb-4">
          What Happens After the Winner is Announced?
        </h3>
        <div className="space-y-3">
          {[
            "Winner receives professional media coverage and photography",
            "Featured spotlight placement on OSI homepage and newsletter",
            "Priority vendor placement at upcoming OSI events",
            "Dedicated social media promotion across OSI channels",
            "One-year Growth Plan membership at no cost",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[13px] text-black/70">
              <Trophy className="size-4 text-[#2563EB] shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly cycles */}
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h3 className="text-base font-semibold text-black mb-4">
          2025 Quarterly Cycle
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUARTERLY_CYCLES.map((cycle) => (
            <div
              key={cycle.id}
              className={`p-5 rounded-xl border transition-all ${
                cycle.isActive
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "bg-[#F5F5F7] text-black border-transparent"
              }`}
            >
              <h4
                className={`text-base font-semibold mb-1 ${
                  cycle.isActive ? "text-white" : "text-black"
                }`}
              >
                {cycle.label}
              </h4>
              <p
                className={`text-[12px] ${
                  cycle.isActive ? "text-white/70" : "text-black/50"
                }`}
              >
                {cycle.dateRange}
              </p>
              {cycle.isActive && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-lg text-[11px] font-medium">
                  <span className="size-2 rounded-full bg-white animate-pulse" />
                  Active Now
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
