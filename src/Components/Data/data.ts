// All Fake Data, but some of them are real 🙄
import { Artist, FAQItem, PickCardProps, PricingPlan, Testimonial } from "@/Types/type";
import { AmazonSvg, WooCommerce } from "../Svg/SvgContainer";

export const sponsorsData = [
  {
    id: 1,
    icon: WooCommerce,
  },
  {
    id: 1,
    icon: AmazonSvg,
  },
  {
    id: 1,
    icon: WooCommerce,
  },
  {
    id: 1,
    icon: AmazonSvg,
  },
  {
    id: 1,
    icon: WooCommerce,
  },
  {
    id: 1,
    icon: AmazonSvg,
  },
];

export const successStories = [
  {
    id: 1,
    title: "Maria's Artisan Bakery",
    description:
      "Transforming traditional recipes into modern culinary masterpieces",
    category: "Food & Beverage",
    image: "/home/success-stories.jpg",
  },
  {
    id: 2,
    title: "Maria's Artisan Bakery",
    description:
      "Transforming traditional recipes into modern culinary masterpieces",
    category: "Food & Beverage",
    image: "/home/success-stories.jpg",
  },
  {
    id: 3,
    title: "Maria's Artisan Bakery",
    description:
      "Transforming traditional recipes into modern culinary masterpieces",
    category: "Food & Beverage",
    image: "/home/success-stories.jpg",
  },
  {
    id: 4,
    title: "Maria's Artisan Bakery",
    description:
      "Transforming traditional recipes into modern culinary masterpieces",
    category: "Food & Beverage",
    image: "/home/success-stories.jpg",
  },
  {
    id: 5,
    title: "Maria's Artisan Bakery",
    description:
      "Transforming traditional recipes into modern culinary masterpieces",
    category: "Food & Beverage",
    image: "/home/success-stories.jpg",
  },
  {
    id: 6,
    title: "Maria's Artisan Bakery",
    description:
      "Transforming traditional recipes into modern culinary masterpieces",
    category: "Food & Beverage",
    image: "/home/success-stories.jpg",
  },
];

export const upcomingEvents = [
  {
    id: 1,
    title: "Creative Networking Night",
    date: "April 10, 2025",
    location: "Downtown Indy",
    love: "1,204",
    image: "/home/success-stories.jpg",
  },
  {
    id: 2,
    title: "Creative Networking Night",
    date: "April 10, 2025",
    location: "Downtown Indy",
    love: "1,204",
    image: "/home/success-stories.jpg",
  },
  {
    id: 3,
    title: "Creative Networking Night",
    date: "April 10, 2025",
    location: "Downtown Indy",
    love: "1,204",
    image: "/home/success-stories.jpg",
  },
  {
    id: 4,
    title: "Creative Networking Night",
    date: "April 10, 2025",
    location: "Downtown Indy",
    love: "1,204",
    image: "/home/success-stories.jpg",
  },
  {
    id: 5,
    title: "Creative Networking Night",
    date: "April 10, 2025",
    location: "Downtown Indy",
    love: "1,204",
    image: "/home/success-stories.jpg",
  },
  {
    id: 6,
    title: "Creative Networking Night",
    date: "April 10, 2025",
    location: "Downtown Indy",
    love: "1,204",
    image: "/home/success-stories.jpg",
  },
];

export const pastEvents = [
  {
    id: 1,
    title: "Boss Beginnings Launch",
    description: "Celebrating new beginnings",
    image: "/home/success-stories.jpg",
  },
  {
    id: 2,
    title: "Boss Beginnings Launch",
    description: "Celebrating new beginnings",
    image: "/home/success-stories.jpg",
  },
  {
    id: 3,
    title: "Boss Beginnings Launch",
    description: "Celebrating new beginnings",
    image: "/home/success-stories.jpg",
  },
];

