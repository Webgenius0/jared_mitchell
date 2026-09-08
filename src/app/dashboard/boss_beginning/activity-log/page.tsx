import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Activity Log - Business Activity History | OSI Dashboard",
  description:
    "View your business activity log on OSI. Track recent actions, updates, and interactions in your Open Spotlight Initiative business dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>activity-log</div>;
};

export default page;