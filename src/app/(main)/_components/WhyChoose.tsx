"use client";

import Image from "next/image";
import osi from "@/Assets/osi.png";
import { CMSWhyChoose } from "@/Types/cms";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const WhyChoose = ({ data }: { data?: CMSWhyChoose }) => {
  const items = data?.metadata ?? [];
  return (
    <div className= "container py-6 md:py-8 xl:py-12">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="section_title">
          {data?.title}
        </h2>

        <p className="section_sub_title">
          {data?.sub_title}
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop={items.length > 1}
        autoplay={
          items.length > 1
            ? {
                delay: 4000,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={
          items.length > 1
            ? {
                clickable: true,
              }
            : false
        }
        className="why-choose-swiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <section className="w-full h-[320px] lg:h-[380px] xl:h-[460px] overflow-hidden flex items-center relative">
              <Image
                src={item?.image || osi}
                fill
                alt={item?.title || "Why Choose OSI"}
                className="object-cover w-full"
              />

              <div className="w-full h-full absolute top-0 bg-gradient-to-t from-black/85 via-black/50 to-black/35 ">
                <div className="flex flex-col w-full mx-auto h-full items-center justify-center">
                  <h2 className="section_title !text-white">
                    {item?.title || "Creators"}
                  </h2>

                  <h4 className="text-white text-lg md:text-2xl text-center font-medium mb-2 md:mb-3">
                    {item?.sub_title ||
                      "Build exposure without chasing algorithms"}
                  </h4>

                  <p className="section_sub_title max-w-[1280px] mx-auto !text-[#f5f5f7d3]">
                    {item?.description ||
                      "Share your work through OSI spotlights, features, and campaigns that help your story reach the right audience."}
                  </p>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

<style jsx global>{`
  .why-choose-swiper {
    padding-bottom: ${items.length > 1 ? "35px" : "0"};
  }

  .why-choose-swiper .swiper-pagination {
    bottom: 0;
  }

  .why-choose-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    opacity: 0.5;
    background: #306fdc;
  }

  .why-choose-swiper .swiper-pagination-bullet-active {
    opacity: 1;
    background: #306fdc;
  }
`}</style>
    </div>
  );
};

export default WhyChoose;