import coreValueBg from "@/Assets/core_values.jpg";
import {
  OFiveSvg,
  OFourSvg,
  OOneSvg,
  OThreeSvg,
  OTwoSvg,
} from "@/Components/Svg/SvgContainer";
import Image from "next/image";
const data = [
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

const CoreValues = () => {
  return (
    <section className="bg-[#FAFAFA] section">
      <div className="container">
        <h2 className="section_title !mb-12">Our Core Values</h2>

        <div className="w-full max-h-[680px] h-full overflow-hidden flex items-center justify-center relative rounded-2xl">
          <Image
            src={coreValueBg}
            width={1920}
            height={580}
            alt="home banner"
            className="object-cover w-full rounded-2xl"
          />

          <div className="w-full h-full absolute top-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.40),rgba(255,255,255,0.40)),url('/path-to-image')] rounded-2xl">
            <div className="grid grid-cols-3 gap-10 p-12">
              {data?.map(data => (
                <div
                  key={data.id}
                  className="rounded-2xl border space-y-4 border-[rgba(0,0,0,0.16)] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-6 px-8"
                >
                  <div className="flex gap-3 items-center">
                    <p className="size-[60px] rounded-full border border-[#D6E5F5] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-[#D6E5F5] grid place-items-center shrink-0">
                      <data.icon />
                    </p>

                    <h3 className="text-2xl text-primary-black font-semibold">
                      {data?.title}
                    </h3>
                  </div>

                  <h4 className="text-2xl font-medium text-primary-black">
                    {data?.sub_title}
                  </h4>

                  <p className="text-lg text-secondary-black">
                    {data?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[#364153] text-center text-xl pt-10">
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
