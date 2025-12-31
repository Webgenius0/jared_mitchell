import Container from "@/Components/Common/Container";
import { HiArrowLongRight } from "react-icons/hi2";

const HowSponsorshipWorks = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title 2xl:!text-[76px]">
          How Sponsorship Works
        </h2>
        <div className="grid grid-cols-2 gap-6 items-center mt-11">
          <div className="bg-white max-lg:col-span-2 custom_border custom_shadow rounded-2xl flex flex-col gap-4 justify-center p-6 h-fit">
            <p className="text-2xl text-primary-black font-semibold">
              1. Choose Your Tier
            </p>
            <p className="text-2xl text-primary-black">
              Select the sponsorship level that aligns with your brand's goals.
            </p>
          </div>
          <div className="bg-white max-lg:col-span-2 custom_border custom_shadow rounded-2xl p-6">
            <p className="text-2xl text-primary-black font-semibold">
              2. Send Us Your Ad
            </p>
            <p className="text-2xl text-primary-black mt-4 mb-2">
              Sponsors provide the ads they want displayed:
            </p>
            <div className="space-y-1 text-primary-black text-xl">
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Images
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Flyers
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Videos
                (15 sec or 30 sec depending on tier)
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Logos
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Written
                promos
              </p>
            </div>
          </div>
          <div className="bg-white max-lg:col-span-2 custom_border custom_shadow rounded-2xl p-6">
            <p className="text-2xl text-primary-black font-semibold">
              3. We Do The Rest (AI + Human Team)
            </p>
            <p className="text-2xl text-primary-black mt-4 mb-2">
              Our automated system ensures:
            </p>
            <div className="space-y-1 text-primary-black text-xl">
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Posting
                schedule
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Social
                media rotation
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Ad
                placement on OSI channels
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" />{" "}
                Newsletter highlights
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Event
                promotion
              </p>
              <p className="flex items-center gap-2">
                <HiArrowLongRight className="text-[#155DFC] size-6" /> Spotlight
                priority (when included)
              </p>
            </div>
          </div>
          <div className="bg-white max-lg:col-span-2 custom_border custom_shadow rounded-2xl flex flex-col gap-4 justify-center p-6 h-fit">
            <p className="text-2xl text-primary-black font-semibold">
              4. Ongoing Exposure
            </p>
            <p className="text-2xl text-primary-black">
              Your ads run weekly on OSI social channels, OSI video channels,
              magazine features, and community announcements depending on tier.
            </p>
          </div>
          <div className="bg-white col-span-2 max-w-[762px] w-full mx-auto custom_border custom_shadow rounded-2xl flex flex-col gap-4 justify-center p-6 h-fit">
            <p className="text-2xl text-primary-black font-semibold">
              5. Full Reporting
            </p>
            <p className="text-2xl text-primary-black">
              We provide weekly insights, reach, impressions, and engagement
              data.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowSponsorshipWorks;
