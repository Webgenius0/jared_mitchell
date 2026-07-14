import React from "react";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import { CMSPartner } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";

interface SponsorsProps {
  data?: CMSPartner | any;
  title?: string;
  showButton?: boolean;
}

const Sponsors = ({ data, title, showButton = true }: SponsorsProps) => {
  const logos =
    data?.metadata?.map((m: any, i: number) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <section className="py-10 xl:py-20">
      <h2 className="section_title text-center mb-6 md:mb-10">
        {title || data?.title || "Powered by our community partners"}
      </h2>

      <div className="flex flex-col gap-5">
        <SponsorSlider logos={logos} />
        <SponsorSlider logos={logos} reverse={true} />
        {showButton && (
          <div className="flex justify-center mt-5">
            <Button>Become a Sponsor</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sponsors;

