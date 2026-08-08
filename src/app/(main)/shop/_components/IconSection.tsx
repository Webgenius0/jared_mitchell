import Container from "@/Components/Common/Container";
import {
  BagSvg,
  CalendarSvg,
  DownloadSvg,
  HeartSvg,
  PowerSvg,
  TshirtSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSShopPageFeatures } from "@/Types/cms";

const iconMap = [
  TshirtSvg,
  DownloadSvg,
  BagSvg,
  CalendarSvg,
  HeartSvg,
  PowerSvg,
];

const fallbackData = [
  {
    icon: TshirtSvg,
    title: "Apparel",
    description: "Quality merch that represents the culture.",
  },
  {
    icon: DownloadSvg,
    title: "Digital Products",
    description: "Templates, planners, AI tools, and growth resources.",
  },
  {
    icon: BagSvg,
    title: "Business Tools",
    description: "Everything you need to scale your business.",
  },
  {
    icon: CalendarSvg,
    title: "Event & Vendor Packages",
    description: "Get featured and grow your visibility.",
  },
  {
    icon: HeartSvg,
    title: "Community Support",
    description: "Directly fund programs that uplift creators.",
  },
  {
    icon: PowerSvg,
    title: "Limited Drops",
    description: "Exclusive releases and collaborations.",
  },
];

interface IconSectionProps {
  data?: CMSShopPageFeatures;
}

const IconSection = ({ data }: IconSectionProps) => {
  const items = data?.metadata?.length
    ? data.metadata.map((item, idx) => ({
        icon: iconMap[idx] ?? TshirtSvg,
        title: item.title,
        description: item.description,
      }))
    : fallbackData;

  return (
    <div className="section">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-2 py-10 px-[94px] rounded-xl custom_border custom_shadow bg-secondary-gray flex flex-col items-center justify-center text-center"
            >
              <div className="size-[100px] flex items-center justify-center rounded-full bg-primary-blue/15 text-primary-blue mb-3">
                <item.icon />
              </div>
              <p className="text-2xl text-primary-black font-medium">
                {item.title}
              </p>
              <p className="text-xl text-[#4A5565]">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default IconSection;
