// All Fake Data, but some of them are real 🙄
import {
  Artist,
  FAQItem,
  PickCardProps,
  PricingPlan,
  ShopCardProps,
  Testimonial,
  User,
  WeeklyTimelineProps,
} from "@/Types/type";
import { AmazonSvg, BronzeSvg, GoldSvg, PlatinumSvg, SilverSvg, WooCommerce } from "../Svg/SvgContainer";

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
    answer:
      "Yes, you can cancel your plan at any time from your account settings.",
  },
  {
    id: 2,
    question: "How do spotlights work?",
    answer:
      "Spotlights allow your profile or business to be featured for increased visibility.",
  },
  {
    id: 3,
    question: "What are AI insights?",
    answer:
      "AI insights provide performance analytics and recommendations based on your activity.",
  },
  {
    id: 4,
    question: "Do I need a business to join OSI?",
    answer: "No, individuals and businesses can both join OSI.",
  },
  {
    id: 5,
    question: "How quickly will I see visibility?",
    answer:
      "Visibility can begin within days, depending on your plan and engagement.",
  },
  {
    id: 6,
    question: "Do all plans include events?",
    answer:
      "Yes, all plans include events, with higher tiers offering early or VIP access.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jasmine R.",
    role: "Visual Artist",
    quote:
      "OSI gave me the visibility I never had before. My art reached new audiences and I finally felt seen as a creator.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus B.",
    role: "Business Owner",
    quote:
      "When OSI featured my business, I saw immediate engagement. Their support is real, and it made a huge difference.",
    rating: 4,
  },
  {
    id: 3,
    name: "Destiny L.",
    role: "Model",
    quote:
      "OSI makes you feel supported, respected, and appreciated. Their platform changes lives.",
    rating: 3,
  },
  {
    id: 4,
    name: "Paula G.",
    role: "Entrepreneur",
    quote:
      "Boss Beginnings was a blessing. OSI gave my business a real start with encouragement, community, and exposure.",
    rating: 5,
  },
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
];

export const artists: Artist[] = [
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
];

export const timelineData: WeeklyTimelineProps = {
  title: "Automated Weekly Timeline",
  events: [
    {
      id: 1,
      time: "Sunday 11:59 PM",
      title: "Voting Freeze & Selection",
      points: [
        "Current Final 6 voting locks",
        "Highest score wins Spotlight of the Week",
        "Top 6 from Top 12 advance to Final 6",
        "System auto-selects 12 new nominees for next week",
      ],
    },
    {
      id: 2,
      time: "Monday 12:00 AM",
      title: "Weekly Reset & Publish",
      points: [
        "All weekly scores reset to 0",
        "New winner announced",
        "New Final 6 voting begins",
        "Next week's Top 12 revealed",
      ],
    },
    {
      id: 3,
      time: "Monday – Sunday",
      title: "Active Voting Period",
      points: [
        "Community votes on Final 6",
        "Scores accumulate throughout the week",
        "Real-time leaderboard updates",
        "Next week's Top 12 revealed",
      ],
    },
  ],
};

