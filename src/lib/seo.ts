import type { Metadata } from "next";

// =============================================================================
// SEO Configuration Types
// =============================================================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  links?: {
    twitter?: string;
    github?: string;
  };
  creator?: string;
  keywords?: string[];
}

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
}

// =============================================================================
// Default Site Configuration
// =============================================================================

export const siteConfig: SiteConfig = {
  name: "MotionCraft",
  description:
    "The ultimate web animation toolkit. GSAP + Framer Motion + Lenis + Three.js + 95+ premium components. Build award-winning sites.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://motioncraft.dev",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/itsjwill",
    github: "https://github.com/itsjwill/motioncraft",
  },
  creator: "itsjwill",
  keywords: [
    "motioncraft",
    "animation",
    "react",
    "nextjs",
    "gsap",
    "framer-motion",
    "three.js",
    "tailwindcss",
    "ui-components",
    "web-design",
    "motion-design",
    "scroll-animations",
    "3d-web",
    "design-system",
  ],
};

// =============================================================================
// Metadata Generator
// =============================================================================

/**
 * Generate Next.js Metadata for a page
 *
 * @example
 * // In a page.tsx file:
 * export const metadata = generateMetadata({
 *   title: "Components",
 *   description: "Browse 50+ premium animation components",
 *   canonical: "/components"
 * });
 */
export function generateMetadata(page?: Partial<PageSEO>): Metadata {
  const title = page?.title
    ? `${page.title} | ${siteConfig.name}`
    : siteConfig.name;
  const description = page?.description || siteConfig.description;
  const keywords = [...(siteConfig.keywords || []), ...(page?.keywords || [])];
  const ogImage = page?.ogImage || siteConfig.ogImage;
  const url = page?.canonical
    ? `${siteConfig.url}${page.canonical}`
    : siteConfig.url;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
      creator: siteConfig.links?.twitter
        ? `@${siteConfig.links.twitter.split("/").pop()}`
        : undefined,
    },
    robots: page?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
}
