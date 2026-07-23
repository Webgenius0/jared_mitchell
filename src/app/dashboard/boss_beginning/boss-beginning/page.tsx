"use client";

import React from "react";
import { Heart, Sparkles, ThumbsUp, BarChart3 } from "lucide-react";
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const voteStats: StatCard[] = [
  { label: "Total vote", value: 1248, icon: Heart },
  { label: "Todays vote", value: 124, icon: Sparkles },
  { label: "Weekly vote", value: 842, icon: ThumbsUp },
  { label: "Monthly vote", value: 3210, icon: BarChart3 },
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

interface ChartTooltipProps {
  active?: boolean;
  payload?: { payload?: ChartPoint }[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length || !payload[0].payload)
    return null;
  const data = payload[0].payload;

  const rows: { label: string; value: number; colorClass: string }[] = [
    { label: "Clap", value: data.clap, colorClass: "bg-emerald-500" },
    { label: "Love", value: data.love, colorClass: "bg-blue-500" },
    { label: "Fire", value: data.fire, colorClass: "bg-purple-500" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 min-w-[140px]">
      <div className="space-y-2">
        {rows.map(row => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-6"
          >
            <span className="flex items-center gap-2 text-sm md:text-base text-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full ${row.colorClass}`} />
              {row.label}
            </span>
            <span className="text-sm md:text-base font-medium text-slate-900">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className=" bg-[#F5F6F8]">
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
                Love
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Fire
              </span>
            </div>
          </div>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e2e8f0"
                  strokeDasharray="0"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  width={32}
                />
                <XAxis
                  dataKey="month"
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                  interval={0}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
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
      </div>
    </div>
  );
}
