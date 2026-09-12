import type { Metadata } from "next";
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import SponsorshipMatters from "./_components/SponsorshipMatters";
import HowSponsorshipWorks from "./_components/HowSponsorshipWorks";
import SponsorshipLevel from "./_components/SponsorshipLevel";
import BecomeSponsor from "./_components/BecomeSponsor";
import FAQAccordion from "../services/_components/FAQAccordion";
import NewsLetter from "@/Components/Common/NewsLetter";
import SponsorshipBanner from "./_components/SponsorshipBanner";
import {
  getCMSAboutData,
  getCMSFAQs,
  getSponsorshipPageCms,
} from "@/lib/Services/cms_service";
import { CMSSponsorshipPage } from "@/Types/cms";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const faqData = await getCMSFAQs();
  const pageData = (await getSponsorshipPageCms()) as CMSSponsorshipPage;
  const CmsData = await getCMSAboutData();

  return (
    <>
      <SponsorshipBanner data={pageData?.sponsorship_page_hero} />
      <section className="section container">
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[627px]">
          <CustomVideoPlayer
            videoSrc={
              pageData?.sponsorship_page_video?.sub_title ??
              "/home/hero-video.mp4"
            }
            className={"!rounded-[40px]"}
          />
        </div>
      </section>
      <SponsorshipMatters data={pageData?.sponsorship_page_why} />
      <HowSponsorshipWorks data={pageData?.sponsorship_page_steps} />
      <SponsorshipLevel data={pageData?.sponsorship_page_levels_header} />
      <BecomeSponsor data={pageData?.sponsorship_page_footer} />
      <FAQAccordion data={faqData} />
      <Sponsors data={CmsData?.about_sponsors} showButton={false} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export const metadata: Metadata = {
  title: {
    absolute: "Sponsor Our Social Image | Indianapolis Community Partnerships",
  },
  description:
    "Partner with Our Social Image to champion local culture, gain high-impact brand visibility, and connect with Indianapolis leaders.",
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
    title: "Sponsor Our Social Image | Indianapolis Community Partnerships",
    description:
      "Partner with Our Social Image to champion local culture, gain high-impact brand visibility, and connect with Indianapolis leaders.",
    type: "website",
    locale: "en_US",
    siteName: "Our Social Image",
    images: [
      {
        url: "/home/home-banner-2.jpg",
        width: 1200,
        height: 630,
        alt: "Sponsor Our Social Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor Our Social Image | Indianapolis Community Partnerships",
    description:
      "Partner with Our Social Image to champion local culture, gain high-impact brand visibility, and connect with Indianapolis leaders.",
    images: ["/home/home-banner-2.jpg"],
  },
};

export default page;
