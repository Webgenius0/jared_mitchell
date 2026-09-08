import type { Metadata } from "next";
import AboutBanner from "./_Components/AboutBanner";
import OurSociety from "./_Components/OurSociety";
import OurStory from "./_Components/OurStory";
import Mission from "./_Components/Mission";
import WhatWeDo from "./_Components/WhatWeDo";
import SocialWorks from "./_Components/SocialWorks";
import WeServe from "./_Components/WeServe";
import WhatExist from "./_Components/WhatExist";
import OurImpact from "./_Components/OurImpact";
import FounderMessage from "./_Components/FounderMessage";
import JoinMovement from "./_Components/JoinMovement";
import NewsLetter from "@/Components/Common/NewsLetter";
import {
  getCMSAboutData,
  getCMSHomepageData,
} from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const cmsData = await getCMSAboutData();
  const sponsorsdata = await getCMSHomepageData();

  return (
    <>
      <AboutBanner data={cmsData?.about_hero} />
      <OurSociety data={cmsData?.about_society} />
      <OurStory data={cmsData?.about_origin} />
      <Mission data={cmsData?.about_mission} />
      <WhatWeDo data={cmsData?.about_what_we_do} />
      <SocialWorks data={cmsData?.about_how_it_works} />
      <WeServe data={cmsData?.about_who_we_serve} />
      <WhatExist data={cmsData?.about_why_exists} />
      <OurImpact data={cmsData?.about_our_impact} />
      <FounderMessage data={cmsData?.about_founder_message} />
      <JoinMovement data={cmsData?.about_join} />
      {/* <Sponsors data={cmsData?.about_sponsors} showButton={false} /> */}
      <Sponsors data={sponsorsdata?.partners} />
      <NewsLetter
        data={cmsData?.about_newsletter}
        title="Stay inspired. Get the latest spotlights and events delivered to your inbox."
      />
    </>
  );
};

export const metadata = {
  title: "About OSI - Our Story & Mission | Open Spotlight Initiative",
  description:
    "Learn about OSI (Open Spotlight Initiative) — our mission, values, and the story behind building a community platform that empowers creators, small businesses, and entrepreneurs to grow and thrive.",
  keywords: [
    "OSI about",
    "Open Spotlight Initiative mission",
    "OSI story",
    "OSI values",
    "community platform",
    "creators network",
  ],
  openGraph: {
    title: "About OSI - Our Story & Mission | Open Spotlight Initiative",
    description:
      "Learn about OSI (Open Spotlight Initiative) — our mission, values, and the story behind building a community platform for creators and businesses.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About OSI - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OSI - Our Story & Mission | Open Spotlight Initiative",
    description:
      "Learn about OSI (Open Spotlight Initiative) — our mission, values, and the story behind building a community platform for creators and businesses.",
    images: ["/og-about.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
