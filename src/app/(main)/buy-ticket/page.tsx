import type { Metadata } from "next";
import React from 'react'

export const metadata = {
  title: "Buy Tickets - OSI Events & Contests",
  description:
    "Purchase tickets for OSI events, contests, and special programs. Support artists and businesses while enjoying exclusive experiences in the Open Spotlight Initiative community.",
  keywords: [
    "OSI tickets",
    "buy OSI tickets",
    "OSI event tickets",
    "OSI contest tickets",
    "event tickets",
  ],
  openGraph: {
    title: "Buy Tickets - OSI Events & Contests",
    description:
      "Purchase tickets for OSI events, contests, and special programs. Support artists and businesses in the OSI community.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-tickets.png",
        width: 1200,
        height: 630,
        alt: "OSI Tickets - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Tickets - OSI Events & Contests",
    description:
      "Purchase tickets for OSI events, contests, and special programs. Support artists and businesses in the OSI community.",
    images: ["/og-tickets.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <div>page</div>
  )
}
