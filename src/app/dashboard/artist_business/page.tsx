"use client";

import React from "react";
import { ShoppingBag, Megaphone, Ticket } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// --- Mock Data ---
const metrics = [
  {
    id: 1,
    label: "Total Spotlight",
    count: 3,
    icon: ShoppingBag,
    color: "bg-blue-50 text-blue-500",
  },
  {
    id: 2,
    label: "Approved Spotlight",
    count: 3,
    icon: Megaphone,
    color: "bg-blue-50 text-blue-500",
  },
  {
    id: 3,
    label: "Ticket Parching",
    count: 4,
    icon: Ticket,
    color: "bg-blue-50 text-blue-500",
  },
];

const performanceData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 85 },
  { name: "Mar", value: 65 },
  { name: "Apr", value: 40 },
  { name: "May", value: 50 },
  { name: "Jun", value: 80 },
  { name: "Jul", value: 70 },
  { name: "Aug", value: 45 },
  { name: "Sep", value: 50 },
  { name: "Oct", value: 85 },
  { name: "Nov", value: 80 },
  { name: "Dec", value: 55 },
];

const upcomingEvents = [
  {
    id: 1,
    day: "12",
    month: "May",
    title: "Football summit 2026",
    time: "10:00 AM - New york",
    price: "$  500",
  },
  {
    id: 2,
    day: "12",
    month: "May",
    title: "Artist Dance summit 2026",
    time: "10:00 AM - London, USA",
    price: "$ 500",
  },
  {
    id: 3,
    day: "12",
    month: "May",
    title: "Football summit 2026",
    time: "10:00 AM - New york",
    price: "$ 500",
  },
  {
    id: 4,
    day: "12",
    month: "May",
    title: "Football summit 2026",
    time: "10:00 AM - New york",
    price: "$ 500",
  },
];

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
  return (
    <div className=" space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Welcome back, John</h1>
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
                  <IconComponent size={20} strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold text-gray-600 tracking-wide">
                  {card.label}
                </span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900 mt-4">
                {card.count}
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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
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
        </div>
      </section>

      {/* ================= UPCOMING EVENTS SECTION ================= */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-6">
          Upcoming event
        </h2>

        <div className="divide-y divide-gray-100">
          {upcomingEvents.map(event => (
            <div
              key={event.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center space-x-4">
                {/* Date Stamp */}
                <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-500 rounded-xl w-12 h-12 flex-shrink-0">
                  <span className="text-base font-extrabold leading-none">
                    {event.day}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                    {event.month}
                  </span>
                </div>
                {/* Information Texts */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-xs font-normal text-gray-400 mt-0.5">
                    {event.time}
                  </p>
                </div>
              </div>
              {/* Checkout Badge Pill */}
              <button className="bg-blue-500 text-white text-xs font-normal px-6 py-2.5 rounded-full hover:bg-blue-700 transition shadow-sm">
                {event.price}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
