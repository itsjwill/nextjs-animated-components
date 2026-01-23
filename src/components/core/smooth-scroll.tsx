"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
  /** Scroll speed multiplier (default: 1) */
  speed?: number;
  /** Enable/disable smooth scroll (default: true) */
  enabled?: boolean;
}

export function SmoothScroll({
  children,
  speed = 1,
  enabled = true,
}: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);
  const rafIdRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    let lenis: any = null;
    let destroyed = false;

    async function init() {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;

        if (destroyed) return;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
          if (destroyed) return;
          lenis.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        };

        rafIdRef.current = requestAnimationFrame(raf);
      } catch {
        // Lenis failed to initialize — graceful degradation
      }
    }

    init();

    return () => {
      destroyed = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenis) {
        try {
          lenis.destroy();
        } catch {
          // ignore destroy errors
        }
      }
      lenisRef.current = null;
    };
  }, [enabled, speed, mounted]);

  return <>{children}</>;
}
