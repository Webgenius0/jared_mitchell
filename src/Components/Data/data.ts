import f1 from "@/Assets/f1.png";
import f2 from "@/Assets/f2.png";
import f3 from "@/Assets/f3.png";
import {
  Artist,
  FAQItem,
  PickCardProps,
  PricingPlan,
  RoundData,
  ShopCardProps,
  Testimonial,
  User,
  WeeklyTimelineProps,
} from "@/Types/type";
import {
  AmazonSvg,
  BronzeSvg,
  GoldSvg,
  PlatinumSvg,
  SilverSvg,
  WooCommerce,
} from "../Svg/SvgContainer";

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
];

export const featuredShopData: ShopCardProps[] = [
  {
    id: "1",
    image: f1,
    title: "OSI Signature Hoodie",
    description: "Premium quality hoodie that represents the culture.",
    price: "$65",
  },
  {
    id: "2",
    image: f2,
    title: "Boss Beginnings Toolkit",
    description: "Complete toolkit to launch and grow your business.",
    price: "$49",
    tag: "Digital",
  },
  {
    id: "3",
    image: f3,
    title: "Vendor Starter Pack",
    description: "Everything needed for your first vendor event.",
    price: "$129",
  },
  {
    id: "4",
    image:
      "https://i.ibb.co.com/V0TXvhy4/3b1a85c852f585e5f2ef2f75cc735a4ce893aa76.jpg",
    title: "Spotlight Promotion Credit",
    description: "Get your business featured on OSI platforms.",
    price: "$99",
  },
];

export const limitedDrops: ShopCardProps[] = [
  {
    id: "1",
    image: "https://i.ibb.co.com/hFf4n28R/Frame-2147230524.png",
    title: "OSI Signature Hoodie",
    description: "Premium quality hoodie that represents the culture.",
    price: "$65",
    EndsIn: "5d 8h 45m",
  },
  {
    id: "2",
    image: "https://i.ibb.co.com/hFf4n28R/Frame-2147230524.png",
    title: "Boss Beginnings Toolkit",
    description: "Complete toolkit to launch and grow your business.",
    price: "$49",
    EndsIn: "5d 8h 45m",
  },
  {
    id: "3",
    image: "https://i.ibb.co.com/hFf4n28R/Frame-2147230524.png",
    title: "Vendor Starter Pack",
    description: "Everything needed for your first vendor event.",
    price: "$129",
    EndsIn: "5d 8h 45m",
  },
];

export const membershipPlans = [
  {
    id: "bronze",
    icon: BronzeSvg,
    title: "Community Supporter",
    iconBgColor: "#783D0080",
    name: "Bronze",
    price: "$50",
    description: "Small businesses wanting consistent weekly exposure.",
    short_desc:
      "Best for startups, creators, and early-stage brands. Purpose: Presence, not growth.",
  },
  {
    id: "silver",
    icon: SilverSvg,
    title: "Growing Visibility",
    iconBgColor: "#4A556529",
    name: "Silver",
    price: "$100",
    description:
      "Businesses ready for increased visibility and more frequent posting.",
    short_desc:
      "For businesses building momentum. Purpose: Recognition begins here.",
  },
  {
    id: "gold",
    icon: GoldSvg,
    iconBgColor: "#E1B35380",
    title: "Featured Business",
    name: "Gold",
    price: "$250",
    description:
      "Businesses who want powerful multimedia promotion across OSI video & social platforms.",
    short_desc:
      "Daily visibility • ~$8 per day Purpose: Consistent recognition and growth.",
  },
  {
    id: "platinum",
    icon: PlatinumSvg,
    title: "Premier Partner",
    iconBgColor: "#5B42CEB2",
    name: "Platinum",
    price: "$500",
    description:
      "Brands, agencies, larger businesses wanting maximum visibility and deeper integration.",
    short_desc:
      "Authority • Priority • Top-tier presence Purpose: Leadership positioning.",
  },
];

export const roundsData: RoundData[] = [
  {
    id: 1,
    title: "Open Qualifier Round",
    phase: "Phase 1",
    description:
      "Narrow the field and generate buzz. Top 60% advance based on community engagement.",
    participants: 100,
    advancing: 60,
    advancingPercentage: 60,
    timeLeft: "3 weeks 4 days",
    votingWeight: "100% Community",
  },
  {
    id: 2,
    title: "Community Impact Round",
    phase: "Phase 2",
    description:
      "Filter for meaning, not just popularity. Submit 3-5 bullet points or 60-90 second video.",
    challenge: {
      title: "Challenge:",
      question: "How does your business serve the community?",
    },
    participants: 60,
    advancing: 30,
    advancingPercentage: 50,
    timeLeft: "2 weeks 1 days",
    votingWeight: "70% Community",
  },
  {
    id: 3,
    title: "Innovation Showcase Round",
    phase: "Phase 3",
    description:
      "Demonstrate your unique value proposition and market differentiation.",
    challenge: {
      title: "Challenge:",
      question: "What makes your solution innovative and scalable?",
    },
    participants: 30,
    advancing: 15,
    advancingPercentage: 50,
    timeLeft: "1 week 5 days",
    votingWeight: "60% Community",
  },
  {
    id: 4,
    title: "Expert Review Round",
    phase: "Phase 4",
    description:
      "Industry experts evaluate business models and growth potential.",
    participants: 15,
    advancing: 8,
    advancingPercentage: 53,
    timeLeft: "1 week 2 days",
    votingWeight: "50% Community",
  },
  {
    id: 5,
    title: "Final Championship",
    phase: "Phase 5",
    description:
      "Present your complete vision to judges and community for the grand prize.",
    challenge: {
      title: "Challenge:",
      question: "Pitch your complete business vision and impact strategy.",
    },
    participants: 8,
    advancing: 3,
    advancingPercentage: 38,
    timeLeft: "5 days",
    votingWeight: "40% Community",
  },
];
