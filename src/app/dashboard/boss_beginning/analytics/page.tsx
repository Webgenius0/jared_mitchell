"use client";

import React from "react";
import { Heart, Sparkles, ThumbsUp, BarChart3, Cloud } from "lucide-react";
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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

interface ChartPoint {
  month: string;
  clap: number;
  love: number;
  fire: number;
  total: number;
}

interface EngagementItem {
  label: string;
  value: number; // 0-100 percent width
  clicks: number;
  colorClass: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const voteStats: StatCard[] = [
  { label: "Total vote", value: 1248, icon: Heart },
  { label: "Todays vote", value: 124, icon: Sparkles },
  { label: "Weekly vote", value: 842, icon: ThumbsUp },
  { label: "Monthly vote", value: 3210, icon: BarChart3 },
];

const reachStats: StatCard[] = [
  { label: "Total Reach", value: "24800", icon: Cloud },
  { label: "Profile Visits", value: "8,420", icon: Sparkles },
  { label: "Spotlight View", value: 16380, icon: ThumbsUp },
];

const rawChartData: Omit<ChartPoint, "total">[] = [
  { month: "Jan", clap: 6, love: 5, fire: 4 },
  { month: "Feb", clap: 18, love: 14, fire: 8 },
  { month: "Mar", clap: 26, love: 20, fire: 12 },
  { month: "Apr", clap: 17, love: 13, fire: 8 },
  { month: "May", clap: 19, love: 15, fire: 8 },
  { month: "Jun", clap: 10, love: 7, fire: 4 },
  { month: "Jul", clap: 16, love: 12, fire: 7 },
  { month: "Aug", clap: 23, love: 18, fire: 11 },
  { month: "Sep", clap: 11, love: 9, fire: 5 },
  { month: "Oct", clap: 5, love: 4, fire: 3 },
  { month: "Nov", clap: 22, love: 17, fire: 9 },
  { month: "Dec", clap: 15, love: 11, fire: 7 },
];

const chartData: ChartPoint[] = rawChartData.map(d => ({
  ...d,
  total: d.clap + d.love + d.fire,
}));

const engagementData: EngagementItem[] = [
  {
    label: "Spotlight view",
    value: 68,
    clicks: 884,
    colorClass: "bg-blue-500",
  },
  {
    label: "Profile visits",
    value: 32,
    clicks: 142,
    colorClass: "bg-purple-500",
  },
  { label: "Total vote", value: 22, clicks: 142, colorClass: "bg-emerald-500" },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function StatCardItem({ label, value, icon: Icon }: StatCard) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2 mb-4 md:mb-5">
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

interface ChartTooltipPayloadEntry {
  value?: number | string;
  payload?: ChartPoint;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadEntry[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white text-xs md:text-sm px-2.5 py-1.5 rounded-md shadow border border-slate-100 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
      View profile
      <span className="ml-1 font-medium">{payload[0].value}</span>
    </div>
  );
}

function EngagementBar({ label, value, clicks, colorClass }: EngagementItem) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs md:text-sm font-medium text-slate-700">
          {label}
        </span>
        <span className="text-[11px] md:text-xs text-slate-400">
          {clicks} clicks
        </span>
      </div>
      <div className="w-full h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className="">
      <div className=" space-y-6">
        {/* Votes */}
        <div>
          <h2 className="text-sm md:text-base font-medium text-slate-800 mb-3">
            Votes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {voteStats.map(stat => (
              <StatCardItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Spotlight Reach */}
        <div>
          <h2 className="text-sm md:text-base font-medium text-slate-800 mb-3">
            Spotlight Reach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {reachStats.map(stat => (
              <StatCardItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Votes performance */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              Votes performance
            </h2>
            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Clap
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Shares
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Save
              </span>
            </div>
          </div>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 30, right: 10, left: 0, bottom: 4 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  tick={{ fontSize: 13, fill: "#94a3b8" }}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 20, 40, 60]}
                  domain={[0, 60]}
                  tick={{ fontSize: 13, fill: "#94a3b8" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(59,130,246,0.06)" }}
                  content={(props: any) => (
                    <ChartTooltip
                      active={props.active}
                      payload={props.payload}
                    />
                  )}
                />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={28}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill="#3b82f6" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-5">
            Engagement Rate
          </h2>
          <div className="space-y-5">
            {engagementData.map(item => (
              <EngagementBar key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
