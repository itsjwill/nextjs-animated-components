import type { Metadata, Viewport } from "next";
import "./globals.css";

// =============================================================================
// Site Configuration
// =============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://awwwards-ui.com";

// =============================================================================
// Metadata
// =============================================================================

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Awwwards UI - Premium Animation Components",
    template: "%s | Awwwards UI",
  },
  description:
    "The ultimate web animation toolkit. GSAP + Framer Motion + Lenis + Three.js + 50+ premium components. Build Awwwards-worthy sites.",
  keywords: [
    "animation",
    "react",
    "nextjs",
    "gsap",
    "framer-motion",
    "three.js",
    "tailwindcss",
    "awwwards",
    "ui-components",
    "web-design",
    "motion-design",
    "scroll-animations",
    "3d-web",
    "premium-ui",
    "react-components",
    "animation-library",
  ],
  authors: [{ name: "itsjwill" }],
  creator: "itsjwill",
  publisher: "Awwwards UI",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Awwwards UI - Premium Animation Components",
    description:
      "The ultimate web animation toolkit. GSAP + Framer Motion + Lenis + Three.js + 50+ premium components.",
    siteName: "Awwwards UI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Awwwards UI - Premium Animation Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awwwards UI - Premium Animation Components",
    description:
      "The ultimate web animation toolkit. GSAP + Framer Motion + Lenis + Three.js + 50+ premium components.",
    images: ["/og-image.png"],
    creator: "@awwwardsui",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

// =============================================================================
// Viewport
// =============================================================================

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// =============================================================================
// Root Layout
// =============================================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
