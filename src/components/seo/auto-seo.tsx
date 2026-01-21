"use client";

import { useEffect, useState } from "react";
import { JsonLd } from "./json-ld";
import {
  autoSEO,
  extractPageContent,
  createAutoSEOConfig,
  type AutoSEOConfig,
  type PageContent,
} from "@/lib/auto-seo";

// =============================================================================
// AutoSEO Component
// =============================================================================
// Drop this component into any page and it automatically:
// 1. Extracts keywords from your content
// 2. Generates JSON-LD structured data
// 3. No configuration needed (but you can customize)

export interface AutoSEOProps {
  /** Override auto-detected page content */
  page?: Partial<PageContent>;
  /** Custom site configuration (uses env vars by default) */
  config?: Partial<AutoSEOConfig>;
  /** Disable client-side content extraction */
  disableClientExtraction?: boolean;
}

export function AutoSEO({
  page: pageProp,
  config: configProp,
  disableClientExtraction = false,
}: AutoSEOProps) {
  const [jsonLd, setJsonLd] = useState<object[]>([]);
  const [extracted, setExtracted] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;
    if (extracted) return;

    // Create config from env vars + overrides
    const config = createAutoSEOConfig(configProp);

    // Extract content from page (client-side)
    let pageContent: Partial<PageContent> = {};

    if (!disableClientExtraction) {
      pageContent = extractPageContent();
    }

    // Merge with provided props (props take precedence)
    const finalPage: PageContent = {
      ...pageContent,
      ...pageProp,
    } as PageContent;

    // Generate SEO data
    const seo = autoSEO(config, finalPage);

    // Set JSON-LD for rendering
    setJsonLd(seo.jsonLd);
    setExtracted(true);

    // Log extracted keywords in development
    if (process.env.NODE_ENV === "development") {
      console.log("[AutoSEO] Extracted keywords:", seo.keywords);
      console.log("[AutoSEO] Generated description:", seo.description);
    }
  }, [pageProp, configProp, disableClientExtraction, extracted]);

  if (jsonLd.length === 0) return null;

  return <JsonLd data={jsonLd as any} />;
}

// =============================================================================
// Server-Side Auto Metadata Generator
// =============================================================================
// Use this in your page.tsx to generate metadata at build time

import type { Metadata } from "next";

export interface GenerateAutoMetadataOptions {
  /** Page title (auto-extracted from content if not provided) */
  title?: string;
  /** Page description (auto-generated from content if not provided) */
  description?: string;
  /** Full page content for keyword extraction */
  content?: string;
  /** Page path for canonical URL */
  path?: string;
  /** Page type for schema selection */
  type?: PageContent["type"];
  /** Additional keywords to include */
  additionalKeywords?: string[];
  /** Site config overrides */
  config?: Partial<AutoSEOConfig>;
}

/**
 * Generate metadata with automatic keyword extraction
 *
 * @example
 * // In your page.tsx:
 * export const metadata = generateAutoMetadata({
 *   title: "Animation Components",
 *   content: "Build stunning animations with our 50+ premium React components...",
 *   path: "/components"
 * });
 */
export function generateAutoMetadata(
  options: GenerateAutoMetadataOptions
): Metadata {
  const config = createAutoSEOConfig(options.config);

  const page: PageContent = {
    title: options.title,
    description: options.description,
    content: options.content,
    path: options.path,
    type: options.type,
  };

  const seo = autoSEO(config, page);

  // Add any additional keywords
  if (options.additionalKeywords) {
    seo.keywords.push(...options.additionalKeywords);
  }

  return {
    ...seo.metadata,
    keywords: Array.from(new Set(seo.keywords)), // Dedupe
  };
}

// =============================================================================
// SEO Config Provider
// =============================================================================
// Wrap your app with this to set site-wide SEO config

import { createContext, useContext, type ReactNode } from "react";

const SEOConfigContext = createContext<AutoSEOConfig | null>(null);

export interface SEOConfigProviderProps {
  children: ReactNode;
  config: AutoSEOConfig;
}

export function SEOConfigProvider({ children, config }: SEOConfigProviderProps) {
  return (
    <SEOConfigContext.Provider value={config}>
      {children}
    </SEOConfigContext.Provider>
  );
}

export function useSEOConfig(): AutoSEOConfig {
  const config = useContext(SEOConfigContext);
  if (!config) {
    // Return default config if provider not used
    return createAutoSEOConfig();
  }
  return config;
}
