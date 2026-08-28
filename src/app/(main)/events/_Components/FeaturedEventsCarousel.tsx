"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedEventItem } from "@/Types/cms";
import { CalenderSvg, VideoSvg, PlayIcon } from "@/Components/Svg/SvgContainer";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { RxShare1 } from "react-icons/rx";
import useAuth from "@/Hooks/useAuth";
import {
  apiGetFeaturedEvents,
  apiToggleLike,
  apiToggleBookmark,
  apiShareEvent,
} from "@/Hooks/api/events_api";
import toast from "react-hot-toast";
import { getItem, setItem } from "@/lib/localStorage";

const ENGAGEMENT_STORAGE_KEY = "event_engagements";

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

interface FeaturedEventsCarouselProps {
  events: FeaturedEventItem[];
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const FeaturedEventsCarousel = ({ events }: FeaturedEventsCarouselProps) => {
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

  // Local engagement state for optimistic updates — initialise from localStorage
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
        },
      }));
      toast.error("Failed to toggle like");
    } finally {
      // Persist to localStorage
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
        },
      }));
      toast.error("Failed to toggle bookmark");
    } finally {
      // Persist to localStorage
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

    const slug = events?.find(e => e.id === eventId)?.slug || eventId;
    const url = window.location.origin + `/events/${slug}`;

    try {
      // Try native Web Share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: eventTitle,
            text: `Check out this event: ${eventTitle}`,
            url,
          });
        } catch {
          // User cancelled — not shared, skip the API call
          return;
        }
      } else {
        // Fallback: copy link
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          // clipboard not available
        }
      }

      // Count the share server-side (login required, same as like/bookmark)
      if (!token) {
        window.location.href = "/auth/login";
        return;
      }
      const res = await apiShareEvent(eventId);
      if (res?.success) {
        toast.success(res.message || "Event shared successfully!");
      }
    } catch {
      // Share API failed — the local share still worked, don't nag the user
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
    if (isTransitioning || events.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % events.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [events.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || events.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + events.length) % events.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [events.length, isTransitioning]);

  // Fetch engagement state from authenticated endpoint on mount (overlays persisted data)
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

  // Auto-rotate with pause on hover
  useEffect(() => {
    if (events.length <= 1 || isHovered) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext, events.length, isHovered]);

  if (!events || events.length === 0) return null;

  const event = events[currentIndex];

  return (
    <section
      className="py-8 md:py-10 lg:py-12 xl:py-20 container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-10 xl:gap-16 items-center relative">
        {/* Navigation Arrows — on the whole section edges */}
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
              className="absolute right-0 lg:-right-5 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 cursor-pointer hover:bg-primary-blue hover:text-white transition-all duration-300 group"
              aria-label="Next event"
            >
              <PiCaretRightBold className="size-4 md:size-5 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Left - Video (with image fallback) */}
        <div
          key={event.id}
          className="w-full lg:w-[400px] xl:w-[600px] h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] xl:h-[550px] rounded-lg relative overflow-hidden shrink-0 bg-black"
        >
          {event.promo_video_url ? (
            <>
              <video
                ref={videoRef}
                src={event.promo_video_url}
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover rounded-lg"
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer rounded-lg"
                >
                  <PlayIcon />
                </div>
              )}
            </>
          ) : event.cover_image_url ? (
            <Image
              src={event.cover_image_url}
              alt={event.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          ) : null}
        </div>

        {/* Right - Content */}
        <div className="flex-1 w-full">
          <p className="text-primary-blue rounded-full w-fit bg-[#EFF6FF] px-2.5 md:px-3 py-0.5 md:py-1 text-xs md:text-sm mb-3 md:mb-4">
            Featured Event
          </p>

          <h3 className="text-primary-black text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[130%] xl:leading-[140%] mb-3 md:mb-4 capitalize">
            {event.title}
          </h3>

          <div className="mb-3 md:mb-4 space-y-1.5 text-[#1D1D1F] text-sm md:text-base lg:text-lg xl:text-xl">
            <p className="flex gap-2 items-center">
              <CalenderSvg />
              <span>{formatDate(event.starts_at)}</span>
            </p>
            {event.promo_video_url && (
              <p className="flex gap-2 items-center">
                <VideoSvg />
                <span>Highlight Video Available</span>
              </p>
            )}
          </div>

          <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-[#1D1D1F] leading-[150%] max-w-full xl:max-w-[80%] mb-4 md:mb-5 lg:mb-6 xl:mb-12 line-clamp-3 md:line-clamp-3">
            {event.description?.replace(/<[^>]*>/g, "")}
          </p>

          {/* Engagement Buttons */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 text-secondary-black">
            {/* Like */}
            <button
              onClick={() => handleToggleLike(event.id)}
              disabled={actionLoading[`like-${event.id}`]}
              className="flex items-center gap-1.5 md:gap-2.5 group cursor-pointer"
            >
              <div
                className={`flex items-center justify-center size-8 md:size-10 aspect-square rounded-full bg-white custom_shadow transition-all duration-300 ${
                  getEngagement(event.id).is_liked
                    ? "!bg-red-50 !shadow-[0_0_0_2px_rgba(239,68,68,0.3)]"
                    : "group-hover:!bg-red-50 group-hover:!shadow-[0_0_0_2px_rgba(239,68,68,0.15)]"
                }`}
              >
                {getEngagement(event.id).is_liked ? (
                  <FaHeart className="size-3.5 md:size-4 text-red-500 transition-all duration-300 scale-110" />
                ) : (
                  <FaRegHeart className="size-3.5 md:size-4 transition-all duration-300 group-hover:scale-110" />
                )}
              </div>
              <span className="text-xs md:text-sm">
                {getEngagement(event.id).like_count}
              </span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => handleToggleBookmark(event.id)}
              disabled={actionLoading[`bookmark-${event.id}`]}
              className="flex items-center gap-1.5 md:gap-2.5 group cursor-pointer"
            >
              <div
                className={`flex items-center justify-center size-8 md:size-10 aspect-square rounded-full bg-white custom_shadow transition-all duration-300 ${
                  getEngagement(event.id).is_bookmarked
                    ? "!bg-blue-50 !shadow-[0_0_0_2px_rgba(25,119,221,0.3)]"
                    : "group-hover:!bg-blue-50 group-hover:!shadow-[0_0_0_2px_rgba(25,119,221,0.15)]"
                }`}
              >
                {getEngagement(event.id).is_bookmarked ? (
                  <FaBookmark className="size-3.5 md:size-4 text-primary-blue transition-all duration-300 scale-110" />
                ) : (
                  <FaRegBookmark className="size-3.5 md:size-4 transition-all duration-300 group-hover:scale-110" />
                )}
              </div>
              <span className="text-xs md:text-sm">
                {getEngagement(event.id).is_bookmarked ? "Saved" : "Save"}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => handleShare(event.id, event.title)}
              className="flex items-center gap-1.5 md:gap-2.5 group cursor-pointer"
            >
              <div className="flex items-center justify-center size-8 md:size-10 aspect-square rounded-full bg-white custom_shadow group-hover:!bg-green-50 group-hover:!shadow-[0_0_0_2px_rgba(34,197,94,0.15)] transition-all duration-300">
                <RxShare1 className="size-3.5 md:size-4 transition-all duration-300 group-hover:scale-110 group-hover:text-green-600" />
              </div>
              <span className="text-xs md:text-sm">Share</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
            <Link href={`/events/${event.slug}`}>
              <button className="rounded-full cursor-pointer bg-primary-blue text-white py-2 md:py-2.5 font-normal text-xs md:text-sm lg:text-base !w-fit px-3.5 md:px-4 hover:bg-primary-blue/90 transition-colors whitespace-nowrap">
                Booking Event Ticket
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;
