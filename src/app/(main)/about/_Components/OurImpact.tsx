import { VisibilitySvg } from "@/Components/Svg/SvgContainer";
import { CMSAboutOurImpact } from "@/Types/cms";

const defaultData = [
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

const OurImpact = ({ data: cmsData }: { data?: CMSAboutOurImpact }) => {
  const items = cmsData?.metadata || defaultData;
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += Math.ceil(items.length / 3)) {
    chunkedItems.push(items.slice(i, i + Math.ceil(items.length / 3)));
  }

  return (
    <section className="py-6 md:py-6 lg:py-8 xl:py-30 container">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-primary-black text-xl md:text-xl lg:text-2xl xl:text-5xl font-bold leading-[140%] text-center mb-1.5 md:mb-2 lg:mb-2.5">
          {cmsData?.title || "Our Impact"}
        </h2>

        <p className="text-[#1D1D1F] text-center text-xs md:text-sm lg:text-base xl:text-xl leading-[150%] max-w-[900px] mx-auto mb-3.5 md:mb-4 lg:mb-5 xl:mb-12">
          {cmsData?.sub_title || "Every story shared, every business spotlighted, and every celebration hosted contributes to a stronger, more connected community."}
        </p>

        <div className="grid md:grid-cols-3 gap-2.5 md:gap-0 justify-between md:items-center">
          {chunkedItems.map((chunk, chunkIdx) => (
            <div key={chunkIdx} className="space-y-4 md:space-y-5">
              {chunk.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 md:gap-2 text-[#364153] text-xs md:text-sm lg:text-base xl:text-xl"
                >
                  <VisibilitySvg />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
