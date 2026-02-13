"use client";

import {
  useRef,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// ScrollOrchestrator — Apple AirPods Pro-style pinned scroll orchestration
// =============================================================================

interface OrchestratorContextValue {
  timeline: gsap.core.Timeline | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const OrchestratorContext = createContext<OrchestratorContextValue>({
  timeline: null,
  containerRef: { current: null },
});

interface ScrollOrchestratorProps {
  children: ReactNode;
  className?: string;
  /** How many viewport heights the pinned section spans */
  duration?: number;
  /** Scrub smoothing (true = instant, number = seconds of smoothing) */
  scrub?: boolean | number;
  /** Show GSAP markers for debugging */
  markers?: boolean;
  /** Pin start position */
  start?: string;
  /** Snap to stages */
  snap?: boolean;
}

export function ScrollOrchestrator({
  children,
  className,
  duration = 4,
  scrub = 1,
  markers = false,
  start = "top top",
  snap = false,
}: ScrollOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        end: `+=${duration * 100}%`,
        pin: content,
        scrub,
        markers,
        anticipatePin: 1,
        ...(snap
          ? {
              snap: {
                snapTo: "labels",
                duration: { min: 0.2, max: 0.5 },
                ease: "power1.inOut",
              },
            }
          : {}),
      },
    });

    setTimeline(tl);

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === container)
        .forEach((t) => t.kill());
    };
  }, [duration, scrub, markers, start, snap]);

  return (
    <OrchestratorContext.Provider value={{ timeline, containerRef }}>
      <div
        ref={containerRef}
        className={cn("relative", className)}
        style={{ height: `${(duration + 1) * 100}vh` }}
      >
        <div ref={contentRef} className="w-full h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </OrchestratorContext.Provider>
  );
}

// =============================================================================
// ScrollStage — Define animation stage within orchestrator
// =============================================================================

interface ScrollStageProps {
  children: ReactNode;
  className?: string;
  /** Start position within orchestrator (0-1) */
  start?: number;
  /** End position within orchestrator (0-1) */
  end?: number;
  /** GSAP from vars */
  from?: gsap.TweenVars;
  /** GSAP to vars */
  to?: gsap.TweenVars;
  /** Easing */
  ease?: string;
  /** Label for snap */
  label?: string;
}

export function ScrollStage({
  children,
  className,
  start = 0,
  end = 1,
  from,
  to,
  ease = "none",
  label,
}: ScrollStageProps) {
  const { timeline } = useContext(OrchestratorContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timeline || !ref.current) return;

    const el = ref.current;
    const totalDuration = timeline.duration() || 1;
    const stageStart = start * totalDuration;
    const stageDuration = (end - start) * totalDuration;

    if (from) {
      gsap.set(el, from);
    }

    if (to) {
      if (label) {
        timeline.addLabel(label, stageStart);
      }

      timeline.to(
        el,
        {
          ...to,
          duration: stageDuration,
          ease,
        },
        stageStart
      );
    }
  }, [timeline, start, end, from, to, ease, label]);

  return (
    <div ref={ref} className={cn("absolute inset-0", className)}>
      {children}
    </div>
  );
}

// =============================================================================
// ScrollVelocityWrapper — React to scroll velocity
// =============================================================================

interface ScrollVelocityWrapperProps {
  children: ReactNode;
  className?: string;
  /** Apply blur based on velocity */
  blur?: boolean;
  /** Apply skew based on velocity */
  skew?: boolean;
  /** Apply scale based on velocity */
  scale?: boolean;
  /** Max blur in px */
  maxBlur?: number;
  /** Max skew in degrees */
  maxSkew?: number;
  /** Scale range [min, max] */
  scaleRange?: [number, number];
  /** Smoothing factor (0-1, lower = smoother) */
  smoothing?: number;
}

export function ScrollVelocityWrapper({
  children,
  className,
  blur = false,
  skew = true,
  scale = false,
  maxBlur = 8,
  maxSkew = 5,
  scaleRange = [0.98, 1.02],
  smoothing = 0.1,
}: ScrollVelocityWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let raf: number;

    const update = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      const scroll = window.scrollY;
      const rawV = dt > 0 ? (scroll - lastScroll) / dt : 0;

      velocity.current += (rawV - velocity.current) * smoothing;

      const normalizedV = Math.min(1, Math.abs(velocity.current) / 3000);
      const direction = velocity.current > 0 ? 1 : -1;

      const transforms: string[] = [];

      if (skew) {
        transforms.push(`skewY(${direction * normalizedV * maxSkew}deg)`);
      }

      if (scale) {
        const s =
          scaleRange[0] +
          (scaleRange[1] - scaleRange[0]) * (1 - normalizedV);
        transforms.push(`scale(${s})`);
      }

      el.style.transform = transforms.join(" ");

      if (blur) {
        el.style.filter = `blur(${normalizedV * maxBlur}px)`;
      }

      el.style.setProperty("--scroll-velocity", String(velocity.current));
      el.style.setProperty(
        "--scroll-velocity-normalized",
        String(normalizedV)
      );

      lastScroll = scroll;
      lastTime = now;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [blur, skew, scale, maxBlur, maxSkew, scaleRange, smoothing]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transition: "transform 0.1s ease-out, filter 0.1s ease-out" }}
    >
      {children}
    </div>
  );
}

