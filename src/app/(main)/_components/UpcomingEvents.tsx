"use client";

import Link from "next/link";
import Image from "next/image";
import useAuth from "@/Hooks/useAuth";
import { RxShare1 } from "react-icons/rx";
import { CMSEventItem } from "@/Types/cms";
import { GrLocation } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/Components/Common/Button";
import { getItem, setItem } from "@/lib/localStorage";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState, useCallback } from "react";
import { PiCalendarBlank, PiCalendarX } from "react-icons/pi";
import "swiper/css";
import "swiper/css/pagination";
import { getUpcomingEvents } from "@/lib/Services/cms_service";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  apiToggleLike,
  apiToggleBookmark,
  apiShareEvent,
} from "@/Hooks/api/events_api";
import toast from "react-hot-toast";

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

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
      <section className="section">
        <h2 className="section_title 2xl:text-5xl">
          Upcoming Events
        </h2>
        <div className="mt-5 md:my-10 h-[300px] flex items-center justify-center text-xl text-gray-400">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="mt-4 md:my-8">            <div className="flex flex-col items-center justify-center text-center px-4 md:px-6 py-10 md:py-14 lg:py-16 xl:py-24 rounded-xl lg:rounded-2xl xl:rounded-[20px] bg-[#F5F5F7] custom_shadow border border-gray-200">
            <div className="flex items-center justify-center size-12 md:size-14 lg:size-16 rounded-full bg-white custom_shadow custom_border mb-4">
              <PiCalendarX className="size-6 md:size-7 text-gray-300" />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl text-primary-black font-semibold">
              No Upcoming Events
            </h3>
            <p className="text-secondary-black text-sm md:text-base lg:text-lg mt-2 max-w-md">
              We're busy planning something special. Check back soon for new
              events.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 md:my-8">
          <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1536: { slidesPerView: 4 },
          }}
        >
          {events.map(event => (
            <SwiperSlide key={event.id}>
              <div className="w-full rounded-lg lg:rounded-xl xl:rounded-[20px] bg-[#F5F5F7] custom_shadow border border-gray-200 overflow-hidden mx-3">
                <div className="relative w-full">
                  <div className="absolute size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]" />
                  <Image
                    src={event.cover_image_url}
                    width={500}
                    height={300}
                    alt={event.title}
                    className="object-cover w-full h-[180px] md:h-[200px] lg:h-[220px] xl:h-[260px]"
                  />
                </div>

                <div className="py-3 md:py-3.5 lg:py-4 xl:py-5 px-2.5 md:px-3 xl:px-5">
                  <h2 className="text-base md:text-lg lg:text-xl text-primary-black font-semibold">
                    {event.title}
                  </h2>

                  <p className="text-sm md:text-base lg:text-lg xl:text-xl text-primary-black flex items-center gap-1.5 lg:gap-2 mt-1 lg:mt-2">
                    <PiCalendarBlank className="text-primary-blue" />
                    {formatDate(event.starts_at)}
                  </p>

                  <p className="text-sm md:text-base lg:text-lg xl:text-xl text-primary-black flex items-center gap-1.5 lg:gap-2 mt-1 lg:mt-2">
                    <GrLocation className="text-primary-blue" />
                    {event.city}, {event.state}
                  </p>

                  <div className="pb-3 md:pb-3.5 lg:pb-4 my-3 lg:my-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Like */}
                      <button
                        onClick={() => handleToggleLike(event.id)}
                        disabled={actionLoading[`like-${event.id}`]}
                        className="flex items-center gap-1.5 lg:gap-2 group cursor-pointer"
                      >
                        <div className={`flex items-center justify-center size-5 md:size-6 aspect-square rounded-full bg-white custom_shadow custom_border transition-all duration-300 ${
                          getEngagement(event.id).is_liked
                            ? "!bg-red-50 !border-red-200"
                            : "group-hover:!bg-red-50 group-hover:!border-red-200"
                        }`}>
                          {getEngagement(event.id).is_liked ? (
                            <FaHeart className="size-4 md:size-[18px] text-red-500 transition-all duration-300 scale-110" />
                          ) : (
                            <FaRegHeart className="size-4 md:size-[18px] text-primary-black transition-all duration-300 group-hover:scale-110" />
                          )}
                        </div>
                        <span className="text-secondary-black text-sm md:text-base lg:text-lg xl:text-xl">
                          {getEngagement(event.id).like_count.toLocaleString()}
                        </span>
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() => handleToggleBookmark(event.id)}
                        disabled={actionLoading[`bookmark-${event.id}`]}
                        className="flex items-center gap-1.5 lg:gap-2 group cursor-pointer"
                      >
                        <div className={`flex items-center justify-center size-5 md:size-6 aspect-square rounded-full bg-white custom_shadow custom_border transition-all duration-300 ${
                          getEngagement(event.id).is_bookmarked
                            ? "!bg-blue-50 !border-primary-blue"
                            : "group-hover:!bg-blue-50 group-hover:!border-primary-blue"
                        }`}>
                          {getEngagement(event.id).is_bookmarked ? (
                            <FaBookmark className="size-4 md:size-[18px] text-primary-blue transition-all duration-300 scale-110" />
                          ) : (
                            <FaRegBookmark className="size-4 md:size-[18px] text-primary-black transition-all duration-300 group-hover:scale-110" />
                          )}
                        </div>
                        <span className="text-secondary-black text-sm md:text-base lg:text-lg xl:text-xl">
                          {getEngagement(event.id).is_bookmarked ? "Saved" : "Save"}
                        </span>
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => handleShare(event.id, event.title)}
                        className="flex items-center gap-1.5 lg:gap-2 group cursor-pointer"
                      >
                        <div className="flex items-center justify-center size-5 md:size-6 aspect-square rounded-full bg-white custom_shadow custom_border group-hover:!bg-green-50 group-hover:!border-green-400 transition-all duration-300">
                          <RxShare1 className="size-4 md:size-[18px] text-primary-black transition-all duration-300 group-hover:scale-110 group-hover:text-green-600" />
                        </div>
                        <span className="text-secondary-black text-sm md:text-base lg:text-lg xl:text-xl">Share</span>
                      </button>
                    </div>
                  </div>

                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <Button size="lg">View Event Details</Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
