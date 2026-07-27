"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/Components/Common/Button";
import { FeaturedEventItem } from "@/Types/cms";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { RxShare1 } from "react-icons/rx";
import { CalenderSvg, VideoSvg, PlayIcon } from "@/Components/Svg/SvgContainer";

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
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [events, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || !events || events.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [events, isTransitioning]);

  // Auto-rotate with pause on hover
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

        {/* Left - Video (with image fallback) */}
        <div
          key={event.id}
          className="lg:basis-1/2 relative w-full lg:w-[716px] h-[350px] md:h-[550px] 2xl:h-[627px] rounded-2xl md:rounded-3xl xl:rounded-[40px] overflow-hidden bg-black"
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

          <div className="absolute top-4 xl:top-7 left-4 xl:left-7 xl:text-xl px-3 xl:px-5 py-1 xl:py-4 rounded-full text-primary-blue bg-[#eff6ff]">
            Featured Event
          </div>
        </div>

        {/* Right */}
        <div key={`content-${event.id}`} className="lg:basis-1/2">
          <h2 className="section_title !text-left 2xl:font-bold 2xl:text-6xl tracking-tight mb-9 leading-[90px]">
            {event.title}
          </h2>

          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center md:text-xl xl:text-2xl gap-3">
              <CalenderSvg />
              <p className="text-primary-black">
                {formatDate(event.starts_at)}
              </p>
            </div>

            <div className="flex items-center md:text-xl xl:text-2xl gap-3">
              <MdOutlineAccessTime className="text-primary-blue" />
              <p className="text-primary-black">
                {formatTime(event.starts_at)} - {formatTime(event.ends_at)}
              </p>
            </div>

            {event.promo_video_url && (
              <div className="flex items-center md:text-xl xl:text-2xl gap-3">
                <VideoSvg />
                <p className="text-primary-black">Highlight Video Available</p>
              </div>
            )}

            {event.city && event.state && (
              <div className="flex items-center md:text-xl xl:text-2xl gap-3">
                <GrLocation className="text-primary-blue" />
                <p className="text-primary-black">
                  {event.city}, {event.state}
                </p>
              </div>
            )}
          </div>

          <p className="text-lg md:text-xl xl:text-2xl text-primary-black mt-3">
            {event.description?.replace(/<[^>]*>/g, "")}
          </p>

          <div className="py-5 md:mt-3 mb-7 border-b border-gray-200 text-secondary-black flex items-center gap-7 md:gap-12">
            <div className="flex items-center gap-2 md:gap-4 2xl:gap-6">
              <div className="flex items-center justify-center size-7 md:size-10 xl:size-[48px] aspect-square rounded-full bg-white custom_shadow">
                <FaRegHeart className="size-4 md:size-5 xl:size-[28px]" />
              </div>
              <span className="md:text-xl xl:text-2xl">
                {event.like_count || 0}
              </span>
            </div>

            <div className="flex items-center gap-2 md:gap-4 2xl:gap-6">
              <div className="flex items-center justify-center size-7 md:size-10 xl:size-[48px] aspect-square rounded-full bg-white custom_shadow">
                <FiBookmark className="size-4 md:size-5 xl:size-[28px]" />
              </div>
              <span className="md:text-xl xl:text-2xl">Save</span>
            </div>

            <div className="flex items-center gap-2 md:gap-4 2xl:gap-6">
              <div className="flex items-center justify-center size-7 md:size-10 xl:size-[48px] aspect-square rounded-full bg-white custom_shadow">
                <RxShare1 className="size-4 md:size-5 xl:size-[28px]" />
              </div>
              <span className="md:text-xl xl:text-2xl">Share</span>
            </div>
          </div>

          <div className="space-x-4">
            <Link href={`/events/${event.slug}`}>
              <Button>Get Tickets</Button>
            </Link>
            <Link href={`/events/${event.slug}`}>
              <Button variant="outline">Learn More</Button>
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
