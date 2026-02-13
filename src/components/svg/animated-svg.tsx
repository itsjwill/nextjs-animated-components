"use client";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
  useId,
  ReactNode,
} from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// SvgPathDraw — Self-drawing SVG paths
// =============================================================================

interface SvgPathDrawProps {
  children: ReactNode;
  className?: string;
  trigger?: "mount" | "scroll" | "hover" | "inView";
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  strokeColor?: string;
  strokeWidth?: number;
  scrub?: boolean | number;
  once?: boolean;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgPathDraw({
  children,
  className,
  trigger = "inView",
  duration = 2,
  delay = 0,
  stagger = 0.15,
  ease = "power2.inOut",
  strokeColor,
  strokeWidth,
  scrub = true,
  once = true,
  viewBox,
  width,
  height,
}: SvgPathDrawProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll(
      "path, line, polyline, polygon, circle, ellipse, rect"
    );
    if (paths.length === 0) return;

    paths.forEach((el) => {
      if (el instanceof SVGGeometryElement) {
        const len = el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: len,
          strokeDashoffset: len,
          ...(strokeColor ? { stroke: strokeColor } : {}),
          ...(strokeWidth ? { strokeWidth } : {}),
        });
      }
    });

    const animVars: gsap.TweenVars = {
      strokeDashoffset: 0,
      duration,
      ease,
      delay,
      stagger,
    };

    if (trigger === "mount") {
      const tw = gsap.to(paths, animVars);
      return () => { tw.kill(); };
    }

    if (trigger === "scroll") {
      const tw = gsap.to(paths, {
        ...animVars,
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 20%",
          scrub,
        },
      });
      return () => {
        tw.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.vars.trigger === svg)
          .forEach((t) => t.kill());
      };
    }

    if (trigger === "inView") {
      const st = ScrollTrigger.create({
        trigger: svg,
        start: "top 85%",
        once,
        onEnter: () => gsap.to(paths, animVars),
      });
      return () => { st.kill(); };
    }

    // hover handled in onMouseEnter
  }, [trigger, duration, delay, stagger, ease, strokeColor, strokeWidth, scrub, once]);

  const handleHover = useCallback(() => {
    if (trigger !== "hover") return;
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll(
      "path, line, polyline, polygon, circle, ellipse, rect"
    );
    if (isHovered) {
      paths.forEach((el) => {
        if (el instanceof SVGGeometryElement) {
          gsap.set(el, { strokeDashoffset: el.getTotalLength() });
        }
      });
    }
    gsap.to(paths, {
      strokeDashoffset: isHovered ? 0 : undefined,
      duration: duration * 0.6,
      ease,
      stagger: stagger * 0.5,
    });
  }, [trigger, isHovered, duration, ease, stagger]);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-path-draw", className)}
      viewBox={viewBox}
      width={width}
      height={height}
      onMouseEnter={() => {
        setIsHovered(true);
        handleHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      fill="none"
    >
      {children}
    </svg>
  );
}

// =============================================================================
// SvgMorph — Morph between two SVG paths
// =============================================================================

function parsePathNumbers(d: string): number[] {
  return (d.match(/-?\d+\.?\d*/g) || []).map(Number);
}

function interpolatePath(
  fromD: string,
  toD: string,
  t: number
): string {
  const fromNums = parsePathNumbers(fromD);
  const toNums = parsePathNumbers(toD);
  const len = Math.max(fromNums.length, toNums.length);

  let i = 0;
  const template = toNums.length >= fromNums.length ? toD : fromD;
  return template.replace(/-?\d+\.?\d*/g, () => {
    const a = fromNums[i] ?? 0;
    const b = toNums[i] ?? 0;
    i++;
    return (a + (b - a) * t).toFixed(2);
  });
}

