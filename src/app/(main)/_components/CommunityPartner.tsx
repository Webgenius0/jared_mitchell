"use client";
import { Button } from "@/Components/Common/Button";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";

const CommunityPartner = () => {
  return (
    <section className="section">
      <h2 className="section_title">
        Presented with support from our community partners.
      </h2>
      <div className="flex flex-col gap-y-2 mt-6 md:mt-10">
        <SponsorSlider logos={sponsorsData} />
        <SponsorSlider logos={sponsorsData} reverse={true} />
      </div>
      <div className="text-center mt-8 space-x-4">
        <Button>Explore All Events</Button>
        <Button variant={"outline"}>Get Tickets</Button>
      </div>
    </section>
  );
};

export default CommunityPartner;
