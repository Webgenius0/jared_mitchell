"use client";
import { Button } from "@/Components/Common/Button";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import { HandShakeSvg } from "@/Components/Svg/SvgContainer";
import { BsArrowRight } from "react-icons/bs";
import { CMSServicesPartners } from "@/Types/cms";

const CommunityPartner = ({ data }: { data?: CMSServicesPartners }) => {
  const logos = data?.metadata?.map((m, i) => ({
    id: i + 1,
    image: m.image,
    link: m.link
  })) || sponsorsData;

  return (
    <section className="section">
      <div className="container">
        <div className="text-center">
          <div className="text-primary-blue bg-[rgba(25,119,221,0.16)] inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-3">
            <HandShakeSvg />
            Community Partners
          </div>
          <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
            {data?.title || "Our Members Grow With the Support of Our Partners and Sponsors"}
          </h2>
          <p className="section_sub_title">
            {data?.description || `We collaborate with a growing network of small businesses, community
            leaders, creative professionals, and brands committed to uplifting
            culture, entrepreneurship, and artistic expression.`}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-6 md:mt-10">
        <SponsorSlider logos={logos} />
        <SponsorSlider logos={logos} reverse={true} />
      </div>
      <div className="text-center mt-8 space-x-4">
        <Button>
          Become a Sponsor
          <BsArrowRight className="text-2xl" />
        </Button>
      </div>
    </section>
  );
};

export default CommunityPartner;
