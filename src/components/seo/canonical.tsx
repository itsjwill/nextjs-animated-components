"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";

// =============================================================================
// Canonical URL Component
// =============================================================================
// Prevents duplicate content penalties by specifying the "official" URL
// Critical for: pagination, URL parameters, www vs non-www, http vs https

export interface CanonicalProps {
  /** Override the canonical URL (otherwise uses current path) */
  url?: string;
  /** Base URL of your site */
  baseUrl: string;
  /** Include trailing slash */
  trailingSlash?: boolean;
}

export function Canonical({
  url,
  baseUrl,
  trailingSlash = false,
}: CanonicalProps) {
  const pathname = usePathname();

  // Build canonical URL
  let canonicalUrl = url || `${baseUrl}${pathname}`;

  // Normalize: remove trailing slash unless explicitly wanted
  if (!trailingSlash && canonicalUrl.endsWith("/") && canonicalUrl !== baseUrl + "/") {
    canonicalUrl = canonicalUrl.slice(0, -1);
  } else if (trailingSlash && !canonicalUrl.endsWith("/")) {
    canonicalUrl = canonicalUrl + "/";
  }

  // Remove query parameters for canonical (they create duplicates)
  canonicalUrl = canonicalUrl.split("?")[0];

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

// =============================================================================
// Canonical Meta Tag (for App Router metadata)
// =============================================================================
// Use this in generateMetadata() for server-side canonical

export interface CanonicalMetaOptions {
  pathname: string;
  baseUrl: string;
  trailingSlash?: boolean;
}

export function getCanonicalUrl({
  pathname,
  baseUrl,
  trailingSlash = false,
}: CanonicalMetaOptions): string {
  let url = `${baseUrl}${pathname}`;

  // Normalize trailing slash
  if (!trailingSlash && url.endsWith("/") && url !== baseUrl + "/") {
    url = url.slice(0, -1);
  } else if (trailingSlash && !url.endsWith("/")) {
    url = url + "/";
  }

  // Remove query params
  return url.split("?")[0];
}

// =============================================================================
// Alternate Language Links (for multilingual sites)
// =============================================================================

export interface AlternateLanguage {
  hrefLang: string; // e.g., "en", "es", "fr", "x-default"
  href: string;
}

export interface HrefLangProps {
  alternates: AlternateLanguage[];
}

export function HrefLangTags({ alternates }: HrefLangProps) {
  return (
    <Head>
      {alternates.map((alt) => (
        <link
          key={alt.hrefLang}
          rel="alternate"
          hrefLang={alt.hrefLang}
          href={alt.href}
        />
      ))}
    </Head>
  );
}

// Helper to generate alternate links for metadata
export function getAlternateLanguages(
  pathname: string,
  baseUrls: Record<string, string> // { en: "https://example.com", es: "https://es.example.com" }
): AlternateLanguage[] {
  return Object.entries(baseUrls).map(([lang, baseUrl]) => ({
    hrefLang: lang,
    href: `${baseUrl}${pathname}`,
  }));
}

// =============================================================================
// Pagination Links (for paginated content)
// =============================================================================

export interface PaginationLinksProps {
  baseUrl: string;
  currentPage: number;
  totalPages: number;
  /** Query param name for page number */
  pageParam?: string;
}

export function PaginationLinks({
  baseUrl,
  currentPage,
  totalPages,
  pageParam = "page",
}: PaginationLinksProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?${pageParam}=${page}`;
  };

  return (
    <Head>
      {prevPage && <link rel="prev" href={getPageUrl(prevPage)} />}
      {nextPage && <link rel="next" href={getPageUrl(nextPage)} />}
    </Head>
  );
}

// Helper for metadata
export function getPaginationMeta(
  baseUrl: string,
  currentPage: number,
  totalPages: number,
  pageParam = "page"
): { prev?: string; next?: string } {
  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?${pageParam}=${page}`;
  };

  return {
    prev: currentPage > 1 ? getPageUrl(currentPage - 1) : undefined,
    next: currentPage < totalPages ? getPageUrl(currentPage + 1) : undefined,
  };
}
