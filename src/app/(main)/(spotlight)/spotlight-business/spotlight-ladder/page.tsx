import EventSponsors from "@/app/(main)/services/_components/EventSponsors";
import SpotlightOfTheWeek from "../../_components/SpotlightOfTheWeek";
import VoteNow from "../../_components/VoteNow";
import WeeklyTimeline from "../../_components/WeeklyTimeline";
import NewsLetter from "@/Components/Common/NewsLetter";
import BusinessSpotlightBanner from "../../_components/BusinessSpotlightBanner";
import { getCMSSpotlightLadderData } from "@/lib/Services/cms_service";

const page = async () => {
  const cmsData = await getCMSSpotlightLadderData();

  return (
    <>
      <BusinessSpotlightBanner data={cmsData?.spotlight_ladder_hero} />
      <SpotlightOfTheWeek />
      <VoteNow />
      {/* <WeeklyTimeline /> */}
      <EventSponsors />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
