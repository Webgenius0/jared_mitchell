import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { EventRegistration } from "@/Types/cms";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}


export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  return `${base.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
}

export function isUsableImage(url: string | null | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (
    /placeholder|default[-_/]?(avatar|user)|no[-_]?image|default\//i.test(
      trimmed,
    ) ||
    /\.(mp4|mov|webm)$|video\//i.test(trimmed)
  )
    return false;
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}


export function validateStrongPassword(password: string): true | string {
  const rules: { test: (value: string) => boolean; label: string }[] = [
    { test: value => value.length >= 8, label: "at least 8 characters" },
    { test: value => /[a-z]/.test(value), label: "a lowercase letter" },
    { test: value => /[A-Z]/.test(value), label: "an uppercase letter" },
    { test: value => /\d/.test(value), label: "a number" },
    {
      test: value => /[^A-Za-z0-9]/.test(value),
      label: "a special character",
    },
  ];

  const missing = rules.filter(rule => !rule.test(password)).map(rule => rule.label);
  if (missing.length === 0) return true;
  return `Password must include ${missing.join(", ")}`;
}


export function downloadBookingReceipt(registration: EventRegistration) {

  const escapeHtml = (value: unknown) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const formatMoney = (value: number | string | undefined) => {
    const currency = registration?.billing?.currency ?? "USD";
    return `${currency} ${Number(value ?? 0).toFixed(2)}`;
  };

  const formatDate = (value: string | null | undefined) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const attendee = registration?.attendee ?? {};
  const event = registration?.event ?? {};
  const billing = registration?.billing ?? {};
  const ticketTier = registration?.ticket_tier ?? {};
  const timeline = registration?.timeline ?? {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Booking Receipt — ${escapeHtml(registration?.booking_reference ?? "Booking")}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #f5f6f8; color: #1e293b; padding: 32px 16px; }
  .receipt { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
  .header { background: #1977dd; color: #fff; padding: 24px 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .header h1 { font-size: 18px; font-weight: 700; }
  .header span { font-size: 13px; opacity: 0.9; }
  .body { padding: 24px 28px; }
  .section { margin-bottom: 20px; }
  .section:last-child { margin-bottom: 0; }
  .section h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 10px; }
  .row { display: flex; justify-content: space-between; gap: 16px; padding: 7px 0; font-size: 14px; }
  .row .label { color: #64748b; }
  .row .value { font-weight: 600; text-align: right; }
  .divider { border-top: 1px dashed #e2e8f0; margin: 14px 0; }
  .total .value { font-size: 16px; color: #1977dd; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
  .badge.paid, .badge.confirmed { background: #d1fae5; color: #047857; }
  .badge.pending { background: #fef3c7; color: #b45309; }
  .badge.cancelled { background: #fee2e2; color: #b91c1c; }
  .footer { padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  @media print { body { background: #fff; padding: 0; } .receipt { border: none; border-radius: 0; } }
</style>
</head>
<body>
  <div class="receipt">      <div class="header">
      <h1>Booking Receipt</h1>
      <span>${escapeHtml(registration?.booking_reference ?? "—")}</span>
    </div>
    <div class="body">
      <div class="section">
        <h2>Status</h2>
        <div class="row">
          <span class="label">Registration</span>
          <span class="badge ${registration?.status?.toLowerCase?.() ?? "confirmed"}">${escapeHtml(registration?.status ?? "Confirmed")}</span>
        </div>
        <div class="row">
          <span class="label">Payment</span>
          <span class="badge ${registration?.payment_status?.toLowerCase?.() ?? "paid"}">${escapeHtml(registration?.payment_status ?? "Paid")}</span>
        </div>
      </div>

      <div class="section">
        <h2>Event</h2>
        <div class="row"><span class="label">Title</span><span class="value">${escapeHtml(event.title ?? "—")}</span></div>
        <div class="row"><span class="label">Date</span><span class="value">${escapeHtml(formatDate(event.starts_at))}</span></div>
        <div class="row"><span class="label">Venue</span><span class="value">${escapeHtml(event.venue ?? "—")}</span></div>
        <div class="row"><span class="label">Address</span><span class="value">${escapeHtml(event.address ?? "—")}</span></div>
        <div class="row"><span class="label">Ticket</span><span class="value">${escapeHtml(ticketTier.name ?? "—")}</span></div>
      </div>

      <div class="section">
        <h2>Attendee</h2>
        <div class="row"><span class="label">Name</span><span class="value">${escapeHtml(attendee.first_name ?? "")} ${escapeHtml(attendee.last_name ?? "")}</span></div>
        <div class="row"><span class="label">Email</span><span class="value">${escapeHtml(attendee.email ?? "—")}</span></div>
        <div class="row"><span class="label">Phone</span><span class="value">${escapeHtml(attendee.phone_number ?? "—")}</span></div>
      </div>

      <div class="section">
        <h2>Billing</h2>
        <div class="row"><span class="label">Quantity</span><span class="value">${billing.quantity ?? 0}</span></div>
        <div class="row"><span class="label">Unit Price</span><span class="value">${formatMoney(billing.unit_price)}</span></div>
        <div class="row"><span class="label">Service Fee</span><span class="value">${formatMoney(billing.service_fee)}</span></div>
        <div class="divider"></div>
        <div class="row total"><span class="label">Total</span><span class="value">${formatMoney(billing.total)}</span></div>
      </div>

      <div class="section">
        <h2>Timeline</h2>
        <div class="row"><span class="label">Created</span><span class="value">${escapeHtml(formatDate(timeline.created_at))}</span></div>
        <div class="row"><span class="label">Paid</span><span class="value">${escapeHtml(formatDate(timeline.paid_at))}</span></div>
        <div class="row"><span class="label">Confirmed</span><span class="value">${escapeHtml(formatDate(timeline.confirmed_at))}</span></div>
      </div>
    </div>
    <div class="footer">Thank you for your booking. Please keep this receipt for your records.</div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${registration?.booking_reference ?? "booking"}-receipt.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


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


export function isBusinessUser(user: any): boolean {
  return getUserDashboardType(user) === "boss_beginning";
}

/**
 * Resolve which role section a dashboard pathname belongs to.
 *
 * Returns null for shared routes (e.g. "/dashboard" root and
 * "/dashboard/subscription") that every logged-in user may visit.
 */
export function getDashboardTypeFromPathname(
  pathname: string | null | undefined,
): string | null {
  if (!pathname) return null;
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "dashboard" || segments.length < 2) return null;

  switch (segments[1]) {
    case "artist_business":
      return "artist_business";
    case "boss_beginning":
      return "boss_beginning";
    case "community_member":
      return "community_member";
    case "sponsor":
      return "sponsor";
    default:
      // Shared sections (subscription, etc.) — open to all logged-in users
      return null;
  }
}
