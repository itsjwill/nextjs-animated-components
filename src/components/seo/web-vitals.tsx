"use client";

import { useEffect, useCallback, useRef } from "react";

// =============================================================================
// Web Vitals Reporter
// =============================================================================
// Core Web Vitals are a Google ranking factor since 2021
// This component reports them to your analytics

export interface WebVitalsMetric {
  id: string;
  name: "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: "navigate" | "reload" | "back-forward" | "prerender";
}

export interface WebVitalsReporterProps {
  /** Report to Google Analytics */
  reportToGA?: boolean;
  /** Report to custom endpoint */
  endpoint?: string;
  /** Custom callback for each metric */
  onReport?: (metric: WebVitalsMetric) => void;
  /** Enable debug logging */
  debug?: boolean;
  /** Sample rate (0-1, default 1 = 100%) */
  sampleRate?: number;
}

// Thresholds for rating (based on Google's recommendations)
const thresholds = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

function getRating(name: WebVitalsMetric["name"], value: number): WebVitalsMetric["rating"] {
  const threshold = thresholds[name];
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

export function WebVitalsReporter({
  reportToGA = false,
  endpoint,
  onReport,
  debug = false,
  sampleRate = 1,
}: WebVitalsReporterProps) {
  const reported = useRef<Set<string>>(new Set());

  // Sampling
  const shouldSample = useRef(Math.random() < sampleRate);

  const reportMetric = useCallback(
    (metric: WebVitalsMetric) => {
      // Prevent duplicate reports
      if (reported.current.has(metric.id)) return;
      reported.current.add(metric.id);

      // Check sampling
      if (!shouldSample.current) return;

      // Debug logging
      if (debug) {
        const color =
          metric.rating === "good"
            ? "green"
            : metric.rating === "needs-improvement"
              ? "orange"
              : "red";
        console.log(
          `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
          `color: ${color}; font-weight: bold;`
        );
      }

      // Report to Google Analytics
      if (reportToGA && typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric.name, {
          event_category: "Web Vitals",
          event_label: metric.id,
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          non_interaction: true,
          metric_rating: metric.rating,
        });
      }

      // Report to custom endpoint
      if (endpoint) {
        const body = JSON.stringify({
          ...metric,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        });

        // Use sendBeacon for reliability (works even on page unload)
        if (navigator.sendBeacon) {
          navigator.sendBeacon(endpoint, body);
        } else {
          fetch(endpoint, {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
            keepalive: true,
          }).catch(() => {
            // Silently fail
          });
        }
      }

      // Custom callback
      onReport?.(metric);
    },
    [reportToGA, endpoint, onReport, debug]
  );

  useEffect(() => {
    // Dynamic import to avoid SSR issues and make web-vitals optional
    // @ts-expect-error - web-vitals is optional dependency
    import("web-vitals")
      .then((module: { onCLS: Function; onFCP: Function; onFID: Function; onINP: Function; onLCP: Function; onTTFB: Function }) => {
        const { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } = module;
        const handleMetric = (metric: { name: string; id: string; value: number; delta: number; navigationType: string }) => {
          reportMetric({
            id: metric.id,
            name: metric.name as WebVitalsMetric["name"],
            value: metric.value,
            rating: getRating(metric.name as WebVitalsMetric["name"], metric.value),
            delta: metric.delta,
            navigationType: metric.navigationType as WebVitalsMetric["navigationType"],
          });
        };

        onCLS(handleMetric);
        onFCP(handleMetric);
        onFID(handleMetric);
        onINP(handleMetric);
        onLCP(handleMetric);
        onTTFB(handleMetric);
      })
      .catch(() => {
        // web-vitals not installed, skip silently
        if (debug) {
          console.warn("[Web Vitals] web-vitals package not found. Run: npm install web-vitals");
        }
      });
  }, [reportMetric, debug]);

  return null;
}

// =============================================================================
// Web Vitals Display Component (for dashboards)
// =============================================================================

export interface WebVitalsDisplayProps {
  metrics: Partial<Record<WebVitalsMetric["name"], number>>;
  className?: string;
}

export function WebVitalsDisplay({ metrics, className }: WebVitalsDisplayProps) {
  const metricInfo: Record<
    WebVitalsMetric["name"],
    { label: string; unit: string; description: string }
  > = {
    LCP: {
      label: "Largest Contentful Paint",
      unit: "s",
      description: "Loading performance",
    },
    FID: {
      label: "First Input Delay",
      unit: "ms",
      description: "Interactivity",
    },
    CLS: {
      label: "Cumulative Layout Shift",
      unit: "",
      description: "Visual stability",
    },
    FCP: {
      label: "First Contentful Paint",
      unit: "s",
      description: "Perceived load speed",
    },
    INP: {
      label: "Interaction to Next Paint",
      unit: "ms",
      description: "Responsiveness",
    },
    TTFB: {
      label: "Time to First Byte",
      unit: "ms",
      description: "Server response time",
    },
  };

  const formatValue = (name: WebVitalsMetric["name"], value: number): string => {
    if (name === "CLS") return value.toFixed(3);
    if (name === "LCP" || name === "FCP") return (value / 1000).toFixed(2);
    return Math.round(value).toString();
  };

  const getRatingColor = (rating: WebVitalsMetric["rating"]): string => {
    switch (rating) {
      case "good":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "needs-improvement":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "poor":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {(Object.entries(metrics) as [WebVitalsMetric["name"], number][]).map(
          ([name, value]) => {
            const info = metricInfo[name];
            const rating = getRating(name, value);

            return (
              <div
                key={name}
                className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${getRatingColor(rating)}`}
                  >
                    {rating}
                  </span>
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {formatValue(name, value)}
                  <span className="text-sm font-normal text-neutral-500 ml-1">
                    {info.unit}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">{info.description}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Hook for manual Web Vitals access
// =============================================================================

export function useWebVitals(callback: (metric: WebVitalsMetric) => void) {
  useEffect(() => {
    // @ts-expect-error - web-vitals is optional dependency
    import("web-vitals")
      .then((module: { onCLS: Function; onFCP: Function; onFID: Function; onINP: Function; onLCP: Function; onTTFB: Function }) => {
        const { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } = module;
        const handleMetric = (metric: { name: string; id: string; value: number; delta: number; navigationType: string }) => {
          callback({
            id: metric.id,
            name: metric.name as WebVitalsMetric["name"],
            value: metric.value,
            rating: getRating(metric.name as WebVitalsMetric["name"], metric.value),
            delta: metric.delta,
            navigationType: metric.navigationType as WebVitalsMetric["navigationType"],
          });
        };

        onCLS(handleMetric);
        onFCP(handleMetric);
        onFID(handleMetric);
        onINP(handleMetric);
        onLCP(handleMetric);
        onTTFB(handleMetric);
      })
      .catch(() => {
        // Silently fail if web-vitals not installed
      });
  }, [callback]);
}

// =============================================================================
// Type declaration for GA
// =============================================================================

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
