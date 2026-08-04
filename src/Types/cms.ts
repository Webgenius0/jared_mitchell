export interface CMSBase {
  section: string;
  title: string;
  sub_title: string | null;
  description: string | null;
  image: string | null;
  bg: string | null;
  video: string | null;
}

export interface CMSHero extends CMSBase {}

export interface CMSPartner extends CMSBase {
  metadata: {
    image: string;
    link: string;
  }[];
}

export interface CMSFeature extends CMSBase {}

export interface CMSWhyChoose extends CMSBase {
  metadata: {
    image: string;
    title: string;
    sub_title: string;
    description: string;
  }[];
}

export interface CMSCoreValue extends CMSBase {
  metadata: {
    image: string;
    title: string;
    sub_title: string;
    description: string;
  }[];
}

export interface CMSWhatYouGet extends CMSBase {
  metadata: {
    image: string;
    title: string;
  }[];
}

export interface CMSBossBeginnings extends CMSBase {}

export interface CMSSpotlight extends CMSBase {}

export interface CMSHighlight extends CMSBase {}

export interface CMSEvent extends CMSBase {}

export interface CMSShop extends CMSBase {}

export interface CMSCTA extends CMSBase {}

export interface CMSNewsletter extends CMSBase {}

export interface CMSHomepage {
  hero: CMSHero;
  partners: CMSPartner;
  features: CMSFeature;
  why_choose: CMSWhyChoose;
  core_values: CMSCoreValue;
  what_you_get: CMSWhatYouGet;
  boss_beginnings: CMSBossBeginnings;
  spotlight: CMSSpotlight;
  highlights: CMSHighlight;
  events: CMSEvent;
  shop: CMSShop;
  cta: CMSCTA;
  newsletter: CMSNewsletter;
  static_banner: CMSFeature;
  celebrating_business_spotlight_winners: CMSBase;
  celebrating_artist_spotlight_winners: CMSBase;
  boss_beginning_winners: CMSBase;
  next_boss_beginnings_westside_beauty_lounge: CMSBase;
  past_event_highlights: CMSBase;
  upcoming_events: CMSBase;
  past_6_month_boss_beginnings_highlight: CMSBase;
  event_sponsors: CMSPartner;
  become_a_part_of_our_community: CMSBase;
}

export interface CMSAboutHero extends CMSBase {}
export interface CMSAboutSociety extends CMSBase {}
export interface CMSAboutOrigin extends CMSBase {}
export interface CMSAboutMission extends CMSBase {
  metadata: {
    image: string;
    title: string;
    description: string;
  }[];
}
export interface CMSAboutWhatWeDo extends CMSBase {
  metadata: {
    title: string;
    description: string;
    icon: string;
    image: string;
  }[];
}
export interface CMSAboutHowItWorks extends CMSBase {
  metadata: {
    title: string;
    description: string;
    icon: string;
    image: string;
  }[];
}
export interface CMSAboutWhoWeServe extends CMSBase {}
export interface CMSAboutWhyExists extends CMSBase {}
export interface CMSAboutOurImpact extends CMSBase {
  metadata: string[];
}
export interface CMSAboutFounderMessage extends CMSBase {
  metadata: {
    name: string;
    designation: string;
    message: string;
    sub_label: string;
    image: string;
  }[];
}
export interface CMSAboutJoin extends CMSBase {}
export interface CMSAboutNewsletter extends CMSBase {}
export interface CMSAboutSponsors extends CMSBase {
  metadata: {
    image: string;
    link: string;
  }[];
}

export interface CMSAbout {
  about_hero: CMSAboutHero;
  about_society: CMSAboutSociety;
  about_origin: CMSAboutOrigin;
  about_mission: CMSAboutMission;
  about_what_we_do: CMSAboutWhatWeDo;
  about_how_it_works: CMSAboutHowItWorks;
  about_who_we_serve: CMSAboutWhoWeServe;
  about_why_exists: CMSAboutWhyExists;
  about_our_impact: CMSAboutOurImpact;
  about_founder_message: CMSAboutFounderMessage;
  about_join: CMSAboutJoin;
  about_newsletter: CMSAboutNewsletter;
  about_sponsors: CMSAboutSponsors;
  partners: CMSPartner;
}

