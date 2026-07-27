"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
  const isBusiness = winner.contestable.type.includes("Business");
  return isBusiness ? "/business-spotlight" : "/artist-spotlight";
};

const CommunityAchievements = ({
  data,
  pastSixMonthsWinners,
}: CommunityAchievementsProps) => {
  const winners = pastSixMonthsWinners || [];

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
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {winners.map((winner) => {
              const title =
                winner.display_name || winner.contestable.business_name;
              const category = extractCategory(winner.contestable.type);
              const description =
                winner.contestable.story ||
                winner.contestable.community_impact_statement ||
                "";
              const linkHref = getSpotlightLink(winner);

              return (
                <SwiperSlide key={winner.id}>
                  <Link href={linkHref}>
                    <div className="relative w-full h-[300px] group cursor-pointer">
                      <Image
                        src={winner.avatar_url}
                        fill
                        alt={title}
                        className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default CommunityAchievements;
