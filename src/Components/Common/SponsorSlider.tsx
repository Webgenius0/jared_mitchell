import { LogoSliderProps } from "@/Types/type";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";

const SponsorSlider = ({ logos, reverse = false }: LogoSliderProps) => {
  if (!logos.length) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Keyboard, Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        speed={700}
        loop={logos.length > 1}
        navigation={{
          nextEl: ".community-partner-next",
          prevEl: ".community-partner-prev",
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={
          logos.length > 1
            ? {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        allowTouchMove
        grabCursor
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        dir={reverse ? "rtl" : "ltr"}
        className="!pb-8"
      >
        {logos.map((logo, index) => {
          const altText = logo.alt || logo.title || "Community partner logo";

          return (
            <SwiperSlide key={logo.id ?? `${logo.link ?? "logo"}-${index}`}>
              <a
                href={logo.link || "#"}
                target={logo.link ? "_blank" : undefined}
                rel={logo.link ? "noopener noreferrer" : undefined}
                aria-label={altText}
                className="group flex h-[150px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 shadow-[0_1.597px_4.79px_0_rgba(0,0,0,0.10),_0_1.597px_3.193px_-1.597px_rgba(0,0,0,0.10)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
              >
                {logo.image ? (
                  <Image
                    src={logo.image}
                    alt={altText}
                    width={500}
                    height={500}
                    className="h-full w-full object-contain"
                    priority={index === 0}
                  />
                ) : (
                  logo.icon && <logo.icon />
                )}
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {logos.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous community partners"
            className="community-partner-prev inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#111827] transition hover:border-primary-blue hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
          >
            <HiMiniChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next community partners"
            className="community-partner-next inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#111827] transition hover:border-primary-blue hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
          >
            <HiMiniChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SponsorSlider;
