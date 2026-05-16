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
