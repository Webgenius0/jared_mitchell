import React from 'react';
import EventSponsors from '../services/_components/EventSponsors';
import NewsLetter from '@/Components/Common/NewsLetter';
import FAQAccordion from '../services/_components/FAQAccordion';
import TalentApplication from './_components/TalentApplication'

const page = () => {
  return (
    <div>
      <TalentApplication />
      <FAQAccordion />
      <EventSponsors />
      <NewsLetter title='Be part of the movement. Get stories, updates, and opportunities straight to your inbox.'/>
    </div>
  );
};

export default page;