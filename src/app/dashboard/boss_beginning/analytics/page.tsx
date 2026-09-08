"use client";

import React from "react";
import {
  Heart,
  Sparkles,
  ThumbsUp,
  BarChart3,
  Cloud,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useGetBusinessDashboardAnalytics } from "@/Hooks/api/dashboard_api";

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
  save: number;
  total: number;
}

interface EngagementItem {
  label: string;
  value: number; // 0-100 percent width
  count: number;
  colorClass: string;
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

interface ChartTooltipPayloadEntry {
  value?: number | string;
  name?: string;
  dataKey?: string | number;
  color?: string;
  payload?: ChartPoint;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadEntry[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0]?.payload;
  return (
    <div className="bg-white text-xs md:text-sm px-3 py-2 rounded-md shadow border border-slate-100 min-w-[130px]">
      {point?.month ? (
        <p className="font-medium text-slate-900 mb-1.5">{point.month}</p>
      ) : null}
      <div className="space-y-1">
        {payload.map(entry => (
          <div
            key={String(entry.dataKey ?? entry.name ?? "")}
            className="flex items-center gap-1.5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: entry.color || "#94a3b8" }}
            />
            <span className="text-slate-500 capitalize">
              {String(entry.name ?? "")}
            </span>
            <span className="ml-auto pl-3 font-medium text-slate-900">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
      {point?.total != null ? (
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
          <span className="text-slate-500">Total</span>
          <span className="ml-auto pl-3 font-semibold text-slate-900">
            {point.total}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function EngagementBar({ label, value, count, colorClass }: EngagementItem) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs md:text-sm font-medium text-slate-700">
          {label}
        </span>
        <span className="text-[11px] md:text-xs text-slate-400">{count}</span>
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
  const { data, isLoading, error } = useGetBusinessDashboardAnalytics();
  const analytics = data?.data;

  const voteStats: StatCard[] = [
    {
      label: "Total vote",
      value: analytics?.votes?.total_vote ?? "—",
      icon: Heart,
    },
    {
      label: "Todays vote",
      value: analytics?.votes?.todays_vote ?? "—",
      icon: Sparkles,
    },
    {
      label: "Weekly vote",
      value: analytics?.votes?.weekly_vote ?? "—",
      icon: ThumbsUp,
    },
    {
      label: "Monthly vote",
      value: analytics?.votes?.monthly_vote ?? "—",
      icon: BarChart3,
    },
  ];

  const reachStats: StatCard[] = [
    {
      label: "Total Reach",
      value: analytics?.spotlight_reach?.total_reach ?? "—",
      icon: Cloud,
    },
    {
      label: "Profile Visits",
      value: analytics?.spotlight_reach?.profile_visits ?? "—",
      icon: Sparkles,
    },
    {
      label: "Spotlight View",
      value: analytics?.spotlight_reach?.spotlight_view ?? "—",
      icon: ThumbsUp,
    },
  ];

  const chartData: ChartPoint[] = (
    analytics?.votes_performance ?? []
  ).map((d: { month: string; clap: number; share: number; save: number }) => ({
    month: d.month,
    clap: d.clap,
    share: d.share,
    save: d.save,
    total: (d.clap || 0) + (d.share || 0) + (d.save || 0),
  }));

  const engagement = analytics?.engagement_rate ?? {};
  const engagementValues = [
    Number(engagement?.spotlight_view ?? 0),
    Number(engagement?.profile_visits ?? 0),
    Number(engagement?.total_vote ?? 0),
  ];
  const maxEngagement = Math.max(...engagementValues, 1);

  const engagementData: EngagementItem[] = [
    {
      label: "Spotlight view",
      value: Math.round((engagementValues[0] / maxEngagement) * 100),
      count: engagementValues[0],
      colorClass: "bg-blue-500",
    },
    {
      label: "Profile visits",
      value: Math.round((engagementValues[1] / maxEngagement) * 100),
      count: engagementValues[1],
      colorClass: "bg-purple-500",
    },
    {
      label: "Total vote",
      value: Math.round((engagementValues[2] / maxEngagement) * 100),
      count: engagementValues[2],
      colorClass: "bg-emerald-500",
    },
  ];

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
                    domain={[0, "auto"]}
                    allowDecimals={false}
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
                    dataKey="save"
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
