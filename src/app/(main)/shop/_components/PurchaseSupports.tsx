import Container from "@/Components/Common/Container";
import {
  CelebrationSvg,
  HomeSvg,
  MicroPhoneSvg,
  RobotHeadSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSShopPageSupport } from "@/Types/cms";

const iconMap = [MicroPhoneSvg, CelebrationSvg, HomeSvg, RobotHeadSvg];

const fallbackData = [
  {
    icon: MicroPhoneSvg,
    title: "Artist & Business Spotlights",
    description: "Amplify voices and showcase talent across our platforms.",
  },
  {
    icon: CelebrationSvg,
    title: "OSI Top Business Award Celebrations",
    description: "Celebrate new business launches with community support.",
  },
  {
    icon: HomeSvg,
    title: "Vendor Opportunities & Events",
    description: "Create spaces for local businesses to thrive and connect.",
  },
  {
    icon: RobotHeadSvg,
    title: "AI Tools for Small Businesses",
    description: "Provide cutting-edge resources to level the playing field.",
  },
];

interface PurchaseSupportsProps {
  data?: CMSShopPageSupport;
}

const PurchaseSupports = ({ data }: PurchaseSupportsProps) => {
  const items = data?.metadata?.length
    ? data.metadata.map((item, idx) => ({
        icon: iconMap[idx] ?? MicroPhoneSvg,
        title: item.title,
        description: item.description,
      }))
    : fallbackData;

  return (
    <section className="section">
      <Container>
        <div className="section  custom_border bg-secondary-gray space-y-11">
          <div>
            <h2 className="section_title ">
              {/* <h2 className="section_title 2xl:!text-7xl"> */}
              {data?.title ?? "What Your Purchase Supports"}
            </h2>
            <p className="section_sub_title">
              {data?.sub_title ??
                "Your purchase directly funds visibility, resources, and real opportunities for our community."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 px-4 md:w-[80%] 2xl:w-full mx-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="space-y-1.5 p-4 md:p-5  custom_border custom_shadow flex flex-col items-center bg-white justify-center text-center"
              >
                <div className="size-16 md:size-18 lg:size-[80px] flex items-center justify-center rounded-full bg-primary-blue/15 text-primary-blue mb-2.5">
                  <item.icon />
                </div>
                <p className="text-base md:text-lg lg:text-xl text-primary-black font-medium">
                  {item.title}
                </p>
                <p className="text-xs md:text-sm lg:text-base text-[#4A5565]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PurchaseSupports;
