// =============================================================================
// Auto-SEO Engine
// =============================================================================
// Automatically extracts keywords, generates metadata, and creates structured
// data based on actual page content. No manual configuration required.

import type { Metadata } from "next";

// =============================================================================
// Types
// =============================================================================

export interface AutoSEOConfig {
  /** Site name - used in title templates */
  siteName: string;
  /** Site URL - used for canonical URLs and OG tags */
  siteUrl: string;
  /** Default OG image path */
  defaultOgImage?: string;
  /** Twitter handle (without @) */
  twitterHandle?: string;
  /** Default language */
  language?: string;
}

export interface PageContent {
  /** Page title/heading */
  title?: string;
  /** Page description or first paragraph */
  description?: string;
  /** Full text content of the page */
  content?: string;
  /** Page path (e.g., "/blog/my-post") */
  path?: string;
  /** Page type for schema detection */
  type?: "article" | "product" | "landing" | "docs" | "faq" | "about" | "contact";
  /** Published date (for articles) */
  publishedAt?: string;
  /** Modified date */
  modifiedAt?: string;
  /** Author name */
  author?: string;
  /** Custom image for this page */
  image?: string;
  /** Price (for products) */
  price?: number;
  /** Currency (for products) */
  currency?: string;
}

export interface ExtractedSEO {
  title: string;
  description: string;
  keywords: string[];
  metadata: Metadata;
  jsonLd: object[];
}

// =============================================================================
// Keyword Extraction
// =============================================================================

// Common words to ignore when extracting keywords
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of",
  "with", "by", "from", "as", "is", "was", "are", "were", "been", "be", "have",
  "has", "had", "do", "does", "did", "will", "would", "could", "should", "may",
  "might", "must", "shall", "can", "need", "dare", "ought", "used", "this",
  "that", "these", "those", "i", "you", "he", "she", "it", "we", "they", "what",
  "which", "who", "whom", "whose", "where", "when", "why", "how", "all", "each",
  "every", "both", "few", "more", "most", "other", "some", "such", "no", "nor",
  "not", "only", "own", "same", "so", "than", "too", "very", "just", "also",
  "now", "here", "there", "then", "once", "if", "because", "until", "while",
  "about", "into", "through", "during", "before", "after", "above", "below",
  "between", "under", "again", "further", "any", "your", "our", "their", "its",
  "my", "me", "him", "her", "us", "them", "being", "having", "doing", "get",
  "got", "getting", "make", "made", "making", "let", "lets", "go", "going",
  "went", "come", "came", "coming", "take", "took", "taking", "see", "saw",
  "seeing", "know", "knew", "knowing", "think", "thought", "thinking", "want",
  "wanted", "wanting", "use", "using", "find", "found", "finding", "give",
  "gave", "giving", "tell", "told", "telling", "work", "worked", "working",
  "call", "called", "calling", "try", "tried", "trying", "ask", "asked",
  "asking", "seem", "seemed", "seeming", "feel", "felt", "feeling", "become",
  "became", "becoming", "leave", "left", "leaving", "put", "putting", "keep",
  "kept", "keeping", "begin", "began", "beginning", "show", "showed", "showing",
  "hear", "heard", "hearing", "play", "played", "playing", "run", "ran",
  "running", "move", "moved", "moving", "live", "lived", "living", "believe",
  "believed", "believing", "bring", "brought", "bringing", "happen", "happened",
  "write", "wrote", "writing", "provide", "provided", "providing", "sit", "sat",
  "sitting", "stand", "stood", "standing", "lose", "lost", "losing", "pay",
  "paid", "paying", "meet", "met", "meeting", "include", "included", "including",
  "continue", "continued", "set", "setting", "learn", "learned", "learning",
  "change", "changed", "changing", "lead", "led", "leading", "understand",
  "understood", "watch", "watched", "watching", "follow", "followed", "stop",
  "stopped", "create", "created", "creating", "speak", "spoke", "speaking",
  "read", "reading", "allow", "allowed", "allowing", "add", "added", "adding",
  "spend", "spent", "spending", "grow", "grew", "growing", "open", "opened",
  "opening", "walk", "walked", "walking", "win", "won", "winning", "offer",
  "offered", "offering", "remember", "remembered", "love", "loved", "loving",
  "consider", "considered", "appear", "appeared", "buy", "bought", "buying",
  "wait", "waited", "waiting", "serve", "served", "serving", "die", "died",
  "send", "sent", "sending", "expect", "expected", "build", "built", "building",
  "stay", "stayed", "staying", "fall", "fell", "falling", "cut", "cutting",
  "reach", "reached", "reaching", "kill", "killed", "remain", "remained",
]);

