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

export const metadata = {
  title: "Contact OSI - Get in Touch | Open Spotlight Initiative",
  description:
    "Have questions or want to collaborate? Get in touch with OSI (Open Spotlight Initiative). Reach out for support, partnerships, vendor opportunities, or general inquiries.",
  keywords: [
    "OSI contact",
    "Open Spotlight Initiative contact",
    "OSI support",
    "OSI partnership",
    "contact OSI",
    "OSI help",
  ],
  openGraph: {
    title: "Contact OSI - Get in Touch | Open Spotlight Initiative",
    description:
      "Have questions or want to collaborate? Get in touch with OSI (Open Spotlight Initiative) for support, partnerships, or general inquiries.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact OSI - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact OSI - Get in Touch | Open Spotlight Initiative",
    description:
      "Have questions or want to collaborate? Get in touch with OSI (Open Spotlight Initiative) for support, partnerships, or general inquiries.",
    images: ["/og-contact.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
