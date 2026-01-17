import AboutBanner from "./_Components/AboutBanner";
import OurSociety from "./_Components/OurSociety";
import OurStory from "./_Components/OurStory";
import Mission from "./_Components/Mission";
import WhatWeDo from "./_Components/WhatWeDo";
import SocialWorks from "./_Components/SocialWorks";
import WeServe from "./_Components/WeServe";
import WhatExist from "./_Components/WhatExist";
import OurImpact from "./_Components/OurImpact";
import FounderMessage from "./_Components/FounderMessage";
import JoinMovement from "./_Components/JoinMovement";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import NewsLetter from "@/Components/Common/NewsLetter";


const page = () => {
  return (
    <>
      <AboutBanner />
      <OurSociety />
      <OurStory />
      <Mission />
      <WhatWeDo />
      <SocialWorks />
      <WeServe />
      <WhatExist />
      <OurImpact />
      <FounderMessage />
      <JoinMovement />
      <section className="py-20">
        <h2 className="text-primary-black text-5xl font-bold leading-[140%] text-center mb-10">
          Our Event Sponsors
        </h2>
        <SponsorSlider logos={sponsorsData} />
        <SponsorSlider logos={sponsorsData} reverse={true} />
      </section>
      <NewsLetter
        title="Stay inspired. Get the latest spotlights and events delivered to your
          inbox."
      />
    </>
  );
};

export default page;
