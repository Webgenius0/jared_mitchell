/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

export interface FormData {
  // Step 1 — Artist Identification
  fullLegalName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  state: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  youtube: string;
  portfolioLink: string;
  // Step 2 — Artist Category
  category: string;
  // Step 3 — Artist Story
  shortBio: string;
  fullStory: string;
  whySpotlighted: string;
  messageToCommunity: string;
  currentGoals: string;
  // Step 4 — Media Uploads
  headshot: string | null;
  artPhotos: string | null;
  behindTheScenes: string | null;
  introVideo: string | null;
  // Step 5 — Consent & Rights
  publicRelease: boolean;
  ownershipDeclaration: boolean;
  interviewPermission: boolean;
  // Step 6 — Optional Information
  managerContact: string;
  agentContact: string;
  pressKitLink: string;
  previousInterviews: string;
  awards: string;
  preferredPronouns: string;
  preferredContactMethod: string;
  interviewAvailability: string;
}

export const initialFormData: FormData = {
  fullLegalName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  city: "",
  state: "",
  instagram: "",
  tiktok: "",
  facebook: "",
  youtube: "",
  portfolioLink: "",
  category: "",
  shortBio: "",
  fullStory: "",
  whySpotlighted: "",
  messageToCommunity: "",
  currentGoals: "",
  headshot: null,
  artPhotos: null,
  behindTheScenes: null,
  introVideo: null,
  publicRelease: false,
  ownershipDeclaration: false,
  interviewPermission: false,
  managerContact: "",
  agentContact: "",
  pressKitLink: "",
  previousInterviews: "",
  awards: "",
  preferredPronouns: "",
  preferredContactMethod: "",
  interviewAvailability: "",
};

export const steps = [
  { label: "Identification" },
  { label: "Category" },
  { label: "Your Story" },
  { label: "Media" },
  { label: "Consent" },
  { label: "Optional" },
];

export const TOTAL_STEPS = steps.length;

export const CATEGORY_OPTIONS: { title: string; subtitle?: string }[] = [
  { title: "Musician", subtitle: "Rap / R&B / Hip-Hop / Pop / Indie / Other" },
  { title: "Visual Artist", subtitle: "Painter / Sketch / Mixed Media / etc." },
  { title: "Photographer" },
  { title: "Model" },
  { title: "Videographer" },
  { title: "Digital Creator" },
  { title: "Designer", subtitle: "Fashion / Graphic" },
  { title: "Poet / Writer" },
  { title: "Other", subtitle: "Please describe below" },
];
