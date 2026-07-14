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
    icon: string;
    title: string;
    sub_title: string;
    description: string;
  }[];
}

export interface CMSWhatYouGet extends CMSBase {
  metadata: {
    icon: string;
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

export interface CMSSpotlightLadder {
  spotlight_ladder_hero: CMSSpotlightLadderHero;
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