// Tech-related keywords to boost
const TECH_KEYWORDS = new Set([
  "react", "nextjs", "next.js", "typescript", "javascript", "css", "html",
  "tailwind", "tailwindcss", "gsap", "framer", "motion", "animation", "three",
  "threejs", "three.js", "webgl", "3d", "ui", "ux", "design", "component",
  "components", "library", "framework", "api", "frontend", "backend", "fullstack",
  "web", "app", "application", "mobile", "responsive", "performance", "seo",
  "accessibility", "a11y", "testing", "deployment", "hosting", "vercel",
  "netlify", "aws", "docker", "kubernetes", "ci", "cd", "git", "github",
  "npm", "yarn", "pnpm", "webpack", "vite", "esbuild", "rollup", "babel",
  "eslint", "prettier", "node", "nodejs", "express", "graphql", "rest",
  "database", "sql", "nosql", "mongodb", "postgres", "redis", "prisma",
  "scroll", "parallax", "hover", "cursor", "magnetic", "glow", "gradient",
  "aurora", "spotlight", "meteor", "particle", "canvas", "svg", "lenis",
]);

/**
 * Extract keywords from text content
 */
export function extractKeywords(
  text: string,
  maxKeywords: number = 15
): string[] {
  if (!text) return [];

  // Normalize text
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Split into words
  const words = normalized.split(" ");

  // Count word frequency
  const wordCount = new Map<string, number>();

  for (const word of words) {
    // Skip short words and stop words
    if (word.length < 3 || STOP_WORDS.has(word)) continue;

    const count = wordCount.get(word) || 0;
    wordCount.set(word, count + 1);
  }

  // Score words (frequency + tech bonus)
  const scored = Array.from(wordCount.entries()).map(([word, count]) => {
    let score = count;
    // Boost tech keywords
    if (TECH_KEYWORDS.has(word)) {
      score *= 3;
    }
    // Boost longer words slightly
    if (word.length > 6) {
      score *= 1.2;
    }
    return { word, score };
  });

  // Sort by score and take top keywords
  scored.sort((a, b) => b.score - a.score);

  // Extract bigrams (two-word phrases) for compound keywords
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (
      w1.length >= 3 &&
      w2.length >= 3 &&
      !STOP_WORDS.has(w1) &&
      !STOP_WORDS.has(w2)
    ) {
      const bigram = `${w1} ${w2}`;
      if (TECH_KEYWORDS.has(w1) || TECH_KEYWORDS.has(w2)) {
        bigrams.push(bigram);
      }
    }
  }

  // Combine single words and bigrams
  const keywords = [
    ...bigrams.slice(0, 5),
    ...scored.slice(0, maxKeywords).map((s) => s.word),
  ];

  // Deduplicate and limit
  return Array.from(new Set(keywords)).slice(0, maxKeywords);
}

/**
 * Generate a description from content
 */
