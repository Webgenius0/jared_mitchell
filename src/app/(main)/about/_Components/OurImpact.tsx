import { VisibilitySvg } from "@/Components/Svg/SvgContainer";

const data = [
  "Visibility",
  "Encouragement",
  "Motivation",
  "New customers",
  "Opportunities",
  "Confidence",
  "Community support",
  "Collaboration",
  "Sense of belonging",
];

const OurImpact = () => {
  return (
    <section className="py-10 xl:py-20 container">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-primary-black text-4xl xl:text-5xl font-bold leading-[140%] text-center mb-3">
          Our Impact
        </h2>

        <p className="text-[#1D1D1F] text-center text-xl leading-[150%] max-w-[900px] mx-auto mb-7 xl:mb-12">
          Every story shared, every business spotlighted, and every celebration
          hosted contributes to a stronger, more connected community.
        </p>

        <div className="flex flex-col gap-5 md:gap-0 justify-between md:items-center">
          <div className="space-y-5">
            {data?.slice(0, 3)?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-[#364153] text-lg xl:text-xl"
              >
                <VisibilitySvg />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {data?.slice(3, 6)?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-[#364153] text-lg xl:text-xl"
              >
                <VisibilitySvg />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {data?.slice(6, 9)?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-[#364153] text-lg xl:text-xl"
              >
                <VisibilitySvg />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
