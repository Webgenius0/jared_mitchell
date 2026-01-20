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

const page = () => {
  return (
    <>
      <BossBeginningBanner />
      <section className="section container">
        <div className="w-full h-[627px]">
          <CustomVideoPlayer
            videoSrc="/home/hero-video.mp4"
            className={"!rounded-[40px]"}
          />
        </div>
      </section>
      <BusinessShower />
      <BossBeginningWinner />
      <NewBusiness />
      <HowVotingWorks />
      <BusinessChosenChart />
      <WinnerReceives />
      <PartnerWithBossBeginnings />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
