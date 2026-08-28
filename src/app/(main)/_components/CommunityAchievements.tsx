"use client";
import Link from "next/link";
import Image from "next/image";
import { PastSixMonthsWinner } from "@/Types/cms";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useEffect, useRef, useState, useCallback } from "react";

interface CommunityAchievementsProps {
  data?: any;
  pastSixMonthsWinners?: PastSixMonthsWinner[];
}

const extractCategory = (contestableType?: string): string => {
  if (!contestableType) return "Business";
  const parts = contestableType.split("\\");
  return parts[parts.length - 1] || "Business";
};

const getSpotlightLink = (winner: PastSixMonthsWinner): string => {
  return `/contest/contestants/${winner.id}`;
};

const getCardImage = (winner: PastSixMonthsWinner): string => {
  const firstMedia = winner.contestable?.media?.[0]?.file_path;
  return firstMedia || winner.avatar_url;
};

const AUTOPLAY_DELAY = 3000;

const CommunityAchievements = ({
  data,
  pastSixMonthsWinners,
}: CommunityAchievementsProps) => {
  const winners = pastSixMonthsWinners || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.children[index] as HTMLElement | undefined;
    if (!slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  const goToNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const count = el.children.length;
    setActiveIndex(prev => {
      const next = (prev + 1) % count;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex]);

  const goToPrev = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const count = el.children.length;
    setActiveIndex(prev => {
      const next = (prev - 1 + count) % count;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex]);

  // Autoplay
  useEffect(() => {
    if (winners.length <= 1) return;

    const start = () => {
      stop();
      autoplayRef.current = setInterval(goToNext, AUTOPLAY_DELAY);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    start();
    return stop;
  }, [winners.length, goToNext]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    let closestIndex = 0;
    let closestDistance = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const distance = Math.abs(
        (child as HTMLElement).offsetLeft - el.scrollLeft,
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
  };

  return (
    <section className="section">
      <h2 className="section_title 2xl:text-5xl">
        {data?.title || "Past Six Months OSI Top Business Award Winners"}
      </h2>

      <p className="section_sub_title">
        {data?.sub_title ||
          "Celebrating our community's achievements and creative milestones"}
      </p>

      {winners.length > 0 && (
        <div className="my-4 md:mt-6">
          <div className="relative">
            {winners.length > 1 && (
              <>
                <button
                  onClick={() => {
                    pauseAutoplay();
                    goToPrev();
                  }}
                  aria-label="Previous winners"
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 size-8 rounded-full bg-white shadow-md grid place-items-center hover:bg-slate-50 border border-slate-200 transition-transform hover:scale-105"
                >
                  <LuArrowLeft className="text-lg" />
                </button>
                <button
                  onClick={() => {
                    pauseAutoplay();
                    goToNext();
                  }}
                  aria-label="Next winners"
                  className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 size-8 rounded-full bg-white shadow-md grid place-items-center hover:bg-slate-50 border border-slate-200 transition-transform hover:scale-105"
                >
                  <LuArrowRight className="text-lg" />
                </button>
              </>
            )}

            <ul
              ref={scrollerRef}
              onScroll={handleScroll}
              onPointerDown={pauseAutoplay}
              className="flex gap-3.5 lg:gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 px-1"
            >
              {winners.map(winner => {
                const title =
                  winner.display_name || winner.contestable?.business_name;
                const category = extractCategory(winner.contestable?.type);
                const description =
                  winner.contestable?.story ||
                  winner.contestable?.community_impact_statement ||
                  "";
                const linkHref = getSpotlightLink(winner);
                const cardImage = getCardImage(winner);

                return (
                  <li
                    key={winner.id}
                    className="shrink-0 snap-start w-[75%] sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-1/4"
                  >
                    <Link href={linkHref}>
                      <div className="relative w-full h-[190px] md:h-[200px] lg:h-[220px] xl:h-[280px] group cursor-pointer">
                        <Image
                          src={cardImage}
                          fill
                          alt={title}
                          className="object-cover rounded-xl transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(0,0,0,0.60)_36%,_rgba(0,0,0,0.20)_63%,_rgba(0,0,0,0.00)_100%)] rounded-xl transition-opacity duration-300 group-hover:opacity-90">
                          {/* Category */}
                          <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 bg-white py-0.5 px-2 md:py-0.5 md:px-2.5 rounded-full text-primary-black text-[10px] md:text-xs font-medium">
                            {category}
                          </div>

                          {/* Season badge */}
                          <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 bg-primary-blue/90 text-white py-0.5 px-2 md:py-0.5 md:px-2.5 rounded-full text-[9px] md:text-[10px] font-medium backdrop-blur-sm">
                            {winner.season.title}
                          </div>

                          {/* Bottom Content */}
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 md:bottom-3 md:left-3 md:right-3 flex justify-between items-end">
                            <div className="space-y-0.5 lg:space-y-1 flex-1 min-w-0">
                              <h4 className="text-xs md:text-sm lg:text-base xl:text-xl font-semibold text-white truncate">
                                {title}
                              </h4>
                              {description && (
                                <div
                                  className="text-primary-gray text-sm line-clamp-2 [&_*]:!bg-transparent [&_*]:!text-inherit [&_*]:!font-normal"
                                  dangerouslySetInnerHTML={{
                                    __html: description,
                                  }}
                                />
                              )}
                            </div>

                            <div className="text-white flex items-center gap-1.5 text-xs lg:text-sm whitespace-nowrap ml-2 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                              View Spotlight
                              <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Pagination dots */}
          {winners.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {winners.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    pauseAutoplay();
                    scrollToIndex(i);
                    setActiveIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-6 bg-primary-blue"
                      : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CommunityAchievements;
