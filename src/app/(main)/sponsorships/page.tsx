import Container from '@/Components/Common/Container';
import CustomVideoPlayer from '@/Components/Common/CustomVideoPlayer';
import SponsorshipMatters from './_components/SponsorshipMatters'
import HowSponsorshipWorks from './_components/HowSponsorshipWorks'
import SponsorshipLevel from './_components/SponsorshipLevel'
import BecomeSponsor from './_components/BecomeSponsor'
import FAQAccordion from '../services/_components/FAQAccordion';
import EventSponsors from '../services/_components/EventSponsors';
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
    <SponsorshipMatters />
    <HowSponsorshipWorks />
    <SponsorshipLevel />
    <BecomeSponsor />
    <FAQAccordion />
    <EventSponsors />
    <NewsLetter title='Be part of the movement. Get stories, updates, and opportunities straight to your inbox.'/>
    </> 
  );
};

export default page;