// ─── Shared Business types & mappers (boss-beginning dashboard) ─────────────
// Extracted from src/app/dashboard/boss_beginning/business/page.tsx so that
// any dashboard page (business list, listed-business, etc.) can render the
// same real API data with identical formatting.

export interface MediaItem {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
  file_size: number;
}

export interface ApiBusiness {
  id: number;
  user_id: number;
  business_name: string;
  slug: string;
  owner_founder_name: string | null;
  story: string | null;
  mission: string | null;
  website_social_media: string | null;
  community_impact_statement: string | null;
  revenue_stage: string | null;
  why_they_deserve_to_compete: string | null;
  media: MediaItem[];
  status: string;
  total_claps: number;
  total_saves: number;
  total_shares: number;
  total_points: number;
  is_clapped: boolean;
  is_saved: boolean;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  businessName: string;
  ownerName: string;
  story: string;
  mission?: string;
  websiteLink: string;
  communityImpact?: string;
  revenueStage?: string;
  whyCompete?: string;
  videoThumbnail?: string;
  gallery?: string[];
  date: string;
  status: string;
}

export function formatStatus(status: string): string {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function extractWebsite(raw: string | null): string {
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    return parsed?.website || parsed?.social || raw;
  } catch {
    return raw;
  }
}

export function mapApiBusiness(api: ApiBusiness): Business {
  return {
    id: String(api.id),
    businessName: api.business_name || "",
    ownerName: api.owner_founder_name || "",
    story: api.story || "",
    mission: api.mission || undefined,
    websiteLink: extractWebsite(api.website_social_media),
    communityImpact: api.community_impact_statement || undefined,
    revenueStage: api.revenue_stage || undefined,
    whyCompete: api.why_they_deserve_to_compete || undefined,
    videoThumbnail: api.media?.[0]?.url || undefined,
    gallery: api.media?.map(m => m.url) || undefined,
    date: api.created_at
      ? new Date(api.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "",
    status: formatStatus(api.status),
  };
}

export const businessStatusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Approved: "bg-emerald-50 text-emerald-600",
  Terminated: "bg-red-50 text-red-500",
  Pending: "bg-amber-50 text-amber-500",
  Inactive: "bg-slate-50 text-slate-500",
};
