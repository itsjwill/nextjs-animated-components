"use client";

import type {
  WithContext,
  Organization,
  WebSite,
  Article,
  Product,
  BreadcrumbList,
  FAQPage,
  SoftwareApplication,
  Person,
  VideoObject,
  LocalBusiness,
  Event,
  Course,
  Recipe,
  HowTo,
  Review,
} from "schema-dts";

// =============================================================================
// JSON-LD Script Component
// =============================================================================
// Type-safe structured data using Google's schema-dts

export interface JsonLdProps<T> {
  data: WithContext<T> | WithContext<T>[];
}

export function JsonLd<T>({ data }: JsonLdProps<T>) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

// =============================================================================
// Type-Safe JSON-LD Schema Generators
// =============================================================================

export interface OrganizationProps {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  description?: string;
}

export function createOrganizationSchema(
  props: OrganizationProps
): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: props.name,
    url: props.url,
    logo: props.logo,
    description: props.description,
    sameAs: props.sameAs,
  };
}

export interface WebsiteProps {
  name: string;
  url: string;
  description?: string;
  searchAction?: {
    target: string;
    queryInput: string;
  };
}

export function createWebsiteSchema(
  props: WebsiteProps
): WithContext<WebSite> {
  const schema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: props.name,
    url: props.url,
    description: props.description,
  };

  if (props.searchAction) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: props.searchAction.target,
      // @ts-expect-error - query-input is valid but not in types
      "query-input": props.searchAction.queryInput,
    };
  }

  return schema;
}

export interface ArticleProps {
  headline: string;
  description: string;
  url: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
}

export function createArticleSchema(
  props: ArticleProps
): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.headline,
    description: props.description,
    url: props.url,
    image: props.image,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    author: {
      "@type": "Person",
      name: props.author.name,
      url: props.author.url,
    },
    publisher: props.publisher
      ? {
          "@type": "Organization",
          name: props.publisher.name,
          logo: props.publisher.logo
            ? {
                "@type": "ImageObject",
                url: props.publisher.logo,
              }
            : undefined,
        }
      : undefined,
  };
}

export interface ProductProps {
  name: string;
  description: string;
  image?: string | string[];
  brand?: string;
  sku?: string;
  offers?: {
    price: number | string;
    priceCurrency: string;
    availability: "InStock" | "OutOfStock" | "PreOrder" | "Discontinued";
    url?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function createProductSchema(
  props: ProductProps
): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: props.name,
    description: props.description,
    image: props.image,
    sku: props.sku,
    brand: props.brand
      ? {
          "@type": "Brand",
          name: props.brand,
        }
      : undefined,
    offers: props.offers
      ? {
          "@type": "Offer",
          price: props.offers.price,
          priceCurrency: props.offers.priceCurrency,
          availability: `https://schema.org/${props.offers.availability}`,
          url: props.offers.url,
        }
      : undefined,
    aggregateRating: props.aggregateRating
      ? {
          "@type": "AggregateRating",
          ratingValue: props.aggregateRating.ratingValue,
          reviewCount: props.aggregateRating.reviewCount,
        }
      : undefined,
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function createFAQSchema(items: FAQItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface SoftwareProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    price: number | string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export function createSoftwareSchema(
  props: SoftwareProps
): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: props.name,
    description: props.description,
    url: props.url,
    applicationCategory: props.applicationCategory,
    operatingSystem: props.operatingSystem || "Any",
    offers: {
      "@type": "Offer",
      price: props.offers?.price ?? 0,
      priceCurrency: props.offers?.priceCurrency ?? "USD",
    },
    aggregateRating: props.aggregateRating
      ? {
          "@type": "AggregateRating",
          ratingValue: props.aggregateRating.ratingValue,
          ratingCount: props.aggregateRating.ratingCount,
        }
      : undefined,
  };
}

export interface VideoProps {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 format (e.g., "PT1M33S")
}

export function createVideoSchema(
  props: VideoProps
): WithContext<VideoObject> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: props.name,
    description: props.description,
    thumbnailUrl: props.thumbnailUrl,
    uploadDate: props.uploadDate,
    contentUrl: props.contentUrl,
    embedUrl: props.embedUrl,
    duration: props.duration,
  };
}

export interface LocalBusinessProps {
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string | string[];
}

export function createLocalBusinessSchema(
  props: LocalBusinessProps
): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: props.name,
    description: props.description,
    url: props.url,
    telephone: props.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    geo: props.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: props.geo.latitude,
          longitude: props.geo.longitude,
        }
      : undefined,
    openingHoursSpecification: props.openingHours,
    priceRange: props.priceRange,
    image: props.image,
  };
}

export interface EventProps {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  url?: string;
  image?: string | string[];
  offers?: {
    price: number | string;
    priceCurrency: string;
    availability: "InStock" | "SoldOut" | "PreOrder";
    url?: string;
  };
  performer?: {
    name: string;
  };
  organizer?: {
    name: string;
    url?: string;
  };
}

export function createEventSchema(props: EventProps): WithContext<Event> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: props.name,
    description: props.description,
    startDate: props.startDate,
    endDate: props.endDate,
    location: {
      "@type": "Place",
      name: props.location.name,
      address: props.location.address,
    },
    url: props.url,
    image: props.image,
    offers: props.offers
      ? {
          "@type": "Offer",
          price: props.offers.price,
          priceCurrency: props.offers.priceCurrency,
          availability: `https://schema.org/${props.offers.availability}`,
          url: props.offers.url,
        }
      : undefined,
    performer: props.performer
      ? {
          "@type": "Person",
          name: props.performer.name,
        }
      : undefined,
    organizer: props.organizer
      ? {
          "@type": "Organization",
          name: props.organizer.name,
          url: props.organizer.url,
        }
      : undefined,
  };
}

export interface CourseProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
  };
  url?: string;
  offers?: {
    price: number | string;
    priceCurrency: string;
  };
}

export function createCourseSchema(props: CourseProps): WithContext<Course> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: props.name,
    description: props.description,
    provider: {
      "@type": "Organization",
      name: props.provider.name,
      url: props.provider.url,
    },
    url: props.url,
    offers: props.offers
      ? {
          "@type": "Offer",
          price: props.offers.price,
          priceCurrency: props.offers.priceCurrency,
        }
      : undefined,
  };
}

// =============================================================================
// Pre-built JSON-LD Components
// =============================================================================

export function OrganizationJsonLd(props: OrganizationProps) {
  return <JsonLd data={createOrganizationSchema(props)} />;
}

export function WebsiteJsonLd(props: WebsiteProps) {
  return <JsonLd data={createWebsiteSchema(props)} />;
}

export function ArticleJsonLd(props: ArticleProps) {
  return <JsonLd data={createArticleSchema(props)} />;
}

export function ProductJsonLd(props: ProductProps) {
  return <JsonLd data={createProductSchema(props)} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLd data={createBreadcrumbSchema(items)} />;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  return <JsonLd data={createFAQSchema(items)} />;
}

export function SoftwareJsonLd(props: SoftwareProps) {
  return <JsonLd data={createSoftwareSchema(props)} />;
}

export function VideoJsonLd(props: VideoProps) {
  return <JsonLd data={createVideoSchema(props)} />;
}

export function LocalBusinessJsonLd(props: LocalBusinessProps) {
  return <JsonLd data={createLocalBusinessSchema(props)} />;
}

export function EventJsonLd(props: EventProps) {
  return <JsonLd data={createEventSchema(props)} />;
}

export function CourseJsonLd(props: CourseProps) {
  return <JsonLd data={createCourseSchema(props)} />;
}
