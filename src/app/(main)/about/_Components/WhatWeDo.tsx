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
    <section className="container md:py-10 xl:py-20">
      <h2 className="text-primary-black text-3xl md:text-4xl xl:text-5xl font-bold leading-[140%] text-center mb-7 xl:mb-12">
        {cmsData?.title || "What We Do"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {items?.map((item) => (
          <div
            key={item.id}
            className="border border-[#00000013] rounded-xl px-5 py-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex flex-col gap-4 justify-between"
          >
            <div className="space-y-4">
              <span className="size-16 grid place-items-center rounded-xl border border-[#00000013]">
                {item?.icon}
              </span>

              <h3 className="font-medium text-xl xl:text-2xl text-[#1D1D1F] max-w-[350px] leading-[150%]">
                {item?.title}
              </h3>
            </div>

            <p className="text-[#1D1D1F] text-lg xl:text-xl leading-[150%]">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
