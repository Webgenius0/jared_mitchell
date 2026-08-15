"use client";

import React from "react";
import {
  Eye,
  Pencil,
  Loader2,
  X,
  Globe,
  MapPin,
  Calendar,
  Heart,
  Bookmark,
  Share2,
  Mail,
  Phone,
  Clock,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getBusinessSpotlights,
  getSingleBusinessSpotlightDetails,
} from "@/Hooks/api/cms_api";
import Modal from "@/Components/Common/Modal";
import ApplySpotlightModal from "@/Components/Common/ApplySpotlightModal";

interface ApiSpotlight {
  id: number;
  business_name: string;
  owner_founder_name: string | null;
  business_category: string;
  year_founded: number | null;
  business_website: string;
  city: string;
  state: string;
  business_story: string;
  products_services: string;
  email: string;
  phone_number: string;
  service_type: string;
  service_type_label: string | null;
  why_featured: string;
  growth_vision: string;
  status: string;
  current_step: number;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
}

interface SpotlightRow {
  id: number;
  businessName: string;
  ownerName: string;
  status: "Approved" | "Terminated" | "Pending";
  votes: number;
  date: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function mapStatus(apiStatus: string): "Approved" | "Terminated" | "Pending" {
  const s = apiStatus.toLowerCase();
  if (s === "approved" || s === "active") return "Approved";
  if (s === "terminated" || s === "rejected") return "Terminated";
  return "Pending";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function mapApiSpotlight(api: ApiSpotlight): SpotlightRow {
  return {
    id: api.id,
    businessName: api.business_name,
    ownerName: api.owner_founder_name || "—",
    status: mapStatus(api.status),
    votes: api.likes_count,
    date: formatDate(api.created_at),
  };
}

const statusStyles: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-600",
  Terminated: "bg-red-50 text-red-500",
  Pending: "bg-amber-50 text-amber-500",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${statusStyles[status] || "bg-slate-50 text-slate-500"}`}
    >
      {status}
    </span>
  );
}

const columns = ["Business", "Owner", "Status", "Votes", "Date", "Actions"];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const router = useRouter();
  const { data: apiData, isLoading } = getBusinessSpotlights();

  const spotlights: SpotlightRow[] =
    apiData?.data?.spotlights?.map(mapApiSpotlight) || [];

  const [viewingId, setViewingId] = React.useState<number | null>(null);
  const [applyTarget, setApplyTarget] = React.useState<{
    id: number;
    name: string;
  } | null>(null);
  const { data: viewData, isLoading: viewLoading } =
    getSingleBusinessSpotlightDetails(viewingId ?? 0);

  const spotlightDetail =
    viewData?.data?.spotlight ||
    viewData?.data?.business ||
    viewData?.data?.data ||
    viewData?.data;

  const handleView = (s: SpotlightRow) => setViewingId(s.id);
  const handleEdit = (s: SpotlightRow) => {
    router.push(
      `/dashboard/boss_beginning/leaderboards/create-spotlights?editId=${s.id}`,
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Spotlight history
          </h1>
          <Link href="/dashboard/boss_beginning/leaderboards/create-spotlights">
            <button
              type="button"
              className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <span className="ml-3 text-sm text-slate-500">
                Loading spotlights...
              </span>
            </div>
          ) : spotlights.length === 0 ? (
            <div className="text-center py-20 text-sm text-slate-400">
              No spotlights found.
            </div>
          ) : (
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {columns.map(col => (
                    <th
                      key={col}
                      className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {spotlights.map(s => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {s.businessName}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {s.ownerName}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {s.votes.toLocaleString()}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {s.date}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          type="button"
                          title="View"
                          onClick={() => handleView(s)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => handleEdit(s)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setApplyTarget({ id: s.id, name: s.businessName })
                          }
                          className="inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs md:text-sm font-medium px-3.5 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-blue-600 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Apply
                        </button>
                        {/* <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(s)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* View Spotlight Modal */}
      <Modal
        open={!!viewingId}
        onClose={() => setViewingId(null)}
        className="!max-w-4xl !p-0 !overflow-hidden"
      >
        {viewLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="ml-3 text-sm text-slate-500">
              Loading details...
            </span>
          </div>
        ) : spotlightDetail ? (
          <SpotlightDetailView
            data={spotlightDetail}
            onClose={() => setViewingId(null)}
          />
        ) : (
          <div className="text-center py-20 text-sm text-slate-400">
            No data available.
          </div>
        )}
      </Modal>

      {/* Apply Spotlight Modal */}
      <ApplySpotlightModal
        open={!!applyTarget}
        onClose={() => setApplyTarget(null)}
        spotlightId={applyTarget?.id ?? 0}
        spotlightName={applyTarget?.name ?? ""}
        type="business"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spotlight Detail View                                              */
/* ------------------------------------------------------------------ */

function SpotlightDetailView({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) {
  const images = data?.images || {};
  const social = data?.social_media || {};

  return (
    <div className="relative">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4 text-slate-600" />
      </button>

      {/* Hero header */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 overflow-hidden">
        {images.portrait_photo && (
          <img
            src={images.portrait_photo}
            alt={data.business_name}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-xl md:text-3xl font-bold text-white">
            {data.business_name}
          </h2>
          <p className="text-sm md:text-base text-white/80 mt-1">
            {data.owner_founder_name}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-8 space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto">
        {/* Images gallery */}
        {(images.portrait_photo ||
          images.storefront_workspace_photo ||
          images.team_photo ||
          images.product_service_photos?.length > 0) && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Images
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.portrait_photo && (
                <ImageCard src={images.portrait_photo} label="Portrait" />
              )}
              {images.storefront_workspace_photo && (
                <ImageCard
                  src={images.storefront_workspace_photo}
                  label="Storefront"
                />
              )}
              {images.team_photo && (
                <ImageCard src={images.team_photo} label="Team" />
              )}
              {images.product_service_photos?.map((url: string, i: number) => (
                <ImageCard
                  key={`prod-${i}`}
                  src={url}
                  label={`Product ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCard title="Business Information">
            <InfoRow
              icon={<MapPin className="w-3.5 h-3.5" />}
              label="Location"
              value={[data.city, data.state].filter(Boolean).join(", ") || "—"}
            />
            <InfoRow
              icon={<Calendar className="w-3.5 h-3.5" />}
              label="Year Founded"
              value={data.year_founded || "—"}
            />
            <InfoRow
              icon={<Globe className="w-3.5 h-3.5" />}
              label="Website"
              value={data.business_website || "—"}
              isLink
            />
            <InfoRow label="Category" value={data.business_category || "—"} />
            <InfoRow label="Service Type" value={data.service_type || "—"} />
          </SectionCard>

          <SectionCard title="Contact">
            <InfoRow
              icon={<Mail className="w-3.5 h-3.5" />}
              label="Email"
              value={data.email || "—"}
            />
            <InfoRow
              icon={<Phone className="w-3.5 h-3.5" />}
              label="Phone"
              value={data.phone_number || "—"}
            />
            <InfoRow
              icon={<Clock className="w-3.5 h-3.5" />}
              label="Best Contact Time"
              value={data.best_contact_time || "—"}
            />
          </SectionCard>
        </div>

        {/* Story */}
        {(data.business_story ||
          data.products_services ||
          data.challenges_overcome ||
          data.unique_factor ||
          data.target_customer) && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Business Story
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data.business_story && (
                <TextFieldCard
                  title="Business Story"
                  text={data.business_story}
                />
              )}
              {data.products_services && (
                <TextFieldCard
                  title="Products / Services"
                  text={data.products_services}
                />
              )}
              {data.challenges_overcome && (
                <TextFieldCard
                  title="Challenges Overcome"
                  text={data.challenges_overcome}
                />
              )}
              {data.unique_factor && (
                <TextFieldCard
                  title="What Makes Them Unique"
                  text={data.unique_factor}
                />
              )}
              {data.target_customer && (
                <TextFieldCard
                  title="Target Customer"
                  text={data.target_customer}
                />
              )}
            </div>
          </div>
        )}

        {/* Spotlight Consideration */}
        {(data.why_featured || data.growth_vision) && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Spotlight Consideration
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data.why_featured && (
                <TextFieldCard title="Why featured?" text={data.why_featured} />
              )}
              {data.growth_vision && (
                <TextFieldCard
                  title="Growth Vision"
                  text={data.growth_vision}
                />
              )}
            </div>
          </div>
        )}

        {/* Social Media */}
        {(social.instagram_url ||
          social.facebook_url ||
          social.tiktok_url ||
          social.youtube_url ||
          social.linkedin_url ||
          social.google_business_profile_url ||
          social.fanbase_url) && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Social Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {social.instagram_url && (
                <SocialLink label="Instagram" href={social.instagram_url} />
              )}
              {social.facebook_url && (
                <SocialLink label="Facebook" href={social.facebook_url} />
              )}
              {social.tiktok_url && (
                <SocialLink label="TikTok" href={social.tiktok_url} />
              )}
              {social.youtube_url && (
                <SocialLink label="YouTube" href={social.youtube_url} />
              )}
              {social.linkedin_url && (
                <SocialLink label="LinkedIn" href={social.linkedin_url} />
              )}
              {social.google_business_profile_url && (
                <SocialLink
                  label="Google Business"
                  href={social.google_business_profile_url}
                />
              )}
              {social.fanbase_url && (
                <SocialLink label="Fanbase" href={social.fanbase_url} />
              )}
            </div>
          </div>
        )}

        {/* Permissions */}
        {(data.permissions?.feature_on_osi ||
          data.permissions?.use_submitted_photos ||
          data.permissions?.share_business_story) && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Permissions
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.permissions.feature_on_osi && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Feature on OSI
                </span>
              )}
              {data.permissions.use_submitted_photos && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Use photos
                </span>
              )}
              {data.permissions.share_business_story && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Share story
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats & dates */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Heart className="w-3.5 h-3.5" />
            {data.likes_count ?? 0} likes
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Bookmark className="w-3.5 h-3.5" />
            {data.bookmarks_count ?? 0} bookmarks
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Share2 className="w-3.5 h-3.5" />
            {data.shares_count ?? 0} shares
          </span>
          {data.created_at && (
            <span className="text-xs text-slate-400 ml-auto">
              Created {formatDate(data.created_at)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ImageCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover"
        onError={e => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
        <span className="text-[10px] text-white font-medium">{label}</span>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 md:p-5 border border-slate-100">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {title}
      </h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  isLink,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon && <span className="mt-0.5 text-slate-400 shrink-0">{icon}</span>}
      <div className="min-w-0">
        <span className="text-xs text-slate-400 block">{label}</span>
        {isLink && value !== "—" ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-slate-800 break-all">{value}</span>
        )}
      </div>
    </div>
  );
}

function TextFieldCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 md:p-5 border border-slate-100">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {title}
      </h4>
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
    >
      <Globe className="w-3.5 h-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </a>
  );
}
