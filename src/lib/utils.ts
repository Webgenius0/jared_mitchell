import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve a media URL — prepend base URL if the path is relative.
 * Handles relative paths like "storage/uploads/..." by joining them
 * with the NEXT_PUBLIC_SITE_URL base.
 */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  return `${base.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Map a user's role to their dashboard route.
 * The API returns role as a string: "artist", "member", "sponsor", "boss".
 * Also supports numeric role IDs as fallback (5, 6, 7, 8).
 */
export const ROLE_DASHBOARD_MAP: Record<string | number, string> = {
  // String role names (from API response)
  artist: "/dashboard/artist_business",
  member: "/dashboard/community_member",
  sponsor: "/dashboard/sponsor",
  boss: "/dashboard/boss_beginning",
  // Numeric role IDs (legacy fallback)
  5: "/dashboard/artist_business",
  6: "/dashboard/community_member",
  7: "/dashboard/sponsor",
  8: "/dashboard/boss_beginning",
};

/**
 * Recursively search for a key containing "role" whose value matches a known role ID.
 * This avoids false positives — only keys that include "role" (case-insensitive) are candidates.
 */
/**
 * Extract a role ID from a value that could be:
 * - a plain number/string ("5", 5)
 * - an object with an id/role_id property ({ id: 5, name: "artisan" })
 */
function extractRoleId(value: unknown): string | number | null {
  if (value === null || value === undefined) return null;

  // Plain number or string
  if (typeof value === "number" || typeof value === "string") {
    if (ROLE_DASHBOARD_MAP[value]) return value;
    // Also try parsing string to number
    const num = Number(value);
    if (!isNaN(num) && ROLE_DASHBOARD_MAP[num]) return num;
    return null;
  }

  // Object – check for id / role_id properties
  if (typeof value === "object") {
    const id = (value as any)?.id ?? (value as any)?.role_id;
    if (id !== undefined) return extractRoleId(id);
  }

  return null;
}

/**
 * Recursively search for a key containing "role" whose value matches a known role ID.
 * This avoids false positives — only keys that include "role" (case-insensitive) are candidates.
 */
function findRoleId(obj: any, depth = 0, visited = new Set<any>()): number | string | null {
  if (!obj || typeof obj !== "object" || depth > 4 || visited.has(obj)) return null;
  visited.add(obj);

  for (const [key, value] of Object.entries(obj)) {
    // Check if key contains "role" – try to extract role ID from its value
    if (key.toLowerCase().includes("role")) {
      const extracted = extractRoleId(value);
      if (extracted !== null) return extracted;
    }

    // Recurse into nested objects (skip arrays to avoid over-searching)
    if (typeof value === "object" && !Array.isArray(value)) {
      const found = findRoleId(value, depth + 1, visited);
      if (found !== null) return found;
    }
  }

  return null;
}

/**
 * Get the user's dashboard route from their user object.
 * Searches common fields first, then recursively for any key containing "role".
 */
export function getUserDashboardRoute(user: any): string | null {
  if (!user) return null;

  // 1) Quick check on common top-level fields
  const commonRole =
    user?.role_id ?? user?.role ?? user?.roleId ?? user?.roleID ?? user?.user_role;
  const commonRoleId = extractRoleId(commonRole);
  if (commonRoleId && ROLE_DASHBOARD_MAP[commonRoleId]) {
    return ROLE_DASHBOARD_MAP[commonRoleId];
  }

  // 2) Check nested profile fields
  const profileRole =
    user?.profile?.role_id ??
    user?.profile?.role ??
    user?.profile?.roleId;
  if (profileRole && ROLE_DASHBOARD_MAP[profileRole]) {
    return ROLE_DASHBOARD_MAP[profileRole];
  }

  // 3) Recursively search for any property whose key contains "role"
  const deepRoleId = findRoleId(user);
  if (deepRoleId && ROLE_DASHBOARD_MAP[deepRoleId]) {
    return ROLE_DASHBOARD_MAP[deepRoleId];
  }

  // 4) Debug: log the user object so we can identify the actual field name & structure
  if (typeof window !== "undefined") {
    console.log("[OSI] User object:", JSON.parse(JSON.stringify(user)));
  }

  return null;
}

/**
 * Get the sidebar links key (used in dashboard layout) from the user object.
 */
export function getUserDashboardType(user: any): string {
  const route = getUserDashboardRoute(user);
  if (!route) return "community_member"; // default fallback

  if (route.includes("artist_business")) return "artist_business";
  if (route.includes("boss_beginning")) return "boss_beginning";
  if (route.includes("sponsor")) return "sponsor";
  return "community_member";
}
