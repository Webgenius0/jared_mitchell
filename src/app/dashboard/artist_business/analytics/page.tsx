"use client";

import React from "react";
import { ShoppingBag, Megaphone, ThumbsUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

interface ChartPoint {
  month: string;
  value: number;
}

// Updated data matching the exact icon selections from the mockup layout image
const reachStats: StatCard[] = [
  { label: "Total Reach", value: "24800", icon: ShoppingBag },
  { label: "Profile Visits", value: "8,420", icon: Megaphone },
  { label: "Spotlight View", value: 16380, icon: ThumbsUp },
];

const chartData: ChartPoint[] = [
  { month: "Jun", value: 18 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 58 },
  { month: "Apr", value: 44 },
  { month: "May", value: 52 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 40 },
  { month: "Aug", value: 56 },
  { month: "Sep", value: 29 },
  { month: "Oct", value: 13 },
  { month: "Nov", value: 50 },
  { month: "Dec", value: 36 },
];

function StatCardItem({ label, value, icon: Icon }: StatCard) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100/50 shadow-sm flex flex-col justify-between h-36">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-[18px] h-[18px] text-blue-500" />
        </div>
        <span className="text-xs font-semibold text-gray-500 tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-xl font-bold text-gray-900 mt-4">{value}</div>
    </div>
  );
}

interface ChartTooltipPayloadEntry {
  value?: number | string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadEntry[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-md flex items-center space-x-3 text-xs">
      <div className="flex items-center space-x-1">
        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
        <span className="text-gray-500 font-medium">View profile</span>
      </div>
      <div className="w-px h-3 bg-gray-200" />
      <span className="font-semibold text-gray-900">{payload[0].value}</span>
    </div>
  );
}

export default function Page() {
  return (
    <div className="bg-gray-50/50  space-y-8">
      {/* Spotlight Reach */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">
          Spotlight Reach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reachStats.map(stat => (
            <StatCardItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Spotlight performance */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-900">
            Spotlight performance
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-wide text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Clap
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Shares
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Save
            </span>
          </div>
        </div>

        <div className="h-72 w-full text-[10px] font-semibold text-gray-400">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#F3F4F6" />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{ fill: "#9CA3AF" }}
                dx={-5}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{ fill: "#9CA3AF" }}
                dy={10}
              />
              <Tooltip
                cursor={{ fill: "rgba(59,130,246,0.03)" }}
                content={(props: any) => (
                  <ChartTooltip active={props.active} payload={props.payload} />
                )}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={20}>
                {chartData.map((_, i) => (
                  <Cell
                    key={i}
                    fill="#1d4ed8"
                    className="fill-blue-600 hover:fill-blue-700 transition-colors duration-200"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
