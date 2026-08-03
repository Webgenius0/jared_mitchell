import React from "react";
import SpotlightDetails from "../../Components/SpotlightDetails";
import ArtistStory from "../../Components/ArtistStory";
import MediaUpload from "../../Components/MediaUpload";
import Consent from "../../Components/Consent";
import OptionalInformation from "../../Components/OptionalInformation";
import NewsLetter from "@/Components/Common/NewsLetter";
import {
  getCMSAboutData,
  getContestantDetails,
} from "@/lib/Services/cms_service";
import Sponsors from "../../../_components/Sponsors";

/* ------------------------------------------------------------------ */
/*  Contestant → Spotlight data mapper                                 */
/* ------------------------------------------------------------------ */

function mapContestantToSpotlight(contestant: any, type: "artist" | "business") {
  if (!contestant) return null;

  // Helper to parse JSON strings like website_social_media
  const parseJsonField = (raw: string | null | undefined): any => {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  };

  const parsedWebsite = parseJsonField(contestant.website_social_media);
  const websiteUrl =
    typeof parsedWebsite === "object"
      ? parsedWebsite?.website || parsedWebsite?.social || ""
      : parsedWebsite || "";

  return {
    // Identification — flat fields from contestant
    id: contestant.id,
    business_name: contestant.business_name,
    owner_founder_name: contestant.owner_founder_name,
    owner_name: contestant.owner_founder_name,
    display_name: contestant.display_name,
    short_description: contestant.story,
    business_story: contestant.story,
    full_story: contestant.story,
    products_services: contestant.community_impact_statement,
    growth_vision: contestant.why_they_deserve_to_compete,
    why_featured: contestant.why_they_deserve_to_compete,
    challenges_overcome: null,
    unique_factor: null,
    target_customer: null,
    year_founded: null,
    service_type: null,
    best_contact_time: null,

    // Media — transform contestant.media structure
    media: {
      headshot: contestant.media?.primary_image || contestant.avatar_url,
      portrait_photo: contestant.media?.primary_image || contestant.avatar_url,
      artwork_photos: contestant.media?.images || [],
      product_service_photos: contestant.media?.images || [],
      storefront_workspace_photo: null,
      behind_scenes_photo: null,
      team_photo: null,
      images: contestant.media?.images || [],
      primary_image: contestant.media?.primary_image || contestant.avatar_url,
    },

    // Category — not available from contestant API
    category: null,

    // Contact — from owner and flat fields
    email: contestant.owner?.email || null,
    phone_number: null,
    city: null,
    state: null,
    website_url: websiteUrl,
    website_portfolio_url: websiteUrl,
    business_website: websiteUrl,
    facebook_url: null,
    instagram_handle: null,
    instagram_url: null,
    tiktok_url: null,
    youtube_url: null,
    google_business_profile_url: null,
    linkedin_url: null,
    fanbase_url: null,

    // Interactions — direct match
    interactions: contestant.interactions || {
      likes_count: 0,
      bookmarks_count: 0,
      shares_count: 0,
    },

    // Voting — map from voting object
    voting_summary: {
      total_weeks_nominated: contestant.current_round?.round_number || 0,
      total_wins: contestant.status === "winner" ? 1 : 0,
      total_votes_received: contestant.voting?.total_votes || 0,
    },
    voting_history: contestant.voting_history || [],

    // Permissions — not available in contestant API
    permission_feature_on_osi: null,
    permission_use_submitted_photos: null,
    permission_share_business_story: null,

    // Consent — not available
    consent_public_release: null,
    consent_ownership_declaration: null,
    consent_interview_permission: null,

    // Optional info — mostly not available
    press_kit_url: null,
    previous_interviews: null,
    awards_recognition: null,
    preferred_pronouns: null,
    preferred_contact_method: null,
    interview_availability: null,
    talent_manager_contact: null,
    agent_contact: null,

    // Voting rules context
    total_score: contestant.total_score,
    business_status: contestant.business_status,
    season_title: contestant.current_round?.title,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const contestantId = parseInt(id, 10);
  const cmsData = await getCMSAboutData();

  // Fetch contestant details
  let contestant: any = null;
  let spotlight: any = null;
  let spotlightType: "artist" | "business" = "business";

  try {
    const res = await getContestantDetails(contestantId);
    contestant = res?.data?.contestant || res?.data || null;

    // Boss Beginnings contest is business-only
    spotlightType = "business";

    // Map contestant data to the shape components expect
    if (contestant) {
      spotlight = mapContestantToSpotlight(contestant, spotlightType);
    }
  } catch (e) {
    console.error("Failed to fetch contestant details", e);
  }

  return (
    <>
      <SpotlightDetails
        spotlight={spotlight}
        type={spotlightType}
        isLoading={false}
        nomineeId={
          contestant?.voting_history?.[0]?.nominee_id ?? contestant?.id
        }
      />
      {spotlight && (
        <>
          <ArtistStory spotlight={spotlight} type={spotlightType} />
          <MediaUpload spotlight={spotlight} />
          <Consent spotlight={spotlight} type={spotlightType} />
          <OptionalInformation spotlight={spotlight} type={spotlightType} />
        </>
      )}
      <Sponsors data={cmsData?.about_sponsors} showButton={false} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
