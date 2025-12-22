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