interface SvgMorphProps {
  paths: string[];
  className?: string;
  trigger?: "hover" | "click" | "auto" | "scroll";
  duration?: number;
  ease?: string;
  autoInterval?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgMorph({
  paths,
  className,
  trigger = "auto",
  duration = 0.8,
  ease = "power2.inOut",
  autoInterval = 3000,
  fill = "currentColor",
  stroke,
  strokeWidth,
  viewBox = "0 0 100 100",
  width,
  height,
}: SvgMorphProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const currentIndex = useRef(0);

  const morphTo = useCallback(
    (index: number) => {
      const path = pathRef.current;
      if (!path || paths.length < 2) return;

      const fromD = path.getAttribute("d") || paths[0];
      const toD = paths[index % paths.length];
      const obj = { t: 0 };

      gsap.to(obj, {
        t: 1,
        duration,
        ease,
        onUpdate: () => {
          path.setAttribute("d", interpolatePath(fromD, toD, obj.t));
        },
        onComplete: () => {
          path.setAttribute("d", toD);
          currentIndex.current = index % paths.length;
        },
      });
    },
    [paths, duration, ease]
  );

  useEffect(() => {
    if (trigger !== "auto" || paths.length < 2) return;
    const interval = setInterval(() => {
      morphTo(currentIndex.current + 1);
    }, autoInterval);
    return () => clearInterval(interval);
  }, [trigger, autoInterval, morphTo, paths.length]);

  useEffect(() => {
    if (trigger !== "scroll") return;
    const path = pathRef.current;
    if (!path) return;

    const st = ScrollTrigger.create({
      trigger: path.closest("svg") || path,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.floor(self.progress * (paths.length - 1));
        const localT =
          (self.progress * (paths.length - 1)) % 1;
        const fromD = paths[idx] || paths[0];
        const toD = paths[Math.min(idx + 1, paths.length - 1)];
        path.setAttribute("d", interpolatePath(fromD, toD, localT));
      },
    });

    return () => { st.kill(); };
  }, [trigger, paths]);

  return (
    <svg
      className={cn("svg-morph", className)}
      viewBox={viewBox}
      width={width}
      height={height}
      onClick={() => trigger === "click" && morphTo(currentIndex.current + 1)}
      onMouseEnter={() =>
        trigger === "hover" && morphTo(currentIndex.current + 1)
      }
    >
      <path
        ref={pathRef}
        d={paths[0]}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

// =============================================================================
// SvgLineOrchestra — Choreographed sequential path drawing
// =============================================================================

interface SvgLineOrchestraProps {
  children: ReactNode;
  className?: string;
  trigger?: "mount" | "scroll" | "inView";
  stagger?: number;
  duration?: number;
  ease?: string;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgLineOrchestra({
  children,
  className,
  trigger = "inView",
  stagger = 0.3,
  duration = 1,
  ease = "power3.out",
  viewBox,
  width,
  height,
}: SvgLineOrchestraProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");
    if (paths.length === 0) return;

    const tl = gsap.timeline({ paused: true });

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration,
          ease,
        },
        i * stagger
      );
    });

    if (trigger === "mount") {
      tl.play();
    } else if (trigger === "scroll") {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        animation: tl,
      });
    } else {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 85%",
        once: true,
        onEnter: () => tl.play(),
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === svg)
        .forEach((t) => t.kill());
    };
  }, [trigger, stagger, duration, ease]);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-line-orchestra", className)}
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
    >
      {children}
    </svg>
  );
}

// =============================================================================
// SvgGooeyBlob — Metaball gooey effect with physics
// =============================================================================

interface GooeyBlobConfig {
  x: number;
  y: number;
  r: number;
  color?: string;
}

interface SvgGooeyBlobProps {
  blobs?: GooeyBlobConfig[];
  className?: string;
  intensity?: number;
  animate?: boolean;
  colors?: string[];
  width?: number | string;
  height?: number | string;
}

