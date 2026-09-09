import type { Metadata } from "next";
import React from "react";
import BusinessAwardContestBanner from "./Components/BusinessAwardContestBanner";
import {
  ActiveSeasonRound,
  CMSBusinessAward,
  CMSRoundsPage,
} from "@/Types/cms";
import {
  getBossCms,
  getCMSAboutData,
  getRoundsCms,
  getActiveSeasonRounds,
} from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import OpenQualifierRound from "./Components/Openqualifierround";
import BusinessAwardGuide from "../business-award/_components/BusinessAwardGuide";
import ActiveRoundCountdown from "../business-award/_components/ActiveRoundCountdown";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBusinessAward;
  const CmsData = await getCMSAboutData();
  // Rounds data is optional — fall back gracefully if the endpoint is unavailable
  let roundsData: CMSRoundsPage | undefined;
  try {
    roundsData = await getRoundsCms();
  } catch {
    roundsData = undefined;
  }

  // Live season rounds — used to render the round tabs, mark which round is
  // active (open by default), and load its leaderboard.
  let seasonRounds: ActiveSeasonRound[] = [];
  let activeRoundId: number | null = null;
  try {
    const seasonRes = await getActiveSeasonRounds();
    seasonRounds = seasonRes?.data?.rounds ?? [];
    activeRoundId =
      seasonRounds.find((r) => r.is_active)?.id ?? seasonRounds[0]?.id ?? null;
  } catch {
    // No active season yet — the tabs show empty states until real rounds exist
  }

  return (
    <>
      <BusinessAwardContestBanner data={pageData?.boss_beginnings_hero} />
      <ActiveRoundCountdown />
      <OpenQualifierRound
        roundsData={roundsData?.rounds}
        rounds={seasonRounds}
        activeRoundId={activeRoundId}
      />
      <div className="xl:px-5">
        <BusinessAwardGuide />
      </div>
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};
export const metadata = {
  title:
    "OSI Top Business Award Contest - Apply & Compete | Open Spotlight Initiative",
  description:
    "Enter the OSI Top Business Award contest. Learn about qualification rounds, application requirements, and how to compete for the prestigious business award on OSI.",
  keywords: [
    "OSI business contest",
    "OSI Top Business Award contest",
    "business award application",
    "qualification rounds",
    "OSI competition",
    "apply for business award",
  ],
  openGraph: {
    title:
      "OSI Top Business Award Contest - Apply & Compete | Open Spotlight Initiative",
    description:
      "Enter the OSI Top Business Award contest. Learn about qualification rounds, application requirements, and how to compete for the prestigious business award.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-contest-entry.png",
        width: 1200,
        height: 630,
        alt: "OSI Top Business Award Contest - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "OSI Top Business Award Contest - Apply & Compete | Open Spotlight Initiative",
    description:
      "Enter the OSI Top Business Award contest. Learn about qualification rounds, application requirements, and how to compete for the prestigious business award.",
    images: ["/og-contest-entry.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
