export function setItem(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.error("LocalStorage setItem error:", err);
  }
}

export function getItem(key: string): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const data = window.localStorage.getItem(key);
    return data ?? undefined;
  } catch (err) {
    console.error("LocalStorage getItem error:", err);
    return undefined;
  }
}

export function removeItem(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.error("LocalStorage removeItem error:", err);
  }
}

// ── Buy-now helpers ────────────────────────────────────────────

export interface BuyNowItem {
  product_id: string;
  quantity: number;
  // Display info for order summary (no need for extra API call)
  name?: string;
  thumbnail?: string;
  price?: number;
  slug?: string;
}

const BUY_NOW_KEY = "buy_now_item";

export function setBuyNowItem(item: BuyNowItem) {
  try {
    window.localStorage.setItem(BUY_NOW_KEY, JSON.stringify(item));
  } catch (err) {
    console.error("Failed to save buy-now item:", err);
  }
}

export function getBuyNowItem(): BuyNowItem | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BUY_NOW_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BuyNowItem;
  } catch (err) {
    console.error("Failed to read buy-now item:", err);
    return null;
  }
}

export function clearBuyNowItem() {
  try {
    window.localStorage.removeItem(BUY_NOW_KEY);
  } catch (err) {
    console.error("Failed to clear buy-now item:", err);
  }
}

// ── Round submission cache ─────────────────────────────────────────
// RoundAssetsSubmission keeps the last-known submission media for a
// contestant so the previously uploaded video can be restored as the
// default value after a page refresh — even when the contestant-details
// API request gets redirected (302) and returns no data.

// A contestant has a *separate* submission per round (round 2, 3, 4…), and
// the profile endpoint returns the current round's submission, so the cache
// key must be scoped to (roundId, contestantId) — never just the contestant.
const ROUND_SUBMISSION_KEY = (
  roundId: number | string,
  contestantId: number | string,
) => `round_submission_${roundId}_${contestantId}`;

export interface CachedRoundSubmission {
  id: number | string;
  media_urls: string[];
  media_full_urls?: string[];
  submitted_at?: string | null;
}

export function getCachedRoundSubmission(
  roundId: number | string | null | undefined,
  contestantId: number | string | null | undefined,
): CachedRoundSubmission | null {
  // Reading localStorage during render is normally discouraged, but this is
  // safe here: the guard returns null on the server, and on the client's
  // initial render both ids are still null (round/business data is async), so
  // the value can't differ between server HTML and the hydration render.
  if (typeof window === "undefined") return null;
  if (roundId == null || contestantId == null) return null;
  try {
    const raw = window.localStorage.getItem(
      ROUND_SUBMISSION_KEY(roundId, contestantId),
    );
    return raw ? (JSON.parse(raw) as CachedRoundSubmission) : null;
  } catch (err) {
    console.error("Failed to read round submission cache:", err);
    return null;
  }
}

export function setCachedRoundSubmission(
  roundId: number | string | null | undefined,
  contestantId: number | string | null | undefined,
  submission: CachedRoundSubmission,
) {
  if (roundId == null || contestantId == null) return;
  try {
    window.localStorage.setItem(
      ROUND_SUBMISSION_KEY(roundId, contestantId),
      JSON.stringify(submission),
    );
  } catch (err) {
    console.error("Failed to cache round submission:", err);
  }
}

export function clearCachedRoundSubmission(
  roundId: number | string | null | undefined,
  contestantId: number | string | null | undefined,
) {
  if (roundId == null || contestantId == null) return;
  try {
    window.localStorage.removeItem(ROUND_SUBMISSION_KEY(roundId, contestantId));
  } catch (err) {
    console.error("Failed to clear round submission cache:", err);
  }
}
