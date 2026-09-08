import type { Metadata } from "next";
import React from 'react';

export const metadata = {
  title: "Campaign Assets - Creative Materials | OSI Sponsor Dashboard",
  description:
    "Access and manage your campaign assets on OSI. Upload, organize, and track creative materials for your sponsorship campaigns in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>campaign-assets</div>;
};

export default page;