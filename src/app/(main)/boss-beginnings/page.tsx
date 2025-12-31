import Container from '@/Components/Common/Container';
import BusinessShower from './_components/BusinessShower';
import CustomVideoPlayer from '@/Components/Common/CustomVideoPlayer';
import BossBeginningWinner from './_components/BossBeginningWinner';
import NewBusiness from './_components/NewBusiness';
import HowVotingWorks from './_components/HowVotingWorks';

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
    </>
  );
};

export default page;