"use client";

import React from "react";
import { ShoppingBag, Megaphone, ThumbsUp, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useGetArtistDashboardAnalytics } from "@/Hooks/api/dashboard_api";

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

// Single series now — Vote (was "Clap")
const SERIES = [{ key: "clap", label: "Vote", color: "#3b82f6" }];

function StatCardItem({ label, value, icon: Icon }: StatCard) {
  const isLoading = value === "—";
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100/50 shadow-sm flex flex-col justify-between h-36">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="w-[18px] h-[18px] text-blue-300 animate-spin" />
          ) : (
            <Icon className="w-[18px] h-[18px] text-blue-500" />
          )}
        </div>
        <span className="text-xs font-semibold text-gray-500 tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-xl font-bold text-gray-900 mt-4">{value}</div>
    </div>
  );
}

interface ChartTooltipEntry {
  dataKey?: string | number;
  value?: number | string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipEntry[];
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-md text-xs space-y-1.5">
      {payload.map(entry => {
        const series = SERIES.find(s => s.key === entry.dataKey);
        return (
          <div key={String(entry.dataKey)} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: series?.color ?? "#3b82f6" }}
            />
            <span className="text-gray-500 font-medium">
              {series?.label ?? entry.dataKey}
            </span>
            <span className="ml-auto font-semibold text-gray-900 pl-3">
              {entry.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  const { data, isLoading } = useGetArtistDashboardAnalytics();

  const reach = data?.data?.spotlight_reach;
  const performance = data?.data?.spotlight_performance ?? [];

  const reachStats: StatCard[] = [
    {
      label: "Total Reach",
      value: reach?.total_reach ?? "—",
      icon: ShoppingBag,
    },
    {
      label: "Profile Visits",
      value: reach?.profile_visits ?? "—",
      icon: Megaphone,
    },
    {
      label: "Spotlight View",
      value: reach?.spotlight_view ?? "—",
      icon: ThumbsUp,
    },
  ];

  const chartData: { month: string; clap: number }[] = performance.map(
    (item: any) => ({
      month: item.month,
      clap: Number(item.clap) || 0,
    }),
  );

  // Scale the Y axis to the real data so small values (like a single 2) stay
  // clearly visible instead of being squashed near the axis.
  const maxValue = Math.max(1, ...chartData.map(d => d.clap));
  const tickStep = Math.max(1, Math.ceil(maxValue / 4));
  const ticks = [0, tickStep, tickStep * 2, tickStep * 3, tickStep * 4];

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
            {SERIES.map(series => (
              <span key={series.key} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: series.color }}
                />
                {series.label}
              </span>
            ))}
          </div>
        </div>

        <div className="h-72 w-full text-[10px] font-semibold text-gray-400">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : chartData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center h-full flex items-center justify-center">
              No performance data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: -25, bottom: 0 }}
                barGap={3}
              >
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, tickStep * 4]}
                  ticks={ticks}
                  tick={{ fill: "#9CA3AF" }}
                  dx={-5}
                  allowDecimals={false}
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
                    <ChartTooltip
                      active={props.active}
                      payload={props.payload}
                    />
                  )}
                />
                {SERIES.map(series => (
                  <Bar
                    key={series.key}
                    dataKey={series.key}
                    fill={series.color}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                    className="transition-opacity hover:opacity-80"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