// =============================================================================
// ClipPathReveal — Scroll-linked clip-path animation
// =============================================================================

type ClipPathPreset =
  | "circle"
  | "horizontal"
  | "vertical"
  | "diagonal"
  | "diamond";

interface ClipPathRevealProps {
  children: ReactNode;
  className?: string;
  preset?: ClipPathPreset;
  /** Custom clip-path from value */
  from?: string;
  /** Custom clip-path to value */
  to?: string;
  trigger?: "scroll" | "inView";
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
}

const clipPathPresets: Record<
  ClipPathPreset,
  { from: string; to: string }
> = {
  circle: {
    from: "circle(0% at 50% 50%)",
    to: "circle(75% at 50% 50%)",
  },
  horizontal: {
    from: "inset(0 100% 0 0)",
    to: "inset(0 0% 0 0)",
  },
  vertical: {
    from: "inset(100% 0 0 0)",
    to: "inset(0% 0 0 0)",
  },
  diagonal: {
    from: "polygon(0 0, 0 0, 0 0)",
    to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
  diamond: {
    from: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    to: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
};

export function ClipPathReveal({
  children,
  className,
  preset = "circle",
  from: customFrom,
  to: customTo,
  trigger = "scroll",
  duration = 1,
  ease = "power2.out",
  start = "top bottom",
  end = "center center",
}: ClipPathRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromClip = customFrom || clipPathPresets[preset].from;
    const toClip = customTo || clipPathPresets[preset].to;

    gsap.set(el, { clipPath: fromClip });

    if (trigger === "scroll") {
      const tween = gsap.to(el, {
        clipPath: toClip,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 1,
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.vars.trigger === el)
          .forEach((t) => t.kill());
      };
    }

    // inView
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { clipPath: toClip, duration, ease });
      },
    });

    return () => { st.kill(); };
  }, [preset, customFrom, customTo, trigger, duration, ease, start, end]);

  return (
    <div ref={ref} className={cn("clip-path-reveal", className)}>
      {children}
    </div>
  );
}

// =============================================================================
// DepthParallax — Real CSS perspective-based depth
// =============================================================================

interface DepthParallaxProps {
  children: ReactNode;
  className?: string;
  /** CSS perspective value */
  perspective?: number;
}

export function DepthParallax({
  children,
  className,
  perspective = 1000,
}: DepthParallaxProps) {
  return (
    <div
      className={cn("depth-parallax relative overflow-hidden", className)}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "center",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

interface DepthLayerProps {
  children: ReactNode;
  className?: string;
  /** Z depth (-500 to 500, negative = further away) */
  depth?: number;
  /** Additional Y parallax speed */
  speed?: number;
}

export function DepthLayer({
  children,
  className,
  depth = 0,
  speed = 0,
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || speed === 0) return;

    const el = ref.current;

    gsap.to(el, {
      y: speed * -100,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === el.parentElement)
        .forEach((t) => t.kill());
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 will-change-transform", className)}
      style={{
        transform: `translateZ(${depth}px)`,
        // Scale to counteract perspective shrinking for far-away layers
        ...(depth < 0
          ? { scale: `${1 + Math.abs(depth) / 1000}` }
          : {}),
      }}
    >
      {children}
    </div>
  );
}

// =============================================================================
// ImageSequenceScroll — Canvas-based image sequence (AirPods Pro technique)
// =============================================================================

interface ImageSequenceScrollProps {
  /** Array of image URLs in sequence order */
  frames: string[];
  className?: string;
  /** Scrub smoothing */
  scrub?: number;
  /** Start position */
  start?: string;
  /** Duration in viewport heights */
  duration?: number;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Scale mode */
  objectFit?: "cover" | "contain";
}

export function ImageSequenceScroll({
  frames,
  className,
  scrub = 0.5,
  start = "top top",
  duration = 5,
  width = 1920,
  height = 1080,
  objectFit = "cover",
}: ImageSequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === frames.length) {
          // All loaded, render first frame
          renderFrame(0);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [frames]);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imagesRef.current[index];
      if (!canvas || !ctx || !img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (objectFit === "cover") {
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    },
    [objectFit]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const frameCount = frames.length;

    const st = ScrollTrigger.create({
      trigger: container,
      start,
      end: `+=${duration * 100}%`,
      pin: true,
      scrub,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * (frameCount - 1)),
          frameCount - 1
        );
        if (frameIndex !== currentFrame.current) {
          currentFrame.current = frameIndex;
          renderFrame(frameIndex);
        }
      },
    });

    return () => { st.kill(); };
  }, [frames.length, scrub, start, duration, renderFrame]);

  return (
    <div
      ref={containerRef}
      className={cn("image-sequence-scroll relative", className)}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-screen object-cover"
      />
    </div>
  );
}
