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
