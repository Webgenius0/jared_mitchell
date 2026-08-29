import { LogoSliderProps } from "@/Types/type";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const SponsorSlider = ({ logos, reverse = false }: LogoSliderProps) => {
  return (
    <Marquee
      direction={reverse ? "right" : "left"}
      autoFill={true}
    >
      <div className="flex items-center">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center mx-2.5 md:mx-3 my-2.5 md:my-3 w-[240px] xl:w-[232px] h-[130px] xl:h-[200px] rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] shadow-[0_1.597px_4.79px_0_rgba(0,0,0,0.10),_0_1.597px_3.193px_-1.597px_rgba(0,0,0,0.10)] overflow-hidden p-4"
          >
            {logo.image ? (
              <Image
                src={logo.image}
                alt="Partner"
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            ) : (
              logo.icon && <logo.icon />
            )}
          </a>
        ))}
      </div>
    </Marquee>
  );
};

export default SponsorSlider;