import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Impression Estimates - Audience Reach | OSI Sponsor Dashboard",
  description:
    "View impression estimates for your OSI sponsorship campaigns. Understand potential reach, audience size, and visibility projections in the Open Spotlight Initiative dashboard.",
  keywords: [
    "Our Social Image",
    "OSI",
    "Indianapolis small business",
    "Indianapolis local artists",
    "business spotlight",
    "artist spotlight",
    "entrepreneurs",
    "creators",
    "OSI Top Business Award",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>impression-estimates</div>;
};

export default page;