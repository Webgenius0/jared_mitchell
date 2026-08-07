import { getActiveSeasonRounds } from "@/Hooks/api/cms_api";

// The season's current round number — the round that is open right now
// (flagged `is_active`). Users can open their current round and every round
// before it, but not the rounds that come after it.
//
// When the season has no rounds (still loading or errored) it returns 5 so
// nothing ever gets locked by a transient request failure — callers simply
// stay fail-open until the data is known.
//
// `enabled` lets callers skip the request for roles that don't need it.
export default function useCurrentRoundNumber(enabled: boolean = true): number {
  const { data: seasonData } = getActiveSeasonRounds(enabled);
  const rounds: any[] = seasonData?.data?.rounds ?? [];
  const hasRounds = Array.isArray(rounds) && rounds.length > 0;
  return hasRounds
    ? (rounds.find((r: any) => r.is_active)?.round_number ?? 1)
    : 5;
}
