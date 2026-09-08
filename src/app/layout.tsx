import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import { getSiteSettings } from "@/Hooks/api/cms_api";
import AosProvider from "@/Provider/AosProvider/AosProvider";
import AuthProvider from "@/Provider/AuthProvider/AuthProvider";
import QueryProvider from "@/Provider/QueryProvider/QueryProvider";
import GoogleTranslateLoader from "@/Components/Common/GoogleTranslateLoader";

// Metadata
export const metadata: Metadata = {
  title: {
    default: "OSI - Open Spotlight Initiative",
    template: "%s | OSI",
  },
  description:
    "OSI (Open Spotlight Initiative) empowers creators, small businesses, and entrepreneurs with exposure, support, and modern tools to grow. Discover spotlights, events, and community opportunities.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://osiplatform.com",
  ),
  keywords: [
    "OSI",
    "Open Spotlight Initiative",
    "spotlight",
    "business spotlight",
    "artist spotlight",
    "community",
    "entrepreneurs",
    "creators",
    "small business",
  ],
  authors: [{ name: "OSI Platform" }],
  creator: "OSI Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "OSI - Open Spotlight Initiative",
    title: "OSI - Open Spotlight Initiative",
    description:
      "OSI (Open Spotlight Initiative) empowers creators, small businesses, and entrepreneurs with exposure, support, and modern tools to grow.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OSI - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI - Open Spotlight Initiative",
    description:
      "OSI (Open Spotlight Initiative) empowers creators, small businesses, and entrepreneurs with exposure, support, and modern tools to grow.",
    images: ["/og-image.png"],
    creator: "@osiplatform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let faviconUrl = "/favicon.svg";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconUrl} />
      </head>
      <body>
        <GoogleTranslateLoader />
        <QueryProvider>
          <AuthProvider>
            <AosProvider>
              <Toaster />
              {children}
            </AosProvider>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
