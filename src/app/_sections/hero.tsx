"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { MouseParallax } from "@/components/effects/mouse-parallax";
import { HeroText } from "./hero-text";

// Dynamic imports for heavy canvas/shader backgrounds (no SSR)
const Particles = dynamic(
  () => import("@/components/backgrounds/particles").then((m) => ({ default: m.Particles })),
  { ssr: false }
);
const GradientMesh = dynamic(
  () => import("@/components/backgrounds/gradient-mesh").then((m) => ({ default: m.GradientMesh })),
  { ssr: false }
);
const InfiniteGrid = dynamic(
  () => import("@/components/backgrounds/infinite-grid").then((m) => ({ default: m.InfiniteGrid })),
  { ssr: false }
);

export function HeroSection() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Direction-specific animated background */}
      {!prefersReduced && (
        <MouseParallax strength={0.015} inverted className="absolute inset-0 z-0">
          <HeroBackground direction={direction} accent={meta.accent} />
        </MouseParallax>
      )}

      {/* Static fallback for reduced motion */}
      {prefersReduced && <StaticBackground direction={direction} />}

      {/* Content with subtle parallax */}
      <MouseParallax strength={0.008} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <HeroText />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center justify-center gap-4 pt-8"
        >
          <a
            href="#components"
            className="group relative px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 overflow-hidden"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">Explore Components</span>
          </a>
          <a
            href="#directions"
            className="group relative px-8 py-3 rounded-full border border-border text-foreground font-medium overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Animated border glow on hover */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `conic-gradient(from 0deg, ${meta.accent}40, transparent, ${meta.accent}40)`,
              }}
            />
            <span className="absolute inset-[1px] rounded-full bg-background" />
            <span className="relative z-10">See Directions</span>
          </a>
        </motion.div>
      </MouseParallax>

      {/* Floating accent elements with strong parallax */}
      {!prefersReduced && (
        <MouseParallax strength={0.04} inverted className="absolute inset-0 pointer-events-none">
          <FloatingAccents direction={direction} accent={meta.accent} />
        </MouseParallax>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroBackground({ direction, accent }: { direction: string; accent: string }) {
  switch (direction) {
    case "luxury":
      return (
        <div className="absolute inset-0">
          <GradientMesh
            interactive
            speed={0.3}
            className="absolute inset-0 opacity-60"
          />
          {/* Subtle gold sparkles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: accent,
                  left: `${10 + (i * 4.2) % 80}%`,
                  top: `${5 + (i * 5.3) % 90}%`,
                }}
                animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + (i % 3),
                  delay: (i * 0.5) % 3,
                }}
              />
            ))}
          </div>
        </div>
      );
    case "cyberpunk":
      return (
        <div className="absolute inset-0">
          <InfiniteGrid speed={0.8} className="absolute inset-0 opacity-30" />
          <Particles
            quantity={40}
            connected
            color={accent}
            speed={0.5}
            className="absolute inset-0"
          />
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanline opacity-30" />
          {/* Glow spots */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse-glow" style={{ backgroundColor: `${accent}15` }} />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] animate-pulse-glow" style={{ backgroundColor: "#FF006020", animationDelay: "1.5s" }} />
        </div>
      );
    case "kinetic":
      return (
        <div className="absolute inset-0">
          <Particles
            quantity={60}
            speed={1.2}
            color={accent}
            className="absolute inset-0"
          />
          {/* Aurora-like gradient behind */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(ellipse at 30% 50%, ${accent}15, transparent 60%)`,
                `radial-gradient(ellipse at 70% 50%, ${accent}15, transparent 60%)`,
                `radial-gradient(ellipse at 30% 50%, ${accent}15, transparent 60%)`,
              ],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </div>
      );
    case "freestyle":
    default:
      return (
        <div className="absolute inset-0">
          <GradientMesh
            speed={0.6}
            className="absolute inset-0 opacity-40"
          />
          {/* Organic blob shapes */}
          <motion.div
            className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[80px]"
            style={{ backgroundColor: `${accent}20` }}
            animate={{ scale: [1, 1.2, 1], x: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full blur-[70px]"
            style={{ backgroundColor: "#10B98120" }}
            animate={{ scale: [1.1, 0.9, 1.1], y: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          />
        </div>
      );
  }
}

function StaticBackground({ direction }: { direction: string }) {
  switch (direction) {
    case "luxury":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
      );
    case "cyberpunk":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
          <div className="absolute inset-0 bg-grid-primary/[0.02]" />
        </div>
      );
    case "kinetic":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        </div>
      );
    default:
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/5" />
        </div>
      );
  }
}

function FloatingAccents({ direction, accent }: { direction: string; accent: string }) {
  const items = direction === "cyberpunk"
    ? [
        { x: "15%", y: "20%", size: 4, delay: 0 },
        { x: "80%", y: "30%", size: 3, delay: 1 },
        { x: "70%", y: "75%", size: 5, delay: 0.5 },
      ]
    : [
        { x: "10%", y: "25%", size: 6, delay: 0 },
        { x: "85%", y: "20%", size: 4, delay: 0.8 },
        { x: "75%", y: "80%", size: 5, delay: 1.5 },
        { x: "20%", y: "70%", size: 3, delay: 0.3 },
      ];

  return (
    <>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
            backgroundColor: accent,
            opacity: 0.4,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + i,
            delay: item.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
