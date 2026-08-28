import Container from "@/Components/Common/Container";
import {
  GiftSvg,
  MEightSvg,
  MFiveSvg,
  MFourSvg,
  MSevenSvg,
  MSixSvg,
  MThreeSvg,
  MTwoSvg,
} from "@/Components/Svg/SvgContainer";
import { CMSBossBeginningsDynamic } from "@/Types/cms";

interface WinnerReceivesProps {
  data: CMSBossBeginningsDynamic;
}

const iconMap = [
  GiftSvg,
  MTwoSvg,
  MThreeSvg,
  MFourSvg,
  MFiveSvg,
  MSixSvg,
  MSevenSvg,
  MEightSvg,
];

const fallbackItems = [
  {
    title: "Business Shower Event",
    description: "Full-featured celebration with community",
  },
  {
    title: "Video Interview",
    description: "Professional OSI Spotlight feature",
  },
  {
    title: "Photography Package",
    description: "Marketing assets for your business",
  },
  { title: "Gift Packages", description: "From community & sponsors" },
  { title: "Homepage Feature", description: "Prominent placement on OSI" },
  { title: "Social Media Promotion", description: "Across all OSI channels" },
  { title: "Live Event Recognition", description: "Speaking opportunity" },
  { title: "Newsletter Highlight", description: "Featured to all subscribers" },
];

const WinnerReceives = ({ data }: WinnerReceivesProps) => {
  const items =
    data?.metadata?.items?.length > 0 ? data.metadata.items : fallbackItems;

  return (
    <section className="section">
      <Container>
        <h2 className="section_title">
          {data?.title ?? "What the Winner Receives"}
        </h2>
        <p className="section_sub_title">
          {data?.description ??
            "A comprehensive package of support, exposure, and resources to launch with confidence."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 md:gap-3 lg:gap-4 xl:gap-6 mt-4 md:mt-5 lg:mt-6 xl:mt-11">
          {items.map((item, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <div
                key={idx}
                className="px-3 py-5 md:px-4 md:py-6 lg:px-5 lg:py-7 custom_border bg-primary-gray rounded-xl text-center"
              >
                <p className="mx-auto w-fit mb-3">
                  <Icon />
                </p>
                <h5 className="text-primary-black text-base md:text-lg lg:text-xl font-semibold mb-1 lg:mb-1.5">
                  {item.title}
                </h5>
                <p className="mt-0.5 text-secondary-black text-xs md:text-sm lg:text-base xl:text-xl">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WinnerReceives;
