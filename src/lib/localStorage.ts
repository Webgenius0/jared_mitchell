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
