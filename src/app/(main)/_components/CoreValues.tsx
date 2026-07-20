import coreValueBg from "@/Assets/core_values.jpg";
import {
  OFiveSvg,
  OFourSvg,
  OOneSvg,
  OThreeSvg,
  OTwoSvg,
} from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import { CMSCoreValue } from "@/Types/cms";

const defaultData = [
  {
    id: 1,
    icon: OOneSvg,
    title: "Intentional Visibility",
    sub_title: "Visibility should be thoughtful, not random.",
    description:
      "OSI highlights creators and businesses with care, context, and purpose — prioritizing meaningful stories over noise or trends.",
  },
  {
    id: 2,
    icon: OTwoSvg,
    title: "Community Over Vanity Metrics",
    sub_title: "Real support matters more than likes.",
    description:
      "OSI is built to foster genuine engagement and long-term relationships, not empty numbers or short-term attention.",
  },
  {
    id: 3,
    icon: OTwoSvg,
    title: "Accessibility Without Exploitation",
    sub_title: "Opportunity shouldn’t depend on privilege",
    description:
      "OSI provides fair, transparent tools and support for people with limited time and resources — without manipulation or false promises.",
  },
  {
    id: 4,
    icon: OThreeSvg,
    title: "Respect for the Craft",
    sub_title: "Creative work deserves dignity.",
    description:
      "OSI presents people professionally and authentically, honoring the effort it takes to build something from the ground up.",
  },
  {
    id: 5,
    icon: OFourSvg,
    title: "Progress Over Perfection",
    sub_title: "Momentum creates growth.",
    description:
      "OSI encourages action, learning, and steady improvement — helping people move forward without waiting to be “ready.",
  },
  {
    id: 6,
    icon: OFiveSvg,
    title: "We Win When You Win",
    sub_title: "Success should be shared",
    description:
      "OSI grows by uplifting creators, small businesses, and communities — measuring impact by outcomes, not transactions.",
  },
];

const CoreValues = ({ data: cmsData }: { data?: CMSCoreValue }) => {
  const values =
    cmsData?.metadata?.map((m, i) => ({
      id: i + 1,
      icon: m.icon,
      title: m.title,
      sub_title: m.sub_title,
      description: m.description,
    })) || defaultData;

  return (
    <section className="bg-[#FAFAFA] section">
      <div className="container">
        <h2 className="section_title !mb-5 md:!mb-8 lg:!mb-12">
          {cmsData?.title || "Our Core Values"}
        </h2>

        <div className="w-full h-auto min-h-[680px] overflow-hidden hidden md:flex items-center justify-center rounded-2xl relative">
          <Image
            src={cmsData?.bg || coreValueBg}
            fill
            alt="home banner"
            className="object-cover w-full rounded-2xl"
          />

          <div className="w-full h-full absolute top-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.40),rgba(255,255,255,0.40))] rounded-2xl">
            <div className="grid grid-cols-3 gap-3 lg:gap-5 2xl:gap-10 p-5 lg:p-8 2xl:p-12">
              {values?.map(val => (
                <div
                  key={val.id}
                  className="rounded-2xl border space-y-4 border-[rgba(0,0,0,0.16)] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 lg:py-4 2xl:py-6 lg:px-6 2xl:px-8"
                >
                  <div className="flex gap-3 items-center">
                    <p className="size-10 xl:size-13 rounded-full border border-[#D6E5F5] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-[#D6E5F5] grid place-items-center shrink-0">
                      {typeof val.icon === "string" ? (
                        <i
                          className={`${val.icon} text-4xl text-primary-blue`}
                        />
                      ) : typeof val.icon === "function" ? (
                        <val.icon />
                      ) : null}
                    </p>

                    <h3 className="lg:text-lg xl:text-xl 2xl:text-2xl text-primary-black font-semibold">
                      {val?.title}
                    </h3>
                  </div>

                  <h4 className="lg:text-lg xl:text-xl font-medium text-primary-black">
                    {val?.sub_title}
                  </h4>

                  <p className="xl:text-lg text-secondary-black">
                    {val?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {values?.map(val => (
            <div
              key={val.id}
              className="rounded-2xl border space-y-4 border-[rgba(0,0,0,0.16)] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 lg:py-4 2xl:py-6 lg:px-6 2xl:px-8"
            >
              <div className="flex gap-3 items-center">
                <p className="size-10 xl:size-13 rounded-full border border-[#D6E5F5] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-[#D6E5F5] grid place-items-center shrink-0">
                  {typeof val.icon === "string" ? (
                    <i
                      className={`${val.icon} text-xl xl:text-2xl text-primary-blue`}
                    />
                  ) : typeof val.icon === "function" ? (
                    <val.icon />
                  ) : null}
                </p>

                <h3 className="lg:text-lg xl:text-xl 2xl:text-2xl text-primary-black font-semibold">
                  {val?.title}
                </h3>
              </div>

              <h4 className="lg:text-lg xl:text-xl font-medium text-primary-black">
                {val?.sub_title}
              </h4>

              <p className="xl:text-lg text-secondary-black">
                {val?.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[#364153] text-center md:text-lg lg:text-xl pt-5 md:pt-10">
          "The comparison table should be visually de-emphasized, collapsed by
          default, and presented as optional plan details. Reduce font size and
          spacing, soften colors, and avoid competing with the pricing cards.
          This section is for reassurance, not decision-making."
        </p>
      </div>
    </section>
  );
};

export default CoreValues;
