import { LogoSliderProps } from "@/Types/type";
import Image from "next/image";

const SponsorSlider = ({ logos, reverse = false }: LogoSliderProps) => {
  if (!logos.length) return null;

  const marqueeLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#f5f5f7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#f5f5f7] to-transparent" />

      <div className="overflow-hidden">
        <div
          className="flex w-max items-center gap-5 py-2 md:gap-6"
          style={{
            animation: `marquee 24s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {marqueeLogos.map((logo, index) => {
            const altText = logo.alt || logo.title || "Community partner logo";
            const isDuplicate = index >= logos.length;

            return (
              <a
                key={`${logo.id ?? index}-${isDuplicate ? "duplicate" : "original"}`}
                href={logo.link || "#"}
                target={logo.link ? "_blank" : undefined}
                rel={logo.link ? "noopener noreferrer" : undefined}
                aria-label={altText}
                className="group flex h-[120px] w-[220px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 shadow-[0_1.597px_4.79px_0_rgba(0,0,0,0.10),_0_1.597px_3.193px_-1.597px_rgba(0,0,0,0.10)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
                aria-hidden={isDuplicate}
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
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorSlider;
