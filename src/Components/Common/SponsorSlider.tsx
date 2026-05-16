import { LogoSliderProps } from "@/Types/type";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const SponsorSlider = ({ logos, reverse = false }: LogoSliderProps) => {
  return (
    <>
      <Marquee direction={reverse ? "right" : "left"}>
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center mx-3 md:mx-4 my-3 md:my-4 w-[280px] xl:w-[332px] h-[160px] xl:h-[200px] rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] shadow-[0_1.597px_4.79px_0_rgba(0,0,0,0.10),_0_1.597px_3.193px_-1.597px_rgba(0,0,0,0.10)] overflow-hidden p-5"
          >
            {logo.image ? (
              <Image 
                src={logo.image} 
                alt="Partner" 
                width={200} 
                height={100} 
                className="w-full h-full object-contain"
              />
            ) : (
              logo.icon && <logo.icon />
            )}
          </a>
        ))}
      </Marquee>
    </>
  );
};

export default SponsorSlider;
