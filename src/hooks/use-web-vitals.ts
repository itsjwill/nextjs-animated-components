"use client";

import { useEffect, useCallback, useRef } from "react";

// =============================================================================
// Web Vitals Types
// =============================================================================

export type MetricName = "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";

export interface Metric {
  /** Metric name */
  name: MetricName;
  /** Metric value */
  value: number;
  /** Rating: good, needs-improvement, or poor */
  rating: "good" | "needs-improvement" | "poor";
  /** Delta since last report */
  delta: number;
  /** Unique ID for this metric instance */
  id: string;
  /** Navigation type */
  navigationType: "navigate" | "reload" | "back-forward" | "back-forward-cache" | "prerender";
  /** Metric-specific entries */
  entries: PerformanceEntry[];
}

export interface WebVitalsThresholds {
  CLS: { good: number; poor: number };
  FCP: { good: number; poor: number };
  FID: { good: number; poor: number };
  INP: { good: number; poor: number };
  LCP: { good: number; poor: number };
  TTFB: { good: number; poor: number };
}

// Google's recommended thresholds
const DEFAULT_THRESHOLDS: WebVitalsThresholds = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
};

// =============================================================================
// Metric Rating Helper
// =============================================================================

function getRating(
  name: MetricName,
  value: number,
  thresholds: WebVitalsThresholds
): "good" | "needs-improvement" | "poor" {
  const threshold = thresholds[name];
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

// =============================================================================
// Generate Unique ID
// =============================================================================

function generateUniqueId(): string {
  return `v4-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// =============================================================================
// Web Vitals Hook
// =============================================================================

export interface UseWebVitalsOptions {
  /** Callback when any metric is reported */
  onReport?: (metric: Metric) => void;
  /** Custom thresholds for ratings */
  thresholds?: Partial<WebVitalsThresholds>;
  /** Report to analytics endpoint */
  analyticsEndpoint?: string;
  /** Enable console logging in development */
  debug?: boolean;
}

export function useWebVitals(options: UseWebVitalsOptions = {}) {
  const {
    onReport,
    thresholds: customThresholds,
    analyticsEndpoint,
    debug = process.env.NODE_ENV === "development",
  } = options;

  const thresholds = { ...DEFAULT_THRESHOLDS, ...customThresholds };
  const metricsRef = useRef<Map<MetricName, Metric>>(new Map());

  const reportMetric = useCallback(
    (metric: Metric) => {
      metricsRef.current.set(metric.name, metric);

      if (debug) {
        const color =
          metric.rating === "good"
            ? "#10b981"
            : metric.rating === "needs-improvement"
            ? "#f59e0b"
            : "#ef4444";

        console.log(
          `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
          `color: ${color}; font-weight: bold;`
        );
      }

      onReport?.(metric);

      if (analyticsEndpoint) {
        // Use sendBeacon for reliable delivery
        const data = JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
          page: typeof window !== "undefined" ? window.location.pathname : "/",
          timestamp: Date.now(),
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon(analyticsEndpoint, data);
        } else {
          fetch(analyticsEndpoint, {
            method: "POST",
            body: data,
            keepalive: true,
          }).catch(() => {});
        }
      }
    },
    [onReport, analyticsEndpoint, debug]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers: PerformanceObserver[] = [];

    // Helper to get navigation type
    const getNavigationType = (): Metric["navigationType"] => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (nav?.type) return nav.type as Metric["navigationType"];
      return "navigate";
    };

    // -------------------------------------------------------------------------
    // CLS (Cumulative Layout Shift)
    // -------------------------------------------------------------------------
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only count layout shifts without recent user input
          if (!(entry as any).hadRecentInput) {
            const prevValue = clsValue;
            clsValue += (entry as any).value;
            clsEntries.push(entry);

            reportMetric({
              name: "CLS",
              value: clsValue,
              rating: getRating("CLS", clsValue, thresholds),
              delta: clsValue - prevValue,
              id: generateUniqueId(),
              navigationType: getNavigationType(),
              entries: clsEntries,
            });
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObserver);
    } catch (e) {
      // Layout shift API not supported
    }

    // -------------------------------------------------------------------------
    // FCP (First Contentful Paint)
    // -------------------------------------------------------------------------
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries.find((e) => e.name === "first-contentful-paint");
        if (fcp) {
          reportMetric({
            name: "FCP",
            value: fcp.startTime,
            rating: getRating("FCP", fcp.startTime, thresholds),
            delta: fcp.startTime,
            id: generateUniqueId(),
            navigationType: getNavigationType(),
            entries: [fcp],
          });
          fcpObserver.disconnect();
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
      observers.push(fcpObserver);
    } catch (e) {
      // Paint API not supported
    }

    // -------------------------------------------------------------------------
    // LCP (Largest Contentful Paint)
    // -------------------------------------------------------------------------
    let lcpValue = 0;
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const prevValue = lcpValue;
          lcpValue = lastEntry.startTime;

          reportMetric({
            name: "LCP",
            value: lcpValue,
            rating: getRating("LCP", lcpValue, thresholds),
            delta: lcpValue - prevValue,
            id: generateUniqueId(),
            navigationType: getNavigationType(),
            entries: [lastEntry],
          });
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObserver);
    } catch (e) {
      // LCP API not supported
    }

    // -------------------------------------------------------------------------
    // FID (First Input Delay)
    // -------------------------------------------------------------------------
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[0] as PerformanceEventTiming | undefined;
        if (fid) {
          const value = fid.processingStart - fid.startTime;
          reportMetric({
            name: "FID",
            value,
            rating: getRating("FID", value, thresholds),
            delta: value,
            id: generateUniqueId(),
            navigationType: getNavigationType(),
            entries: [fid],
          });
          fidObserver.disconnect();
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });
      observers.push(fidObserver);
    } catch (e) {
      // FID API not supported
    }

    // -------------------------------------------------------------------------
    // INP (Interaction to Next Paint)
    // -------------------------------------------------------------------------
    let inpValue = 0;
    const inpEntries: PerformanceEntry[] = [];

    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const eventEntry = entry as PerformanceEventTiming;
          // INP considers all interactions, not just the first
          const duration = eventEntry.duration;
          if (duration > inpValue) {
            const prevValue = inpValue;
            inpValue = duration;
            inpEntries.push(entry);

            reportMetric({
              name: "INP",
              value: inpValue,
              rating: getRating("INP", inpValue, thresholds),
              delta: inpValue - prevValue,
              id: generateUniqueId(),
              navigationType: getNavigationType(),
              entries: inpEntries,
            });
          }
        }
      });
      // @ts-expect-error - durationThreshold is supported in modern browsers but not in TS types
      inpObserver.observe({ type: "event", buffered: true, durationThreshold: 16 });
      observers.push(inpObserver);
    } catch (e) {
      // Event timing API not supported
    }

    // -------------------------------------------------------------------------
    // TTFB (Time to First Byte)
    // -------------------------------------------------------------------------
    try {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const nav = navEntries[0];
        const ttfb = nav.responseStart - nav.requestStart;

        // Small delay to ensure other metrics are collected first
        setTimeout(() => {
          reportMetric({
            name: "TTFB",
            value: ttfb,
            rating: getRating("TTFB", ttfb, thresholds),
            delta: ttfb,
            id: generateUniqueId(),
            navigationType: getNavigationType(),
            entries: [nav],
          });
        }, 0);
      }
    } catch (e) {
      // Navigation timing API not supported
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [reportMetric, thresholds]);

  return {
    getMetric: (name: MetricName) => metricsRef.current.get(name),
    getAllMetrics: () => Object.fromEntries(metricsRef.current),
  };
}

