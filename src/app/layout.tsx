import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme";
import { SmoothScroll } from "@/components/core/smooth-scroll";
import { DirectionPreloader } from "@/components/core/direction-preloader";

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
    default: "Awwwards UI - Premium Animation Components for React",
    template: "%s | Awwwards UI",
  },
  description:
    "The ultimate web animation toolkit. 80+ premium components across 4 design directions. GSAP + Framer Motion + Lenis + Three.js. Build Awwwards-worthy sites in minutes.",
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
    "design-system",
    "dark-mode",
    "cyberpunk-ui",
    "kinetic-typography",
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
    title: "Awwwards UI - Premium Animation Components for React",
    description:
      "80+ animation components. 4 design directions. Zero compromise. Build award-worthy websites.",
    siteName: "Awwwards UI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Awwwards UI - 4 Design Directions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awwwards UI - Premium Animation Components",
    description:
      "80+ animation components. 4 design directions. Build award-worthy websites.",
    images: ["/og-image.png"],
    creator: "@itsjwill",
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
    <html
      lang="en"
      className={`dark ${fontVariables}`}
      data-direction="freestyle"
      suppressHydrationWarning
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <ThemeProvider defaultDirection="freestyle" defaultMode="dark">
          <DirectionPreloader>
            {children}
          </DirectionPreloader>
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  );
}
