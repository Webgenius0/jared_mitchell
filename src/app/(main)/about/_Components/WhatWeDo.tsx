import {
  WFiveSvg,
  WFourSvg,
  WOneSvg,
  WSixSvg,
  WThreeSvg,
  WTwoSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSAboutWhatWeDo } from "@/Types/cms";

const defaultData = [
  {
    id: 1,
    icon: <WOneSvg />,
    title: "Business Spotlights",
    description:
      "Showcasing local entrepreneurs and helping them build visibility and credibility.",
  },
  {
    id: 2,
    icon: <WTwoSvg />,
    title: "Artist & Creative Features",
    description:
      "Highlighting musicians, visual artists, designers, models, creators, and innovators.",
  },
  {
    id: 3,
    icon: <WThreeSvg />,
    title: "OSI Top Business Award: A Business Shower",
    description: "A celebration and support system for new business owners.",
  },
  {
    id: 4,
    icon: <WFourSvg />,
    title: "Cultural Storytelling",
    description: "Documenting real stories, struggles, and triumphs.",
  },
  {
    id: 5,
    icon: <WFiveSvg />,
    title: "Community Engagement & Events",
    description:
      "Interviews, events, collaborations, and creative opportunities.",
  },
  {
    id: 6,
    icon: <WSixSvg />,
    title: "Sponsorship & Advertising",
    description: "Affordable promotions and community-driven exposure.",
  },
];

const WhatWeDo = ({ data: cmsData }: { data?: CMSAboutWhatWeDo }) => {
  const items =
    cmsData?.metadata?.map((m, i) => ({
      id: i + 1,
      icon: m.icon ? (
        <i className={`${m.icon} text-3xl text-primary-blue`} />
      ) : (
        defaultData[i % defaultData.length].icon
      ),
      title: m.title,
      description: m.description,
    })) || defaultData;

  return (
    <section className="container py-8 md:py-8 lg:py-12 xl:py-20">
      <h2 className="text-primary-black text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] text-center mb-5 md:mb-6 lg:mb-7 xl:mb-12">
        {cmsData?.title || "What We Do"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4 xl:gap-5">
        {items?.map((item) => (
          <div
            key={item.id}
            className="border border-[#00000013] 
             px-4 md:px-4 lg:px-5 py-7 md:py-7 lg:py-8 xl:py-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex flex-col gap-3 lg:gap-4 justify-between"
          >
            <div className="space-y-4">
              <span className="size-12 md:size-12 lg:size-14 xl:size-16 grid place-items-center rounded-xl border border-[#00000013]">
                {item?.icon}
              </span>

              <h3 className="font-medium text-base md:text-base lg:text-lg xl:text-2xl text-[#1D1D1F] max-w-[350px] leading-[150%]">
                {item?.title}
              </h3>
            </div>

            <p className="text-[#1D1D1F] text-sm md:text-base lg:text-lg xl:text-xl leading-[150%]">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
