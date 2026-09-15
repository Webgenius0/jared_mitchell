import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Image from "next/image";
import { IoArrowForwardSharp } from "react-icons/io5";
import type { CMSContactOpportunitiesSection } from "@/Types/cms";

interface VendorOpportunitiesProps {
  data?: CMSContactOpportunitiesSection | null;
}

const VendorOpportunities = ({ data }: VendorOpportunitiesProps) => {
  const title = data?.title ?? "Partnership and Event Opportunities";
  const subTitle =
    data?.sub_title ??
    "Support OSI programs, events, Spotlights, or the Top Business Award through an approved partnership. Apply to sell products or share services at an eligible event.";

  const cards =
    data?.metadata && data.metadata.length > 0
      ? data.metadata
      : [
          {
            icon: "",
            title: "Sponsor",
            description:
              "Support OSI programs, events, Spotlights, or the Top Business Award through an approved partnership.",
            link: null,
          },
          {
            icon: "",
            title: "Vendor",
            description:
              "Apply to sell products or share services at an eligible event.",
            link: null,
          },
          {
            icon: "",
            title: "Collaboration",
            description:
              "Propose an event, story, program, or community collaboration.",
            link: null,
          },
        ];

  return (
    <section className="section">
      <Container>
        <h2 className="section_title ">{title}</h2>
        <p className="section_sub_title">{subTitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4 mt-5 md:mt-6 lg:mt-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 gap-3.5 md:gap-4 lg:gap-5  custom_border bg-white"
            >
              <div className="size-13 md:size-14 lg:size-16 xl:size-[100px] flex items-center justify-center rounded-full shrink-0 bg-[#1977DD29] relative overflow-hidden">
                {card.icon ? (
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={80}
                    height={80}
                    className="size-7 md:size-8 lg:size-9 xl:size-14 object-contain"
                  />
                ) : (
                  <IoArrowForwardSharp className="size-7 md:size-8 lg:size-9 xl:size-14 text-[#1977DD]" />
                )}
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <h5 className="text-primary-black text-lg md:text-xl lg:text-2xl xl:text-[32px] font-semibold">
                  {card.title}
                </h5>
                <p className="text-secondary-black text-xs md:text-sm lg:text-base xl:text-2xl">
                  {card.description}
                </p>
              </div>
              <div className="mt-auto">
                <Button className="w-full">
                  {card.title} Form <IoArrowForwardSharp />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VendorOpportunities;
