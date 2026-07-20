import Image from "next/image";
import {
  AnnouncementSvg,
  BlueHeartSvg,
  GrowthSvg,
  PeopleSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSWhatYouGet } from "@/Types/cms";

const defaultData: {
  id: number;
  image: (() => React.JSX.Element) | string;
  title: string;
}[] = [
  {
    id: 1,
    image: AnnouncementSvg,
    title: "Business visibility",
  },
  {
    id: 2,
    image: PeopleSvg,
    title: "A marketing team",
  },
  {
    id: 3,
    image: GrowthSvg,
    title: "A platform promoting you",
  },
  {
    id: 4,
    image: BlueHeartSvg,
    title: "A community supporting you",
  },
];

const WhatYouAreGetting = ({ data: cmsData }: { data?: CMSWhatYouGet }) => {
  const items =
    cmsData?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      title: m.title,
    })) || defaultData;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section_title md:font-bold 2xl:text-7xl">
          {cmsData?.title || "What You're Really Getting"}
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl text-center text-secondary-black mt-2 md:mt-4">
          {cmsData?.sub_title ||
            "You're not buying a membership — you're buying:"}
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mt-7 md:mt-11">
          {items?.map(item => (
            <div
              key={item.id}
              className="rounded-xl w-full py-10 2xl:py-20 px-5 2xl:px-7 flex items-center flex-col border space-y-4 border-[rgba(0,0,0,0.16)] shadow"
            >
              <div className="flex items-center justify-center aspect-square bg-[rgba(25,119,221,0.16)] size-14 md:size-[100px] rounded-full">
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
                  ) : typeof item.image === "function" ? (
                    <item.image />
                  ) : (
                    <div className="size-10 xl:size-13 rounded-full bg-[#D6E5F5] shrink-0" />
                  )}
                </div>
              </div>

              <h4 className="text-lg md:text-xl 2xl:text-[22px] text-center self-stretch font-semibold text-primary-black">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouAreGetting;
