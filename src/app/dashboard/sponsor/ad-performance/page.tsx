import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Ad Performance - Sponsor Analytics | OSI Dashboard",
  description:
    "View detailed ad performance analytics for your OSI sponsorship campaigns. Track impressions, clicks, conversions, and ROI in the Open Spotlight Initiative dashboard.",
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
  return <div>ad-performance</div>;
};

export default page;