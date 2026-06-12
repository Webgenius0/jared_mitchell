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
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import NewsLetter from "@/Components/Common/NewsLetter";
import { getCMSAboutData } from "@/lib/Services/cms_service";

const page = async () => {
  const cmsData = await getCMSAboutData();

  const logos = cmsData?.about_sponsors?.metadata?.map((m, i) => ({
    id: i + 1,
    image: m.image,
    link: m.link
  })) || sponsorsData;

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
      <section className="py-10 xl:py-20">
        <h2 className="section_title">
          {cmsData?.about_sponsors?.title || "Our Event Sponsors"}
        </h2>
        <div className="flex flex-col gap-5">
          <SponsorSlider logos={logos} />
          <SponsorSlider logos={logos} reverse={true} />
        </div>
      </section>
      <NewsLetter
        data={cmsData?.about_newsletter}
        title="Stay inspired. Get the latest spotlights and events delivered to your inbox."
      />
    </>
  );
};

export default page;
