/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ServiceMode = "in-person" | "online" | "both" | "";

export interface FormData {
  // Step 1 — Identification
  businessName: string;
  ownerName: string;
  businessCategory: string;
  yearFounded: string;
  businessWebsite: string;
  city: string;
  state: string;
  // Step 2 — Category (Contact Information)
  email: string;
  phone: string;
  bestTimeToContact: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  youtube: string;
  googleBusinessProfile: string;
  linkedin: string;
  websiteUrl: string;
  // Step 3 — Your Story
  businessStory: string;
  productsServices: string;
  challengesOvercome: string;
  uniqueValue: string;
  targetCustomer: string;
  // Step 4 — Media (Images)
  ownerPortrait: string | null;
  storefrontPhoto: string | null;
  productPhotos: string | null;
  teamPhoto: string | null;
  // Step 5 — Consent (Service Details)
  serviceMode: ServiceMode;
  // Step 6 — Optional (Spotlight Consideration)
  whyFeatured: string;
  howHelpGrow: string;
  permissionFeature: boolean;
  permissionPhotos: boolean;
  permissionShareStory: boolean;
}

export const initialFormData: FormData = {
  businessName: "",
  ownerName: "",
  businessCategory: "",
  yearFounded: "",
  businessWebsite: "",
  city: "",
  state: "",
  email: "",
  phone: "",
  bestTimeToContact: "",
  instagram: "",
  tiktok: "",
  facebook: "",
  youtube: "",
  googleBusinessProfile: "",
  linkedin: "",
  websiteUrl: "",
  businessStory: "",
  productsServices: "",
  challengesOvercome: "",
  uniqueValue: "",
  targetCustomer: "",
  ownerPortrait: null,
  storefrontPhoto: null,
  productPhotos: null,
  teamPhoto: null,
  serviceMode: "",
  whyFeatured: "",
  howHelpGrow: "",
  permissionFeature: false,
  permissionPhotos: false,
  permissionShareStory: false,
};

export interface StepDef {
  label: string;
}

export const steps: StepDef[] = [
  { label: "Identification" },
  { label: "Category" },
  { label: "Your Story" },
  { label: "Media" },
  { label: "Consent" },
  { label: "Optional" },
];

export const TOTAL_STEPS = steps.length;

export const CATEGORY_OPTIONS = [
  "Retail",
  "Food & Beverage",
  "Technology",
  "Healthcare",
  "Education",
  "Other",
];

export const CONTACT_TIME_OPTIONS = [
  "Morning (9am - 12pm)",
  "Afternoon (12pm - 5pm)",
  "Evening (5pm - 8pm)",
  "Anytime",
];