export interface CMSServicesHero extends CMSBase {}
export interface CMSServicesOverview extends CMSBase {}
export interface CMSServicesGrow extends CMSBase {}
export interface CMSServicesPartners extends CMSBase {
  metadata: {
    image: string;
    link: string;
  }[];
}
export interface CMSServicesWhoFor extends CMSBase {
  metadata: {
    title: string;
    icon: string;
    image: string;
  }[];
}
export interface CMSServicesArtistSpotlight extends CMSBase {}
export interface CMSServicesBusinessSpotlight extends CMSBase {}
export interface CMSServicesNewsletter extends CMSBase {}
export interface CMSServicesRiskFree extends CMSBase {
  metadata: string[];
}

export interface CMSServices {
  services_hero: CMSServicesHero;
  services_overview: CMSServicesOverview;
  services_grow: CMSServicesGrow;
  services_partners: CMSServicesPartners;
  services_who_for: CMSServicesWhoFor;
  services_artist_spotlight: CMSServicesArtistSpotlight;
  services_business_spotlight: CMSServicesBusinessSpotlight;
  services_newsletter: CMSServicesNewsletter;
  services_risk_free: CMSServicesRiskFree;
  partners: CMSPartner;
}

export interface CMSArtistSpotlightHero extends CMSBase {}
export interface CMSArtistSpotlightVideo extends CMSBase {}
export interface CMSArtistSpotlightList extends CMSBase {}
export interface CMSArtistSpotlightHighlights extends CMSBase {}
export interface CMSArtistSpotlightLadder extends CMSBase {}
export interface CMSArtistSpotlightJoin extends CMSBase {}
export interface CMSArtistSpotlightInterview extends CMSBase {
  metadata: {
    card_title: string;
  };
}
export interface CMSArtistSpotlightWhyExists extends CMSBase {}

export interface CMSArtistSpotlight {
  artist_spotlight_hero: CMSArtistSpotlightHero;
  artist_spotlight_video: CMSArtistSpotlightVideo;
  artist_spotlight_list: CMSArtistSpotlightList;
  artist_spotlight_highlights: CMSArtistSpotlightHighlights;
  artist_spotlight_ladder: CMSArtistSpotlightLadder;
  artist_spotlight_join: CMSArtistSpotlightJoin;
  artist_spotlight_interview: CMSArtistSpotlightInterview;
  artist_spotlight_why_exists: CMSArtistSpotlightWhyExists;
}

export interface CMSBusinessSpotlightHero extends CMSBase {}
export interface CMSBusinessSpotlightVideo extends CMSBase {}
export interface CMSBusinessSpotlightList extends CMSBase {}
export interface CMSBusinessSpotlightHighlights extends CMSBase {}
export interface CMSBusinessSpotlightPicks extends CMSBase {}
export interface CMSBusinessSpotlightLadder extends CMSBase {}
export interface CMSBusinessSpotlightJoin extends CMSBase {}
export interface CMSBusinessSpotlightInterview extends CMSBase {
  metadata: {
    card_title: string;
  };
}
export interface CMSBusinessSpotlightWhyExists extends CMSBase {}

export interface CMSBusinessSpotlight {
  business_spotlight_hero: CMSBusinessSpotlightHero;
  business_spotlight_video: CMSBusinessSpotlightVideo;
  business_spotlight_list: CMSBusinessSpotlightList;
  business_spotlight_highlights: CMSBusinessSpotlightHighlights;
  business_spotlight_picks: CMSBusinessSpotlightPicks;
  business_spotlight_ladder: CMSBusinessSpotlightLadder;
  business_spotlight_join: CMSBusinessSpotlightJoin;
  business_spotlight_interview: CMSBusinessSpotlightInterview;
  business_spotlight_why_exists: CMSBusinessSpotlightWhyExists;
}

export interface CMSSpotlightLadderHero extends CMSBase {}

export interface CMSSpotlightLadderTimelineItem {
  heading: string;
  description: string;
}

export interface CMSSpotlightLadderDetails extends CMSBase {
  metadata: CMSSpotlightLadderTimelineItem[];
}

export interface CMSSpotlightLadderPartnersItem {
  section: string;
  title: string;
  sub_title: string | null;
  description: string | null;
  metadata: {
    image: string;
    link: string;
  }[];
}

export interface CMSSpotlightLadderPartners {
  section: string;
  items: CMSSpotlightLadderPartnersItem[];
}

export interface CMSSpotlightLadder {
  spotlight_ladder_details: CMSSpotlightLadderDetails;
  spotlight_ladder_hero: CMSSpotlightLadderHero;
  partners: CMSSpotlightLadderPartners;
  newsletter: CMSBase;
}

