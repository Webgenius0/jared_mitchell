import {
  BagSvg,
  BulbSvg,
  CreatorSvg,
  EyeSvg,
  GraduationCapSvg,
  HomeSvg,
  MusicSymbolSvg,
  PaintingPlateSvg,
  PenSvg,
  ProfitSvg,
  UsersSvg,
  UserSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSServicesWhoFor } from "@/Types/cms";

const defaultData = [
  {
    id: 1,
    title: "Creators",
    icon: CreatorSvg,
  },
  {
    id: 2,
    title: "Artists",
    icon: PaintingPlateSvg,
  },
  {
    id: 3,
    title: "Musicians",
    icon: MusicSymbolSvg,
  },
  {
    id: 4,
    title: "Models",
    icon: UserSvg,
  },
  {
    id: 5,
    title: "Entrepreneurs",
    icon: BagSvg,
  },
  {
    id: 6,
    title: "Small business owners",
    icon: HomeSvg,
  },
  {
    id: 7,
    title: "Nonprofits",
    icon: ProfitSvg,
  },
  {
    id: 8,
    title: "Designers",
    icon: PenSvg,
  },
  {
    id: 9,
    title: "Visionaries",
    icon: EyeSvg,
  },
  {
    id: 10,
    title: "Innovators",
    icon: BulbSvg,
  },
  {
    id: 11,
    title: "Students",
    icon: GraduationCapSvg,
  },
  {
    id: 12,
    title: "Community leaders",
    icon: UsersSvg,
  },
];

const WhoOSIIsFor = ({ data: cmsData }: { data?: CMSServicesWhoFor }) => {
  const items = cmsData?.metadata?.map((m, i) => ({
    id: i + 1,
    title: m.title,
    icon: m.icon ? () => <i className={`${m.icon} text-3xl md:text-5xl text-white`} /> : defaultData[i % defaultData.length].icon,
  })) || defaultData;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          {cmsData?.title || "Who OSI Is For"}
        </h2>

        <p className="section_sub_title">
          {cmsData?.sub_title || "Below is a breakdown of exactly what each membership provides so you can make the best choice for your goals."}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-5 my-8 xl:my-14">
          {items?.map(item => (
            <div
              key={item.id}
              className="p-3 flex flex-col items-center justify-center gap-2 custom_border custom_shadow rounded-[14px] bg-white"
            >
              <div className="flex items-center justify-center size-18 2xl:size-[83px] bg-primary-blue rounded-full custom_shadow text-white">
                <item.icon />
              </div>
              <p className="text-primary-black xl:text-xl font-semibold uppercase text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <p className="section_sub_title max-w-[790px] mx-auto">
          {cmsData?.description || (
            <>
              If you're working to build a brand, launch a business, express your
              creativity, or make an impact —{" "}
              <span className="text-primary-blue">OSI was designed for you</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default WhoOSIIsFor;