export const pricingTableData = [
  {
    feature: "AI Automated Social Posting",
    basic: "2 days/week (3 posts/day)",
    growth: "4 days/week (3 posts/day)",
    pro: "Unlimited posting (3–5/day)",
  },
  {
    feature: "AI Scheduling Assistant",
    basic: "Basic",
    growth: "Advanced",
    pro: "Full automation + repurposing",
  },
  {
    feature: "Platforms Posted To",
    basic: "1–2",
    growth: "3–4",
    pro: "Unlimited",
  },
  {
    feature: "Spotlight Submissions",
    basic: "1 Monthly",
    growth: "Unlimited",
    pro: "Unlimited + Priority",
  },
  {
    feature: "Homepage Visibility",
    basic: "No",
    growth: "Yes (rotating)",
    pro: "Premium",
  },
  {
    feature: "Newsletter Highlights",
    basic: "Basic mention",
    growth: "Priority",
    pro: "Featured section",
  },
  {
    feature: "Dashboard Access",
    basic: "Basic insights",
    growth: "Full insights",
    pro: "Full dashboard + trend reports",
  },
  {
    feature: "AI Market Insights",
    basic: "Basic snapshot",
    growth: "Audience deep-dive",
    pro: "Behavioral heatmaps + monthly trends",
  },
  {
    feature: "Canva Integration",
    basic: "Basic templates",
    growth: "OSI template library",
    pro: "Full Canva library + custom templates",
  },
  {
    feature: "Templates & Tools",
    basic: "Basic",
    growth: "Full Library",
    pro: "Full Library + Custom Assets",
  },
  {
    feature: "Ad Promotion on OSI Channels",
    basic: "No",
    growth: "Limited",
    pro: "Featured + Premium Ads",
  },
  {
    feature: "Video Channel Promotion",
    basic: "No",
    growth: "Limited",
    pro: "Guaranteed monthly feature",
  },
  {
    feature: "Event Access & Vendor Discounts",
    basic: "Discounted tickets",
    growth: "10% vendor discount",
    pro: "25% vendor discount + VIP",
  },
  {
    feature: "Community Access",
    basic: "Yes",
    growth: "Yes",
    pro: "Yes (VIP)",
  },
  {
    feature: "Submit Your Spotlight",
    basic: "Yes",
    growth: "Yes",
    pro: "Yes (Priority)",
  },
  {
    feature: "Ad Promotion on OSI Channels",
    basic: "Yes",
    growth: "Yes",
    pro: "Yes",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    title: "Basic Plan",
    price: "$25",
    period: "/ month",
    bestFor:
      "Beginners, new entrepreneurs, artists, and small businesses needing steady visibility and automated posting at an affordable cost.",
    sections: [
      {
        title: "AI-Automated Social Media Posting",
        items: [
          "2 days per week",
          "3 posts per day",
          "AI-written captions",
          "Auto-scheduled",
          "Posted to 1–2 platforms",
        ],
      },
      {
        title: "OSI Visibility & Brand Tools",
        items: [
          "1 Spotlight submission per month",
          "Artist/Business profile on OSI",
          "Basic AI Market Snapshot",
        ],
      },
      {
        title: "Community & Exposure",
        items: ["Access to OSI community features", "Newsletter highlight"],
      },
      {
        title: "Bonuses",
        items: [
          "Templates + basic Canva library",
          "Discounted OSI event tickets",
        ],
      },
    ],
    outcome:
      "Affordable visibility + automated posting + steady introduction into the OSI ecosystem.",
  },
  {
    id: "growth",
    title: "Growth Plan",
    price: "$50",
    period: "/ month",
    badge: "Most Popular",
    bestFor:
      "Growing creators, small business owners, and brands that want more posts, deeper insights, and stronger exposure.",
    sections: [
      {
        title: "AI-Automated Social Media Posting",
        items: [
          "4 days per week",
          "3 posts per day",
          "Multi-platform posting",
          "Branded content templates",
          "Caption writing + hashtag optimization",
        ],
      },
      {
        title: "AI Growth Insights (Advanced)",
        items: [
          "Deep target audience analysis",
          "Competitor comparisons",
          "AI content suggestions",
          "Engagement pattern breakdown",
        ],
      },
      {
        title: "Spotlight & Promotion",
        items: [
          "Unlimited Spotlight submissions",
          "Homepage visibility rotation",
          "Priority placement in newsletters",
        ],
      },
      {
        title: "Event & Community",
        items: [
          "Early access to OSI events",
          "10% discount on vendor spaces",
          "Access to OSI network + job board",
        ],
      },
    ],
    outcome:
      "More automation, more eyes on your brand, and smarter growth tools.",
  },
  {
    id: "pro",
    title: "Pro Business",
    price: "$100",
    period: "/ month",
    highlighted: true,
    bestFor:
      "Brands, entrepreneurs, and creators ready for maximum exposure, daily AI posting, and OSI’s full promotional engine.",
    sections: [
      {
        title: "AI-Automated Posting (Unlimited)",
        items: [
          "Unlimited AI posting",
          "3–5 posts per day",
          "Custom brand templates",
          "Auto-repurposing (video → clips, text → posts)",
        ],
      },
      {
        title: "Advanced AI Audience Intelligence",
        items: [
          "Full OSI Market Dashboard",
          "Behavioral heatmaps",
          "Best Posting Time AI assistant",
          "Monthly audience trend report",
        ],
      },
      {
        title: "Top-Tier Promotion & Marketing",
        items: [
          "Premium Spotlight placement",
          "Featured OSI video channels",
          "Guaranteed feature per month",
          "High-traffic cycle placement",
        ],
      },
      {
        title: "Event & Partnership Benefits",
        items: [
          "25% off OSI vendor spaces",
          "VIP OSI event access",
          "Homepage showcase placement",
          "Partner dashboard access",
        ],
      },
    ],
    outcome:
      "Dominant visibility inside OSI with automation, promotion, and full AI intelligence.",
  },
];