export function SvgGooeyBlob({
  blobs: customBlobs,
  className,
  intensity = 10,
  animate = true,
  colors = ["#8b5cf6", "#ec4899", "#06b6d4"],
  width = 400,
  height = 400,
}: SvgGooeyBlobProps) {
  const filterId = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);

  const defaultBlobs: GooeyBlobConfig[] = [
    { x: 150, y: 200, r: 60, color: colors[0] },
    { x: 250, y: 200, r: 50, color: colors[1] },
    { x: 200, y: 150, r: 45, color: colors[2] },
  ];

  const blobs = customBlobs || defaultBlobs;

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    const circles = svgRef.current.querySelectorAll("circle");
    const tweens: gsap.core.Tween[] = [];

    circles.forEach((circle, i) => {
      const blob = blobs[i];
      if (!blob) return;

      const tw = gsap.to(circle, {
        cx: blob.x + (Math.random() - 0.5) * 100,
        cy: blob.y + (Math.random() - 0.5) * 100,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      });
      tweens.push(tw);
    });

    return () => tweens.forEach((tw) => tw.kill());
  }, [animate, blobs]);

  const contrastValue = Math.max(10, intensity * 1.9);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-gooey-blob", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id={filterId}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={intensity}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrastValue} -${contrastValue / 2 - 0.5}`}
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {blobs.map((blob, i) => (
          <circle
            key={i}
            cx={blob.x}
            cy={blob.y}
            r={blob.r}
            fill={blob.color || colors[i % colors.length]}
          />
        ))}
      </g>
    </svg>
  );
}

// =============================================================================
// SvgLiquidMorph — Organic blob with continuous morphing
// =============================================================================

interface SvgLiquidMorphProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
  speed?: number;
  complexity?: number;
  size?: number;
}

function generateBlobPath(
  cx: number,
  cy: number,
  r: number,
  points: number,
  seed: number,
  complexity: number
): string {
  const angleStep = (Math.PI * 2) / points;
  const coords: [number, number][] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const noise =
      Math.sin(seed + i * 1.7) * complexity * 0.3 +
      Math.cos(seed * 0.7 + i * 2.3) * complexity * 0.2;
    const radius = r + noise * r;
    coords.push([
      cx + Math.cos(angle) * radius,
      cy + Math.sin(angle) * radius,
    ]);
  }

  // Build smooth cubic bezier path
  let d = `M ${coords[0][0].toFixed(1)},${coords[0][1].toFixed(1)}`;
  for (let i = 0; i < coords.length; i++) {
    const curr = coords[i];
    const next = coords[(i + 1) % coords.length];
    const cpx1 = curr[0] + (next[0] - curr[0]) * 0.5;
    const cpy1 = curr[1];
    const cpx2 = curr[0] + (next[0] - curr[0]) * 0.5;
    const cpy2 = next[1];
    d += ` C ${cpx1.toFixed(1)},${cpy1.toFixed(1)} ${cpx2.toFixed(1)},${cpy2.toFixed(1)} ${next[0].toFixed(1)},${next[1].toFixed(1)}`;
  }
  return d + " Z";
}

