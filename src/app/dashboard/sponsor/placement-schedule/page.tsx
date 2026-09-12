import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Placement Schedule - Ad Placements | OSI Sponsor Dashboard",
  description:
    "View and manage your ad placement schedule on OSI. Track upcoming placements, scheduled campaigns, and placement timings in the Open Spotlight Initiative sponsor dashboard.",
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
  return <div>placement-schedule</div>;
};

export default page;