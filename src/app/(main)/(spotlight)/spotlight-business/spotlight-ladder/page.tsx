import SpotlightOfTheWeek from "../../_components/SpotlightOfTheWeek";
import VoteNow from "../../_components/VoteNow";
import WeeklyTimeline from "../../_components/WeeklyTimeline";
import NewsLetter from "@/Components/Common/NewsLetter";
import BusinessSpotlightBanner from "../../_components/BusinessSpotlightBanner";
import {
  getCMSSpotlightLadderData,
} from "@/lib/Services/cms_service";
import Sponsors from "../../../_components/Sponsors";

const page = async () => {
  const cmsData = await getCMSSpotlightLadderData();

  // Map API spotlight_ladder_details metadata to timeline format
  const timelineEvents = cmsData?.spotlight_ladder_details?.metadata?.map(
    (item, index) => {
      const lines = (item.description || "")
        .split(/\r?\n/)
        .filter(Boolean);
      return {
        id: index + 1,
        time: item.heading,
        title: lines[0] || "",
        points: lines.slice(1),
      };
    },
  );

  return (
    <>
      <BusinessSpotlightBanner data={cmsData?.spotlight_ladder_hero} />
      <SpotlightOfTheWeek />
      <VoteNow />
      <WeeklyTimeline
        title={cmsData?.spotlight_ladder_details?.title}
        events={timelineEvents}
      />
      <Sponsors
        data={cmsData?.partners?.items?.[0]}
        title={
          cmsData?.partners?.items?.[0]?.title || "Our Community Partners"
        }
      />
      <NewsLetter
        title={
          cmsData?.newsletter?.title ||
          "Be part of the movement. Get stories, updates, and opportunities straight to your inbox."
        }
      />
    </>
  );
};

export default page;

