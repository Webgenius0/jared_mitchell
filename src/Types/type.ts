export interface Demo {
  id: number;
  title: string;
  description: string;
}

export interface Demo2 extends Demo {
  sub_title: string;
}

export type Card = {
  id: number;
  title: string;
  description: string;
};

export type LogoSliderProps = {
    logos: {
        id: number;
        icon: () => React.ReactNode;
    }[]
    reverse?: boolean
}

export type PricingPlan = {
  id: string
  title: string
  price: string
  period: string
  badge?: string
  highlighted?: boolean
  bestFor: string
  sections: {
    title: string
    items: string[]
  }[]
  outcome: string
}