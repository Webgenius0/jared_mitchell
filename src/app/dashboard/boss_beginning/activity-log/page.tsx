import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Activity Log - Business Activity History | OSI Dashboard",
  description:
    "View your business activity log on OSI. Track recent actions, updates, and interactions in your Open Spotlight Initiative business dashboard.",
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
  return <div>activity-log</div>;
};

export default page;