export function SvgLiquidMorph({
  className,
  color = "#8b5cf6",
  secondaryColor,
  speed = 1,
  complexity = 0.4,
  size = 300,
}: SvgLiquidMorphProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    let frame: number;
    let seed = 0;
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.3;

    const animate = () => {
      seed += 0.015 * speed;

      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          generateBlobPath(cx, cy, r, 8, seed, complexity)
        );
      }
      if (path2Ref.current && secondaryColor) {
        path2Ref.current.setAttribute(
          "d",
          generateBlobPath(cx, cy, r * 0.8, 6, seed + 2, complexity * 1.2)
        );
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [speed, complexity, size, secondaryColor]);

  return (
    <svg
      className={cn("svg-liquid-morph", className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <path ref={pathRef} fill={color} opacity={0.8} />
      {secondaryColor && (
        <path ref={path2Ref} fill={secondaryColor} opacity={0.6} />
      )}
    </svg>
  );
}

// =============================================================================
// SvgTextPathScroll — Text on SVG path, scroll-linked
// =============================================================================

interface SvgTextPathScrollProps {
  text: string;
  path?: string;
  className?: string;
  fontSize?: number;
  fill?: string;
  repeat?: number;
  speed?: number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
}

export function SvgTextPathScroll({
  text,
  path = "M 0,200 C 100,50 300,350 400,200 C 500,50 700,350 800,200",
  className,
  fontSize = 24,
  fill = "currentColor",
  repeat = 3,
  speed = 1,
  width = "100%",
  height = 300,
  viewBox = "0 0 800 400",
}: SvgTextPathScrollProps) {
  const pathId = useId().replace(/:/g, "");
  const textRef = useRef<SVGTextPathElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = containerRef.current;
    const textPath = textRef.current;
    if (!svg || !textPath) return;

    const st = ScrollTrigger.create({
      trigger: svg,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const offset = -self.progress * 100 * speed;
        textPath.setAttribute("startOffset", `${offset}%`);
      },
    });

    return () => { st.kill(); };
  }, [speed]);

  const repeatedText = Array(repeat).fill(text).join(" \u2022 ");

  return (
    <svg
      ref={containerRef}
      className={cn("svg-text-path-scroll overflow-visible", className)}
      width={width}
      height={height}
      viewBox={viewBox}
    >
      <defs>
        <path id={pathId} d={path} fill="none" />
      </defs>
      <text
        fontSize={fontSize}
        fill={fill}
        fontWeight="bold"
        letterSpacing="0.05em"
      >
        <textPath ref={textRef} href={`#${pathId}`} startOffset="0%">
          {repeatedText}
        </textPath>
      </text>
    </svg>
  );
}

// =============================================================================
// SvgStrokeReveal — Stroke draws, then fill fades in
// =============================================================================

interface SvgStrokeRevealProps {
  children: ReactNode;
  className?: string;
  strokeDuration?: number;
  fillDuration?: number;
  fillDelay?: number;
  strokeColor?: string;
  fillColor?: string;
  trigger?: "mount" | "inView" | "scroll";
  viewBox?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgStrokeReveal({
  children,
  className,
  strokeDuration = 1.5,
  fillDuration = 0.8,
  fillDelay = 0.3,
  strokeColor,
  fillColor,
  trigger = "inView",
  viewBox,
  width,
  height,
}: SvgStrokeRevealProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");
    if (paths.length === 0) return;

    const tl = gsap.timeline({ paused: true });

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      const originalFill = fillColor || path.getAttribute("fill") || "currentColor";

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent",
        ...(strokeColor ? { stroke: strokeColor } : {}),
      });

      // Stage 1: Draw stroke
      tl.to(
        path,
        { strokeDashoffset: 0, duration: strokeDuration, ease: "power2.inOut" },
        i * 0.2
      );

      // Stage 2: Fade in fill
      tl.to(
        path,
        { fill: originalFill, duration: fillDuration, ease: "power1.in" },
        `-=${fillDuration - fillDelay}`
      );
    });

    if (trigger === "mount") {
      tl.play();
    } else if (trigger === "scroll") {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        animation: tl,
      });
    } else {
      ScrollTrigger.create({
        trigger: svg,
        start: "top 85%",
        once: true,
        onEnter: () => tl.play(),
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === svg)
        .forEach((t) => t.kill());
    };
  }, [trigger, strokeDuration, fillDuration, fillDelay, strokeColor, fillColor]);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-stroke-reveal", className)}
      viewBox={viewBox}
      width={width}
      height={height}
    >
      {children}
    </svg>
  );
}

// =============================================================================
// SvgParticleExplosion — Path segments burst apart and reassemble
// =============================================================================

