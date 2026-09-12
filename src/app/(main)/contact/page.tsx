import type { Metadata } from "next";
import NewsLetter from "@/Components/Common/NewsLetter";
import FAQAccordion from "../services/_components/FAQAccordion";
import TalentApplication from "./_components/TalentApplication";
import VendorOpportunities from "./_components/VendorOpportunities";
import GetInTouch from "./_components/GetInTouch";
import ContactBanner from "./_components/ContactBanner";
import { getCMSAboutData, getCMSFAQs } from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const faqData = await getCMSFAQs();
  const CmsData = await getCMSAboutData();

  return (
    <div className="">
      <ContactBanner />
    <div className="xl:px-5 md:w-[80%] 2xl:w-full mx-auto">
      <GetInTouch />
      <TalentApplication />
      <VendorOpportunities />
      <FAQAccordion data={faqData} />
      <Sponsors
        data={CmsData?.about_sponsors}
        showButton={false}
        title="Proudly supported by our community partners"
      />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>

    </div>
  );
};

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | Connect with Our Social Image",
  },
  description:
    "Have questions or looking to collaborate? Reach out to the Our Social Image team for general inquiries, nominations, and sponsorships.",
  keywords: [
    "Our Social Image",
    "OSI",
    "Indianapolis small business",
    "Indianapolis local artists",
    "business spotlight",
    "artist spotlight",
    "entrepreneurs",
    "creators",
    "OSI Top Business Award",
  ],
  openGraph: {
    title: "Contact Us | Connect with Our Social Image",
    description:
      "Have questions or looking to collaborate? Reach out to the Our Social Image team for general inquiries, nominations, and sponsorships.",
    type: "website",
    locale: "en_US",
    siteName: "Our Social Image",
    images: [
      {
        url: "/home/home-banner-1.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Our Social Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Connect with Our Social Image",
    description:
      "Have questions or looking to collaborate? Reach out to the Our Social Image team for general inquiries, nominations, and sponsorships.",
    images: ["/home/home-banner-1.jpg"],
  },
};

export default page;
