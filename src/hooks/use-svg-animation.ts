"use client";

import { useRef, useEffect, useCallback, useState, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// useSvgPathDraw — Animate SVG path stroke drawing
// =============================================================================

interface UseSvgPathDrawOptions {
  trigger?: "mount" | "scroll" | "inView" | "manual";
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  scrollStart?: string;
  scrollEnd?: string;
  scrub?: boolean | number;
}

export function useSvgPathDraw<T extends SVGElement = SVGSVGElement>(
  options: UseSvgPathDrawOptions = {}
) {
  const {
    trigger = "inView",
    duration = 1.5,
    ease = "power2.inOut",
    delay = 0,
    stagger = 0.2,
    scrollStart = "top 80%",
    scrollEnd = "bottom 20%",
    scrub = true,
  } = options;

  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect");
    if (paths.length === 0) return;

    // Set up each path for drawing
    paths.forEach((path) => {
      if (path instanceof SVGGeometryElement) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }
    });

    const tween = {
      strokeDashoffset: 0,
      duration,
      ease,
      delay,
      stagger,
      onUpdate: function (this: gsap.core.Tween) {
        setProgress(this.progress());
      },
    };

    if (trigger === "mount") {
      const tl = gsap.to(paths, tween);
      return () => { tl.kill(); };
    }

    if (trigger === "scroll") {
      const tl = gsap.to(paths, {
        ...tween,
        scrollTrigger: {
          trigger: svg,
          start: scrollStart,
          end: scrollEnd,
          scrub,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === svg) t.kill();
        });
      };
    }

    if (trigger === "inView") {
      const st = ScrollTrigger.create({
        trigger: svg,
        start: scrollStart,
        once: true,
        onEnter: () => {
          gsap.to(paths, tween);
        },
      });
      return () => { st.kill(); };
    }

    // manual — do nothing, user controls via returned progress
  }, [trigger, duration, ease, delay, stagger, scrollStart, scrollEnd, scrub]);

  const play = useCallback(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = svg.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect");
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration,
      ease,
      stagger,
    });
  }, [duration, ease, stagger]);

  const reset = useCallback(() => {
    const svg = ref.current;
    if (!svg) return;
    const paths = svg.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect");
    paths.forEach((path) => {
      if (path instanceof SVGGeometryElement) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDashoffset: length });
      }
    });
    setProgress(0);
  }, []);

  return { ref, progress, play, reset };
}

// =============================================================================
// useSvgMorph — Morph between SVG path d attributes
// =============================================================================

function parsePath(d: string): number[] {
  const nums = d.match(/-?\d+\.?\d*/g);
  return nums ? nums.map(Number) : [];
}

function buildPath(template: string, values: number[]): string {
  let i = 0;
  return template.replace(/-?\d+\.?\d*/g, () => {
    const val = values[i] ?? 0;
    i++;
    return val.toFixed(2);
  });
}

function lerpArrays(a: number[], b: number[], t: number): number[] {
  const len = Math.max(a.length, b.length);
  const result: number[] = [];
  for (let i = 0; i < len; i++) {
    const va = a[i] ?? 0;
    const vb = b[i] ?? 0;
    result.push(va + (vb - va) * t);
  }
  return result;
}

interface UseSvgMorphOptions {
  duration?: number;
  ease?: string;
}

export function useSvgMorph(options: UseSvgMorphOptions = {}) {
  const { duration = 0.6, ease = "power2.inOut" } = options;
  const ref = useRef<SVGPathElement>(null);
  const currentPath = useRef<string>("");

  const morph = useCallback(
    (toPath: string) => {
      const path = ref.current;
      if (!path) return;

      const fromD = currentPath.current || path.getAttribute("d") || "";
      const fromValues = parsePath(fromD);
      const toValues = parsePath(toPath);
      // Use the longer template for structure
      const template = toValues.length >= fromValues.length ? toPath : fromD;

      const obj = { t: 0 };
      gsap.to(obj, {
        t: 1,
        duration,
        ease,
        onUpdate: () => {
          const interpolated = lerpArrays(fromValues, toValues, obj.t);
          const newD = buildPath(template, interpolated);
          path.setAttribute("d", newD);
        },
        onComplete: () => {
          path.setAttribute("d", toPath);
          currentPath.current = toPath;
        },
      });
    },
    [duration, ease]
  );

  return { ref, morph };
}

// =============================================================================
// useSvgFilter — Manage animated SVG filter with unique ID
// =============================================================================

interface UseSvgFilterOptions {
  autoAnimate?: boolean;
  duration?: number;
}

export function useSvgFilter(options: UseSvgFilterOptions = {}) {
  const { autoAnimate = false, duration = 2 } = options;
  const id = useId();
  const filterId = `svg-filter-${id.replace(/:/g, "")}`;
  const filterRef = useRef<SVGFilterElement>(null);

  useEffect(() => {
    if (!autoAnimate || !filterRef.current) return;

    const turbulence = filterRef.current.querySelector("feTurbulence");
    if (!turbulence) return;

    const obj = { freq: 0.01 };
    const tween = gsap.to(obj, {
      freq: 0.05,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        turbulence.setAttribute("baseFrequency", String(obj.freq));
      },
    });

    return () => { tween.kill(); };
  }, [autoAnimate, duration]);

  return { filterId, filterRef, filterUrl: `url(#${filterId})` };
}

// =============================================================================
// useScrollVelocity — Track scroll velocity for physics-based responses
// =============================================================================

interface UseScrollVelocityOptions {
  smoothing?: number;
  maxVelocity?: number;
}

export function useScrollVelocity(options: UseScrollVelocityOptions = {}) {
  const { smoothing = 0.1, maxVelocity = 5000 } = options;
  const [velocity, setVelocity] = useState(0);
  const [normalizedVelocity, setNormalizedVelocity] = useState(0);
  const smoothedVelocity = useRef(0);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let rafId: number;

    const update = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      const currentScroll = window.scrollY;
      const rawVelocity = dt > 0 ? (currentScroll - lastScroll) / dt : 0;

      smoothedVelocity.current += (rawVelocity - smoothedVelocity.current) * smoothing;

      const clamped = Math.max(-maxVelocity, Math.min(maxVelocity, smoothedVelocity.current));
      setVelocity(clamped);
      setNormalizedVelocity(clamped / maxVelocity);

      lastScroll = currentScroll;
      lastTime = now;
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [smoothing, maxVelocity]);

  return { velocity, normalizedVelocity, absVelocity: Math.abs(velocity) };
}