"use client";

import React from "react";
import { ShoppingBag, Megaphone, Ticket, Loader2 } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useRouter } from "next/navigation";
import { useGetArtistDashboardStats } from "@/Hooks/api/dashboard_api";
import { getUpcomingEvents } from "@/Hooks/api/cms_api";
import { CMSEventItem } from "@/Types/cms";
import useAuth from "@/Hooks/useAuth";

// ─── Event formatting helpers ────────────────────────────────────────────────
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

// Custom graph tooltip styled precisely like the visual design popover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-md flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
          <span className="text-gray-500 font-medium">View profile</span>
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <span className="font-semibold text-gray-900">{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: statsData, isLoading } = useGetArtistDashboardStats();
  const {
    data: eventsData,
    isLoading: isEventsLoading,
    error: eventsError,
  } = getUpcomingEvents();

  const stats = statsData?.data?.stats;
  const performance = statsData?.data?.spotlight_performance ?? [];

  // ================= METRICS =================
  const metrics = [
    {
      id: 1,
      label: "Total Spotlight",
      count: stats?.total_spotlight ?? "—",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-500",
    },
    {
      id: 2,
      label: "Approved Spotlight",
      count: stats?.approved_spotlight ?? "—",
      icon: Megaphone,
      color: "bg-blue-50 text-blue-500",
    },
    {
      id: 3,
      label: "Ticket Purchasing",
      count: stats?.ticket_purchasing ?? "—",
      icon: Ticket,
      color: "bg-blue-50 text-blue-500",
    },
  ];

  // ================= CHART DATA =================
  const performanceData = performance.map((item: any) => ({
    name: item.month,
    value: Number(item.value) || 0,
  }));

  // Keep the Y axis readable when real values exceed the old fixed 0–100 range
  const maxValue = Math.max(100, ...performanceData.map(d => d.value));
  const tickStep = Math.max(1, Math.round(maxValue / 4));
  const ticks = [0, tickStep, tickStep * 2, tickStep * 3, tickStep * 4];

  // ================= UPCOMING EVENTS =================
  const upcomingEvents =
    (eventsData?.data?.events as CMSEventItem[] | undefined) ?? [];

  const displayName = user?.profile?.name || user?.profile?.username || "User";

  return (
    <div className=" space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Welcome back, <span className="font-medium">{displayName}</span>
        </h1>
      </div>

      {/* ================= METRICS STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(card => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between h-36"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin text-blue-300" />
                  ) : (
                    <IconComponent size={20} strokeWidth={2} />
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-600 tracking-wide">
                  {card.label}
                </span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900 mt-4">
                {isLoading ? (
                  <span className="text-gray-300">—</span>
                ) : (
                  card.count
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================= GRAPH PERFORMANCE SECTION ================= */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-gray-900">
            Spotlight performance
          </h2>
          <button className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition">
            View
          </button>
        </div>

        {/* Chart Window Wrap */}
        <div className="w-full h-72 text-[10px] font-semibold text-gray-400">
          {performanceData.length === 0 && !isLoading ? (
            <p className="text-sm text-gray-400 text-center h-full flex items-center justify-center">
              No performance data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorValue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  stroke="#9CA3AF"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  dx={-5}
                  domain={[0, maxValue]}
                  ticks={ticks}
                  stroke="#9CA3AF"
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "#F3F4F6", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#A855F7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  activeDot={{ r: 4, strokeWidth: 0, fill: "#A855F7" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* ================= UPCOMING EVENTS SECTION ================= */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-900">Upcoming event</h2>
          <button
            type="button"
            onClick={() => router.push("/events")}
            className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
          >
            View all
          </button>
        </div>

        {isEventsLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          </div>
        ) : eventsError ? (
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
                    {/* Date Stamp */}
                    <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-500 rounded-xl w-12 h-12 flex-shrink-0">
                      <span className="text-base font-extrabold leading-none">
                        {day}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                        {month}
                      </span>
                    </div>
                    {/* Information Texts */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="text-xs font-normal text-gray-400 mt-0.5">
                        {formatEventMeta(event)}
                      </p>
                    </div>
                  </div>
                  {/* Buy Ticket Button */}
                  <button
                    type="button"
                    onClick={() => router.push(`/events/${event.slug}`)}
                    className="bg-blue-500 text-white text-xs font-normal px-6 py-2.5 rounded-full hover:bg-blue-700 transition shadow-sm flex-shrink-0"
                  >
                    Buy Ticket
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
