/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ServiceType = "in-person" | "online" | "both" | "";

export interface SpotlightFormData {
  // Step 1 — Identification
  businessName: string;
  ownerName: string;
  businessCategory: string;
  yearFounded: string;
  businessWebsite: string;
  city: string;
  state: string;
  // Step 2 — Contact Information
  email: string;
  phone: string;
  bestTimeToContact: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  youtube: string;
  googleBusinessProfile: string;
  linkedin: string;
  fanbaseUrl: string;
  // Step 3 — Your Story
  businessStory: string;
  productsServices: string;
  challengesOvercome: string;
  uniqueFactor: string;
  targetCustomer: string;
  // Step 4 — Media (Images)
  portraitPhoto: string | null;
  storefrontWorkspacePhoto: string | null;
  productPhoto1: string | null;
  productPhoto2: string | null;
  teamPhoto: string | null;
  // Step 5 — Service Details
  serviceType: ServiceType;
  // Step 6 — Spotlight Consideration
  whyFeatured: string;
  growthVision: string;
  permissionFeaturedOnOsi: boolean;
  permissionUseSubmittedPhotos: boolean;
  permissionShareBusinessStory: boolean;
}

export interface FormErrors {
  // Step 1
  businessName?: string;
  ownerName?: string;
  businessCategory?: string;
  yearFounded?: string;
  businessWebsite?: string;
  city?: string;
  state?: string;
  // Step 2
  email?: string;
  phone?: string;
  // Step 3
  businessStory?: string;
  productsServices?: string;
  challengesOvercome?: string;
  uniqueFactor?: string;
  targetCustomer?: string;
  // Step 4
  portraitPhoto?: string;
  storefrontWorkspacePhoto?: string;
  productPhoto1?: string;
  productPhoto2?: string;
  // Step 5
  serviceType?: string;
  // Step 6
  bestTimeToContact?: string;
  permissionUseSubmittedPhotos?: string;
  permissionShareBusinessStory?: string;
  permissionFeaturedOnOsi?: string;
  whyFeatured?: string;
  growthVision?: string;
}

export const initialFormData: SpotlightFormData = {
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
  fanbaseUrl: "",
  businessStory: "",
  productsServices: "",
  challengesOvercome: "",
  uniqueFactor: "",
  targetCustomer: "",
  portraitPhoto: null,
  storefrontWorkspacePhoto: null,
  productPhoto1: null,
  productPhoto2: null,
  teamPhoto: null,
  serviceType: "",
  whyFeatured: "",
  growthVision: "",
  permissionFeaturedOnOsi: false,
  permissionUseSubmittedPhotos: false,
  permissionShareBusinessStory: false,
};

export interface StepDef {
  label: string;
}

export const steps: StepDef[] = [
  { label: "Identification" },
  { label: "Contact" },
  { label: "Your Story" },
  { label: "Media" },
  { label: "Service" },
  { label: "Consideration" },
];

export const TOTAL_STEPS = steps.length;

export const CATEGORY_OPTIONS = [
  "Retail",
  "Food & Beverage",
  "Technology",
  "Healthcare",
  "Education",
  "Arts & Entertainment",
  "Professional Services",
  "Other",
];

export const CONTACT_TIME_OPTIONS = [
  "Morning (9am - 12pm)",
  "Afternoon (12pm - 5pm)",
  "Evening (5pm - 8pm)",
  "Anytime",
];
