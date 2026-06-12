import NewsLetter from "@/Components/Common/NewsLetter";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import EventSponsors from "../../services/_components/EventSponsors";
import SpotlightHero from "../_components/SpotlightHero";
import DiscoverArtists from "../_components/DiscoverArtists";
import EditorsPicks from "../_components/EditorsPicks";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import SpotlightLadder from "../_components/SpotlightLadder";
import BusinessSpotlightBanner from "../_components/BusinessSpotlightBanner";
import { getCMSAboutData, getCMSBusinessSpotlightData } from "@/lib/Services/cms_service";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";

const page = async () => {
  const cmsData = await getCMSBusinessSpotlightData();
  const CmsData = await getCMSAboutData();

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <>
      <BusinessSpotlightBanner data={cmsData?.business_spotlight_hero} />
      <SpotlightHero data={cmsData?.business_spotlight_video} />
      <DiscoverArtists
        type="business"
        data={cmsData?.business_spotlight_list}
      />
      <CommunityAchievements data={cmsData?.business_spotlight_highlights} />
      <EditorsPicks type="business" data={cmsData?.business_spotlight_picks} />
      <SpotlightLadder
        title={
          cmsData?.business_spotlight_ladder?.title || "OSI Spotlight Ladder"
        }
        subTitle={
          cmsData?.business_spotlight_ladder?.sub_title ||
          "Community-driven weekly recognition"
        }
        buttonHref="/spotlight-business/spotlight-ladder"
        data={cmsData?.business_spotlight_ladder}
      />
      <BecomeAPart data={cmsData?.business_spotlight_join} />
      <CreativeJourney data={cmsData?.business_spotlight_interview} />
      <WhatExist data={cmsData?.business_spotlight_why_exists} />
      {/* <EventSponsors /> */}
      <section className="py-10 xl:py-20">
        <h2 className="section_title">
          {CmsData?.about_sponsors?.title || "Our Event Sponsors"}
        </h2>
        <div className="flex flex-col gap-5">
          <SponsorSlider logos={logos} />
          <SponsorSlider logos={logos} reverse={true} />
        </div>
      </section>
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;
