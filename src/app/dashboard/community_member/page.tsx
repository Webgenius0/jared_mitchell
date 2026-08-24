"use client";

import React from "react";
import { Cloud, Briefcase, Sparkles, Ticket, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import { useGetMyStats } from "@/Hooks/api/dashboard_api";
import { getUpcomingEvents } from "@/Hooks/api/cms_api";
import { CMSEventItem } from "@/Types/cms";
import UserEventInteractions from "@/Components/Common/UserEventInteractions";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ActivityItem {
  activity: string;
  day: string;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/*  Event formatting helpers                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function StatCardItem({ label, value, icon: Icon, loading }: StatCard & { loading: boolean }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2 mb-5 md:mb-6">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-blue-300 animate-spin" />
          ) : (
            <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-blue-500" />
          )}
        </div>
        <span className="text-sm md:text-base text-slate-500">{label}</span>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-slate-900">
        {loading ? <span className="text-slate-300">—</span> : value}
      </div>
    </div>
  );
}

function Avatar({ src, name }: { src?: string; name?: string }) {
  return (
    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex-shrink-0 overflow-hidden">
      {src ? (
        <img
          src={src}
          alt={name || "avatar"}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center text-sm font-medium text-slate-500">
          {name?.charAt(0)?.toUpperCase() || "U"}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const router = useRouter();
  const { user: authUser } = useAuth();
  const { data: statsData, isLoading, error: statsError } = useGetMyStats();
  const {
    data: eventsData,
    isLoading: isEventsLoading,
    error: eventsError,
  } = getUpcomingEvents();

  const stats = statsData?.data;
  const userInfo = stats?.user;
  const recentActivities: ActivityItem[] = stats?.recent_activities ?? [];
  const upcomingEvents =
    (eventsData?.data?.events as CMSEventItem[] | undefined) ?? [];

  const statCards: StatCard[] = [
    { label: "Total Votes", value: stats?.total_votes_given ?? "—", icon: Cloud },
    { label: "Business Launch Award", value: stats?.total_bossbegging ?? "—", icon: Briefcase },
    { label: "Spotlight", value: stats?.total_spotlight ?? "—", icon: Sparkles },
    { label: "My tickets", value: stats?.total_tickets ?? "—", icon: Ticket },
  ];

  const displayName =
    userInfo?.name || authUser?.profile?.name || authUser?.profile?.username || "User";

  return (
    <div className="bg-[#F5F6F8]">
      <div className="space-y-6">
        {/* Greeting */}
        <div className="flex items-center gap-3">
          <Avatar src={userInfo?.photo} name={displayName} />
          <h1 className="text-lg md:text-xl text-slate-800">
            Welcome back, <span className="font-medium">{displayName}</span>
          </h1>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {statCards.map(stat => (
            <StatCardItem key={stat.label} {...stat} loading={isLoading} />
          ))}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-4">
            Recent Activity
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : statsError ? (
            <p className="text-sm text-slate-400 text-center py-10">
              Failed to load recent activity.
            </p>
          ) : recentActivities.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">
              No recent activity yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentActivities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <Avatar src={userInfo?.photo} name={displayName} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base text-slate-800 truncate">
                      {item.activity}
                    </p>
                    <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                      {item.day}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarked / Shared events */}
        <UserEventInteractions />

        {/* Upcoming event */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-3">
            Upcoming event
          </h2>
          {isEventsLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : eventsError ? (
            <p className="text-sm text-slate-400 text-center py-10">
              Failed to load upcoming events.
            </p>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">
              No upcoming events right now.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcomingEvents.map(event => {
                const { day, month } = formatEventDate(event.starts_at);
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 py-3.5 first:pt-1 last:pb-1"
                  >
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg bg-blue-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-sm md:text-base font-semibold text-blue-500 leading-none">
                        {day}
                      </span>
                      <span className="text-[10px] md:text-xs text-blue-400 leading-none mt-0.5">
                        {month}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base text-slate-800 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                        {formatEventMeta(event)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push(`/events/${event.slug}`)}
                      className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
                    >
                      Buy Ticket
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