export const topPerformers: User[] = [
  {
    id: 1,
    rank: 1,
    name: "Aisha Patel",
    title: "Cybersecurity Expert",
    description:
      "Protecting critical infrastructure and teaching security best practices to the next generation.",
    tag: "Security",
    avatar: "/profile.svg",
    claps: 45,
    saves: 18,
    shares: 9,
    weeklyScore: 156,
    socials: {
      website: "https://aishapatel.dev",
      twitter: "https://twitter.com/aishasec",
      github: "https://github.com/aishapatel",
      linkedin: "https://linkedin.com/in/aishapatel",
    },
  },
  {
    id: 2,
    rank: 2,
    name: "Marcus Rodriguez",
    title: "Open Source Maintainer",
    description:
      "Creator of popular developer tools used by over 100k developers worldwide.",
    tag: "Open Source",
    avatar: "/profile.svg",
    claps: 38,
    saves: 19,
    shares: 8,
    weeklyScore: 143,
    socials: {
      github: "https://github.com/marcusr",
      twitter: "https://twitter.com/marcusr_dev",
    },
  },
  {
    id: 3,
    rank: 3,
    name: "James Liu",
    title: "Cloud Architect",
    description:
      "Designing scalable cloud infrastructure and mentoring engineers in distributed systems.",
    tag: "Cloud & DevOps",
    avatar: "/profile.svg",
    claps: 45,
    saves: 18,
    shares: 9,
    weeklyScore: 156,
    socials: {
      linkedin: "https://linkedin.com/in/jamesliu",
      website: "https://jamesliu.io",
    },
  },
  {
    id: 4,
    rank: 4,
    name: "Sarah Chen",
    title: "AI Research Engineer",
    description:
      "Building ethical and scalable AI systems with a focus on large language models.",
    tag: "AI & ML",
    avatar: "/profile.svg",
    claps: 41,
    saves: 15,
    shares: 7,
    weeklyScore: 136,
    socials: {
      twitter: "https://twitter.com/sarahai",
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
  },
  {
    id: 5,
    rank: 5,
    name: "Daniel Moore",
    title: "Frontend Engineer",
    description:
      "Crafting accessible, high-performance user interfaces with modern web technologies.",
    tag: "Frontend",
    avatar: "/profile.svg",
    claps: 34,
    saves: 14,
    shares: 6,
    weeklyScore: 128,
    socials: {
      github: "https://github.com/danielmoore",
      website: "https://danielmoore.dev",
    },
  },
  {
    id: 6,
    rank: 6,
    name: "Fatima Rahman",
    title: "Product Designer",
    description:
      "Designing intuitive digital products with a strong focus on user research and usability.",
    tag: "Product Design",
    avatar: "/profile.svg",
    claps: 31,
    saves: 12,
    shares: 5,
    weeklyScore: 121,
    socials: {
      linkedin: "https://linkedin.com/in/fatimarahman",
      twitter: "https://twitter.com/fatima_designs",
    },
  },
]

export const featuredShopData: ShopCardProps[] = [
  {
    id: "1",
    image: "https://i.ibb.co.com/V0TXvhy4/3b1a85c852f585e5f2ef2f75cc735a4ce893aa76.jpg",
    title: "OSI Signature Hoodie",
    description: "Premium quality hoodie that represents the culture.",
    price: "$65"
  },
  {
    id: "2",
    image: "https://i.ibb.co.com/V0TXvhy4/3b1a85c852f585e5f2ef2f75cc735a4ce893aa76.jpg",
    title: "Boss Beginnings Toolkit",
    description: "Complete toolkit to launch and grow your business.",
    price: "$49",
    tag: "Digital"
  },
  {
    id: "3",
    image: "https://i.ibb.co.com/V0TXvhy4/3b1a85c852f585e5f2ef2f75cc735a4ce893aa76.jpg",
    title: "Vendor Starter Pack",
    description: "Everything needed for your first vendor event.",
    price: "$129"
  },
  {
    id: "4",
    image: "https://i.ibb.co.com/V0TXvhy4/3b1a85c852f585e5f2ef2f75cc735a4ce893aa76.jpg",
    title: "Spotlight Promotion Credit",
    description: "Get your business featured on OSI platforms.",
    price: "$99"
  }
];

export const limitedDrops: ShopCardProps[] = [
  {
    id: "1",
    image: "https://i.ibb.co.com/hFf4n28R/Frame-2147230524.png",
    title: "OSI Signature Hoodie",
    description: "Premium quality hoodie that represents the culture.",
    price: "$65",
    EndsIn: "5d 8h 45m"
  },
  {
    id: "2",
    image: "https://i.ibb.co.com/hFf4n28R/Frame-2147230524.png",
    title: "Boss Beginnings Toolkit",
    description: "Complete toolkit to launch and grow your business.",
    price: "$49",
    EndsIn: "5d 8h 45m"
  },
  {
    id: "3",
    image: "https://i.ibb.co.com/hFf4n28R/Frame-2147230524.png",
    title: "Vendor Starter Pack",
    description: "Everything needed for your first vendor event.",
    price: "$129",
    EndsIn: "5d 8h 45m"
  }
];

export const membershipPlans = [
  {
    id: "bronze",
    icon: BronzeSvg,
    iconBgColor: "#783D0080",
    name: "Bronze",
    price: "$50",
    description: "Small businesses wanting consistent weekly exposure.",
    includes: [
      "4 social media posts per week featuring your ad (we post the ad you provide)",
      "Featured on OSI social stories (1x/week)",
      "Logo placement on OSI website sponsor carousel",
      "Access to sponsor-only updates & opportunities",
      "Mention in monthly sponsor appreciation post"
    ],
    provides: [
      "Your ad image(s), graphics, product promo, or sale announcement",
      "Your business logo",
      "Social media links"
    ],
    impact: "Affordable visibility for businesses who want consistent weekly promotion.",
  },
  {
    id: "silver",
    icon: SilverSvg,
    iconBgColor: "#4A556529",
    name: "Silver",
    price: "$100",
    description: "Businesses ready for increased visibility and more frequent posting.",
    includes: [
      "Daily social media posting (1 post per day, 7x a week)",
      "Quarter-page feature in the OSI Magazine",
      "Logo placement on OSI website sponsor carousel",
      "Inclusion in monthly newsletter 'Sponsor Highlights'",
      "Standard placement in community event promotions",
      "Priority access to vendor booth discounts",
      "Priority in OSI-hosted events"
    ],
    provides: [
      "Any ads you want showcased",
      "1 promo video or brand reel (optional)",
      "Product photos, announcements, sales"
    ],
    impact: "Daily exposure that builds momentum, brand recognition, and consistent traffic.",
  },
  {
    id: "gold",
    icon: GoldSvg,
    iconBgColor: "#E1B35380",
    name: "Gold",
    price: "$250",
    description: "Businesses who want powerful multimedia promotion across OSI video & social platforms.",
    includes: [
      "1 social media post per day (7 days/week)",
      "15-second video rotation on OSI's digital video channels (provided by sponsor)",
      "Half-page feature in the OSI Magazine",
      "Mention during OSI livestreams (when applicable)",
      "Priority discount on vendor booths",
      "Priority in OSI-hosted events"
    ],
    provides: [
      "A 15-second video commercial",
      "Your images, flyers, sales, and brand promos",
      "Logo and social links"
    ],
    impact: "Strong multimedia presence with consistent daily promotion + video rotation.",
  },
  {
    id: "platinum",
    icon: PlatinumSvg,
    iconBgColor: "#5B42CEB2",
    name: "Platinum",
    price: "$500",
    description: "Brands, agencies, larger businesses wanting maximum visibility and deeper integration.",
    includes: [
      "3 social media posts per day (21 posts/week)",
      "30-second video rotation on OSI's digital channels (provided by sponsor)",
      "Full-page feature in OSI Magazine",
      "Ad placement in our regular rotation on all OSI media outlets",
      "Social media shoutouts",
      "Logo in premium sponsor section",
      "Priority discount for vendor booths at OSI events",
      "Inclusion in high-traffic content pushes"
    ],
    provides: [
      "A 30-second commercial or promotional clip",
      "Your images, ads, flyers, and brand messaging"
    ],
    impact: "Maximum exposure with top-tier ad frequency and cross-platform visibility.",
  }
];
