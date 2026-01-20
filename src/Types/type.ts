import { StaticImageData } from "next/image";

export type LoginProps = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Card = {
  id: number;
  title: string;
  description: string;
};

export type LogoSliderProps = {
  logos: {
    id: number;
    icon: () => React.ReactNode;
  }[];
  reverse?: boolean;
};

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  period: string;
  badge?: string;
  highlighted?: boolean;
  bestFor: string;
  sections: {
    title: string;
    items: string[];
  }[];
  outcome: string;
};

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export type PickCardProps = {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  href: string;
};

export interface Artist {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  href: string;
}

type TimelineEvent = {
  id: number;
  time: string;
  title: string;
  points: string[];
};

export type WeeklyTimelineProps = {
  title: string;
  events: TimelineEvent[];
};

export type SocialLinks = {
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
};

export type User = {
  id?: number;
  rank?: number;
  name: string;
  title: string;
  description: string;
  tag: string;
  avatar: string;
  claps: number;
  saves: number;
  shares: number;
  weeklyScore: number;
  socials: SocialLinks;
};

export interface ShopCardProps {
  id: string;
  image: string | StaticImageData;
  title: string;
  description: string;
  price: string;
  tag?: string;
  EndsIn?: string;
}
