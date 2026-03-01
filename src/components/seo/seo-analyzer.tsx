"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// SEO Analyzer - Audit Your Pages in Real-Time
// =============================================================================
// Checks for common SEO issues and provides actionable recommendations

export interface SEOIssue {
  type: "error" | "warning" | "info" | "success";
  category: string;
  message: string;
  recommendation?: string;
  impact: "high" | "medium" | "low";
}

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  metadata: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
  };
}

export interface SEOAnalyzerProps {
  className?: string;
  showInProduction?: boolean;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function SEOAnalyzer({
  className,
  showInProduction = false,
  position = "bottom-right",
}: SEOAnalyzerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Don't show in production unless explicitly enabled
  const isDev = process.env.NODE_ENV === "development";

  const runAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    const issues: SEOIssue[] = [];

    // =========================================================================
    // Title Analysis
    // =========================================================================
    const title = document.title;
    if (!title) {
      issues.push({
        type: "error",
        category: "Title",
        message: "Missing page title",
        recommendation: "Add a unique, descriptive title tag (50-60 characters)",
        impact: "high",
      });
    } else if (title.length < 30) {
      issues.push({
        type: "warning",
        category: "Title",
        message: `Title too short (${title.length} chars)`,
        recommendation: "Aim for 50-60 characters for optimal display in search results",
        impact: "medium",
      });
    } else if (title.length > 60) {
      issues.push({
        type: "warning",
        category: "Title",
        message: `Title too long (${title.length} chars)`,
        recommendation: "Keep under 60 characters to prevent truncation in search results",
        impact: "medium",
      });
    } else {
      issues.push({
        type: "success",
        category: "Title",
        message: `Title length optimal (${title.length} chars)`,
        impact: "low",
      });
    }

    // =========================================================================
    // Meta Description
    // =========================================================================
    const metaDesc = document.querySelector('meta[name="description"]');
    const description = metaDesc?.getAttribute("content");
    if (!description) {
      issues.push({
        type: "error",
        category: "Meta Description",
        message: "Missing meta description",
        recommendation: "Add a compelling meta description (150-160 characters)",
        impact: "high",
      });
    } else if (description.length < 120) {
      issues.push({
        type: "warning",
        category: "Meta Description",
        message: `Description too short (${description.length} chars)`,
        recommendation: "Aim for 150-160 characters for full visibility",
        impact: "medium",
      });
    } else if (description.length > 160) {
      issues.push({
        type: "warning",
        category: "Meta Description",
        message: `Description too long (${description.length} chars)`,
        recommendation: "Keep under 160 characters to prevent truncation",
        impact: "low",
      });
    } else {
      issues.push({
        type: "success",
        category: "Meta Description",
        message: `Description length optimal (${description.length} chars)`,
        impact: "low",
      });
    }

    // =========================================================================
    // Canonical URL
    // =========================================================================
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      issues.push({
        type: "warning",
        category: "Canonical",
        message: "Missing canonical URL",
        recommendation: "Add a canonical URL to prevent duplicate content issues",
        impact: "medium",
      });
    } else {
      issues.push({
        type: "success",
        category: "Canonical",
        message: "Canonical URL present",
        impact: "low",
      });
    }

    // =========================================================================
    // Open Graph Tags
    // =========================================================================
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogType = document.querySelector('meta[property="og:type"]');

    if (!ogTitle || !ogDesc || !ogImage) {
      issues.push({
        type: "warning",
        category: "Open Graph",
        message: "Incomplete Open Graph tags",
        recommendation: "Add og:title, og:description, og:image for better social sharing",
        impact: "medium",
      });
    } else {
      issues.push({
        type: "success",
        category: "Open Graph",
        message: "Open Graph tags complete",
        impact: "low",
      });
    }

