"use client";

import React from "react";
import {
  Briefcase,
  Sparkles,
  ThumbsUp,
  Rows3,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface ActivityItem {
  title: string;
  time: string;
}

interface ChartPoint {
  day: string;
  value: number;
}

interface VotingSummaryItem {
  value: string;
  label: string;
}

interface EventItem {
  day: string;
  month: string;
  title: string;
  meta: string;
  price: string;
}

const statCards: StatCard[] = [
  { label: "Total Business", value: 3, icon: Briefcase },
  { label: "Total Spotlight", value: 3, icon: Sparkles },
  { label: "Vote", value: 2496, icon: ThumbsUp },
  { label: "Parching events", value: 4, icon: Rows3 },
];

const activity: ActivityItem[] = [
  { title: "New Business profile Crated", time: "2 hour ago" },
  { title: "Spotlight campaign approved", time: "6 hour ago" },
  { title: "Your business received 124 new votes", time: "Yesterday" },
  { title: "Event booking confirmed", time: "2 days ago" },
  { title: "Business profile update sucessfully", time: "3 days ago" },
  { title: "Your business received 124 new votes", time: "4 days ago" },
];

const chartData: ChartPoint[] = [
  { day: "Sun", value: 68 },
  { day: "Mon", value: 82 },
  { day: "Tue", value: 35 },
  { day: "Web", value: 78 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 85 },
];

const votingSummary: VotingSummaryItem[] = [
  { value: "1.8k", label: "Claps" },
  { value: "50", label: "Save" },
  { value: "50", label: "Save" },
  { value: "#4", label: "Rank" },
];

const events: EventItem[] = [
  {
    day: "12",
    month: "May",
    title: "Football summit 2026",
    meta: "10:00 AM · New york",
    price: "$500",
  },
  {
    day: "12",
    month: "May",
    title: "Artist Dance summit 2026",
    meta: "10:00 AM · London, USA",
    price: "$500",
  },
  {
    day: "12",
    month: "May",
    title: "Football summit 2026",
    meta: "10:00 AM · New york",
    price: "$500",
  },
  {
    day: "12",
    month: "May",
    title: "Football summit 2026",
    meta: "10:00 AM · New york",
    price: "$500",
  },
];

interface AvatarProps {
  seed: number;
}

function Avatar({ seed }: AvatarProps) {
  return (
    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex-shrink-0 overflow-hidden">
      <img
        src={`https://i.pravatar.cc/72?img=${seed}`}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface ChartTooltipPayloadEntry {
  value?: number | string;
  name?: string;
  dataKey?: string | number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadEntry[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white text-xs md:text-sm px-2.5 py-1.5 rounded-md shadow border border-slate-100 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
      View profile
      <span className="ml-2 font-medium">{payload[0].value}</span>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F6F8] font-sans text-slate-800">
      <div className="space-y-6">
        <h1 className="text-lg md:text-xl text-slate-800">
          Welcome back, <span className="font-medium">John</span>
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                </div>
                <span className="text-sm md:text-base text-slate-500">
                  {label}
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-slate-900">
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h2 className="text-base md:text-lg font-medium text-slate-900 mb-4">
              Recent Activity
            </h2>
            <div className="divide-y divide-slate-100">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <Avatar seed={i + 10} />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-slate-700 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: chart + voting summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base md:text-lg font-medium text-slate-900">
                  Spotlight performance
                </h2>
                <button className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-500 flex items-center gap-1">
                  View <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
              <div className="h-56 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 30, right: 10, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fill: "#94a3b8" }}
                    />
                    <Tooltip
                      cursor={false}
                      content={(props: any) => (
                        <ChartTooltip
                          active={props.active}
                          payload={props.payload}
                        />
                      )}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base md:text-lg font-medium text-slate-900">
                  Voting summary
                </h2>
                <button className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-500 flex items-center gap-1">
                  View <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
              <div className="grid grid-cols-4 divide-x divide-slate-100 text-center p-2 border border-[#E8EFFF] rounded-xl">
                {votingSummary.map((item, i) => (
                  <div key={i} className="px-2">
                    <div className="text-lg md:text-xl font-semibold text-slate-900">
                      {item.value}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <h2 className="text-base md:text-lg font-medium text-slate-900 mb-3">
            Upcoming event
          </h2>
          <div className="divide-y divide-slate-100">
            {events.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
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
                    {ev.meta}
                  </p>
                </div>
                <button className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors flex-shrink-0">
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
