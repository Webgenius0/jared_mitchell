"use client";
import hostImg from "@/Assets/host.png";
import {
  HFourSvg,
  HOneSvg,
  HThreeSvg,
  HTwoSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSEventsPageHost } from "@/Types/cms";
import Image from "next/image";

const fallbackData = [
  {
    icon: <HOneSvg />,
    title: "AI Promotion",
    description: "Automated social media posting and marketing",
  },
  {
    icon: <HTwoSvg />,
    title: "Community Reach",
    description: "Access to OSI's engaged member base",
  },
  {
    icon: <HThreeSvg />,
    title: "Event Tools",
    description: "RSVP management and analytics dashboard",
  },
  {
    icon: <HFourSvg />,
    title: "Growth Support",
    description: "Partner opportunities and vendor coordination",
  },
];

const iconMap = [<HOneSvg />, <HTwoSvg />, <HThreeSvg />, <HFourSvg />];

interface EventHostProps {
  data?: CMSEventsPageHost;
}

const EventHost = ({ data }: EventHostProps) => {
  const items = data?.metadata?.length
    ? data.metadata.map((item, index) => ({
        icon: iconMap[index] ?? <HOneSvg />,
        title: item.title,
        description: item.description,
      }))
    : fallbackData;

  return (
    <section className="py-8 md:py-10 lg:py-12 xl:py-20 container">        <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-10 xl:gap-16 items-center">
        {/* Left */}
        <div className="order-2 lg:order-1">
          <h3 className="text-primary-black text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[130%] xl:leading-[140%] mb-2">
            {data?.title ?? "Host Your Event With OSI"}
          </h3>

          <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-[#1D1D1F] leading-[150%] max-w-full lg:max-w-[90%] mb-4 md:mb-5 lg:mb-6">
            {data?.sub_title ??
              "Got a workshop, pop-up, showcase, or community gathering? OSI members can host their events on our platform — with AI promotion tools, social posting, partner support, and vendor opportunities."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 xl:gap-y-10 xl:gap-x-14 mb-4 md:mb-5 lg:mb-6">
            {items.map(item => (
              <div
                key={item.title}
                className="flex gap-3 md:gap-5 items-start md:items-center"
              >
                <p className="grid place-items-center size-10 md:size-12 lg:size-14 shrink-0 rounded-full bg-[#F1F5F9] border border-[#00000007]">
                  {item.icon}
                </p>
                <div>
                  <h4 className="text-sm md:text-base lg:text-lg xl:text-2xl font-medium text-[#364153] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm lg:text-base xl:text-xl text-[#45556C]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-3 md:gap-5 items-start sm:items-center max-w-full lg:max-w-[80%]">
            <button className="px-5 md:px-7 rounded-full cursor-pointer bg-primary-blue text-white py-2 md:py-2.5 text-sm md:text-lg whitespace-nowrap">
              Submit Event
            </button>
            <button className="px-5 md:px-7 rounded-full cursor-pointer text-[#314158] bg-[#F1F5F9] py-2 md:py-2.5 text-sm md:text-lg whitespace-nowrap">
              Learn Member Benefits
            </button>
          </div> */}
        </div>

        {/* Right */}
        <div className="order-1 lg:order-2 w-full lg:w-[400px] xl:w-[600px] h-[240px] md:h-[300px] lg:h-[350px] xl:h-[550px] relative overflow-hidden shrink-0">
          <Image
            src={data?.image ?? hostImg}
            alt="host_img"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EventHost;
