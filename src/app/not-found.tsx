import type { Metadata } from "next";
import React from "react";

export const metadata = {
  title: "404 - Page Not Found | OSI",
  description:
    "The page you are looking for does not exist on OSI (Open Spotlight Initiative). Return to the homepage to continue exploring spotlights, events, and community opportunities.",
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
  return (
    <div className="flex justify-center items-center h-screen text-2xl">
      Not Found
    </div>
  );
};

export default page;
