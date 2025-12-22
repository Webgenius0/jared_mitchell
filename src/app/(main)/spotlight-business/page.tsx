import NewsLetter from "@/Components/Common/NewsLetter";
import CommunityAchievements from "../_components/CommunityAchievements";
import WhatExist from "../about/_Components/WhatExist";
import EventSponsors from "../services/_components/EventSponsors";
import SpotlightHero from "../spotlight-artist/_components/SpotlightHero";
import DiscoverArtists from "../spotlight-artist/_components/DiscoverArtists";
import EditorsPicks from "../spotlight-artist/_components/EditorsPicks";
import BecomeAPart from "../spotlight-artist/_components/BecomeAPart";
import CreativeJourney from "../spotlight-artist/_components/CreativeJourney";
import Container from "@/Components/Common/Container";
import { Button } from "@/Components/Common/Button";
import { BsArrowRight } from "react-icons/bs";

const page = () => {
  return (
    <>
      <SpotlightHero />
      <DiscoverArtists />
      <CommunityAchievements />
      <EditorsPicks />
      <section className='section bg-primary-gray'>
        <Container>
          <h2 className='section_title'>OSI Spotlight Ladder</h2>
          <p className='section_sub_title'>Community-driven weekly recognition</p>
          <div className='text-center mt-10'>
            <Button>Explore Spotlight Ladder <BsArrowRight className='text-2xl' /></Button>
          </div>
        </Container>
      </section>
      <BecomeAPart />
      <CreativeJourney />
      <WhatExist />
      <EventSponsors />
      <NewsLetter
        title="Stay connected with new spotlights, events, and creative tools."
      />
    </>
  );
};

export default page;