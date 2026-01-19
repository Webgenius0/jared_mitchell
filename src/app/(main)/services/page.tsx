import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import { BsArrowRight } from "react-icons/bs";
import PricingPlan from "../_components/PricingPlan";
import PlanComparison from "./_components/PlanComparison";
import SocialImage from "./_components/SocialImage";
import CommunityPartner from "./_components/CommunityPartner";
import EventSponsors from "./_components/EventSponsors";
import TryOSI from "./_components/TryOSI";
import FAQAccordion from "./_components/FAQAccordion";
import Testimonials from "./_components/Testimonials";
import WhoOSIIsFor from "./_components/WhoOSIIsFor";
import ServiceBanner from "./_components/ServiceBanner";
import NewsLetter from "@/Components/Common/NewsLetter";
import Link from "next/link";

const page = () => {
  return (
    <>
      <ServiceBanner />
      <section className="section">
        <Container>
          <div className="text-center space-y-5 md:space-y-10">
            <p className="text-2xl text-primary-black font-medium">
              Our Social Image (OSI) gives creators, small businesses,
              entrepreneurs, and emerging talent the exposure, support, and
              modern tools they need to grow. From powerful spotlights and
              business features to AI-enhanced analytics and community
              engagement — OSI was built to help you rise, scale, and stay
              visible.
              <br />
              Whether you're building a brand, launching a venture, showcasing
              your art, or expanding your creative network, our membership plans
              are designed to meet you exactly where you are — and help you
              achieve where you're going.
            </p>

            <Button>
              Explore Membership Plans <BsArrowRight className="text-2xl" />
            </Button>
          </div>
        </Container>
      </section>
      <PricingPlan />
      <PlanComparison />
      <SocialImage />
      <CommunityPartner />
      <WhoOSIIsFor />
      <section className="section">
        <Container>
          <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
            Artist Spotlight Submission Form
          </h2>
          <p className="section_sub_title mt-8 mb-12 max-w-[1000px] mx-auto">
            Apply for our weekly artist spotlight program. Share your story,
            showcase your work, and connect with the community.
          </p>
          <Link
            href="artist-spotlight"
            className="text-center block w-fit mx-auto"
          >
            <Button>Apply Now</Button>
          </Link>
        </Container>
      </section>
      <section className="section">
        <Container>
          <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
            BUSINESS SPOTLIGHT Submission Form
          </h2>
          <p className="section_sub_title mt-8 mb-12 max-w-[1000px] mx-auto">
            Apply for our weekly Business Spotlight program. Share your brand
            story, showcase your business, and connect with the community.
          </p>
          <Link
            href="business-spotlight"
            className="text-center block w-fit mx-auto"
          >
            <Button>Apply Now</Button>
          </Link>
        </Container>
      </section>
      <Testimonials />
      <FAQAccordion />
      <TryOSI />
      <EventSponsors />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;