interface SvgParticleExplosionProps {
  children: ReactNode;
  className?: string;
  trigger?: "hover" | "click" | "inView";
  spread?: number;
  duration?: number;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgParticleExplosion({
  children,
  className,
  trigger = "hover",
  spread = 200,
  duration = 0.8,
  viewBox,
  width,
  height,
}: SvgParticleExplosionProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const explode = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const elements = svg.querySelectorAll("path, circle, rect, polygon, line, ellipse");
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    elements.forEach((el) => {
      const rx = (Math.random() - 0.5) * spread;
      const ry = (Math.random() - 0.5) * spread;
      const rotate = (Math.random() - 0.5) * 360;

      tl.to(
        el,
        {
          x: rx,
          y: ry,
          rotation: rotate,
          opacity: 0,
          scale: 0.3,
          duration: duration * 0.6,
          ease: "power3.out",
        },
        0
      );
    });
  }, [spread, duration]);

  const reassemble = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const elements = svg.querySelectorAll("path, circle, rect, polygon, line, ellipse");
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elements, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: duration * 0.8,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.03,
    });
  }, [duration]);

  useEffect(() => {
    if (trigger !== "inView") return;
    const svg = svgRef.current;
    if (!svg) return;

    // Start exploded
    const elements = svg.querySelectorAll("path, circle, rect, polygon, line, ellipse");
    elements.forEach((el) => {
      gsap.set(el, {
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        rotation: (Math.random() - 0.5) * 360,
        opacity: 0,
        scale: 0.3,
      });
    });

    const st = ScrollTrigger.create({
      trigger: svg,
      start: "top 80%",
      once: true,
      onEnter: reassemble,
    });

    return () => { st.kill(); };
  }, [trigger, spread, reassemble]);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-particle-explosion cursor-pointer", className)}
      viewBox={viewBox}
      width={width}
      height={height}
      onMouseEnter={trigger === "hover" ? explode : undefined}
      onMouseLeave={trigger === "hover" ? reassemble : undefined}
      onClick={trigger === "click" ? explode : undefined}
    >
      {children}
    </svg>
  );
}

// =============================================================================
// SvgGlitchFilter — Animated displacement + turbulence glitch
// =============================================================================

interface SvgGlitchFilterProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
  active?: boolean;
  colorShift?: boolean;
}

export function SvgGlitchFilter({
  children,
  className,
  intensity = 20,
  speed = 1,
  active = true,
  colorShift = true,
}: SvgGlitchFilterProps) {
  const filterId = useId().replace(/:/g, "");
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    if (!active) return;

    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.05 * speed;

      if (turbRef.current) {
        const freq = 0.01 + Math.sin(t) * 0.005 + Math.random() * 0.01;
        turbRef.current.setAttribute(
          "baseFrequency",
          `${freq} ${freq * 3}`
        );
        turbRef.current.setAttribute(
          "seed",
          String(Math.floor(Math.random() * 100))
        );
      }

      if (dispRef.current) {
        const scale =
          Math.random() > 0.9
            ? intensity * (1 + Math.random() * 2)
            : intensity * (0.5 + Math.sin(t * 2) * 0.5);
        dispRef.current.setAttribute("scale", String(scale));
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, intensity, speed]);

  return (
    <div className={cn("svg-glitch-filter relative", className)}>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.01 0.03"
              numOctaves={3}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={intensity}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {colorShift && (
              <>
                <feOffset in="displaced" dx={2} dy={0} result="r" />
                <feOffset in="displaced" dx={-2} dy={0} result="b" />
                <feBlend in="r" in2="b" mode="screen" />
              </>
            )}
          </filter>
        </defs>
      </svg>
      <div style={active ? { filter: `url(#${filterId})` } : undefined}>
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// SvgWaveDistortion — feTurbulence wave distortion wrapper
// =============================================================================

interface SvgWaveDistortionProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  frequency?: number;
  speed?: number;
  active?: boolean;
}

