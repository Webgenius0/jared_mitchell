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

const data = [
  {
    id: "business-shower-event",
    title: "Business Shower Event",
    description: "Full-featured celebration with community",
    icon: GiftSvg,
  },
  {
    id: "video-interview",
    title: "Video Interview",
    description: "Professional OSI Spotlight feature",
    icon: MTwoSvg,
  },
  {
    id: "photography-package",
    title: "Photography Package",
    description: "Marketing assets for your business",
    icon: MThreeSvg,
  },
  {
    id: "gift-packages",
    title: "Gift Packages",
    description: "From community & sponsors",
    icon: MFourSvg,
  },
  {
    id: "homepage-feature",
    title: "Homepage Feature",
    description: "Prominent placement on OSI",
    icon: MFiveSvg,
  },
  {
    id: "social-media-promotion",
    title: "Social Media Promotion",
    description: "Across all OSI channels",
    icon: MSixSvg,
  },
  {
    id: "live-event-recognition",
    title: "Live Event Recognition",
    description: "Speaking opportunity",
    icon: MSevenSvg,
  },
  {
    id: "newsletter-highlight",
    title: "Newsletter Highlight",
    description: "Featured to all subscribers",
    icon: MEightSvg,
  },
];

const WinnerReceives = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title">What the Winner Receives</h2>
        <p className="section_sub_title">
          A comprehensive package of support, exposure, and resources to launch
          with confidence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-11">
          {data?.map((data, idx) => (
            <div
              key={idx}
              className="px-7 py-[55px] custom_border bg-primary-gray rounded-xl text-center"
            >
              <p className="mx-auto w-fit mb-3">
                <data.icon />
              </p>

              <h5 className="text-primary-black text-2xl font-semibold mb-2">
                {data.title}
              </h5>

              <p className="mt-1 text-secondary-black text-xl">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WinnerReceives;
