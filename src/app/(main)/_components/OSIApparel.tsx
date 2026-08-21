"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/Components/Common/Button";
import { useState, useEffect, useMemo } from "react";
import { CMSShop, FeaturedProductItem } from "@/Types/cms";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";

interface OSIApparelProps {
  data?: CMSShop;
  featuredProducts?: FeaturedProductItem[];
}

const OSIApparel = ({ data, featuredProducts }: OSIApparelProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const products = useMemo(
    () =>
      featuredProducts && featuredProducts.length > 0
        ? featuredProducts.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.name,
            price: `$${p.display_price}`,
            image: p.thumbnail,
            tag: p.type === "digital" ? "Digital" : undefined,
            description: p.short_description,
          }))
        : [],
    [featuredProducts],
  );

  return (
    <>
      <section className="py-10 text-center bg-[#F5F5F7]">
        <div className="">
          {/* Heading */}
          <h2 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
            {data?.title}
          </h2>

          <p className="mt-3 md:mt-4 md:text-lg mx-auto text-secondary-black">
            {data?.sub_title}
          </p>

          {/* Swiper */}
          {products.length > 0 && (
            <div className="mt-7 osi-swiper-wrapper">
              <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                initialSlide={1}
                pagination={{ clickable: true }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: isMobile ? 30 : 80,
                  depth: isMobile ? 120 : 200,
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

                      <div className="osi-overlay" />

                      {/* Tag */}
                      {item.tag && (
                        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white text-black text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full z-10">
                          {item.tag}
                        </span>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-left text-white z-10">
                        <div className="flex justify-between items-end gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold leading-tight line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-xs sm:text-sm mt-0.5 sm:mt-1 opacity-80 leading-snug line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1.5 sm:gap-3 shrink-0">
                            <span className="text-sm sm:text-base font-bold">
                              {item.price}
                            </span>
                            <button
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push(`/shop/${item.slug}`);
                              }}
                              className="bg-[#0066FF] hover:bg-[#0052CC] transition-colors text-white px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 whitespace-nowrap cursor-pointer"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <h3 className="mt-8 md:mt-12 section_title max-w-4xl mx-auto">
          Become part of a growing network that celebrates art, business, and
          community.
        </h3>

        <div className="mt-4 md:mt-8 flex justify-center gap-4 md:gap-6">
          <Button asChild>
            <Link href="/auth/login">Join OSI</Link>
          </Button>
          <Button variant="outline" onClick={() => setIsSponsorModalOpen(true)}>
            Become a Sponsor
          </Button>
        </div>
      </div>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}

      <style jsx global>{`
        .osi-swiper-wrapper {
          overflow: hidden;
        }

        .osi-coverflow {
          width: 100% !important;
          padding-top: 10px !important;
          padding-bottom: 40px !important;
        }

        .osi-slide {
          width: min(640px, 88vw) !important;
          height: clamp(200px, 56vw, 420px) !important;
          border-radius: 20px;
          overflow: hidden;
          transition:
            transform 0.4s ease,
            opacity 0.4s ease;
        }

        .osi-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
        }

        .osi-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          transition: background 0.4s ease;
          z-index: 1;
        }

        .swiper-slide-active .osi-card {
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }

        .swiper-slide-active .osi-overlay {
          background: rgba(0, 0, 0, 0.15);
        }

        .swiper-slide-prev .osi-overlay,
        .swiper-slide-next .osi-overlay {
          background: rgba(0, 0, 0, 0.55);
        }

        .osi-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(
            .swiper-slide-next
          )
          .osi-overlay {
          background: rgba(0, 0, 0, 0.65);
        }

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

        @media (max-width: 639px) {
          .osi-slide {
            border-radius: 14px;
          }

          .osi-card {
            border-radius: 14px;
          }

          .osi-coverflow {
            padding-bottom: 30px !important;
          }

          .osi-coverflow .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
          }

          .osi-coverflow .swiper-pagination-bullet-active {
            width: 18px;
          }
        }

        @media (max-width: 374px) {
          .osi-slide {
            width: 92vw !important;
            height: clamp(180px, 60vw, 240px) !important;
          }
        }

        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </>
  );
};

export default OSIApparel;