export interface CMSFAQ {
  id: number;
  question: string;
  answer: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// ─── Events Page ─────────────────────────────────────────────────────────────

export interface CMSEventsPageHero extends CMSBase {}

export interface CMSEventsPageVideo extends CMSBase {
  // description holds the video URL for this section
  description: string | null;
}

export interface CMSEventsPageHost extends CMSBase {
  metadata: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface CMSEventsPageVendorMetadata {
  pricing: {
    icon: string;
    title: string;
    price: string;
    description: string;
  }[];
  benefits: {
    title: string;
  };
  member_perks_top: {
    title: string;
    condition: string;
  };
  member_perks_bottom: {
    title: string;
    description: string;
  };
  what_vendors_provide: {
    title: string;
  };
  why_vendors_love: {
    title: string;
    description: string;
  };
}

export interface CMSEventsPageVendor extends CMSBase {
  metadata: CMSEventsPageVendorMetadata;
}

export interface CMSEventsPageBoothFeatures extends CMSBase {
  metadata: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface CMSEventsPage {
  events_page_hero: CMSEventsPageHero;
  events_page_video: CMSEventsPageVideo;
  events_page_host: CMSEventsPageHost;
  events_page_vendor: CMSEventsPageVendor;
  events_page_booth_features: CMSEventsPageBoothFeatures;
}

// ─── Shop Page ───────────────────────────────────────────────────────────────

export interface CMSShopPageHero extends CMSBase {
  // bg holds the hero background image URL for this section
  bg: string | null;
}

export interface CMSShopPageFooterFeatures extends CMSBase {
  metadata: {
    title: string;
    description: string;
  }[];
}

export interface CMSShopPageSupport extends CMSBase {
  metadata: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface CMSShopPageFeatures extends CMSBase {
  metadata: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface CMSShopPage {
  shop_page_hero: CMSShopPageHero;
  shop_page_footer_features: CMSShopPageFooterFeatures;
  shop_page_support: CMSShopPageSupport;
  shop_page_features: CMSShopPageFeatures;
}

// Add these interfaces to your @/Types/cms.ts file

export interface CMSBossBeginningsHero extends CMSBase {}

export interface CMSBossBeginningsVideoGallery extends CMSBase {
  metadata: {
    gallery: string[];
  } | null;
}

export interface CMSBossBeginningsFeatures extends CMSBase {
  metadata: {
    features: {
      title: string;
      description: string;
      image: string;
    }[];
  };
}

export interface CMSBossBeginningsSteps extends CMSBase {
  metadata: {
    steps: {
      small_text: string;
      title: string;
      description: string;
      image: string;
    }[];
  };
}

export interface CMSBossBeginningsSection5 extends CMSBase {}

export interface CMSBossBeginningsDynamic extends CMSBase {
  metadata: {
    items: {
      title: string;
      description: string;
      image: string;
    }[];
  };
}

export interface CMSBossBeginnings {
  boss_beginnings_hero: CMSBossBeginningsHero;
  boss_beginnings_video_gallery: CMSBossBeginningsVideoGallery;
  boss_beginnings_features: CMSBossBeginningsFeatures;
  boss_beginnings_steps: CMSBossBeginningsSteps;
  boss_beginnings_section5: CMSBossBeginningsSection5;
  boss_beginnings_dynamic: CMSBossBeginningsDynamic;
}

// ─── Rounds Page (Boss Beginnings OSI Panel) ─────────────────────────────────

export interface CMSRoundsBlock {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image: string | null;
}

export interface CMSRoundsRound {
  round_text: string;
  round_title: string;
  subtitle: string;
  icon: string | null;
  goal_label: string;
  goal_text: string;
  requirements_label: string;
  requirements: string[];
}

export interface CMSRoundsBottom {
  title: string;
  subtitle: string;
  description: string;
}

export interface CMSRoundsMetadata {
  block: CMSRoundsBlock;
  rounds: CMSRoundsRound[];
  bottom: CMSRoundsBottom;
}

export interface CMSRoundsSection extends CMSBase {
  metadata: CMSRoundsMetadata;
}

export interface CMSRoundsPartnersItem extends CMSBase {
  metadata: {
    image: string;
    link: string;
  }[];
}

export interface CMSRoundsPartners {
  section: string;
  items: CMSRoundsPartnersItem[];
}

export interface CMSRoundsPage {
  rounds: CMSRoundsSection;
  partners: CMSRoundsPartners;
  newsletter: CMSBase;
}

export interface CMSSponsorshipPageHero extends CMSBase {}

export interface CMSSponsorshipPageVideo extends CMSBase {
  // sub_title holds the video URL for this section
  // image holds the thumbnail
}

export interface CMSSponsorshipPageWhy extends CMSBase {
  metadata: {
    supports: string[];
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export interface CMSSponsorshipPageSteps extends CMSBase {
  metadata: {
    title: string;
    description: string;
    list: string[];
  }[];
}

export interface CMSSponsorshipPageLevelsHeader extends CMSBase {}

export interface CMSSponsorshipPageFooter extends CMSBase {}

export interface CMSSponsorshipPage {
  sponsorship_page_hero: CMSSponsorshipPageHero;
  sponsorship_page_video: CMSSponsorshipPageVideo;
  sponsorship_page_why: CMSSponsorshipPageWhy;
  sponsorship_page_steps: CMSSponsorshipPageSteps;
  sponsorship_page_levels_header: CMSSponsorshipPageLevelsHeader;
  sponsorship_page_footer: CMSSponsorshipPageFooter;
}


export interface EventTicketTier {
  id: number;
  event_id: number;
  name: string;
  description: string;
  price: string;
  service_fee: string;
  quantity_available: number;
  quantity_sold: number;
  sale_starts_at: string | null;
  sale_ends_at: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CMSEventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  venue_name: string;
  address: string;
  city: string;
  state: string;
  hosted_by: string;
  cover_image_url: string;
  promo_video_url: string | null;
  event_type: "featured" | "pop_up" | "workshop" | "networking" | string;
  is_featured: boolean;
  like_count: number;
  ticket_url: string;
  tickets_available: boolean;
  status: string;
  ticket_tiers: EventTicketTier[];
  event_artists?: {
    id: number;
    name: string;
    photo: string;
    designation: string;
  }[];
  event_media?: {
    id: number;
    event_id: number;
    full_url: string;
    created_at: string;
  }[];
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  created_at: string;
}

export interface EventsPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface EventsResponse {
  events: CMSEventItem[];
  pagination: EventsPagination;
}

// ─── Featured Events ─────────────────────────────────────────────────────────

// The /events/featured endpoint returns cover_image_url and promo_video_url
export interface FeaturedEventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  venue_name: string;
  address: string;
  city: string;
  state: string;
  hosted_by: string;
  cover_image_url: string;
  promo_video_url: string | null;
  event_type: "featured" | "pop_up" | "workshop" | "networking" | string;
  is_spotlight_eligible: boolean;
  is_featured: boolean;
  like_count: number;
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  ticket_url: string;
  tickets_available: boolean;
  status: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FeaturedEventsResponse {
  events: FeaturedEventItem[];
}

// ─── Calendar Events ─────────────────────────────────────────────────────────

// The /events/calendar-views endpoint returns events with start_date/end_date
export interface CalendarEventItem {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export interface CalendarEventsResponse {
  events: CalendarEventItem[];
  pagination: EventsPagination;
}

// ─── Event Registrations (dashboard booking history) ────────────────────────

export interface EventRegistration {
  id: number;
  booking_reference: string;
  status: string;
  payment_status: string;
  event: {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    starts_at: string;
    address: string;
    venue: string;
  };
  ticket_tier: {
    name: string;
  };
  attendee: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  billing: {
    quantity: number;
    unit_price: number;
    service_fee: number;
    total: number;
    currency: string;
  };
  timeline: {
    created_at: string;
    paid_at: string | null;
    confirmed_at: string | null;
    cancelled_at: string | null;
  };
}

// ─── Event Gallery ───────────────────────────────────────────────────────────

export interface EventGalleryItem {
  id: number;
  event_id: number;
  media_type: "image" | "video";
  mime_type: string;
  file_name: string;
  file_size: number;
  full_url: string;
  created_at: string;
}

export interface EventGalleryResponse {
  gallery: EventGalleryItem[];
  pagination: EventsPagination;
}

// ─── Featured Products ────────────────────────────────────────────────────────

export interface FeaturedProductImage {
  id: number;
  image: string;
}

export interface FeaturedProductCategory {
  id: number;
  name: string;
}

export interface FeaturedProductStock {
  tracked: boolean;
  quantity: number;
  in_stock: boolean;
}

export interface FeaturedProductVendor {
  name: string;
  email: string;
  phone: string;
}

export interface FeaturedProductVendorDetail extends FeaturedProductVendor {
  address: string;
  details: string;
}

export interface FeaturedProductDetail {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string | null;
  price: number;
  sale_price: number;
  display_price: number;
  discount_percentage: number;
  type: string;
  brand: string;
  is_featured: boolean;
  thumbnail: string;
  images: {
    id: number;
    image: string;
    sort_order: number;
  }[];
  category: FeaturedProductCategory;
  stock: FeaturedProductStock;
  vendor: FeaturedProductVendorDetail;
  created_at: string;
  updated_at: string;
}

// ─── Round Countdown ────────────────────────────────────────────────────────

export interface RoundCountdownSeason {
  id: number;
  title: string;
  starts_at: string;
  current_time: string;
}

export interface RoundCountdownData {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  formatted: string;
  short_formatted: string;
  total_seconds: number;
}

export interface RoundCountdownResponse {
  season: RoundCountdownSeason;
  countdown: RoundCountdownData;
}

// ─── Historical Winners ───────────────────────────────────────────────────────

export interface HistoricalWinnersItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
}

export interface HistoricalWinnersResponse {
  winners: HistoricalWinnersItem[];
}

export interface FeaturedProductItem {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: number;
  sale_price: number;
  display_price: number;
  discount_percentage: number;
  type: string;
  brand: string;
  is_featured: boolean;
  thumbnail: string;
  images: FeaturedProductImage[];
  category: FeaturedProductCategory;
  stock: FeaturedProductStock;
  vendor: FeaturedProductVendor;
  created_at: string;
  updated_at: string;
}

// ─── Past 6 Months Boss Beginnings Winners ──────────────────────────────────

export interface ContestWinnerSeason {
  id: number;
  title: string;
  slug: string;
  contest_type: string;
  status: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
}

export interface ContestableBusinessOrArtist {
  id: number;
  type: string;
  business_name: string;
  owner_founder_name: string;
  slug: string;
  story: string | null;
  mission: string | null;
  website_social_media: string | null;
  community_impact_statement: string | null;
  revenue_stage: string | null;
  why_they_deserve_to_compete: string | null;
  status: string;
  total_claps: number;
  total_saves: number;
  total_shares: number;
  total_points: number;
  media: any[];
}

export interface PastSixMonthsWinner {
  id: number;
  display_name: string;
  slug: string;
  avatar_url: string;
  status: string;
  total_score: number;
  entered_at: string;
  created_at: string;
  contestable: ContestableBusinessOrArtist;
  season: ContestWinnerSeason;
}

export interface PastSixMonthsWinnersResponse {
  winners: PastSixMonthsWinner[];
}

// ─── Artist & Business Detail (from /v1/artists & /v1/businesses/list) ────

export interface ArtistCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ArtistDetail {
  id: number;
  name: string;
  username: string;
  biography: string;
  tagline: string;
  avatar: string;
  category: ArtistCategory;
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  created_at: string;
}

export interface ArtistListPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface ArtistsListResponse {
  success: boolean;
  message: string;
  data: {
    artists: ArtistDetail[];
    pagination: ArtistListPagination;
  };
  errors: null | any;
  code: number;
}

export interface ArtistDetailResponse {
  success: boolean;
  message: string;
  data: {
    artist: ArtistDetail;
  };
}

export interface BusinessCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BusinessDetail {
  id: number;
  name: string;
  owner_name: string;
  description: string;
  tagline: string;
  logo: string;
  category: BusinessCategory;
  city: string;
  state: string;
  website: string;
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  created_at: string;
}

export interface BusinessDetailResponse {
  success: boolean;
  message: string;
  data: {
    business: BusinessDetail;
  };
}

// ─── Spotlight Historical Winners (shared shape for artist & business) ──────

export interface SpotlightHistoricalWinnerMedia {
  headshot: string;
  artwork_photos: string[];
  behind_scenes_photo: string;
}

export interface SpotlightHistoricalWinnerSpotlight {
  id: number;
  type: string;
  name: string;
  city: string;
  state: string;
  media: SpotlightHistoricalWinnerMedia;
}

export interface SpotlightHistoricalWinnerOwner {
  id: number;
  name: string;
}

export interface SpotlightHistoricalWinnerItem {
  id: number;
  week_number: number;
  year: number;
  spotlight: SpotlightHistoricalWinnerSpotlight;
  owner: SpotlightHistoricalWinnerOwner;
  total_votes: number;
  free_votes: number;
  paid_votes: number;
  announced_at: string;
}

export interface SpotlightHistoricalWinnersResponse {
  type: string;
  total: number;
  winners: SpotlightHistoricalWinnerItem[];
  pagination: {
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
    has_more: boolean;
  };
}

// Re-export as aliases for backward compatibility
// (these share the same shape — just the `type` field value differs)
export type ArtistHistoricalWinnerMedia = SpotlightHistoricalWinnerMedia;
export type ArtistHistoricalWinnerSpotlight = SpotlightHistoricalWinnerSpotlight;
export type ArtistHistoricalWinnerOwner = SpotlightHistoricalWinnerOwner;
export type ArtistHistoricalWinnerItem = SpotlightHistoricalWinnerItem;
export type ArtistHistoricalWinnersResponse = SpotlightHistoricalWinnersResponse;
export type BusinessHistoricalWinnersResponse = SpotlightHistoricalWinnersResponse;

export interface CurrentContestWinnerResponse {
  winner: PastSixMonthsWinner | null;
}

// ─── Subscription Plans (Pricing Page) ───────────────────────────────────────

export interface SubscriptionFeatureItem {
  id: number;
  feature_group_id: number;
  feature_text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionFeatureGroup {
  id: number;
  price_plan_id: number;
  title: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  items: SubscriptionFeatureItem[];
}

export interface SubscriptionPlan {
  id: number;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  plan_name: string;
  badge_text: string | null;
  price: string;
  price_suffix: string;
  best_for: string;
  outcome_text: string;
  button_label: string;
  button_url: string;
  is_featured: number;
  is_visible: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  feature_groups: SubscriptionFeatureGroup[];
}

export interface SubscriptionPlansResponse {
  status: string;
  data: SubscriptionPlan[];
}

// ─── Spotlight Details (Artist & Business) ─────────────────────────────────────

export interface SpotlightDetailsCategory {
  id: number;
  name: string;
}

export interface SpotlightDetailsMedia {
  headshot: string | null;
  artwork_photos: string[];
  behind_scenes_photo: string | null;
}

export interface SpotlightDetailsOwner {
  id: number;
  name: string;
  email?: string;
}

export interface SpotlightDetailsInteractions {
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
}

export interface SpotlightDetailsVotingSummary {
  total_weeks_nominated: number;
  total_wins: number;
  total_votes_received: number;
}

export interface SpotlightDetailsWeek {
  id: number;
  week_number: number;
  year: number;
  status: string;
  voting_starts_at?: string;
  voting_ends_at?: string;
}

export interface SpotlightDetailsVotingHistoryEntry {
  nominee_id: number;
  week: SpotlightDetailsWeek;
  rank: number | null;
  is_winner: boolean;
  votes: {
    free: number;
    paid: number;
    total: number;
  };
}

export interface SpotlightDetailsApplicationWeek {
  id: number;
  week_number: number;
  year: number;
  status: string;
}

export interface SpotlightDetailsApplicationHistoryEntry {
  id: number;
  week: SpotlightDetailsApplicationWeek;
  status: string;
  applied_at: string;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  reviewer: { id: number; name: string } | null;
}

export interface SpotlightDetailsReviewer {
  id: number;
  name: string;
}

export interface ArtistSpotlightDetail {
  id: number;
  full_legal_name: string;
  artist_stage_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  city: string;
  state: string;
  instagram_handle: string;
  tiktok_handle: string;
  facebook_url: string;
  youtube_url: string;
  website_portfolio_url: string;
  category: SpotlightDetailsCategory;
  category_other_description: string | null;
  short_bio: string;
  full_artist_story: string;
  why_spotlighted: string;
  community_message: string;
  current_goals: string;
  media: SpotlightDetailsMedia;
  talent_manager_contact: string;
  agent_contact: string;
  press_kit_url: string;
  previous_interviews: string;
  awards_recognition: string;
  preferred_pronouns: string;
  preferred_contact_method: string;
  interview_availability: string;
  consent_public_release: boolean;
  consent_ownership_declaration: boolean;
  consent_interview_permission: boolean;
  status: string;
  current_step: number;
  submitted_at: string;
  reviewer_notes: string | null;
  reviewed_by: SpotlightDetailsReviewer | null;
  owner: SpotlightDetailsOwner;
  interactions: SpotlightDetailsInteractions;
  voting_summary: SpotlightDetailsVotingSummary;
  voting_history: SpotlightDetailsVotingHistoryEntry[];
  application_history: SpotlightDetailsApplicationHistoryEntry[];
  created_at: string;
  updated_at: string;
}

export interface BusinessSpotlightDetail {
  id: number;
  business_name: string;
  owner_name: string;
  email: string;
  phone_number: string;
  city: string;
  state: string;
  instagram_handle: string;
  facebook_url: string;
  website_url: string;
  category: SpotlightDetailsCategory;
  category_other_description: string | null;
  short_description: string;
  full_story: string;
  why_spotlighted: string;
  community_message: string;
  current_goals: string;
  media: SpotlightDetailsMedia;
  press_kit_url: string;
  awards_recognition: string;
  consent_public_release: boolean;
  status: string;
  current_step: number;
  submitted_at: string;
  reviewer_notes: string | null;
  reviewed_by: SpotlightDetailsReviewer | null;
  owner: SpotlightDetailsOwner;
  interactions: SpotlightDetailsInteractions;
  voting_summary: SpotlightDetailsVotingSummary;
  voting_history: SpotlightDetailsVotingHistoryEntry[];
  application_history: SpotlightDetailsApplicationHistoryEntry[];
  created_at: string;
  updated_at: string;
}

export interface ArtistSpotlightDetailsResponse {
  success: boolean;
  message: string;
  data: {
    spotlight: ArtistSpotlightDetail;
  };
  errors: null | any;
  code: number;
}

export interface BusinessSpotlightDetailsResponse {
  success: boolean;
  message: string;
  data: {
    spotlight: BusinessSpotlightDetail;
  };
  errors: null | any;
  code: number;
}

// ─── Vote Packages ────────────────────────────────────────────────────────────

export interface VotePackage {
  id: number;
  name: string;
  slug: string;
  votes_count: number;
  price: number;
  description: string;
}

export interface VotePackagesResponse {
  success: boolean;
  message: string;
  data: {
    packages: VotePackage[];
    max_paid_votes: number;
  };
  errors: null | any;
  code: number;
}

// ─── Vote Purchase ────────────────────────────────────────────────────────────

// Request body for initiating a vote purchase
// POST /v1/spotlight/nominees/:nominee_id/purchase-votes
// Body: { package_slug: string } — slug like "starter", "popular", "boost", "power"
export interface VotePurchaseRequest {
  package_slug: string;
  nominee_id: number;
}

// A single vote purchase record (shared by the pending / nominee / details endpoints)
export interface VotePurchase {
  id: number;
  status: string; // "pending" | "approved" | "paid" | "cancelled" | ...
  package_slug: string;
  package_name: string;
  votes_count: number;
  amount_paid: number;
  can_pay: boolean;
  can_cancel: boolean;
  stripe_checkout_url: string | null;
  nominee: {
    id: number;
    spotlight_name: string;
    spotlight_type: string; // "artist" | "business"
    week_status: string;
    voting_open: boolean;
  };
  approved_at: string | null;
  paid_at: string | null;
  created_at: string;
}

// Created purchase returned by POST /v1/spotlight/nominees/:nominee_id/purchase-votes
// (a subset — it stays "pending" until admin approval, then can_pay becomes true
// and the purchase appears in the my-pending-purchases list)
export interface VotePurchaseCreated {
  id: number;
  status: string; // "pending" | ...
  package: string; // package slug, e.g. "popular"
  package_name: string;
  votes_count: number;
  amount_paid: number;
  created_at: string;
}

export interface VotePurchaseResponse {
  success: boolean;
  message: string;
  data: {
    purchase: VotePurchaseCreated;
  };
  errors: null | any;
  code: number;
}

// Request body for paying a vote purchase
// POST /v1/spotlight/vote/purchases/:purchase_id/pay
export interface VotePayRequest {
  stripe_payment_method_id?: string;
}

// The pay endpoint creates a Stripe Checkout session and returns the URL to redirect to.
export interface VotePayResponse {
  success: boolean;
  message: string;
  data: {
    purchase_id: number;
    checkout_url: string;
    session_id: string;
  };
  errors: null | any;
  code: number;
}

// GET /v1/spotlight/vote/my-pending-purchases
export interface PendingPurchasesResponse {
  success: boolean;
  message: string;
  data: {
    purchases: VotePurchase[];
  };
  errors: null | any;
  code: number;
}

// GET /v1/spotlight/nominees/:nominee_id/purchases
export interface NomineePurchasesResponse {
  success: boolean;
  message: string;
  data: {
    nominee_id: number;
    paid_vote_count: number;
    remaining_slots: number;
    cap_reached: boolean;
    purchases: VotePurchase[];
  };
  errors: null | any;
  code: number;
}

// ─── Spotlight Weeks Leaderboard ──────────────────────────────────────────────

export interface LeaderboardSpotlight {
  id: number;
  type: "artist" | "business";
  name: string;
  city: string;
  state: string;
  email: string;
  status: string;
}

export interface LeaderboardOwner {
  id: number;
  name: string;
}

export interface LeaderboardEntry {
  rank: number;
  nominee_id: number;
  spotlight: LeaderboardSpotlight;
  owner: LeaderboardOwner;
  free_votes: number;
  paid_votes: number;
  total_votes: number;
  paid_votes_cap: number;
  paid_cap_reached: boolean;
  is_winner: boolean;
}

export interface LeaderboardWeek {
  id: number;
  status: string;
  is_voting_open: boolean;
  voting_ends_at: string;
}

export interface LeaderboardResponse {
  success: boolean;
  message: string;
  data: {
    week: LeaderboardWeek;
    type: string;
    nominees_count: number;
    leaderboard: LeaderboardEntry[];
  };
  errors: null | any;
  code: number;
}

// ─── Active Season Rounds ────────────────────────────────────────────────────

export interface ActiveSeasonRound {
  id: number;
  season_id: number;
  round_number: number;
  title: string;
  goal: string;
  requirements: string;
  voting_strategy: string;
  submission_type: string;
  submission_requirements: {
    video: {
      required: boolean;
      max_duration_sec: number;
    };
    document: {
      required: boolean;
      formats: string[];
    };
  };
  advance_limit: number;
  elimination_rule: string;
  advancement_config: any[];
  is_active: boolean;
  sort_order: number;
  starts_at: string;
  ends_at: string;
  voting_ends_at: string;
  metadata: null | any;
  created_at: string;
  updated_at: string;
}

export interface ActiveSeasonSponsor {
  id: number;
  name: string;
  logo: string;
  website_url: string;
  description: string | null;
}

export interface ActiveSeason {
  id: number;
  contest_type: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  configuration: {
    max_contestants: number;
    voting_strategy: string;
    scoring_rules: Record<string, number>;
  };
  applications_starts_at: string;
  applications_ends_at: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  is_featured: boolean;
  metadata: {
    total_applicants: number;
    winner_business_id: null | number;
  };
  created_at: string;
  updated_at: string;
  sponsor: ActiveSeasonSponsor | null;
  rounds: ActiveSeasonRound[];
}

export interface ActiveSeasonRoundsData {
  season: ActiveSeason;
  rounds: ActiveSeasonRound[];
}

export interface ActiveSeasonRoundsResponse {
  success: boolean;
  message: string;
  data: ActiveSeasonRoundsData;
  errors: null | any;
  code: number;
}

// ─── Round Leaderboard (BusinessChosenChart) ─────────────────────────────────

export interface RoundLeaderboardEntry {
  contestant: {
    id: number;
    season_id: number;
    business_id: number;
    display_name: string;
    slug: string;
    avatar_url: string;
    status: string;
    contestable: {
      id: number;
      owner_name: string | null;
      business_name: string;
      slug: string;
      status: string;
      is_featured: boolean;
      total_points: number;
    };
  };
  contestant_id: number;
  display_name: string;
  avatar_url: string | null;
  contestable_name: string;
  total_score: number;
  votes_count: number;
  avg_score: number | null;
  claps: number;
  shares: number;
  saves: number;
  trend: string;
  rank: number;
}

export interface RoundLeaderboardData {
  round_id: number;
  round: {
    id: number;
    round_number: number;
    title: string;
    requirements: string;
    goal: string;
    starts_at: string;
    ends_at: string;
    voting_ends_at: string;
  };
  days_left: number;
  total_entries: number;
  entries: RoundLeaderboardEntry[];
}

export interface RoundLeaderboardResponse {
  success: boolean;
  message: string;
  data: RoundLeaderboardData;
  errors: null | any;
  code: number;
}