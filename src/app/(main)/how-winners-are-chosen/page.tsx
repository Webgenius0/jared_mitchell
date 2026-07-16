import { getBossCms, getCMSAboutData } from "@/lib/Services/cms_service";
import { CMSBossBeginnings } from "@/Types/cms";
import BossBeginningBanner from "../boss-beginnings/_components/BossBeginningBanner";
import WinnerReceives from "../boss-beginnings/_components/WinnerReceives";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import BusinessChosenChart from "../boss-beginnings/_components/BusinessChosenChart";
import MainChoseBanner from "./Components/MainChoseBanner";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();

  return (
    <>
      <MainChoseBanner data={pageData?.boss_beginnings_hero} />
      {/* <section className="section container">
        <div className="w-full h-[627px]">
          <CustomVideoPlayer
            videoSrc={
              pageData?.boss_beginnings_video_gallery?.video ??
              "/home/hero-video.mp4"
            }
            className={"!rounded-[40px]"}
          />
        </div>
      </section> */}
      {/* <BusinessShower data={pageData?.boss_beginnings_features} /> */}
      {/* <BossBeginningWinner data={pageData?.boss_beginnings_video_gallery} /> */}
      <BusinessChosenChart data={pageData?.boss_beginnings_steps} />
      {/* <NewBusiness data={pageData?.boss_beginnings_section5} /> */}
      {/* <HowVotingWorks data={pageData?.boss_beginnings_steps} />
      <WinnerReceives data={pageData?.boss_beginnings_dynamic} />
      {/* <PartnerWithBossBeginnings /> */}
      <Sponsors data={CmsData?.about_sponsors} title="Our Event Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
