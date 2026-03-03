"use client";
import { Button } from "@/Components/Common/Button";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import { FaArrowRightLong } from "react-icons/fa6";

const Sponsors = () => {
  return (
    <section className="section">
      <h2 className="section_title container">
        Powered by our community partners
      </h2>

      <div className="xl:space-y-10 md:mt-5 xl:mt-10">
        <SponsorSlider logos={sponsorsData} />
        <SponsorSlider logos={sponsorsData} reverse={true} />
      </div>

      <div className="text-center mt-8">
        <Button>
          Become a Sponsor
          <FaArrowRightLong />
        </Button>
      </div>
    </section>
  );
};

export default Sponsors;
