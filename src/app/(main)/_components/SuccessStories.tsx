"use client";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CMSBase, HistoricalWinnersItem } from "@/Types/cms";

interface SuccessStoriesProps {
  cmsData?: CMSBase;
  winners?: HistoricalWinnersItem[];
  type: "business" | "artist";
}

const SuccessStories = ({ cmsData, winners, type }: SuccessStoriesProps) => {
  const title =
    cmsData?.title ||
    (type === "business"
      ? "Celebrating Local Business Success Stories"
      : "Celebrating Local Artist Success Stories");

  const subTitle =
    cmsData?.sub_title ||
    (type === "business"
      ? "Meet the businesses shaping our neighborhoods."
      : "Celebrating our community's achievements and creative milestones");

  const items = winners && winners.length > 0 ? winners : [];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section_title 2xl:text-6xl 2xl:font-semibold">
          {title}
        </h2>

        <p className="section_sub_title">{subTitle}</p>
      </div>

      {items.length > 0 && (
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
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1536: { slidesPerView: 4 },
            }}
          >
            {items.map(item => (
              <SwiperSlide key={item.id}>
                <div className="relative w-full h-[300px]">
                  <Image
                    src={item.image}
                    fill
                    alt={item.title}
                    className="object-contain rounded-lg h-full w-full"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(0,0,0,0.60)_36%,_rgba(0,0,0,0.20)_63%,_rgba(0,0,0,0.00)_100%)] rounded-lg">
                    {/* Category */}
                    <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-primary-black text-sm">
                      {item.category ||
                        (type === "business" ? "Business" : "Artist")}
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="space-y-1.5">
                        <h4 className="text-lg xl:text-xl font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="text-primary-gray text-sm line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {item.slug && (
                        <Link
                          href={
                            type === "business"
                              ? `/business-spotlight/${item.slug}`
                              : `/artist-spotlight/${item.slug}`
                          }
                          className="text-white flex items-center gap-2 text-sm whitespace-nowrap hover:underline"
                        >
                          View Spotlight
                          <LuArrowRight />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="text-center">
        <Link
          href={
            type === "business" ? "/business-spotlight" : "/artist-spotlight"
          }
        >
          <Button>
            {type === "business"
              ? "Explore Business Spotlights"
              : "Explore Artist Spotlights"}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SuccessStories;
