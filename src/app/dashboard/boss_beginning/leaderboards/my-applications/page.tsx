import type { Metadata } from "next";

"use client";
import MyApplications from "@/Components/Common/MyApplications";

export const metadata = {
  title: "My Applications - Business Spotlight Submissions | OSI Dashboard",
  description:
    "View your business spotlight applications on OSI. Track submission status, review approved spotlights, and manage your spotlight history in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <MyApplications type="business" />;
}
