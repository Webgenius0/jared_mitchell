import { BsArrowRight } from "react-icons/bs";
import PricingPlan from "../_components/PricingPlan";
import PlanComparison from "./_components/PlanComparison";
import SocialImage from "./_components/SocialImage";
import WhoOSIIsFor from "./_components/WhoOSIIsFor";
import ServiceBanner from "./_components/ServiceBanner";
import NewsLetter from "@/Components/Common/NewsLetter";
import {
  getCMSServicesData,
  getCMSFAQs,
  getCMSHomepageData,
} from "@/lib/Services/cms_service";
import FAQAccordion from "./_components/FAQAccordion";
import ArtistSpotlightApplyButton from "./_components/ArtistSpotlightApplyButton";
import BusinessSpotlightApplyButton from "./_components/BusinessSpotlightApplyButton";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const [cmsData, faqData] = await Promise.all([
    getCMSServicesData(),
    getCMSFAQs(),
  ]);
  const sponsorsdata = await getCMSHomepageData();

  return (
    <>
      <ServiceBanner data={cmsData?.services_hero} />

      {/* Overview Section */}
      <section className="section container">
        <div className="text-center space-y-5 md:space-y-10">
          <p className="md:text-lg lg:text-xl xl:text-2xl text-primary-black font-medium max-w-[1200px] mx-auto">
            {cmsData?.services_overview?.description ||
              `Our Social Image (OSI) gives creators, small businesses,
            entrepreneurs, and emerging talent the exposure, support, and modern
            tools they need to grow. From powerful spotlights and business
            features to AI-enhanced analytics and community engagement — OSI was
            built to help you rise, scale, and stay visible.`}
          </p>

          {/* <Button>
            Explore Membership Plans{" "}
            <BsArrowRight className="text-lg md:text-2xl" />
          </Button> */}
        </div>
      </section>

      {/* <PricingPlan /> */}
      {/* <PlanComparison /> */}
      <SocialImage data={cmsData?.services_grow} />
      <Sponsors data={cmsData?.partners} />

      <WhoOSIIsFor data={cmsData?.services_who_for} />

      {/* Artist Spotlight Section */}
      <section className="section container">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          {cmsData?.services_artist_spotlight?.title ||
            "Artist Spotlight Submission Form"}
        </h2>
        <p className="section_sub_title mt-8 mb-12 max-w-[1000px] mx-auto">
          {cmsData?.services_artist_spotlight?.sub_title ||
            "Apply for our weekly artist spotlight program. Share your story, showcase your work, and connect with the community."}
        </p>
        <ArtistSpotlightApplyButton />
      </section>

      {/* Business Spotlight Section */}
      <section className="section container">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          {cmsData?.services_business_spotlight?.title ||
            "BUSINESS SPOTLIGHT Submission Form"}
        </h2>
        <p className="section_sub_title mt-8 mb-12 max-w-[1000px] mx-auto">
          {cmsData?.services_business_spotlight?.sub_title ||
            "Apply for our weekly Business Spotlight program. Share your brand story, showcase your business, and connect with the community."}
        </p>
        <BusinessSpotlightApplyButton />
      </section>

      <FAQAccordion data={faqData} />

      {/* Risk Free Guarantee / CTA Section */}
      {cmsData?.services_risk_free && (
        <section className="bg-[#4680FF] py-16 px-6 mt-20">
          <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
            {/* Top Shield Badge */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
              {/* Simple crisp SVG Shield Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white tracking-wide">
              {cmsData.services_risk_free.title}
            </h2>

            {/* Subtitle - constrained width forces clean wrapping */}
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl leading-relaxed">
              {cmsData.services_risk_free.sub_title}
            </p>

            {/* Features Row - Flex layout centers them tightly together */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-white">
              {cmsData.services_risk_free.metadata?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm md:text-base font-medium"
                >
                  {/* White Checkmark Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Sponsors data={sponsorsdata?.partners} />

      <NewsLetter
        data={cmsData?.services_newsletter}
        title="Stay connected with new spotlights, events, and creative tools."
      />
    </>
  );
};

export default page;
