"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { RxShare1 } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { FeaturedEventItem } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";
import { MdOutlineAccessTime } from "react-icons/md";
import { getItem, setItem } from "@/lib/localStorage";
import { useState, useEffect, useCallback, useRef } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { CalenderSvg, VideoSvg, PlayIcon } from "@/Components/Svg/SvgContainer";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  apiGetFeaturedEvents,
  apiToggleLike,
  apiToggleBookmark,
  apiShareEvent,
} from "@/Hooks/api/events_api";

const ENGAGEMENT_STORAGE_KEY = "event_engagements";

type EngagementValue = {
  is_liked: boolean;
  is_bookmarked: boolean;
  like_count: number;
  bookmarks_count: number;
  shares_count: number;
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

interface FeaturedEventProps {
  events?: FeaturedEventItem[];
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const FeaturedEvent = ({ events }: FeaturedEventProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {},
  );
  const { token } = useAuth();

  const [localEngagements, setLocalEngagements] = useState<EngagementMap>(() =>
    loadPersistedEngagements(),
  );

  const getEngagement = (eventId: number) => {
    const event = events?.find(e => e.id === eventId);
    const local = localEngagements[eventId];
    return {
      is_liked: local?.is_liked ?? event?.is_liked ?? false,
      is_bookmarked: local?.is_bookmarked ?? event?.is_bookmarked ?? false,
      like_count:
        local?.like_count ?? event?.likes_count ?? event?.like_count ?? 0,
      bookmarks_count: local?.bookmarks_count ?? event?.bookmarks_count ?? 0,
      shares_count: local?.shares_count ?? event?.shares_count ?? 0,
    };
  };

  const handleToggleLike = async (eventId: number) => {
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    const loadingKey = `like-${eventId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading(prev => ({ ...prev, [loadingKey]: true }));

    const prev = getEngagement(eventId);
    setLocalEngagements(prevState => ({
      ...prevState,
      [eventId]: {
        is_liked: !prev.is_liked,
        is_bookmarked: prev.is_bookmarked,
        like_count: prev.is_liked ? prev.like_count - 1 : prev.like_count + 1,
        bookmarks_count: prev.bookmarks_count,
        shares_count: prev.shares_count,
      },
    }));

    try {
      const res = await apiToggleLike(eventId);
      if (res?.success) {
        setLocalEngagements(prevState => ({
          ...prevState,
          [eventId]: {
            is_liked: res.data.is_liked,
            is_bookmarked: prev.is_bookmarked,
            like_count: res.data.is_liked
              ? prev.like_count + 1
              : Math.max(0, prev.like_count - 1),
            bookmarks_count: prev.bookmarks_count,
            shares_count: prev.shares_count,
          },
        }));
        if (res.message) toast.success(res.message);
      }
    } catch {
      setLocalEngagements(prevState => ({
        ...prevState,
        [eventId]: {
          is_liked: prev.is_liked,
          is_bookmarked: prev.is_bookmarked,
          like_count: prev.like_count,
          bookmarks_count: prev.bookmarks_count,
          shares_count: prev.shares_count,
        },
      }));
      toast.error("Failed to toggle like");
    } finally {
      setLocalEngagements(current => {
        persistEngagements(current);
        return current;
      });
      setActionLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleToggleBookmark = async (eventId: number) => {
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    const loadingKey = `bookmark-${eventId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading(prev => ({ ...prev, [loadingKey]: true }));

    const prev = getEngagement(eventId);
    setLocalEngagements(prevState => ({
      ...prevState,
      [eventId]: {
        is_liked: prev.is_liked,
        is_bookmarked: !prev.is_bookmarked,
        like_count: prev.like_count,
        bookmarks_count: prev.is_bookmarked
          ? prev.bookmarks_count - 1
          : prev.bookmarks_count + 1,
        shares_count: prev.shares_count,
      },
    }));

    try {
      const res = await apiToggleBookmark(eventId);
      if (res?.success) {
        setLocalEngagements(prevState => ({
          ...prevState,
          [eventId]: {
            is_liked: prev.is_liked,
            is_bookmarked: res.data.is_bookmarked,
            like_count: prev.like_count,
            bookmarks_count: res.data.is_bookmarked
              ? prev.bookmarks_count + 1
              : Math.max(0, prev.bookmarks_count - 1),
            shares_count: prev.shares_count,
          },
        }));
        if (res.message) toast.success(res.message);
      }
    } catch {
      setLocalEngagements(prevState => ({
        ...prevState,
        [eventId]: {
          is_liked: prev.is_liked,
          is_bookmarked: prev.is_bookmarked,
          like_count: prev.like_count,
          bookmarks_count: prev.bookmarks_count,
          shares_count: prev.shares_count,
        },
      }));
      toast.error("Failed to toggle bookmark");
    } finally {
      setLocalEngagements(current => {
        persistEngagements(current);
        return current;
      });
      setActionLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleShare = async (eventId: number, eventTitle: string) => {
    const loadingKey = `share-${eventId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading(prev => ({ ...prev, [loadingKey]: true }));

    const url =
      window.location.origin +
      `/events/${events?.find(e => e.id === eventId)?.slug || eventId}`;

    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: eventTitle,
            text: `Check out this event: ${eventTitle}`,
            url,
          });
        } catch {
          // User cancelled or error — not shared, skip the API call
          return;
        }
      } else {
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          // Clipboard not available
        }
      }

      if (!token) {
        window.location.href = "/auth/login";
        return;
      }
      const res = await apiShareEvent(eventId);
      if (res?.success) {
        toast.success(res.message || "Event shared successfully!");
      }
    } catch {
    } finally {
      setActionLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const goToNext = useCallback(() => {
    if (isTransitioning || !events || events.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % events.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [events, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || !events || events.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + events.length) % events.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [events, isTransitioning]);

  useEffect(() => {
    if (!token || !events || events.length === 0) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await apiGetFeaturedEvents();
        if (cancelled || !response?.events) return;
        const engagementMap: EngagementMap = {};
        for (const evt of response.events) {
          engagementMap[evt.id] = {
            is_liked: evt.is_liked ?? false,
            is_bookmarked: evt.is_bookmarked ?? false,
            like_count: evt.likes_count ?? evt.like_count ?? 0,
            bookmarks_count: evt.bookmarks_count ?? 0,
            shares_count: evt.shares_count ?? 0,
          };
        }
        setLocalEngagements(prev => {
          const merged = { ...prev, ...engagementMap };
          persistEngagements(merged);
          return merged;
        });
      } catch {
        // silently fail — fall back to localStorage data
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (!events || events.length <= 1 || isHovered) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext, events, isHovered]);

  if (!events || events.length === 0) return null;

  const event = events[currentIndex];

  return (
    <section
      className="section bg-[#F5F5F7]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-5 md:gap-7 xl:gap-10 2xl:gap-14 max-lg:flex-col container relative">
        {/* Navigation Arrows */}
        {events.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 cursor-pointer hover:bg-primary-blue hover:text-white transition-all duration-300 group"
              aria-label="Previous event"
            >
              <PiCaretLeftBold className="size-4 md:size-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 cursor-pointer hover:bg-primary-blue hover:text-white transition-all duration-300 group"
              aria-label="Next event"
            >
              <PiCaretRightBold className="size-4 md:size-5 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        <div
          key={event.id}
          className="lg:basis-1/2 relative w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[400px] xl:h-[460px] 2xl:h-[520px] rounded-2xl md:rounded-3xl xl:rounded-[40px] overflow-hidden bg-black"
        >
          {event.promo_video_url ? (
            <>
              <video
                ref={videoRef}
                src={event.promo_video_url}
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover rounded-2xl md:rounded-3xl xl:rounded-[40px]"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer rounded-2xl md:rounded-3xl xl:rounded-[40px]"
                >
                  <PlayIcon />
                </div>
              )}
            </>
          ) : (
            <Image
              src={event.cover_image_url || "/home/featured-event-img.jpg"}
              fill
              alt={event.title || "featured event"}
              className="size-full object-cover rounded-2xl md:rounded-3xl xl:rounded-[40px]"
            />
          )}

          <div className="absolute top-4 xl:top-7 left-4 xl:left-7 xl:text-xl px-3 xl:px-5 py-1 xl:py-2 text-sm font-normal rounded-full text-primary-blue bg-[#eff6ff]">
            Featured Event
          </div>
        </div>

        {/* Right */}
        <div key={`content-${event.id}`} className="lg:basis-1/2">
          <h2 className="section_title !text-left 2xl:font-bold 2xl:text-4xl tracking-tight mb-4 leading-[1.15] capitalize">
            {event.title}
          </h2>

          <div className="space-y-1.5 md:space-y-3">
            <div className="flex items-center md:text-lg xl:text-xl gap-3">
              <CalenderSvg />
              <p className="text-primary-black">
                {formatDate(event.starts_at)}
              </p>
            </div>

            <div className="flex items-center md:text-lg xl:text-xl gap-3">
              <MdOutlineAccessTime className="text-black" />
              <p className="text-primary-black">
                {formatTime(event.starts_at)} - {formatTime(event.ends_at)}
              </p>
            </div>

            {event.promo_video_url && (
              <div className="flex items-center md:text-lg xl:text-xl gap-3">
                <VideoSvg />
                <p className="text-primary-black">Highlight Video Available</p>
              </div>
            )}

            {event.city && event.state && (
              <div className="flex items-center md:text-lg xl:text-xl gap-3">
                <GrLocation className="text-black" />
                <p className="text-primary-black">
                  {event.city}, {event.state}
                </p>
              </div>
            )}
          </div>

          <p className="text-sm md:text-base xl:text-lg text-primary-black mt-2.5 line-clamp-3">
            {event.description?.replace(/<[^>]*>/g, "")}
          </p>

          <div className="py-3 md:mt-2.5 mb-5 border-b border-gray-200 text-secondary-black flex items-center gap-7 md:gap-12">
            {/* Like Button */}
            <button
              onClick={() => handleToggleLike(event.id)}
              disabled={actionLoading[`like-${event.id}`]}
              className="flex items-center gap-2 md:gap-4 2xl:gap-6 group cursor-pointer"
            >
              <div
                className={`flex items-center justify-center size-6 md:size-9 xl:size-[42px] aspect-square rounded-full bg-white custom_shadow transition-all duration-300 ${
                  getEngagement(event.id).is_liked
                    ? "!bg-red-50 !shadow-[0_0_0_2px_rgba(239,68,68,0.3)]"
                    : "group-hover:!bg-red-50 group-hover:!shadow-[0_0_0_2px_rgba(239,68,68,0.15)]"
                }`}
              >
                {getEngagement(event.id).is_liked ? (
                  <FaHeart className="size-3.5 md:size-4 xl:size-6 text-red-500 transition-all duration-300 scale-110" />
                ) : (
                  <FaRegHeart className="size-3.5 md:size-4 xl:size-6 transition-all duration-300 group-hover:scale-110" />
                )}
              </div>
              <span className="md:text-lg xl:text-xl">
                {getEngagement(event.id).like_count}
              </span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => handleToggleBookmark(event.id)}
              disabled={actionLoading[`bookmark-${event.id}`]}
              className="flex items-center gap-2 md:gap-4 2xl:gap-6 group cursor-pointer"
            >
              <div
                className={`flex items-center justify-center size-6 md:size-9 xl:size-[42px] aspect-square rounded-full bg-white custom_shadow transition-all duration-300 ${
                  getEngagement(event.id).is_bookmarked
                    ? "!bg-blue-50 !shadow-[0_0_0_2px_rgba(25,119,221,0.3)]"
                    : "group-hover:!bg-blue-50 group-hover:!shadow-[0_0_0_2px_rgba(25,119,221,0.15)]"
                }`}
              >
                {getEngagement(event.id).is_bookmarked ? (
                  <FaBookmark className="size-3.5 md:size-4 xl:size-6 text-primary-blue transition-all duration-300 scale-110" />
                ) : (
                  <FaRegBookmark className="size-3.5 md:size-4 xl:size-6 transition-all duration-300 group-hover:scale-110" />
                )}
              </div>
              <span className="md:text-lg xl:text-xl">
                {getEngagement(event.id).is_bookmarked ? "Saved" : "Save"}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => handleShare(event.id, event.title)}
              disabled={actionLoading[`share-${event.id}`]}
              className="flex items-center gap-2 md:gap-4 2xl:gap-6 group cursor-pointer"
            >
              <div className="flex items-center justify-center size-6 md:size-9 xl:size-[42px] aspect-square rounded-full bg-white custom_shadow group-hover:!bg-green-50 group-hover:!shadow-[0_0_0_2px_rgba(34,197,94,0.15)] transition-all duration-300">
                <RxShare1 className="size-3.5 md:size-4 xl:size-6 transition-all duration-300 group-hover:scale-110 group-hover:text-green-600" />
              </div>
              <span className="md:text-lg xl:text-xl">Share</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href={`/events/${event.slug}`}>
              <Button className="!py-2.5">Get Tickets</Button>
            </Link>
            <Link href={`/events/${event.slug}`}>
              <Button variant="outline" className="!py-2.5">
             Score This Business
              </Button>
            </Link>
          </div>

          {/* Dot indicators */}
          {events.length > 1 && (
            <div className="flex items-center gap-2 mt-6">
              {events.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 h-2.5 bg-primary-blue"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to event ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
