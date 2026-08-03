"use client";
import { getSingleArtistSpotlightDetails } from "@/Hooks/api/cms_api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiGlobe,
  FiCheckCircle,
  FiXCircle,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiClock,
  FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";

interface SocialMedia {
  instagram_handle: string | null;
  tiktok_handle: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  website_portfolio_url: string | null;
}

interface SpotlightCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

interface SpotlightMedia {
  headshot: string | null;
  artwork_photos: string[];
  behind_scenes_photo: string | null;
  intro_video: string | null;
}

interface SpotlightConsent {
  public_release: boolean;
  ownership_declaration: boolean;
  interview_permission: boolean;
}

interface SpotlightDuration {
  voting_starts_at: string | null;
  voting_ends_at: string | null;
}

interface SpotlightDetails {
  id: number;
  full_legal_name: string;
  artist_stage_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  city: string;
  state: string;
  social_media: SocialMedia;
  category: SpotlightCategory;
  category_name: string;
  category_other_description: string | null;
  short_bio: string;
  full_artist_story: string;
  why_spotlighted: string;
  community_message: string;
  current_goals: string;
  media: SpotlightMedia;
  consent: SpotlightConsent;
  talent_manager_contact: string | null;
  agent_contact: string | null;
  press_kit_url: string | null;
  previous_interviews: string | null;
  awards_recognition: string | null;
  preferred_pronouns: string | null;
  preferred_contact_method: string | null;
  interview_availability: string | null;
  status: "submitted" | "approved" | "rejected" | "pending";
  current_step: number;
  submitted_at: string | null;
  reviewer_notes: string | null;
  created_at: string;
  updated_at: string;
  duration: SpotlightDuration | null;
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
}

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const statusStyles: Record<string, string> = {
  submitted: "bg-blue-50 text-blue-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-500",
  pending: "bg-amber-50 text-amber-500",
};

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 capitalize rounded-full text-xs md:text-sm font-medium ${style}`}
    >
      {status}
    </span>
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
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
      <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm md:text-[15px] text-slate-500 mb-1">{label}</p>
      <p className="text-sm md:text-[15px] text-gray-700 leading-7">
        {value || <span className="text-slate-300">—</span>}
      </p>
    </div>
  );
}

function ConsentRow({ label, granted }: { label: string; granted: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {granted ? (
        <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : (
        <FiXCircle className="w-4 h-4 text-red-400 shrink-0" />
      )}
      <span className="text-sm md:text-base text-slate-700">{label}</span>
    </div>
  );
}

function DetailLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="size-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-sm md:text-base text-slate-500">
        Loading spotlight details...
      </p>
    </div>
  );
}

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = getSingleArtistSpotlightDetails(id);
  const spotlight: SpotlightDetails | undefined = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] bg-[#F5F6F8] p-5 md:p-6">
        <DetailLoader />
      </div>
    );
  }

  if (!spotlight) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <p className="text-sm md:text-base text-slate-500">
          Spotlight not found.
        </p>
      </div>
    );
  }

  const social = spotlight.social_media;
  const socialLinks = [
    {
      href: social.instagram_handle,
      label: social.instagram_handle,
      icon: FiInstagram,
    },
    {
      href: social.facebook_url,
      label: "Facebook",
      icon: FiFacebook,
    },
    {
      href: social.youtube_url,
      label: "YouTube",
      icon: FiYoutube,
    },
    {
      href: social.website_portfolio_url,
      label: "Portfolio",
      icon: FiGlobe,
    },
  ].filter(item => item.href);

  return (
    <div className="p-5 space-y-4">
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center font-medium gap-2 text-sm md:text-base text-slate-600 hover:text-slate-900 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
            {spotlight.media.headshot ? (
              <Image
                src={spotlight.media.headshot}
                alt={spotlight.artist_stage_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl font-semibold">
                {spotlight.artist_stage_name?.charAt(0) ?? "?"}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                {spotlight.artist_stage_name}
              </h1>
              <StatusBadge status={spotlight.status} />
            </div>
            <p className="text-sm md:text-base text-slate-500 mb-3">
              {spotlight.full_legal_name}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <FiMail className="w-3.5 h-3.5" /> {spotlight.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiPhone className="w-3.5 h-3.5" /> {spotlight.phone_number}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiMapPin className="w-3.5 h-3.5" />
                {spotlight.city}, {spotlight.state}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs md:text-sm">
              <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 font-medium">
                {spotlight.category_name}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <FiHeart className="w-3.5 h-3.5" /> {spotlight.likes_count}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <FiBookmark className="w-3.5 h-3.5" />{" "}
                {spotlight.bookmarks_count}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <FiShare2 className="w-3.5 h-3.5" /> {spotlight.shares_count}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Voting duration */}
      {spotlight.duration && (
        <SectionCard title="Voting Window">
          <div className="flex items-center gap-3 text-sm md:text-base text-slate-700">
            <FiClock className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              {formatDateTime(spotlight.duration.voting_starts_at)} —{" "}
              {formatDateTime(spotlight.duration.voting_ends_at)}
            </span>
          </div>
        </SectionCard>
      )}

      {/* Social links */}
      {socialLinks.length > 0 && (
        <SectionCard title="Social & Portfolio">
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href as string}
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 text-xs md:text-sm hover:bg-slate-100 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Bio & story */}
      <SectionCard title="Artist Story">
        <div className="space-y-4">
          <Field label="Short Bio" value={spotlight.short_bio} />
          <Field
            label="Full Artist Story"
            value={spotlight.full_artist_story}
          />
          <Field label="Why Spotlighted" value={spotlight.why_spotlighted} />
          <Field
            label="Message to the Community"
            value={spotlight.community_message}
          />
          <Field label="Current Goals" value={spotlight.current_goals} />
        </div>
      </SectionCard>

      {/* Media */}
      <SectionCard title="Media">
        <div className="space-y-5">
          {spotlight.media.artwork_photos?.length > 0 && (
            <div>
              <p className="text-xs md:text-sm text-slate-400 mb-2">
                Artwork Photos
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {spotlight.media.artwork_photos.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={src}
                      alt={`Artwork ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {spotlight.media.behind_scenes_photo && (
              <div>
                <p className="text-xs md:text-sm text-slate-400 mb-2">
                  Behind the Scenes
                </p>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={spotlight.media.behind_scenes_photo}
                    alt="Behind the scenes"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {spotlight.media.intro_video && (
              <div>
                <p className="text-xs md:text-sm text-slate-400 mb-2">
                  Intro Video
                </p>
                <video
                  src={spotlight.media.intro_video}
                  controls
                  className="w-full aspect-video rounded-xl bg-slate-900"
                />
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Consent */}
      <SectionCard title="Consent">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ConsentRow
            label="Public Release"
            granted={spotlight.consent.public_release}
          />
          <ConsentRow
            label="Ownership Declaration"
            granted={spotlight.consent.ownership_declaration}
          />
          <ConsentRow
            label="Interview Permission"
            granted={spotlight.consent.interview_permission}
          />
        </div>
      </SectionCard>

      {/* Management & press */}
      <SectionCard title="Management & Press">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Talent Manager Contact"
            value={spotlight.talent_manager_contact}
          />
          <Field label="Agent Contact" value={spotlight.agent_contact} />
          <Field
            label="Press Kit"
            value={
              spotlight.press_kit_url ? (
                <a
                  href={spotlight.press_kit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View press kit
                </a>
              ) : null
            }
          />
          <Field
            label="Previous Interviews"
            value={spotlight.previous_interviews}
          />
          <Field
            label="Awards & Recognition"
            value={spotlight.awards_recognition}
          />
        </div>
      </SectionCard>

      {/* Preferences */}
      <SectionCard title="Preferences">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field
            label="Preferred Pronouns"
            value={spotlight.preferred_pronouns}
          />
          <Field
            label="Preferred Contact Method"
            value={spotlight.preferred_contact_method}
          />
          <Field
            label="Interview Availability"
            value={spotlight.interview_availability}
          />
        </div>
      </SectionCard>

      {/* Submission meta */}
      <SectionCard title="Submission">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field
            label="Submitted At"
            value={formatDateTime(spotlight.submitted_at)}
          />
          <Field
            label="Last Updated"
            value={formatDateTime(spotlight.updated_at)}
          />
          {spotlight.reviewer_notes && (
            <div className="md:col-span-3">
              <Field label="Reviewer Notes" value={spotlight.reviewer_notes} />
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default Page;
