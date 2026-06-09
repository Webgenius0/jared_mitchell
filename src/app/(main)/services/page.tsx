import { Button } from "@/Components/Common/Button";
import { BsArrowRight } from "react-icons/bs";
import PricingPlan from "../_components/PricingPlan";
import PlanComparison from "./_components/PlanComparison";
import SocialImage from "./_components/SocialImage";
import CommunityPartner from "./_components/CommunityPartner";
import WhoOSIIsFor from "./_components/WhoOSIIsFor";
import ServiceBanner from "./_components/ServiceBanner";
import NewsLetter from "@/Components/Common/NewsLetter";
import Link from "next/link";
import { getCMSServicesData, getCMSFAQs } from "@/lib/Services/cms_service";
import FAQAccordion from "./_components/FAQAccordion";

const page = async () => {
  const [cmsData, faqData] = await Promise.all([
    getCMSServicesData(),
    getCMSFAQs(),
  ]);

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

      <PricingPlan />
      <PlanComparison />
      <SocialImage data={cmsData?.services_grow} />
      <CommunityPartner data={cmsData?.services_partners} />
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
        <Link
          href="artist-spotlight"
          className="text-center block w-fit mx-auto"
        >
          <Button>Apply Now</Button>
        </Link>
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
        <Link
          href="business-spotlight"
          className="text-center block w-fit mx-auto"
        >
          <Button>Apply Now</Button>
        </Link>
      </section>

      <FAQAccordion data={faqData} />

      {/* Risk Free Guarantee / CTA Section */}
      {cmsData?.services_risk_free && (
        <section className="section container bg-[#F5F5F7] rounded-3xl p-10 mt-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {cmsData.services_risk_free.title}
            </h2>
            <p className="text-xl text-[#364153] mb-10">
              {cmsData.services_risk_free.sub_title}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-[1000px] mx-auto">
              {cmsData.services_risk_free.metadata?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
                >
                  <i className="ri-checkbox-circle-fill text-primary-blue text-2xl" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsLetter
        data={cmsData?.services_newsletter}
        title="Stay connected with new spotlights, events, and creative tools."
      />
    </>
  );
};

export default page;
