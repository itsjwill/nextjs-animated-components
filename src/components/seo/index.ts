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
// Pre-built JSON-LD Components (15 schemas)
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
  // Star Ratings & Reviews
  ReviewJsonLd,
  AggregateRatingJsonLd,
  // Services & Tutorials
  ServiceJsonLd,
  HowToJsonLd,
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
  // Star Ratings & Reviews
  createReviewSchema,
  createAggregateRatingSchema,
  // Services & Tutorials
  createServiceSchema,
  createHowToSchema,
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
  // Star Ratings & Reviews
  ReviewProps,
  AggregateRatingProps,
  // Services & Tutorials
  ServiceProps,
  HowToProps,
  HowToStep,
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

// -----------------------------------------------------------------------------
// Visual Breadcrumbs (UX + SEO)
// -----------------------------------------------------------------------------
export {
  Breadcrumbs,
  CollapsibleBreadcrumbs,
  AutoBreadcrumbs,
} from "./breadcrumbs";
export type {
  BreadcrumbProps,
  CollapsibleBreadcrumbsProps,
  AutoBreadcrumbsProps,
} from "./breadcrumbs";

// -----------------------------------------------------------------------------
// Social Share (Link Building)
// -----------------------------------------------------------------------------
export {
  SocialShare,
  NativeShare,
  ShareCountButton,
} from "./social-share";
export type {
  SocialShareProps,
  ShareData,
  NativeShareProps,
  ShareCountButtonProps,
} from "./social-share";

// -----------------------------------------------------------------------------
// SEO Analyzer (Audit Tool)
// -----------------------------------------------------------------------------
export { SEOAnalyzer, analyzeSEO } from "./seo-analyzer";
export type { SEOAnalyzerProps, SEOAnalysis, SEOIssue } from "./seo-analyzer";

// -----------------------------------------------------------------------------
// Analytics (GA4, Plausible, Fathom, Umami, PostHog)
// -----------------------------------------------------------------------------
export {
  // Universal
  Analytics,
  // Individual providers
  GoogleAnalytics,
  PlausibleAnalytics,
  FathomAnalytics,
  UmamiAnalytics,
  PostHogAnalytics,
  // Event tracking helpers
  trackEvent,
  trackPlausibleEvent,
  trackFathomGoal,
  trackUmamiEvent,
  trackPostHogEvent,
} from "./analytics";
export type {
  AnalyticsConfig,
  GoogleAnalyticsProps,
  PlausibleProps,
  FathomProps,
  UmamiProps,
  PostHogProps,
} from "./analytics";

// -----------------------------------------------------------------------------
// Canonical URLs & Pagination
// -----------------------------------------------------------------------------
export {
  Canonical,
  getCanonicalUrl,
  HrefLangTags,
  getAlternateLanguages,
  PaginationLinks,
  getPaginationMeta,
} from "./canonical";
export type {
  CanonicalProps,
  CanonicalMetaOptions,
  AlternateLanguage,
  HrefLangProps,
  PaginationLinksProps,
} from "./canonical";

// -----------------------------------------------------------------------------
// RSS / Atom / JSON Feed Generators
// -----------------------------------------------------------------------------
export {
  generateRSS,
  generateAtom,
  generateJsonFeed,
  createRSSResponse,
  createAtomResponse,
  createJsonFeedResponse,
  getFeedLinkTags,
} from "./rss-feed";
export type {
  FeedItem,
  FeedConfig,
  FeedLinksProps,
  JsonFeed,
  JsonFeedItem,
} from "./rss-feed";

// -----------------------------------------------------------------------------
// Web Vitals (Core Web Vitals Reporting)
// -----------------------------------------------------------------------------
export {
  WebVitalsReporter,
  WebVitalsDisplay,
  useWebVitals,
} from "./web-vitals";
export type {
  WebVitalsMetric,
  WebVitalsReporterProps,
  WebVitalsDisplayProps,
} from "./web-vitals";
