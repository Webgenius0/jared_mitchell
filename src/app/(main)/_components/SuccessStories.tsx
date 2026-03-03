"use client";
import { Button } from "@/Components/Common/Button";
import { successStories } from "@/Components/Data/data";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SuccessStories = () => {
  return (
    <section className="section">
      <h2 className="section_title 2xl:text-6xl 2xl:font-semibold">
        Celebrating Local Success Stories
      </h2>

      <p className="section_sub_title">
        Meet the businesses shaping our neighborhoods.
        <br />
        From innovative startups to community anchors, these stories highlight
        the courage, creativity, and commitment behind every brand.
      </p>

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
            1536: {
              slidesPerView: 4,
            },
          }}
        >
          {successStories?.map(data => (
            <SwiperSlide key={data.id}>
              <div className="relative w-full h-[300px]">
                <Image
                  src={data.image}
                  fill
                  alt="image"
                  className="object-cover rounded-lg"
                />

                <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(0,0,0,0.60)_36%,_rgba(0,0,0,0.20)_63%,_rgba(0,0,0,0.00)_100%)] rounded-lg">
                  {/* Category */}
                  <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-primary-black text-sm">
                    {data.category}
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="space-y-1.5">
                      <h4 className="text-lg xl:text-xl font-semibold text-white">
                        {data.title}
                      </h4>
                      <p className="text-primary-gray text-sm">
                        {data.description}
                      </p>
                    </div>

                    <div className="text-white flex items-center gap-2 text-sm whitespace-nowrap">
                      View Spotlight
                      <LuArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="text-center">
        <Button>Explore Business Spotlights</Button>
      </div>
    </section>
  );
};

export default SuccessStories;
