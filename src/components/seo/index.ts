// =============================================================================
// SEO Components - Complete SEO Toolkit
// =============================================================================

// -----------------------------------------------------------------------------
// Auto-SEO (Automatic keyword extraction & metadata generation)
// -----------------------------------------------------------------------------
export { AutoSEO, generateAutoMetadata, SEOConfigProvider, useSEOConfig } from "./auto-seo";
export type { AutoSEOProps, GenerateAutoMetadataOptions, SEOConfigProviderProps } from "./auto-seo";

// -----------------------------------------------------------------------------
// SEO Setup Wizard
// -----------------------------------------------------------------------------
export { SEOSetup, generateEnvContent, useStoredSEOConfig } from "./seo-setup";
export type { SEOSetupProps } from "./seo-setup";

// -----------------------------------------------------------------------------
// Core JSON-LD Component
// -----------------------------------------------------------------------------
export { JsonLd } from "./json-ld";

// -----------------------------------------------------------------------------
// Pre-built JSON-LD Components (11 schemas)
// -----------------------------------------------------------------------------
export {
  OrganizationJsonLd,
  WebsiteJsonLd,
  ArticleJsonLd,
  ProductJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
  SoftwareJsonLd,
  VideoJsonLd,
  LocalBusinessJsonLd,
  EventJsonLd,
  CourseJsonLd,
} from "./json-ld";

// -----------------------------------------------------------------------------
// Schema Creators (for custom implementations)
// -----------------------------------------------------------------------------
export {
  createOrganizationSchema,
  createWebsiteSchema,
  createArticleSchema,
  createProductSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createSoftwareSchema,
  createVideoSchema,
  createLocalBusinessSchema,
  createEventSchema,
  createCourseSchema,
} from "./json-ld";

// -----------------------------------------------------------------------------
// SEO Head Component (auto-generates common schemas)
// -----------------------------------------------------------------------------
export { SEOHead } from "./seo-head";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type {
  OrganizationProps,
  WebsiteProps,
  ArticleProps,
  ProductProps,
  BreadcrumbItem,
  FAQItem,
  SoftwareProps,
  VideoProps,
  LocalBusinessProps,
  EventProps,
  CourseProps,
} from "./json-ld";

// -----------------------------------------------------------------------------
// Auto-SEO Utilities
// -----------------------------------------------------------------------------
export {
  autoSEO,
  extractKeywords,
  generateDescription,
  extractPageContent,
  createAutoSEOConfig,
} from "@/lib/auto-seo";

export type {
  AutoSEOConfig,
  PageContent,
  ExtractedSEO,
} from "@/lib/auto-seo";

// -----------------------------------------------------------------------------
// Metadata Utilities
// -----------------------------------------------------------------------------
export { siteConfig, generateMetadata } from "@/lib/seo";
export type { SiteConfig, PageSEO } from "@/lib/seo";