    // =========================================================================
    // Twitter Card
    // =========================================================================
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      issues.push({
        type: "info",
        category: "Twitter Card",
        message: "Missing Twitter card meta tags",
        recommendation: "Add twitter:card for better Twitter sharing",
        impact: "low",
      });
    }

    // =========================================================================
    // Heading Structure
    // =========================================================================
    const h1s = document.querySelectorAll("h1");
    if (h1s.length === 0) {
      issues.push({
        type: "error",
        category: "Headings",
        message: "Missing H1 tag",
        recommendation: "Add exactly one H1 tag per page",
        impact: "high",
      });
    } else if (h1s.length > 1) {
      issues.push({
        type: "warning",
        category: "Headings",
        message: `Multiple H1 tags found (${h1s.length})`,
        recommendation: "Use only one H1 tag per page",
        impact: "medium",
      });
    } else {
      issues.push({
        type: "success",
        category: "Headings",
        message: "Single H1 tag present",
        impact: "low",
      });
    }

    // =========================================================================
    // Images Alt Text
    // =========================================================================
    const images = document.querySelectorAll("img");
    const imagesWithoutAlt = Array.from(images).filter(
      (img) => !img.getAttribute("alt")
    );
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: "warning",
        category: "Images",
        message: `${imagesWithoutAlt.length} image(s) missing alt text`,
        recommendation: "Add descriptive alt text to all images for accessibility and SEO",
        impact: "medium",
      });
    } else if (images.length > 0) {
      issues.push({
        type: "success",
        category: "Images",
        message: "All images have alt text",
        impact: "low",
      });
    }

    // =========================================================================
    // JSON-LD Structured Data
    // =========================================================================
    const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLd.length === 0) {
      issues.push({
        type: "warning",
        category: "Structured Data",
        message: "No JSON-LD structured data found",
        recommendation: "Add structured data for rich snippets in search results",
        impact: "medium",
      });
    } else {
      issues.push({
        type: "success",
        category: "Structured Data",
        message: `${jsonLd.length} JSON-LD script(s) found`,
        impact: "low",
      });
    }

    // =========================================================================
    // Viewport Meta
    // =========================================================================
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      issues.push({
        type: "error",
        category: "Mobile",
        message: "Missing viewport meta tag",
        recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
        impact: "high",
      });
    }

    // =========================================================================
    // Language
    // =========================================================================
    const htmlLang = document.documentElement.lang;
    if (!htmlLang) {
      issues.push({
        type: "warning",
        category: "Accessibility",
        message: "Missing lang attribute on <html>",
        recommendation: 'Add lang="en" (or appropriate language) to <html> tag',
        impact: "medium",
      });
    }

    // =========================================================================
    // Links
    // =========================================================================
    const links = document.querySelectorAll("a");
    const linksWithoutHref = Array.from(links).filter(
      (a) => !a.getAttribute("href") || a.getAttribute("href") === "#"
    );
    if (linksWithoutHref.length > 0) {
      issues.push({
        type: "info",
        category: "Links",
        message: `${linksWithoutHref.length} link(s) with empty or # href`,
        recommendation: "Ensure all links have meaningful href values",
        impact: "low",
      });
    }

    // =========================================================================
    // Calculate Score
    // =========================================================================
    const errorCount = issues.filter((i) => i.type === "error").length;
    const warningCount = issues.filter((i) => i.type === "warning").length;
    const score = Math.max(
      0,
      100 - errorCount * 20 - warningCount * 5
    );

    setAnalysis({
      score,
      issues,
      metadata: {
        title,
        description: description || undefined,
        canonical: canonical?.getAttribute("href") || undefined,
        ogImage: ogImage?.getAttribute("content") || undefined,
      },
    });
    setIsAnalyzing(false);
  }, []);

  useEffect(() => {
    if (isOpen && !analysis) {
      runAnalysis();
    }
  }, [isOpen, analysis, runAnalysis]);

  if (!isDev && !showInProduction) return null;

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };

  const getTypeIcon = (type: SEOIssue["type"]) => {
    switch (type) {
      case "error":
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case "info":
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "success":
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-colors",
          "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900",
          "hover:bg-neutral-800 dark:hover:bg-neutral-100"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span className="text-sm font-medium">SEO</span>
        {analysis && (
          <span className={cn("text-sm font-bold", getScoreColor(analysis.score))}>
            {analysis.score}
          </span>
        )}
      </motion.button>

      {/* Analysis Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute mt-2 w-96 max-h-[70vh] overflow-auto",
              "bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800",
              position.includes("right") ? "right-0" : "left-0",
              position.includes("bottom") ? "bottom-full mb-2" : "top-full"
            )}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900 dark:text-white">
                  SEO Analysis
                </h3>
                <button
                  onClick={() => {
                    setAnalysis(null);
                    runAnalysis();
                  }}
                  className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  Refresh
                </button>
              </div>

              {analysis && (
                <div className="mt-3 flex items-center gap-4">
                  <div
                    className={cn(
                      "text-4xl font-bold",
                      getScoreColor(analysis.score)
                    )}
                  >
                    {analysis.score}
                  </div>
                  <div className="text-sm text-neutral-500">
                    <div>
                      {analysis.issues.filter((i) => i.type === "error").length} errors
                    </div>
                    <div>
                      {analysis.issues.filter((i) => i.type === "warning").length} warnings
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Issues List */}
            <div className="p-4 space-y-3">
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full mx-auto" />
                  <p className="mt-2 text-sm text-neutral-500">Analyzing...</p>
                </div>
              ) : (
                analysis?.issues.map((issue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      "p-3 rounded-lg",
                      issue.type === "error" && "bg-red-50 dark:bg-red-900/20",
                      issue.type === "warning" && "bg-yellow-50 dark:bg-yellow-900/20",
                      issue.type === "info" && "bg-blue-50 dark:bg-blue-900/20",
                      issue.type === "success" && "bg-green-50 dark:bg-green-900/20"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {getTypeIcon(issue.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-500 uppercase">
                            {issue.category}
                          </span>
                          {issue.impact === "high" && (
                            <span className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded">
                              High Impact
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white mt-0.5">
                          {issue.message}
                        </p>
                        {issue.recommendation && (
                          <p className="text-xs text-neutral-500 mt-1">
                            {issue.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// Programmatic SEO Analysis (for automated testing)
// =============================================================================

export function analyzeSEO(): SEOAnalysis {
  const issues: SEOIssue[] = [];

  // Run same checks as component but return data
  const title = document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  const description = metaDesc?.getAttribute("content");
  const canonical = document.querySelector('link[rel="canonical"]');
  const ogImage = document.querySelector('meta[property="og:image"]');

  // Title
  if (!title) {
    issues.push({ type: "error", category: "Title", message: "Missing title", impact: "high" });
  } else if (title.length < 30 || title.length > 60) {
    issues.push({ type: "warning", category: "Title", message: `Title length: ${title.length}`, impact: "medium" });
  }

  // Description
  if (!description) {
    issues.push({ type: "error", category: "Description", message: "Missing description", impact: "high" });
  } else if (description.length < 120 || description.length > 160) {
    issues.push({ type: "warning", category: "Description", message: `Description length: ${description.length}`, impact: "medium" });
  }

  // H1
  const h1s = document.querySelectorAll("h1");
  if (h1s.length !== 1) {
    issues.push({ type: "error", category: "H1", message: `Found ${h1s.length} H1 tags`, impact: "high" });
  }

  // JSON-LD
  const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLd.length === 0) {
    issues.push({ type: "warning", category: "Schema", message: "No structured data", impact: "medium" });
  }

  const errorCount = issues.filter((i) => i.type === "error").length;
  const warningCount = issues.filter((i) => i.type === "warning").length;
  const score = Math.max(0, 100 - errorCount * 20 - warningCount * 5);

  return {
    score,
    issues,
    metadata: {
      title,
      description: description || undefined,
      canonical: canonical?.getAttribute("href") || undefined,
      ogImage: ogImage?.getAttribute("content") || undefined,
    },
  };
}