export function SvgWaveDistortion({
  children,
  className,
  intensity = 15,
  frequency = 0.02,
  speed = 1,
  active = true,
}: SvgWaveDistortionProps) {
  const filterId = useId().replace(/:/g, "");
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (!active) return;

    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.01 * speed;

      if (turbRef.current) {
        const freq = frequency + Math.sin(t) * frequency * 0.5;
        turbRef.current.setAttribute(
          "baseFrequency",
          `${freq} ${freq * 0.5}`
        );
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, frequency, speed]);

  return (
    <div className={cn("svg-wave-distortion relative", className)}>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency={`${frequency} ${frequency * 0.5}`}
              numOctaves={3}
              result="wave"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="wave"
              scale={intensity}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div style={active ? { filter: `url(#${filterId})` } : undefined}>
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// SvgGradientFlow — Animated flowing gradient on SVG paths/text
// =============================================================================

interface SvgGradientFlowProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  direction?: "horizontal" | "vertical" | "diagonal";
  trigger?: "auto" | "scroll";
  viewBox?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgGradientFlow({
  children,
  className,
  colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#8b5cf6"],
  speed = 1,
  direction = "horizontal",
  trigger = "auto",
  viewBox,
  width,
  height,
}: SvgGradientFlowProps) {
  const gradientId = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);

  const gradientCoords = {
    horizontal: { x1: "0%", y1: "0%", x2: "200%", y2: "0%" },
    vertical: { x1: "0%", y1: "0%", x2: "0%", y2: "200%" },
    diagonal: { x1: "0%", y1: "0%", x2: "200%", y2: "200%" },
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const gradient = svg.querySelector(`#${CSS.escape(gradientId)}`);
    if (!gradient) return;

    if (trigger === "auto") {
      const obj = { offset: 0 };
      const tween = gsap.to(obj, {
        offset: -100,
        duration: 4 / speed,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          const axis = direction === "vertical" ? "y1" : "x1";
          const axis2 = direction === "vertical" ? "y2" : "x2";
          gradient.setAttribute(axis, `${obj.offset}%`);
          gradient.setAttribute(
            axis2,
            `${obj.offset + (direction === "diagonal" ? 200 : 200)}%`
          );
        },
      });
      return () => { tween.kill(); };
    }

    if (trigger === "scroll") {
      const st = ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const offset = -self.progress * 100;
          const axis = direction === "vertical" ? "y1" : "x1";
          const axis2 = direction === "vertical" ? "y2" : "x2";
          gradient.setAttribute(axis, `${offset}%`);
          gradient.setAttribute(axis2, `${offset + 200}%`);
        },
      });
      return () => { st.kill(); };
    }
  }, [gradientId, speed, direction, trigger]);

  const coords = gradientCoords[direction];
  const stopStep = 100 / (colors.length - 1);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-gradient-flow", className)}
      viewBox={viewBox}
      width={width}
      height={height}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          {...coords}
        >
          {colors.map((color, i) => (
            <stop
              key={i}
              offset={`${i * stopStep}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`} stroke={`url(#${gradientId})`}>
        {children}
      </g>
    </svg>
  );
}

// =============================================================================
// SvgCircuitBoard — Animated circuit pattern
// =============================================================================

interface SvgCircuitBoardProps {
  className?: string;
  width?: number;
  height?: number;
  nodeCount?: number;
  color?: string;
  glowColor?: string;
  animated?: boolean;
  speed?: number;
}

interface CircuitNode {
  x: number;
  y: number;
  connections: number[];
}

function generateCircuitNodes(
  w: number,
  h: number,
  count: number
): CircuitNode[] {
  const nodes: CircuitNode[] = [];
  const gridSize = Math.ceil(Math.sqrt(count));
  const cellW = w / gridSize;
  const cellH = h / gridSize;

  for (let i = 0; i < count; i++) {
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    nodes.push({
      x: cellW * col + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4,
      y: cellH * row + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.4,
      connections: [],
    });
  }

  // Connect nearby nodes
  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((n, j) => ({
        j,
        dist: Math.hypot(n.x - node.x, n.y - node.y),
      }))
      .filter((n) => n.j !== i && n.dist < Math.max(cellW, cellH) * 1.8)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2 + Math.floor(Math.random() * 2));

    nearest.forEach((n) => {
      if (!node.connections.includes(n.j)) {
        node.connections.push(n.j);
      }
    });
  });

  return nodes;
}

