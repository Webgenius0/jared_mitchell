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
export const metadata: Metadata = {
  title: {
    absolute: "OSI Top Business Award | Our Social Image",
  },
  description:
    "Follow the 5-week tournament celebrating Indianapolis entrepreneurs. Track each round, vote for local contenders, and celebrate community champions.",
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
  openGraph: {
    title: "OSI Top Business Award | Our Social Image",
    description:
      "Follow the 5-week tournament celebrating Indianapolis entrepreneurs. Track each round, vote for local contenders, and celebrate community champions.",
    type: "website",
    locale: "en_US",
    siteName: "Our Social Image",
    images: [
      {
        url: "/home/business-award-banner.jpg",
        width: 1200,
        height: 630,
        alt: "OSI Top Business Award - Our Social Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI Top Business Award | Our Social Image",
    description:
      "Follow the 5-week tournament celebrating Indianapolis entrepreneurs. Track each round, vote for local contenders, and celebrate community champions.",
    images: ["/home/business-award-banner.jpg"],
  },
};

export default page;
