import BusinessShower from "./_components/BusinessShower";
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import BossBeginningWinner from "./_components/BossBeginningWinner";
import NewBusiness from "./_components/NewBusiness";
import HowVotingWorks from "./_components/HowVotingWorks";
import WinnerReceives from "./_components/WinnerReceives";
import PartnerWithBossBeginnings from "./_components/PartnerWithBossBeginnings";
import NewsLetter from "@/Components/Common/NewsLetter";
import BossBeginningBanner from "./_components/BossBeginningBanner";
import BusinessChosenChart from "./_components/BusinessChosenChart";
import { getBossCms, getCMSAboutData } from "@/lib/Services/cms_service";
import { CMSBossBeginnings } from "@/Types/cms";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import { Button } from "@/Components/Common/Button";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <>
      <BossBeginningBanner data={pageData?.boss_beginnings_hero} />
      <section className="section container">
        <div className="w-full h-[627px]">
          <CustomVideoPlayer
            videoSrc={
              pageData?.boss_beginnings_video_gallery?.video ??
              "/home/hero-video.mp4"
            }
            className={"!rounded-[40px]"}
          />
        </div>
      </section>
      <BusinessShower data={pageData?.boss_beginnings_features} />
      <BossBeginningWinner data={pageData?.boss_beginnings_video_gallery} />
      <NewBusiness data={pageData?.boss_beginnings_section5} />
      <HowVotingWorks data={pageData?.boss_beginnings_steps} />
      <BusinessChosenChart data={pageData?.boss_beginnings_steps} />
      <WinnerReceives data={pageData?.boss_beginnings_dynamic} />
      {/* <PartnerWithBossBeginnings /> */}
      <section className="py-10 xl:py-20">
        <h2 className="section_title pb-10">
          {"Partner With Boss Beginnings"}
        </h2>
        <div className="flex flex-col gap-5">
          <SponsorSlider logos={logos} />
          <SponsorSlider logos={logos} reverse={true} />
        </div>
        <div className="flex justify-center mt-10">
          <Button>Become a Sponsor</Button>
        </div>
      </section>
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