function generateCircuitPath(from: CircuitNode, to: CircuitNode): string {
  // Right-angle paths like real circuits
  const midX = from.x + (to.x - from.x) * 0.5;
  if (Math.random() > 0.5) {
    return `M ${from.x},${from.y} L ${midX},${from.y} L ${midX},${to.y} L ${to.x},${to.y}`;
  }
  return `M ${from.x},${from.y} L ${from.x},${to.y * 0.5 + from.y * 0.5} L ${to.x},${to.y * 0.5 + from.y * 0.5} L ${to.x},${to.y}`;
}

export function SvgCircuitBoard({
  className,
  width = 600,
  height = 400,
  nodeCount = 16,
  color = "rgba(139, 92, 246, 0.3)",
  glowColor = "#8b5cf6",
  animated = true,
  speed = 1,
}: SvgCircuitBoardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const filterId = useId().replace(/:/g, "");
  const [nodes] = useState(() => generateCircuitNodes(width, height, nodeCount));

  // Collect all connections
  const paths: { from: CircuitNode; to: CircuitNode; key: string }[] = [];
  const seen = new Set<string>();
  nodes.forEach((node, i) => {
    node.connections.forEach((j) => {
      const key = [Math.min(i, j), Math.max(i, j)].join("-");
      if (!seen.has(key)) {
        seen.add(key);
        paths.push({ from: node, to: nodes[j], key });
      }
    });
  });

  useEffect(() => {
    if (!animated || !svgRef.current) return;

    const svg = svgRef.current;

    // Draw paths sequentially
    const pathEls = svg.querySelectorAll(".circuit-path");
    const nodeEls = svg.querySelectorAll(".circuit-node");
    const dataEls = svg.querySelectorAll(".circuit-data");

    // Setup paths for drawing
    pathEls.forEach((el) => {
      if (el instanceof SVGGeometryElement) {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      }
    });

    gsap.set(nodeEls, { scale: 0, transformOrigin: "center" });
    gsap.set(dataEls, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });

    // Draw paths
    tl.to(pathEls, {
      strokeDashoffset: 0,
      duration: 1.5 / speed,
      stagger: 0.1 / speed,
      ease: "power2.inOut",
    });

    // Pop in nodes
    tl.to(
      nodeEls,
      {
        scale: 1,
        duration: 0.4 / speed,
        stagger: 0.05 / speed,
        ease: "back.out(2)",
      },
      "-=0.5"
    );

    // Pulse nodes
    tl.to(nodeEls, {
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
    });

    // Animate data particles along paths
    if (dataEls.length > 0) {
      dataEls.forEach((dot, i) => {
        const pathEl = pathEls[i % pathEls.length];
        if (!(pathEl instanceof SVGGeometryElement)) return;

        const len = pathEl.getTotalLength();
        const obj = { dist: 0 };

        gsap.set(dot, { opacity: 1 });
        gsap.to(obj, {
          dist: len,
          duration: (2 + Math.random() * 2) / speed,
          repeat: -1,
          ease: "none",
          delay: 2 + i * 0.5,
          onUpdate: () => {
            const pt = pathEl.getPointAtLength(obj.dist);
            gsap.set(dot, { cx: pt.x, cy: pt.y });
          },
        });
      });
    }

    return () => { tl.kill(); };
  }, [animated, speed]);

  return (
    <svg
      ref={svgRef}
      className={cn("svg-circuit-board", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection paths */}
      {paths.map(({ from, to, key }) => (
        <path
          key={key}
          className="circuit-path"
          d={generateCircuitPath(from, to)}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
        />
      ))}

      {/* Junction nodes */}
      {nodes.map((node, i) => (
        <circle
          key={i}
          className="circuit-node"
          cx={node.x}
          cy={node.y}
          r={4}
          fill={glowColor}
          filter={`url(#${filterId})`}
        />
      ))}

      {/* Data particles */}
      {paths.slice(0, 6).map(({ key }) => (
        <circle
          key={`data-${key}`}
          className="circuit-data"
          cx={0}
          cy={0}
          r={2.5}
          fill={glowColor}
          filter={`url(#${filterId})`}
        />
      ))}
    </svg>
  );
}
