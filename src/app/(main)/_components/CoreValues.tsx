import Image from "next/image";
import { CMSCoreValue } from "@/Types/cms";
import coreValueBg from "@/Assets/core_values.jpg";

const defaultData = [
  {
    id: 1,
    image: "",
    title: "Intentional Visibility",
    sub_title: "Visibility should be thoughtful, not random.",
    description:
      "OSI highlights creators and businesses with care, context, and purpose — prioritizing meaningful stories over noise or trends.",
  },
  {
    id: 2,
    image: "",
    title: "Community Over Vanity Metrics",
    sub_title: "Real support matters more than likes.",
    description:
      "OSI is built to foster genuine engagement and long-term relationships, not empty numbers or short-term attention.",
  },
  {
    id: 3,
    image: "",
    title: "Accessibility Without Exploitation",
    sub_title: "Opportunity shouldn't depend on privilege",
    description:
      "OSI provides fair, transparent tools and support for people with limited time and resources — without manipulation or false promises.",
  },
  {
    id: 4,
    image: "",
    title: "Respect for the Craft",
    sub_title: "Creative work deserves dignity.",
    description:
      "OSI presents people professionally and authentically, honoring the effort it takes to build something from the ground up.",
  },
  {
    id: 5,
    image: "",
    title: "Progress Over Perfection",
    sub_title: "Momentum creates growth.",
    description:
      "OSI encourages action, learning, and steady improvement — helping people move forward without waiting to be “ready.",
  },
  {
    id: 6,
    image: "",
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
      image: m.image,
      title: m.title,
      sub_title: m.sub_title,
      description: m.description,
    })) || defaultData;

  return (
    <section className="bg-[#FAFAFA] section">
      <div className="container">
        <h2 className="section_title !mb-4 md:!mb-6 lg:!mb-8">
          {cmsData?.title || "Our Core Values"}
        </h2>

        {/* Desktop / tablet view */}
        <div className="w-full overflow-hidden hidden lg:flex items-center justify-center relative isolate min-h-[200px] lg:min-h-[220px] xl:min-h-[320px]">
          <Image
            src={cmsData?.bg || coreValueBg}
            fill
            alt="home banner"
            className="object-cover w-full z-0"
          />

          <div className="w-full relative p-4 z-10 bg-[linear-gradient(0deg,rgba(255,255,255,0.40),rgba(255,255,255,0.40))]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:p-6 xl:p-10 2xl:p-12">
              {values?.map(val => (
                <div
                  key={val.id}
                  className="border space-y-2 lg:space-y-2.5 border-[rgba(0,0,0,0.16)] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-6"
                >
                  <div className="flex gap-2 lg:gap-2.5 items-center">
                    {val.image ? (
                      <div className="size-8 lg:size-10 xl:size-13 rounded-full overflow-hidden border border-[#D6E5F5] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-[#D6E5F5] shrink-0 relative">
                        <Image
                          src={val.image}
                          alt={val.title}
                          fill
                          sizes="(max-width: 768px) 32px, 52px"
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="size-8 lg:size-10 xl:size-13 rounded-full bg-[#D6E5F5] shrink-0" />
                    )}

                    <h3 className="text-xs lg:text-sm xl:text-lg 2xl:text-xl text-primary-black font-semibold truncate">
                      {val?.title}
                    </h3>
                  </div>

                  <h4 className="text-xs lg:text-xs xl:text-base font-medium text-primary-black">
                    {val?.sub_title}
                  </h4>

                  <p className="text-[11px] lg:text-xs xl:text-base text-secondary-black">
                    {val?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/tablet view */}
        <div className="space-y-3 lg:hidden">
          {values?.map(val => (
            <div
              key={val.id}
              className="border space-y-3 border-[rgba(0,0,0,0.16)] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 lg:py-4 2xl:py-6 lg:px-4 xl:px-6 2xl:px-8"
            >
              <div className="flex gap-2 lg:gap-2.5 items-center">
                {val.image ? (
                  <div className="size-8 lg:size-10 xl:size-13 rounded-full overflow-hidden border border-[#D6E5F5] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-[#D6E5F5] shrink-0 relative">
                    <Image
                      src={val.image}
                      alt={val.title}
                      fill
                      sizes="(max-width: 768px) 32px, 52px"
                      className="object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="size-8 lg:size-10 xl:size-13 rounded-full bg-[#D6E5F5] shrink-0" />
                )}

                <h3 className="text-xs lg:text-sm xl:text-lg 2xl:text-xl text-primary-black font-semibold truncate">
                  {val?.title}
                </h3>
              </div>                <h4 className="text-xs lg:text-xs xl:text-base font-medium text-primary-black">
                {val?.sub_title}
              </h4>                <p className="text-[11px] lg:text-xs xl:text-base text-secondary-black">
                {val?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
