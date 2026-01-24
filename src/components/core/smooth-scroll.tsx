"use client";

import { useEffect } from "react";

/**
 * SmoothScroll — applies CSS smooth scrolling as a side effect.
 * No external dependencies, no webpack chunk issues.
 */
export function SmoothScroll() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