// =============================================================================
// Web Vitals Reporter Component
// =============================================================================

interface WebVitalsReporterProps {
  /** Analytics endpoint URL */
  endpoint?: string;
  /** Callback for each metric */
  onReport?: (metric: Metric) => void;
  /** Enable debug logging */
  debug?: boolean;
}

export function WebVitalsReporter({
  endpoint,
  onReport,
  debug,
}: WebVitalsReporterProps) {
  useWebVitals({
    analyticsEndpoint: endpoint,
    onReport,
    debug,
  });

  return null;
}

// =============================================================================
// Utility: Format Metric for Display
// =============================================================================

export function formatMetric(metric: Metric): string {
  const units: Record<MetricName, string> = {
    CLS: "",
    FCP: "ms",
    FID: "ms",
    INP: "ms",
    LCP: "ms",
    TTFB: "ms",
  };

  const value = metric.name === "CLS" ? metric.value.toFixed(3) : Math.round(metric.value);

  return `${value}${units[metric.name]}`;
}

// =============================================================================
// Utility: Get Metric Description
// =============================================================================

export function getMetricDescription(name: MetricName): string {
  const descriptions: Record<MetricName, string> = {
    CLS: "Cumulative Layout Shift - measures visual stability",
    FCP: "First Contentful Paint - time to first content rendered",
    FID: "First Input Delay - time to first interaction response",
    INP: "Interaction to Next Paint - responsiveness to all interactions",
    LCP: "Largest Contentful Paint - time to largest content rendered",
    TTFB: "Time to First Byte - server response time",
  };

  return descriptions[name];
}
