"use client";
import Image from "next/image";
import { Button } from "@/Components/Common/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { CMSShop } from "@/Types/cms";

import a1 from "@/Assets/a1.png";
import a2 from "@/Assets/a2.png";
import a3 from "@/Assets/a3.png";
import a4 from "@/Assets/about.jpg";

const products = [
  {
    id: 1,
    title: "Promotion Credit",
    price: "$99",
    image: a1,
    description: "Boost your brand reach on OSI",
  },
  {
    id: 2,
    title: "Boss Beginnings Toolkit",
    price: "$49",
    image: a2,
    tag: "Digital",
    description: "Complete toolkit to launch and grow your business.",
  },
  {
    id: 3,
    title: "OSI Signature Hoodie",
    price: "$79",
    image: a3,
    description: "Premium quality hoodie that represents the OSI brand.",
  },
  {
    id: 4,
    title: "OSI Cap",
    price: "$39",
    image: a4,
    description: "Stylish cap for the modern entrepreneur.",
  },
];

const OSIApparel = ({ data }: { data?: CMSShop }) => {
  return (
    <>
      <section className="pt-10 md:py-16 text-center bg-[#F5F5F7]">
        <div className="container">
          {/* Heading */}
          <h2 className="text-xl md:text-4xl xl:text-5xl 2xl:text-7xl font-bold">
            {data?.title || "Shop OSI Apparel, Ebooks, and Digital"}
          </h2>

          <p className="mt-3 md:mt-5 md:text-xl mx-auto text-secondary-black">
            {data?.sub_title || "Explore exclusive merchandise, creative tools, and digital resources designed to help you build your brand and elevate your craft."}
          </p>

          {/* Swiper */}
          <div className="mt-7 md:mt-10 lg:mt-16 osi-swiper-wrapper">
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              initialSlide={1}
              pagination={{ clickable: true }}
              coverflowEffect={{
                rotate: 0,
                stretch: 80,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Pagination]}
              className="osi-coverflow"
            >
              {products.map(item => (
                <SwiperSlide key={item.id} className="osi-slide">
                  <div className="osi-card">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                    {/* Dark overlay — lighter on active slide via CSS */}
                    <div className="osi-overlay" />

                    {/* Tag */}
                    {item.tag && (
                      <span className="absolute top-4 right-4 bg-white text-black text-xs font-medium px-3 py-1 rounded-full z-10">
                        {item.tag}
                      </span>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white z-10">
                      <h4 className="text-lg font-semibold leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm mt-1 opacity-80 leading-snug">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-base font-bold">
                          {item.price}
                        </span>
                        <button className="bg-[#0066FF] hover:bg-[#0052CC] transition-colors text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                          🛒 Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <h3 className="mt-10 md:mt-20 section_title max-w-4xl mx-auto">
          Become part of a growing network that celebrates art, business, and
          community.
        </h3>

        <div className="mt-5 md:mt-10 flex justify-center gap-4 md:gap-6">
          <Button>Join OSI</Button>
          <Button variant="outline">Become a Sponsor</Button>
        </div>
      </div>

      <style jsx global>{`
        /* Wrapper to control overflow */
        .osi-swiper-wrapper {
          overflow: hidden;
        }

        /* Swiper container */
        .osi-coverflow {
          width: 100% !important;
          padding-top: 10px !important;
          padding-bottom: 40px !important;
        }

        /* Each slide */
        .osi-slide {
          width: 340px !important;
          height: 420px !important;
          border-radius: 20px;
          overflow: hidden;
          transition:
            transform 0.4s ease,
            opacity 0.4s ease;
        }

        /* Card inner */
        .osi-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
        }

        /* Overlay: darker on non-active slides */
        .osi-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          transition: background 0.4s ease;
          z-index: 1;
        }

        /* Active (center) slide */
        .swiper-slide-active .osi-card {
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }

        .swiper-slide-active .osi-overlay {
          background: rgba(0, 0, 0, 0.15);
        }

        /* Prev/next slides — dimmer */
        .swiper-slide-prev .osi-overlay,
        .swiper-slide-next .osi-overlay {
          background: rgba(0, 0, 0, 0.55);
        }

        /* Slides further away */
        .osi-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(
            .swiper-slide-next
          )
          .osi-overlay {
          background: rgba(0, 0, 0, 0.65);
        }

        /* Pagination dots */
        .osi-coverflow .swiper-pagination {
          bottom: 4px;
        }

        .osi-coverflow .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #ccc;
          opacity: 1;
        }

        .osi-coverflow .swiper-pagination-bullet-active {
          background: #000;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default OSIApparel;
