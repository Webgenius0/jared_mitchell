import {
  WFiveSvg,
  WFourSvg,
  WOneSvg,
  WSixSvg,
  WThreeSvg,
  WTwoSvg,
} from "@/Components/Svg/SvgContainer";

const data = [
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
    title: "Boss Beginnings: A Business Shower",
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

const WhatWeDo = () => {
  return (
    <section className="container py-20">
      <h2 className="text-primary-black text-5xl font-bold leading-[140%] text-center mb-12">
        Mission & Purpose
      </h2>

      <div className="grid grid-cols-3 gap-5">
        {data?.map(item => (
          <div className="border border-[#00000013] rounded-xl px-5 py-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex flex-col gap-4 justify-between">
            <div className="space-y-4">
              <span className="size-16 grid place-items-center rounded-xl border border-[#00000013]">
                {item?.icon}
              </span>

              <h3 className="font-medium text-2xl text-[#1D1D1F] max-w-[350px] leading-[150%]">
                {item?.title}
              </h3>
            </div>

            <p className="text-[#1D1D1F] text-xl leading-[150%]">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
