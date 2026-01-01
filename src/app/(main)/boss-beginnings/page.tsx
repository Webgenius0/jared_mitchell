import Container from '@/Components/Common/Container';
import BusinessShower from './_components/BusinessShower';
import CustomVideoPlayer from '@/Components/Common/CustomVideoPlayer';
import BossBeginningWinner from './_components/BossBeginningWinner';
import NewBusiness from './_components/NewBusiness';
import HowVotingWorks from './_components/HowVotingWorks';
import WinnerReceives from './_components/WinnerReceives';
import PartnerWithBossBeginnings from './_components/PartnerWithBossBeginnings';
import NewsLetter from '@/Components/Common/NewsLetter';

const page = () => {
  return (
    <>
      <section className='section'>
        <Container>
          <div className='w-full h-[627px]'>
            <CustomVideoPlayer videoSrc="/home/hero-video.mp4" className={"!rounded-[40px]"} />
          </div>
        </Container>
      </section>
      <BusinessShower />
      <BossBeginningWinner />
      <NewBusiness />
      <HowVotingWorks />
      <WinnerReceives />
      <PartnerWithBossBeginnings />
      <NewsLetter title='Be part of the movement. Get stories, updates, and opportunities straight to your inbox.'/>
    </>
  );
};

export default page;