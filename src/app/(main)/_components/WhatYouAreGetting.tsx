import Image from "next/image";
import { MdPersonAdd, MdCampaign, MdGroups, MdTrendingUp } from "react-icons/md";
import { CMSWhatYouGet } from "@/Types/cms";
import { type IconType } from "react-icons";

const iconMap: IconType[] = [MdPersonAdd, MdCampaign, MdGroups, MdTrendingUp];

const defaultData: {
  id: number;
  image: (() => React.JSX.Element) | string;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    image: "",
    title: "Professional Presence",
    description:
      "Create an artist or business profile that clearly presents who you are, what you offer, and how people can support you.",
  },
  {
    id: 2,
    image: "",
    title: "Promotional Support",
    description:
      "Access spotlight opportunities, content support, social promotion, newsletters, and featured campaigns based on your membership.",
  },
  {
    id: 3,
    image: "",
    title: "Community Connection",
    description:
      "Connect with artists, entrepreneurs, customers, organizations, vendors, sponsors, and supporters.",
  },
  {
    id: 4,
    image: "",
    title: "Growth Opportunities",
    description:
      "Discover competitions, events, collaborations, educational resources, sponsorships, and business-building opportunities.",
  },
];

const WhatYouAreGetting = ({ data: cmsData }: { data?: CMSWhatYouGet }) => {
  const items =
    cmsData?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      title: m.title,
      description: m.description || defaultData[i]?.description || "",
    })) || defaultData;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section_title md:font-bold 2xl:text-5xl">
          {cmsData?.title || "MORE THAN A PROFILE. A COMPLETE VISIBILITY SYSTEM."}
        </h2>

        <p className="text-sm md:text-base lg:text-lg text-center text-secondary-black mt-1.5 md:mt-2">
          {cmsData?.sub_title ||
            "OSI combines professional presentation, promotional opportunities, community connection, and practical growth support in one platform."}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-2.5 lg:gap-3 xl:gap-5 mt-3 md:mt-4 lg:mt-5 xl:mt-8">
          {items?.map((item, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <div
                key={item.id}
                className="w-full py-4 md:py-4 lg:py-5 2xl:py-12 px-3 md:px-3 lg:px-4 2xl:px-6 flex items-center flex-col border space-y-2 lg:space-y-3 border-[rgba(0,0,0,0.16)] shadow"
              >
                <div className="flex items-center justify-center aspect-square bg-[rgba(25,119,221,0.16)] size-10 md:size-12 lg:size-14 xl:size-[100px] rounded-full">
                  <div className="md:scale-[130%] 2xl:scale-[160%]">
                    {typeof item.image === "string" && item.image ? (
                      <div className="size-10 xl:size-13 rounded-full overflow-hidden border border-[#D6E5F5] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-[#D6E5F5] shrink-0 relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 40px, 52px"
                          className="object-contain p-1.5"
                        />
                      </div>
                    ) : (
                      <Icon size={40} color="#1977DD" />
                    )}
                  </div>
                </div>

                <h4 className="text-sm md:text-sm lg:text-base xl:text-xl text-center self-stretch font-semibold text-primary-black">
                  {item.title}
                </h4>

                <p className="text-xs md:text-xs lg:text-sm text-center text-secondary-black leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouAreGetting;