export function generateDescription(
  content: string,
  maxLength: number = 160
): string {
  if (!content) return "";

  // Clean the content
  const cleaned = content
    .replace(/\s+/g, " ")
    .replace(/[#*_`]/g, "")
    .trim();

  // Find first meaningful sentence
  const sentences = cleaned.split(/[.!?]+/).filter((s) => s.trim().length > 20);

  if (sentences.length === 0) {
    return cleaned.slice(0, maxLength).trim() + (cleaned.length > maxLength ? "..." : "");
  }

  // Take first 1-2 sentences that fit
  let description = "";
  for (const sentence of sentences) {
    const test = description ? `${description}. ${sentence.trim()}` : sentence.trim();
    if (test.length <= maxLength - 3) {
      description = test;
    } else {
      break;
    }
  }

  if (!description) {
    description = sentences[0].trim().slice(0, maxLength - 3);
  }

  return description + (description.length < cleaned.length ? "." : "");
}

// =============================================================================
// Auto-SEO Generator
// =============================================================================

/**
 * Main Auto-SEO function - extracts everything from page content
 */
export function autoSEO(
  config: AutoSEOConfig,
  page: PageContent
): ExtractedSEO {
  const {
    siteName,
    siteUrl,
    defaultOgImage = "/og-image.png",
    twitterHandle,
    language = "en",
  } = config;

  // Extract data from page content
  const title = page.title || siteName;
  const fullContent = [page.title, page.description, page.content]
    .filter(Boolean)
    .join(" ");

  const description =
    page.description || generateDescription(fullContent, 160);
  const keywords = extractKeywords(fullContent, 15);
  const image = page.image || defaultOgImage;
  const url = page.path ? `${siteUrl}${page.path}` : siteUrl;

  // Generate metadata
  const metadata: Metadata = {
    title: page.title ? `${page.title} | ${siteName}` : siteName,
    description,
    keywords,
    authors: page.author ? [{ name: page.author }] : undefined,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: page.type === "article" ? "article" : "website",
      locale: language === "en" ? "en_US" : language,
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(page.type === "article" && page.publishedAt
        ? {
            publishedTime: page.publishedAt,
            modifiedTime: page.modifiedAt || page.publishedAt,
            authors: page.author ? [page.author] : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: twitterHandle ? `@${twitterHandle}` : undefined,
    },
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
  };

  // Generate JSON-LD based on page type
  const jsonLd: object[] = [];

  // Always add WebSite schema
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  // Add page-specific schema
  switch (page.type) {
    case "article":
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        image,
        datePublished: page.publishedAt,
        dateModified: page.modifiedAt || page.publishedAt,
        author: page.author
          ? {
              "@type": "Person",
              name: page.author,
            }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
        keywords: keywords.join(", "),
      });
      break;

    case "product":
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description,
        image,
        offers: page.price
          ? {
              "@type": "Offer",
              price: page.price,
              priceCurrency: page.currency || "USD",
              availability: "https://schema.org/InStock",
            }
          : undefined,
      });
      break;

    case "faq":
      // For FAQ pages, you'd pass questions in content as JSON
      // This is a placeholder - actual implementation would parse FAQ structure
      break;

    default:
      // For landing pages, add SoftwareApplication schema (for component libraries)
      if (
        keywords.some((k) =>
          ["component", "library", "ui", "react", "nextjs"].includes(k)
        )
      ) {
        jsonLd.push({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: siteName,
          description,
          url: siteUrl,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "USD",
          },
        });
      }
  }

  // Add breadcrumb if we have a path
  if (page.path && page.path !== "/") {
    const segments = page.path.split("/").filter(Boolean);
    const breadcrumbItems = [
      { name: "Home", url: siteUrl },
      ...segments.map((segment, index) => ({
        name: segment
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        url: `${siteUrl}/${segments.slice(0, index + 1).join("/")}`,
      })),
    ];

    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return {
    title,
    description,
    keywords,
    metadata,
    jsonLd,
  };
}

// =============================================================================
// React Hook for Auto-SEO (Client-Side)
// =============================================================================

/**
 * Extract SEO data from the current page's visible content
 * Use this in a useEffect to analyze rendered content
 */
export function extractPageContent(): Partial<PageContent> {
  if (typeof window === "undefined") return {};

  // Get title from h1 or document title
  const h1 = document.querySelector("h1");
  const title = h1?.textContent || document.title;

  // Get description from meta or first paragraph
  const metaDesc = document.querySelector('meta[name="description"]');
  const firstP = document.querySelector("main p, article p, .content p");
  const description =
    metaDesc?.getAttribute("content") || firstP?.textContent || "";

  // Get full text content from main content area
  const mainContent =
    document.querySelector("main") ||
    document.querySelector("article") ||
    document.querySelector('[role="main"]') ||
    document.body;

  const content = mainContent?.textContent || "";

  // Detect page type from URL or content
  const path = window.location.pathname;
  let type: PageContent["type"] = "landing";

  if (path.includes("/blog") || path.includes("/article") || path.includes("/post")) {
    type = "article";
  } else if (path.includes("/product") || path.includes("/pricing")) {
    type = "product";
  } else if (path.includes("/docs") || path.includes("/documentation")) {
    type = "docs";
  } else if (path.includes("/faq")) {
    type = "faq";
  } else if (path.includes("/about")) {
    type = "about";
  } else if (path.includes("/contact")) {
    type = "contact";
  }

  return {
    title,
    description,
    content,
    path,
    type,
  };
}

// =============================================================================
// Configuration Helper
// =============================================================================

/**
 * Create Auto-SEO config from environment variables or defaults
 */
export function createAutoSEOConfig(
  overrides?: Partial<AutoSEOConfig>
): AutoSEOConfig {
  return {
    siteName: overrides?.siteName || process.env.NEXT_PUBLIC_SITE_NAME || "My Website",
    siteUrl: overrides?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    defaultOgImage: overrides?.defaultOgImage || "/og-image.png",
    twitterHandle: overrides?.twitterHandle || process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    language: overrides?.language || "en",
  };
}
