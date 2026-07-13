"use client";
import { SOneSvg, SThreeSvg, STwoSvg } from "@/Components/Svg/SvgContainer";
import { CMSEventsPageBoothFeatures } from "@/Types/cms";
import Link from "next/link";

const iconMap = [<SOneSvg />, <STwoSvg />, <SThreeSvg />];

const fallbackData = [
  {
    icon: <SOneSvg />,
    title: "Social Media Promotion",
    description: "Featured on OSI's Instagram, Facebook, and Twitter",
  },
  {
    icon: <STwoSvg />,
    title: "Professional Photography",
    description: "High-quality photos of your booth and products",
  },
  {
    icon: <SThreeSvg />,
    title: "Spotlight Opportunities",
    description: "Chance to be featured in vendor spotlight series",
  },
];

interface WhatYouGetProps {
  data?: CMSEventsPageBoothFeatures;
}

const WhatYouGet = ({ data }: WhatYouGetProps) => {
  const items = data?.metadata?.length
    ? data.metadata.map((item, idx) => ({
        icon: iconMap[idx] ?? <SOneSvg />,
        title: item.title,
        description: item.description,
      }))
    : fallbackData;

  return (
    <section className="bg-[#F5F5F7] py-8 md:py-12">
      <div className="container">
        <h2 className="section_title font-bold leading-[130%] max-w-[1200px] mx-auto text-xl md:text-3xl xl:text-5xl">
          {data?.title ?? "What You Get with Every Booth"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 my-6 md:my-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="space-y-3 text-center flex flex-col justify-center items-center"
            >
              <span className="size-16 md:size-20 bg-[#1977DD29] rounded-full grid place-items-center">
                {item.icon}
              </span>
              <h3 className="text-lg md:text-xl xl:text-2xl font-semibold text-[#0A0A0A]">
                {item.title}
              </h3>
              <p className="text-[#4A5565] text-sm md:text-base xl:text-lg">{item.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="w-fit block mx-auto px-5 md:px-7 rounded-full cursor-pointer bg-primary-blue text-white py-2 md:py-2.5 text-sm md:text-lg"
        >
          Apply as Vendor
        </Link>

        <p className="text-[#4A5565] text-sm md:text-lg text-center mt-4 md:mt-5">
          Limited spots available for each event
        </p>
      </div>
    </section>
  );
};

export default WhatYouGet;
