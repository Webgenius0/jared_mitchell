"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { PiCalendarBlank, PiCalendarX, PiUser } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi";
import { RxShare1 } from "react-icons/rx";
import { getUpcomingEvents } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";
import Link from "next/link";

import useAuth from "@/Hooks/useAuth";
import {
  apiToggleLike,
  apiToggleBookmark,
  apiShareEvent,
} from "@/Hooks/api/events_api";
import toast from "react-hot-toast";
import { getItem, setItem } from "@/lib/localStorage";

const ENGAGEMENT_STORAGE_KEY = "upcoming_event_engagements";

type EngagementValue = {
  is_liked: boolean;
  is_bookmarked: boolean;
  like_count: number;
  bookmarks_count: number;
};

type EngagementMap = Record<number, EngagementValue>;

const loadPersistedEngagements = (): EngagementMap => {
  try {
    const raw = getItem(ENGAGEMENT_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as EngagementMap;
  } catch {
    return {};
  }
};

const persistEngagements = (map: EngagementMap) => {
  try {
    setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // silently fail
  }
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  featured: "Featured",
  pop_up: "Pop-Up",
  workshop: "Workshop",
  networking: "Business Event",
};

const formatDateRange = (startStr: string, endStr: string) => {
  const start = new Date(startStr);
  const datePart = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!endStr) return `${datePart} • ${startTime}`;

  const end = new Date(endStr);
  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${datePart} • ${startTime} - ${endTime}`;
};

// Strip HTML tags to plain text, then sanitize — safe for line-clamped preview text.
// Use this (not the raw-HTML version) inside cards, since injecting real HTML
// into a line-clamp preview can break the clamp or leave dangling tags when truncated.
const sanitizeToPlainText = (html: string) => {
  if (typeof window === "undefined") return html; // SSR guard
  const clean = (html || "").replace(/<[^>]*>?/gm, "");
  return clean;
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState<CMSEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [localEngagements, setLocalEngagements] = useState<EngagementMap>(() => loadPersistedEngagements());
  const { token } = useAuth();

  useEffect(() => {
    getUpcomingEvents()
      .then(res => setEvents(res.events))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getEngagement = useCallback((eventId: number) => {
    const event = events?.find((e) => e.id === eventId);
    const local = localEngagements[eventId];
    return {
      is_liked: local?.is_liked ?? event?.is_liked ?? false,
      is_bookmarked: local?.is_bookmarked ?? event?.is_bookmarked ?? false,
      like_count: local?.like_count ?? event?.likes_count ?? event?.like_count ?? 0,
      bookmarks_count: local?.bookmarks_count ?? event?.bookmarks_count ?? 0,
    };
  }, [events, localEngagements]);

  const handleToggleLike = async (eventId: number) => {
    if (!token) { window.location.href = "/auth/login"; return; }
    const loadingKey = `like-${eventId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading((prev) => ({ ...prev, [loadingKey]: true }));

    const prev = getEngagement(eventId);
    setLocalEngagements((prevState) => ({
      ...prevState,
      [eventId]: {
        is_liked: !prev.is_liked,
        is_bookmarked: prev.is_bookmarked,
        like_count: prev.is_liked ? prev.like_count - 1 : prev.like_count + 1,
        bookmarks_count: prev.bookmarks_count,
      },
    }));

    try {
      const res = await apiToggleLike(eventId);
      if (res?.success) {
        setLocalEngagements((prevState) => ({
          ...prevState,
          [eventId]: {
            is_liked: res.data.is_liked,
            is_bookmarked: prev.is_bookmarked,
            like_count: res.data.is_liked ? prev.like_count + 1 : Math.max(0, prev.like_count - 1),
            bookmarks_count: prev.bookmarks_count,
          },
        }));
        if (res.message) toast.success(res.message);
      }
    } catch {
      setLocalEngagements((prevState) => ({
        ...prevState,
        [eventId]: {
          is_liked: prev.is_liked,
          is_bookmarked: prev.is_bookmarked,
          like_count: prev.like_count,
          bookmarks_count: prev.bookmarks_count,
        },
      }));
      toast.error("Failed to toggle like");
    } finally {
      setLocalEngagements((current) => { persistEngagements(current); return current; });
      setActionLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleToggleBookmark = async (eventId: number) => {
    if (!token) { window.location.href = "/auth/login"; return; }
    const loadingKey = `bookmark-${eventId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading((prev) => ({ ...prev, [loadingKey]: true }));

    const prev = getEngagement(eventId);
    setLocalEngagements((prevState) => ({
      ...prevState,
      [eventId]: {
        is_liked: prev.is_liked,
        is_bookmarked: !prev.is_bookmarked,
        like_count: prev.like_count,
        bookmarks_count: prev.is_bookmarked ? prev.bookmarks_count - 1 : prev.bookmarks_count + 1,
      },
    }));

    try {
      const res = await apiToggleBookmark(eventId);
      if (res?.success) {
        setLocalEngagements((prevState) => ({
          ...prevState,
          [eventId]: {
            is_liked: prev.is_liked,
            is_bookmarked: res.data.is_bookmarked,
            like_count: prev.like_count,
            bookmarks_count: res.data.is_bookmarked ? prev.bookmarks_count + 1 : Math.max(0, prev.bookmarks_count - 1),
          },
        }));
        if (res.message) toast.success(res.message);
      }
    } catch {
      setLocalEngagements((prevState) => ({
        ...prevState,
        [eventId]: {
          is_liked: prev.is_liked,
          is_bookmarked: prev.is_bookmarked,
          like_count: prev.like_count,
          bookmarks_count: prev.bookmarks_count,
        },
      }));
      toast.error("Failed to toggle bookmark");
    } finally {
      setLocalEngagements((current) => { persistEngagements(current); return current; });
      setActionLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleShare = async (eventId: number, eventTitle: string) => {
    const slug = events.find((e) => e.id === eventId)?.slug || eventId;
    const url = window.location.origin + `/events/${slug}`;

    // Try native Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({ title: eventTitle, text: `Check out this event: ${eventTitle}`, url });
      } catch {
        // User cancelled — not shared, skip the API call
        return;
      }
    } else {
      // Fallback: copy to clipboard
      try { await navigator.clipboard.writeText(url); }
      catch { /* clipboard not available */ }
    }

    // Count the share server-side (login required, same as like/bookmark)
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    try {
      const res = await apiShareEvent(eventId);
      if (res?.success) {
        toast.success(res.message || "Event shared successfully!");
      }
    } catch {
      // Share API failed — the local share still worked, don't nag the user
    }
  };

  if (loading) {
    return (
      <section className="container py-8 md:py-10 lg:py-12 xl:py-20">
        <h2 className="section_title text-xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold text-center">
          Upcoming Events
        </h2>
        <div className="h-[200px] md:h-[300px] flex items-center justify-center text-base md:text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      <section className="container py-8 md:py-10 lg:py-12 xl:py-20">
        <h2 className="section_title text-xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold text-center">
          Upcoming Events
        </h2>
        <p className="section_sub_title text-center mt-1">
          Discover workshops, markets, and community gatherings near you.
        </p>

        {events.length === 0 ? (
          <div className="my-4 md:my-6 lg:my-8">
            <div className="flex flex-col items-center justify-center text-center px-5 py-10 md:py-14 lg:py-16 rounded-2xl xl:rounded-[20px] bg-[#F5F5F7] custom_shadow custom_border">
              <div className="flex items-center justify-center size-13 md:size-15 rounded-full bg-white custom_shadow custom_border mb-4">
                <PiCalendarX className="size-7 md:size-9 text-gray-300" />
              </div>
              <h3 className="text-lg md:text-xl text-primary-black font-semibold">
                No Upcoming Events
              </h3>
              <p className="text-secondary-black text-sm md:text-base mt-1.5 max-w-md">
                We're busy planning something special. Check back soon for new
                events.
              </p>
            </div>
          </div>
        ) : (
          <div className="my-4 md:my-6 lg:my-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4">
              {events.map(event => (
              <div
                key={event.id}
                className="rounded-[20px] bg-white custom_shadow custom_border overflow-hidden flex flex-col"
              >
                {/* Image with badges */}
                <div className="relative w-full">
                  <Image
                    src={event.cover_image_url}
                    width={500}
                    height={300}
                    alt={event.title}
                    className="object-cover w-full h-[160px] md:h-[170px] lg:h-[190px] xl:h-[220px]"
                  />

                  <span className="absolute top-3 left-3 bg-white/95 text-primary-black text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {EVENT_TYPE_LABELS[event.event_type] ?? event.event_type}
                  </span>

                  {event.is_featured && (
                    <span className="absolute top-3 right-3 bg-primary-blue text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <HiOutlineSparkles className="text-xs" />
                      Spotlight Eligible
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="py-3.5 md:py-4 px-3 md:px-4 flex flex-col flex-1">
                  <h2 className="text-base md:text-base lg:text-lg xl:text-2xl text-primary-black font-semibold line-clamp-1">
                    {event.title}
                  </h2>

                  <p className="text-xs md:text-sm text-primary-black flex items-center gap-1.5 mt-2">
                    <PiCalendarBlank className="text-primary-blue shrink-0" />
                    <span className="truncate">
                      {formatDateRange(event.starts_at, event.ends_at)}
                    </span>
                  </p>

                  <p className="text-xs md:text-sm text-primary-black flex items-center gap-1.5 mt-1.5">
                    <GrLocation className="text-primary-blue shrink-0" />
                    <span className="truncate">
                      {event.city}, {event.state}
                    </span>
                  </p>

                  {event.hosted_by && (
                    <p className="text-xs md:text-sm text-primary-black flex items-center gap-1.5 mt-1.5">
                      <PiUser className="text-primary-blue shrink-0" />
                      <span className="truncate">
                        Hosted by {event.hosted_by}
                      </span>
                    </p>
                  )}

                  {event.description && (
                    <p className="text-xs md:text-sm text-secondary-black mt-2 line-clamp-2">
                      {sanitizeToPlainText(event.description)}
                    </p>
                  )}

                  {/* Engagement Buttons */}
                  <div className="flex items-center gap-3 mt-3 py-2.5 border-y border-gray-100 text-secondary-black">
                    {/* Like */}
                    <button
                      onClick={() => handleToggleLike(event.id)}
                      disabled={actionLoading[`like-${event.id}`]}
                      className="flex items-center gap-1.5 group cursor-pointer"
                    >
                      <div className={`flex items-center justify-center size-7 md:size-8 aspect-square rounded-full bg-white custom_shadow custom_border transition-all duration-300 ${
                        getEngagement(event.id).is_liked
                          ? "!bg-red-50 !border-red-200"
                          : "group-hover:!bg-red-50 group-hover:!border-red-200"
                      }`}>
                        {getEngagement(event.id).is_liked ? (
                          <FaHeart className="size-3.5 md:size-4 text-red-500 transition-all duration-300 scale-110" />
                        ) : (
                          <FaRegHeart className="size-3.5 md:size-4 text-primary-black transition-all duration-300 group-hover:scale-110" />
                        )}
                      </div>
                      <span className="text-xs md:text-sm">{getEngagement(event.id).like_count}</span>
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => handleToggleBookmark(event.id)}
                      disabled={actionLoading[`bookmark-${event.id}`]}
                      className="flex items-center gap-1.5 group cursor-pointer"
                    >
                      <div className={`flex items-center justify-center size-7 md:size-8 aspect-square rounded-full bg-white custom_shadow custom_border transition-all duration-300 ${
                        getEngagement(event.id).is_bookmarked
                          ? "!bg-blue-50 !border-primary-blue"
                          : "group-hover:!bg-blue-50 group-hover:!border-primary-blue"
                      }`}>
                        {getEngagement(event.id).is_bookmarked ? (
                          <FaBookmark className="size-3.5 md:size-4 text-primary-blue transition-all duration-300 scale-110" />
                        ) : (
                          <FaRegBookmark className="size-3.5 md:size-4 text-primary-black transition-all duration-300 group-hover:scale-110" />
                        )}
                      </div>
                      <span className="text-xs md:text-sm">
                        {getEngagement(event.id).is_bookmarked ? "Saved" : "Save"}
                      </span>
                    </button>

                    {/* Share */}
                    <button
                      onClick={() => handleShare(event.id, event.title)}
                      className="flex items-center gap-1.5 group cursor-pointer"
                    >
                      <div className="flex items-center justify-center size-7 md:size-8 aspect-square rounded-full bg-white custom_shadow custom_border group-hover:!bg-green-50 group-hover:!border-green-400 transition-all duration-300">
                        <RxShare1 className="size-3.5 md:size-4 text-primary-black transition-all duration-300 group-hover:scale-110 group-hover:text-green-600" />
                      </div>
                      <span className="text-xs md:text-sm">Share</span>
                    </button>
                  </div>

                  <div className="mt-3 pt-1">
                    <Link href={`/events/${event.slug}`} className="block">
                      <Button size="lg" className="w-full rounded-full">
                        View Event <span aria-hidden>→</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button size="xl">View All Events</Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default UpcomingEvents;
