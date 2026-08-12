import React from "react";
import {
  ActiveSeasonRound,
  CMSRoundsSection,
} from "@/Types/cms";
import {
  getActiveSeasonRounds,
  getRoundsCms,
} from "@/lib/Services/cms_service";
import BossBeginningsContestCarouselClient from "./BossBeginningsContestCarouselClient";

interface BossBeginningsContestCarouselProps {
  /**
   * Optional pre-fetched season rounds. When omitted the component fetches
   * the live active-season rounds itself, so it can be dropped into any page.
   */
  rounds?: ActiveSeasonRound[];
  /**
   * Optional pre-fetched CMS rounds content (used by the "OSI Panel" tab).
   * When omitted the component fetches it from the CMS.
   */
  roundsData?: CMSRoundsSection;
  /** ID of the round to open by default */
  activeRoundId?: number | null;
  /** Optional section heading shown above the tabs */
  title?: string;
  /** Auto-advance the carousel every few seconds */
  autoPlay?: boolean;
}

/**
 * Reusable "Boss Beginnings Contest" section.
 *
 * Renders the same functions as the /boss-beginnings-contest page (round
 * tabs, round stats, OSI Panel, Leader-board) but presents the contestants
 * inside a one-at-a-time Swiper carousel. "View Profile" navigates to the
 * exact same live profile route as the original page.
 *
 * Usage — drop it inside any server-rendered page:
 *
 *   <BossBeginningsContestCarousel title="Boss Beginnings" />
 *
 * Data is fetched server-side with the same CMS services the contest page
 * uses, and falls back gracefully when the endpoints are unavailable.
 */
const BossBeginningsContestCarousel = async ({
  rounds: roundsProp,
  roundsData: roundsDataProp,
  activeRoundId: activeRoundIdProp,
  title,
  autoPlay,
}: BossBeginningsContestCarouselProps) => {
  // Live season rounds — used to render the round tabs, mark which round is
  // active (open by default), and load its leaderboard.
  let rounds = roundsProp;
  let activeRoundId = activeRoundIdProp;

  if (!rounds) {
    try {
      const seasonRes = await getActiveSeasonRounds();
      rounds = seasonRes?.data?.rounds ?? [];
      if (activeRoundId == null) {
        activeRoundId =
          rounds.find(r => r.is_active)?.id ?? rounds[0]?.id ?? null;
      }
    } catch {
      // No active season yet — the carousel falls back to preview data.
      rounds = [];
    }
  }

  // Rounds CMS data is optional — fall back gracefully if unavailable.
  let roundsData = roundsDataProp;
  if (!roundsData) {
    try {
      const roundsPage = await getRoundsCms();
      roundsData = roundsPage?.rounds;
    } catch {
      roundsData = undefined;
    }
  }

  return (
    <BossBeginningsContestCarouselClient
      rounds={rounds}
      roundsData={roundsData}
      activeRoundId={activeRoundId}
      title={title}
      autoPlay={autoPlay}
    />
  );
};

export default BossBeginningsContestCarousel;
