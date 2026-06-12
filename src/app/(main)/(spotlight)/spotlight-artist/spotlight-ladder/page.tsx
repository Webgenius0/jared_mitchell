import EventSponsors from "@/app/(main)/services/_components/EventSponsors";
import SpotlightOfTheWeek from "../../_components/SpotlightOfTheWeek";
import VoteNow from "../../_components/VoteNow";
import WeeklyTimeline from "../../_components/WeeklyTimeline";
import NewsLetter from "@/Components/Common/NewsLetter";
import ArtistSpotlightBanner from "../../_components/ArtistSpotlightBanner";
import { getCMSAboutData, getCMSSpotlightLadderData } from "@/lib/Services/cms_service";
import { sponsorsData } from "@/Components/Data/data";
import SponsorSlider from "@/Components/Common/SponsorSlider";

const page = async () => {
  const cmsData = await getCMSSpotlightLadderData();
  const CmsData = await getCMSAboutData();

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <>
      <ArtistSpotlightBanner data={cmsData?.spotlight_ladder_hero} />
      <SpotlightOfTheWeek />
      <VoteNow />
      <WeeklyTimeline />
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
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
