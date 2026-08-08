"use client";

import React from "react";
import { Heart, Sparkles, ThumbsUp, BarChart3, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useGetContestSummary } from "@/Hooks/api/dashboard_api";

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
  share: number;
  fire: number;
}

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
    { label: "Shares", value: data.share, colorClass: "bg-blue-500" },
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
  const { data, isLoading, error } = useGetContestSummary();
  const summary = data?.data;

  const overall = summary?.overall_summary ?? {};

  const voteStats: StatCard[] = [
    {
      label: "Total vote",
      value: overall?.total_votes ?? "—",
      icon: Heart,
    },
    {
      label: "Todays vote",
      value: overall?.todays_votes ?? "—",
      icon: Sparkles,
    },
    {
      label: "Weekly vote",
      value: overall?.this_weeks_votes ?? "—",
      icon: ThumbsUp,
    },
    {
      label: "Monthly vote",
      value: overall?.this_months_votes ?? "—",
      icon: BarChart3,
    },
  ];

  const chartData: ChartPoint[] = (
    summary?.year_based_monthly_summary ?? []
  ).map((d: { month: string; clap: number; share: number; fire: number }) => ({
    month: d.month,
    clap: d.clap,
    share: d.share,
    fire: d.fire,
  }));

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
                Shares
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Fire
              </span>
            </div>
          </div>
          <div className="h-64 md:h-72">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            ) : error ? (
              <p className="text-sm text-slate-400 text-center h-full flex items-center justify-center">
                Failed to load chart data.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 30, right: 10, left: 0, bottom: 4 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#e2e8f0"
                    strokeDasharray="0"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, "auto"]}
                    allowDecimals={false}
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
                  <Bar
                    dataKey="clap"
                    stackId="votes"
                    fill="#10b981"
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="share"
                    stackId="votes"
                    fill="#3b82f6"
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="fire"
                    stackId="votes"
                    fill="#a855f7"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
