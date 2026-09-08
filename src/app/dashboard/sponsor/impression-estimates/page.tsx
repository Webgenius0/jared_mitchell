import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Impression Estimates - Audience Reach | OSI Sponsor Dashboard",
  description:
    "View impression estimates for your OSI sponsorship campaigns. Understand potential reach, audience size, and visibility projections in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>impression-estimates</div>;
};

export default page;