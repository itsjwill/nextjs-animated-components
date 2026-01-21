"use client";

import { usePathname } from "next/navigation";
import {
  JsonLd,
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createSoftwareSchema,
} from "./json-ld";

// =============================================================================
// Site Configuration
// =============================================================================

const siteConfig = {
  name: "Awwwards UI",
  description:
    "The ultimate web animation toolkit. GSAP + Framer Motion + Lenis + Three.js + 50+ premium components.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://awwwards-ui.com",
  links: {
    github: "https://github.com/itsjwill/awwwards-ui",
  },
};

// =============================================================================
// SEO Head Component
// =============================================================================
// Automatically adds organization, website, software, and breadcrumb structured data

export interface SEOHeadProps {
  /** Additional JSON-LD schemas to include */
  additionalSchemas?: object[];
  /** Whether to include default schemas (organization, website, software) */
  includeDefaults?: boolean;
  /** Custom breadcrumb items (auto-generated from path if not provided) */
  breadcrumbs?: { name: string; url: string }[];
  /** Include software schema (for libraries/tools) */
  includeSoftware?: boolean;
}

export function SEOHead({
  additionalSchemas = [],
  includeDefaults = true,
  breadcrumbs,
  includeSoftware = true,
}: SEOHeadProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if not provided
  const breadcrumbItems = breadcrumbs || generateBreadcrumbsFromPath(pathname);

  const schemas: object[] = [];

  if (includeDefaults) {
    // Organization schema
    schemas.push(
      createOrganizationSchema({
        name: siteConfig.name,
        url: siteConfig.url,
        sameAs: [siteConfig.links.github],
        description: siteConfig.description,
      })
    );

    // Website schema with search action
    schemas.push(
      createWebsiteSchema({
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        searchAction: {
          target: `${siteConfig.url}/search?q={search_term_string}`,
          queryInput: "required name=search_term_string",
        },
      })
    );

    // Software schema (since this is a component library)
    if (includeSoftware) {
      schemas.push(
        createSoftwareSchema({
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          offers: {
            price: 0,
            priceCurrency: "USD",
          },
        })
      );
    }
  }

  // Add breadcrumbs if we have items
  if (breadcrumbItems.length > 0) {
    schemas.push(createBreadcrumbSchema(breadcrumbItems));
  }

  // Add any additional schemas
  schemas.push(...additionalSchemas);

  return <JsonLd data={schemas as any} />;
}

// =============================================================================
// Helper Functions
// =============================================================================

function generateBreadcrumbsFromPath(
  pathname: string
): { name: string; url: string }[] {
  if (pathname === "/") return [];

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { name: string; url: string }[] = [
    { name: "Home", url: siteConfig.url },
  ];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: formatSegmentName(segment),
      url: `${siteConfig.url}${currentPath}`,
    });
  }

  return breadcrumbs;
}

function formatSegmentName(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
