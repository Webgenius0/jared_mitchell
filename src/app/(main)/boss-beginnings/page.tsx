import type { Metadata } from "next";
import { redirect } from "next/navigation";

const page = async () => {
  redirect("/contest");
  return null;
};

export const metadata = {
  title: "OSI Top Business Award | Open Spotlight Initiative",
  description:
    "Discover the OSI Top Business Award — a platform celebrating exceptional businesses and entrepreneurs. Learn about the program, current winners, and how to participate.",
  keywords: [
    "OSI Top Business Award",
    "OSI business award",
    "business recognition",
    "entrepreneur award",
    "OSI contest",
  ],
  openGraph: {
    title: "OSI Top Business Award | Open Spotlight Initiative",
    description:
      "Discover the OSI Top Business Award — a platform celebrating exceptional businesses and entrepreneurs. Learn about the program and how to participate.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-boss-beginnings.png",
        width: 1200,
        height: 630,
        alt: "OSI Top Business Award - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI Top Business Award | Open Spotlight Initiative",
    description:
      "Discover the OSI Top Business Award — a platform celebrating exceptional businesses and entrepreneurs. Learn about the program and how to participate.",
    images: ["/og-boss-beginnings.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
