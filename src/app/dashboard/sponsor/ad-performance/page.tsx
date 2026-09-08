import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Ad Performance - Sponsor Analytics | OSI Dashboard",
  description:
    "View detailed ad performance analytics for your OSI sponsorship campaigns. Track impressions, clicks, conversions, and ROI in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>ad-performance</div>;
};

export default page;