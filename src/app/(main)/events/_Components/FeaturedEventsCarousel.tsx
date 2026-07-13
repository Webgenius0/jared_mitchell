"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedEventItem } from "@/Types/cms";
import { CalenderSvg, VideoSvg, PlayIcon } from "@/Components/Svg/SvgContainer";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

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
      className="py-10 md:py-16 xl:py-20 container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 xl:gap-16 items-center relative">
        {/* Navigation Arrows — on the whole section edges */}
        {events.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 lg:-left-5 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 cursor-pointer hover:bg-primary-blue hover:text-white transition-all duration-300 group"
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
        <div key={event.id} className="w-full lg:w-[500px] xl:w-[600px] h-[280px] sm:h-[350px] md:h-[450px] xl:h-[550px] rounded-lg relative overflow-hidden shrink-0 bg-black">
          {event.promo_video_path ? (
            <>
              <video
                ref={videoRef}
                src={event.promo_video_path}
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
          ) : (
            <Image
              src={event.cover_image_path}
              alt={event.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          )}
        </div>

        {/* Right - Content */}
        <div className="flex-1 w-full">
          <p className="text-primary-blue rounded-full w-fit bg-[#EFF6FF] px-3 md:px-4 py-1 text-sm md:text-base mb-4 md:mb-5">
            Featured Event
          </p>

          <h3 className="text-primary-black text-2xl md:text-3xl xl:text-5xl font-bold leading-[130%] xl:leading-[140%] mb-4 md:mb-5">
            {event.title}
          </h3>

          <div className="mb-4 md:mb-5 space-y-2 text-[#1D1D1F] text-base md:text-lg xl:text-xl">
            <p className="flex gap-2 items-center">
              <CalenderSvg />
              <span>{formatDate(event.starts_at)}</span>
            </p>
            {event.promo_video_path && (
              <p className="flex gap-2 items-center">
                <VideoSvg />
                <span>Highlight Video Available</span>
              </p>
            )}
          </div>

          <p className="text-base md:text-lg xl:text-2xl text-[#1D1D1F] leading-[150%] max-w-full xl:max-w-[80%] mb-6 md:mb-8 xl:mb-12 line-clamp-3 md:line-clamp-none">
            {event.description?.replace(/<[^>]*>/g, "")}
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Link href={`/events/${event.slug}`}>
              <button className="rounded-full cursor-pointer bg-primary-blue text-white py-2.5 md:py-3 font-normal text-sm md:text-lg !w-fit px-4 md:px-5 hover:bg-primary-blue/90 transition-colors whitespace-nowrap">
                Booking Event Ticket
              </button>
            </Link>

            {/* {event.tickets_available && event.ticket_url && (
              <a
                href={event.ticket_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-full cursor-pointer text-primary-blue bg-transparent border-2 border-[#1977DD] py-2.5 md:py-3 font-bold text-sm md:text-lg !w-fit px-4 md:px-5 hover:bg-primary-blue hover:text-white transition-colors whitespace-nowrap">
                  Get Tickets
                </button>
              </a>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;
