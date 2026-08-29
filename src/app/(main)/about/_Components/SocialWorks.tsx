import {
  WFiveSvg,
  WOneSvg,
  WSevenSvg,
  WSixSvg,
  WTwoSvg,
} from "@/Components/Svg/SvgContainer";
import Marquee from "react-fast-marquee";
import { CMSAboutHowItWorks } from "@/Types/cms";

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
    icon: <WSixSvg />,
    title: "Community Engagement",
    description: "A celebration and support system for new business owners.",
  },
  {
    id: 4,
    icon: <WSevenSvg />,
    title: "Visibility & Growth",
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

const SocialWorks = ({ data: cmsData }: { data?: CMSAboutHowItWorks }) => {
  const items = cmsData?.metadata?.map((m, i) => ({
    id: i + 1,
    icon: m.icon ? <i className={`${m.icon} text-3xl md:text-5xl text-primary-blue`} /> : defaultData[i % defaultData.length].icon,
    title: m.title,
    description: m.description
  })) || defaultData;

  return (
    <section className="py-6 md:py-6 lg:py-8 xl:py-20">
      <div className="container">
        <h2 className="text-primary-black text-xl md:text-xl lg:text-2xl xl:text-5xl font-bold leading-[140%] text-center mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-5">
          {cmsData?.title || "How Our Social Image Works"}
        </h2>

        <p className="text-[#1D1D1F] text-center text-xs md:text-sm lg:text-base xl:text-xl leading-[150%] mb-3.5 md:mb-4 lg:mb-5 xl:mb-12">
          {cmsData?.sub_title || "A simple ecosystem built to support creators, businesses, and community—together."}
        </p>
      </div>

      <Marquee autoFill={true}>
        <div className="flex">
          {items?.map(item => (
            <div key={item.id} className="border border-[#00000013] rounded-xl px-3.5 lg:px-4 py-5 md:py-5 lg:py-6 xl:py-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex flex-col gap-2 md:gap-2.5 lg:gap-3 xl:gap-5 justify-between w-[260px] md:w-[300px] lg:w-[340px] xl:w-[450px] text-center mr-3 lg:mr-4">
              <span className="size-10 md:size-11 lg:size-14 xl:size-28 mx-auto grid place-items-center rounded-full bg-gray-50 shadow border border-[#00000007]">
                {item?.icon}
              </span>

              <h3 className="font-bold text-sm md:text-base lg:text-lg xl:text-2xl text-[#1D1D1F] leading-[150%]">
                {item?.title}
              </h3>

              <p className="text-[#1D1D1F] text-xs md:text-sm lg:text-sm xl:text-xl leading-[150%]">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default SocialWorks;
