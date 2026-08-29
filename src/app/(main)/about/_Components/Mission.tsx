import { AOneSvg, ATwoSvg } from "@/Components/Svg/SvgContainer";
import { CMSAboutMission } from "@/Types/cms";
import Image from "next/image";

const Mission = ({ data }: { data?: CMSAboutMission }) => {
  const items = data?.metadata || [
    {
      title: "Mission",
      description: "To empower individuals, artists, and small businesses by giving them visibility, celebration, and support — creating a platform where culture and community shine together.",
      image: ""
    },
    {
      title: "Purpose",
      description: "To build a united community that encourages collaboration, inspires creativity, and supports the dreams of those shaping the future.",
      image: ""
    }
  ];

  return (
    <section className="container py-6 md:py-6 lg:py-8 xl:py-20">
      <h2 className="text-primary-black text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold leading-[140%] text-center mb-3.5 md:mb-4 lg:mb-5 xl:mb-12">
        {data?.title || "Mission & Purpose"}
      </h2>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`flex-1 ${index === 0 ? 'bg-[#DB0F190A]' : 'bg-[#FFCE290A]'} py-4 md:py-4 lg:py-5 xl:py-12 flex flex-col justify-center items-center rounded-xl space-y-2 md:space-y-2.5 lg:space-y-3.5 text-center px-4 md:px-6 lg:px-8 xl:px-20 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#0000000e]`}
          >
            {item.image ? (
              <div className="relative w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-20 xl:h-20">
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </div>
            ) : (
              index === 0 ? <AOneSvg /> : <ATwoSvg />
            )}
            <h3 className="text-primary-black text-base md:text-lg lg:text-xl xl:text-4xl font-bold">
              {item.title}
            </h3>
            <p className="text-[#364153] text-xs md:text-sm lg:text-base xl:text-[22px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mission;
