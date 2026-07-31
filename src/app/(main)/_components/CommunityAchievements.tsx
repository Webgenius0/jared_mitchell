"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { PastSixMonthsWinner } from "@/Types/cms";

interface CommunityAchievementsProps {
  data?: any;
  pastSixMonthsWinners?: PastSixMonthsWinner[];
}

const extractCategory = (contestableType: string): string => {
  const parts = contestableType.split("\\");
  return parts[parts.length - 1] || "Business";
};

const getSpotlightLink = (winner: PastSixMonthsWinner): string => {
  return `/contest/contestants/${winner.id}`;
};

const AUTOPLAY_DELAY = 3000;

const CommunityAchievements = ({
  data,
  pastSixMonthsWinners,
}: CommunityAchievementsProps) => {
  const winners = pastSixMonthsWinners || [];

  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Keep activeIndex in sync with manual scrolling (for pagination dots)
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
      <h2 className="section_title 2xl:text-6xl 2xl:font-semibold">
        {data?.title || "Past Six Months Boss Beginning Winners"}
      </h2>

      <p className="section_sub_title">
        {data?.sub_title ||
          "Celebrating our community's achievements and creative milestones"}
      </p>

      {winners.length > 0 && (
        <div className="my-6 md:mt-12">
          <ul
            ref={scrollerRef}
            onScroll={handleScroll}
            onPointerDown={pauseAutoplay}
            className="flex gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2"
          >
            {winners.map(winner => {
              const title =
                winner.display_name || winner.contestable.business_name;
              const category = extractCategory(winner.contestable.type);
              const description =
                winner.contestable.story ||
                winner.contestable.community_impact_statement ||
                "";
              const linkHref = getSpotlightLink(winner);

              return (
                <li
                  key={winner.id}
                  className="shrink-0 snap-start w-[80%] sm:w-[65%] md:w-1/2 lg:w-1/3 xl:w-1/4"
                >
                  <Link href={linkHref}>
                    <div className="relative w-full h-[300px] group cursor-pointer">
                      <Image
                        src={winner.avatar_url}
                        fill
                        alt={title}
                        className="object-cover rounded-xl transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(0,0,0,0.60)_36%,_rgba(0,0,0,0.20)_63%,_rgba(0,0,0,0.00)_100%)] rounded-xl transition-opacity duration-300 group-hover:opacity-90">
                        {/* Category */}
                        <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-primary-black text-sm font-medium">
                          {category}
                        </div>

                        {/* Season badge */}
                        <div className="absolute top-4 right-4 bg-primary-blue/90 text-white py-1 px-3 rounded-full text-xs font-medium backdrop-blur-sm">
                          {winner.season.title}
                        </div>

                        {/* Bottom Content */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <h4 className="text-xl font-semibold text-white truncate">
                              {title}
                            </h4>
                            {description && (
                              <p className="text-primary-gray text-sm line-clamp-2">
                                {description}
                              </p>
                            )}
                          </div>

                          <div className="text-white flex items-center gap-2 text-sm whitespace-nowrap ml-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
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
