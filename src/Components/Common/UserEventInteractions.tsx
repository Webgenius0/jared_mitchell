"use client";

import { Bookmark, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetUserEventInteractions } from "@/Hooks/api/dashboard_api";

interface InteractionEvent {
  id: number;
  title: string;
  slug: string;
  event_type: string;
  starts_at: string;
  ends_at: string;
  venue_name: string;
  city: string;
  state: string;
  cover_image: string;
  status: string;
  platform?: string | null;
}

const formatEventDate = (startsAt: string) => {
  const date = new Date(startsAt);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }),
  };
};

const formatEventMeta = (event: InteractionEvent) => {
  const time = new Date(event.starts_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const place = [event.city, event.state].filter(Boolean).join(", ");
  return `${time}${place ? ` · ${place}` : ""}`;
};

interface InteractionCardProps {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  events: InteractionEvent[];
  loading: boolean;
  error: boolean;
  emptyText: string;
}

function InteractionCard({
  title,
  count,
  icon: Icon,
  iconBg,
  events,
  loading,
  error,
  emptyText,
}: InteractionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center ${iconBg}`}
          >
            <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </div>
          <h2 className="text-sm md:text-base font-semibold text-slate-900">
            {title}
          </h2>
        </div>
        <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-slate-50 text-slate-500">
          {loading ? "…" : count}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <p className="text-sm text-slate-400 text-center py-10">
          Failed to load.
        </p>
      ) : events.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-10">{emptyText}</p>
      ) : (
        <div className="divide-y divide-slate-100">
          {events.map((event, i) => {
            const { day, month } = formatEventDate(event.starts_at);
            return (
              <div
                key={`${event.id}-${i}`}
                className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
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
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5 truncate">
                    {formatEventMeta(event)}
                  </p>
                </div>
                <Link
                  href={`/events/${event.slug}`}
                  className="text-xs md:text-sm text-blue-500 hover:text-blue-600 font-medium flex-shrink-0"
                >
                  View
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function UserEventInteractions() {
  const { data, isLoading, error } = useGetUserEventInteractions();

  const interactions = data?.data;
  const bookmarkedEvents: InteractionEvent[] =
    interactions?.bookmarked_events ?? [];
  const sharedEvents: InteractionEvent[] = interactions?.shared_events ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <InteractionCard
        title="Bookmarked Events"
        count={interactions?.bookmark_count ?? 0}
        icon={Bookmark}
        iconBg="bg-blue-50 text-blue-500"
        events={bookmarkedEvents}
        loading={isLoading}
        error={!!error}
        emptyText="No bookmarked events yet."
      />
      <InteractionCard
        title="Shared Events"
        count={interactions?.share_count ?? 0}
        icon={Share2}
        iconBg="bg-emerald-50 text-emerald-500"
        events={sharedEvents}
        loading={isLoading}
        error={!!error}
        emptyText="No shared events yet."
      />
    </div>
  );
}
