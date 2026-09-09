import React from "react";
import { ActiveSeasonRound } from "@/Types/cms";
import { getActiveSeasonRounds } from "@/lib/Services/cms_service";
import BusinessAwardContestCarouselClient from "./BusinessAwardContestCarouselClient";

interface BusinessAwardContestCarouselProps {
  /**
   * Optional pre-fetched season rounds. When omitted the component fetches
   * the live active-season rounds itself, so it can be dropped into any page.
   */
  rounds?: ActiveSeasonRound[];
  /** ID of the round to open by default */
  activeRoundId?: number | null;
  /** Optional section heading shown above the carousel */
  title?: string;
  /** Auto-advance the carousel every few seconds */
  autoPlay?: boolean;
}

/**
 * Reusable "OSI Top Business Award Contest" section.
 *
 * Renders the active round's leaderboard (rounds 2–5 only) as a one-at-a-time
 * Swiper carousel; round 1 (the open qualifier) shows nothing. "View Profile"
 * navigates to the same live profile route as the contest page.
 *
 * Usage — drop it inside any server-rendered page:
 *
 *   <BusinessAwardContestCarousel title="OSI Top Business Award" />
 *
 * Data is fetched server-side with the same CMS services the contest page
 * uses, and falls back gracefully when the endpoints are unavailable.
 */
const BusinessAwardContestCarousel = async ({
  rounds: roundsProp,
  activeRoundId: activeRoundIdProp,
  title,
  autoPlay,
}: BusinessAwardContestCarouselProps) => {
  // Live season rounds — used to find the active round and load its leaderboard.
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
      // No active season yet — the carousel renders nothing.
      rounds = [];
    }
  }

  return (
    <BusinessAwardContestCarouselClient
      rounds={rounds}
      activeRoundId={activeRoundId}
      title={title}
      autoPlay={autoPlay}
    />
  );
};

export default BusinessAwardContestCarousel;
