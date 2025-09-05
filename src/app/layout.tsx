import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Hive Social",
    template: "%s | Hive Social",
  },
  description: "Connect with the Hive community, share your thoughts, and earn rewards for your content on the blockchain.",
  keywords: [
    "Hive",
    "blockchain",
    "social media",
    "decentralized",
    "content creation",
    "social network",
    "community",
    "Web3",
  ],
  authors: [{ name: "Hive Social Team" }],
  creator: "Hive Social",
  publisher: "Hive Social",
  applicationName: "Hive Social",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "social",
  classification: "Social Media",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hive-social.vercel.app",
    title: "Hive Social - Decentralized Social Media Platform",
    description: "Connect with the Hive community, share your thoughts, and earn rewards for your content on the blockchain.",
    siteName: "Hive Social",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hive Social - Decentralized Social Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hive Social - Decentralized Social Media Platform",
    description: "Connect with the Hive community, share your thoughts, and earn rewards for your content.",
    images: ["/og-image.png"],
    creator: "@hiveblockchain",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://hive-social.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://engine-api.rishipanthee.com" />
        <link rel="dns-prefetch" href="https://anyx.io" />
        <link rel="dns-prefetch" href="https://api.coingecko.com" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <AppProviders>
          <AppLayout>
            {children}
          </AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
