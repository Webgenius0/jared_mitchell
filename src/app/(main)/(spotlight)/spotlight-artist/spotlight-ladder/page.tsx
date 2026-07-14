import EventSponsors from "@/app/(main)/services/_components/EventSponsors";
import SpotlightOfTheWeek from "../../_components/SpotlightOfTheWeek";
import VoteNow from "../../_components/VoteNow";
import WeeklyTimeline from "../../_components/WeeklyTimeline";
import NewsLetter from "@/Components/Common/NewsLetter";
import ArtistSpotlightBanner from "../../_components/ArtistSpotlightBanner";
import {
  getCMSAboutData,
  getCMSSpotlightLadderData,
} from "@/lib/Services/cms_service";
import Sponsors from "../../../_components/Sponsors";

const page = async () => {
  const cmsData = await getCMSSpotlightLadderData();
  const CmsData = await getCMSAboutData();

  return (
    <>
      <ArtistSpotlightBanner data={cmsData?.spotlight_ladder_hero} />
      <SpotlightOfTheWeek />
      <VoteNow />
      <WeeklyTimeline />
      {/* <EventSponsors /> */}
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
