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
    <section className="container py-8 md:py-8 lg:py-12 xl:py-20">
      <h2 className="text-primary-black text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] text-center mb-5 md:mb-6 lg:mb-7 xl:mb-12">
        {data?.title || "Mission & Purpose"}
      </h2>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-5">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`flex-1 ${index === 0 ? 'bg-[#DB0F190A]' : 'bg-[#FFCE290A]'} py-6 md:py-6 lg:py-8 xl:py-12 flex flex-col justify-center items-center rounded-xl space-y-2.5 md:space-y-3 lg:space-y-5 text-center px-5 md:px-8 lg:px-10 xl:px-20 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#0000000e]`}
          >
            {item.image ? (
              <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20">
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              </div>
            ) : (
              index === 0 ? <AOneSvg /> : <ATwoSvg />
            )}
            <h3 className="text-primary-black text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">
              {item.title}
            </h3>
            <p className="text-[#364153] text-sm md:text-base lg:text-lg xl:text-[22px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mission;