export const planComparisonTableData = [
  {
    feature: "OSI Profile Page",
    basic: true,
    growth: true,
    pro_business: true,
  },
  {
    feature: "Spotlight Submissions",
    basic: "1 Monthly",
    growth: "Unlimited",
    pro_business: "Unlimited + Priority",
  },
  {
    feature: "AI Insight Snapshots",
    basic: "Basic",
    growth: "Full Dashboard",
    pro_business: "Full Dashboard + Quarterly Audit",
  },
  {
    feature: "Community Access",
    basic: true,
    growth: true,
    pro_business: true,
  },
  {
    feature: "Social Media Promotion",
    basic: false,
    growth: false,
    pro_business: "Extended",
  },
  {
    feature: "Homepage Visibility",
    basic: false,
    growth: false,
    pro_business: "Premium Placement",
  },
  {
    feature: "Newsletter Features",
    basic: false,
    growth: true,
    pro_business: "Priority",
  },
  {
    feature: "Business Showcase Page",
    basic: false,
    growth: false,
    pro_business: true,
  },
  {
    feature: "Event Access",
    basic: "General",
    growth: "Early Access",
    pro_business: "VIP",
  },
  {
    feature: "Templates & Tools",
    basic: "Basic",
    growth: "Full Library",
    pro_business: "Full Library + Custom Assets",
  },
  {
    feature: "Upgrade Anytime",
    basic: true,
    growth: true,
    pro_business: true,
  },
];

export const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Can I cancel my plan anytime?",
    answer: "Yes, you can cancel your plan at any time from your account settings."
  },
  {
    id: 2,
    question: "How do spotlights work?",
    answer: "Spotlights allow your profile or business to be featured for increased visibility."
  },
  {
    id: 3,
    question: "What are AI insights?",
    answer: "AI insights provide performance analytics and recommendations based on your activity."
  },
  {
    id: 4,
    question: "Do I need a business to join OSI?",
    answer: "No, individuals and businesses can both join OSI."
  },
  {
    id: 5,
    question: "How quickly will I see visibility?",
    answer: "Visibility can begin within days, depending on your plan and engagement."
  },
  {
    id: 6,
    question: "Do all plans include events?",
    answer: "Yes, all plans include events, with higher tiers offering early or VIP access."
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jasmine R.",
    role: "Visual Artist",
    quote:
      "OSI gave me the visibility I never had before. My art reached new audiences and I finally felt seen as a creator.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus B.",
    role: "Business Owner",
    quote:
      "When OSI featured my business, I saw immediate engagement. Their support is real, and it made a huge difference.",
    rating: 4
  },
  {
    id: 3,
    name: "Destiny L.",
    role: "Model",
    quote:
      "OSI makes you feel supported, respected, and appreciated. Their platform changes lives.",
    rating: 3
  },
  {
    id: 4,
    name: "Paula G.",
    role: "Entrepreneur",
    quote:
      "Boss Beginnings was a blessing. OSI gave my business a real start with encouragement, community, and exposure.",
    rating: 5
  }
];

export const editorPicks: PickCardProps[] = [
  {
    id: 1,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/spotlight/artist-pick-img.jpg",
    href: "/artists/james-boyd",
  },
  {
    id: 2,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/spotlight/artist-pick-img.jpg",
    href: "/artists/james-boyd",
  },
  {
    id: 3,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/spotlight/artist-pick-img.jpg",
    href: "/artists/james-boyd",
  },
]

export const artists:Artist[] = [
  {
    id: 1,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 2,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 3,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 1,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 2,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 3,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 1,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 2,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 3,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 1,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 2,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
  {
    id: 3,
    name: "James Boyd",
    role: "Visual Artists",
    description:
      "I create digital illustrations that combine vibrant colors with bold shapes.",
    image: "/profile.svg",
    href: "/artists/james-boyd",
  },
]