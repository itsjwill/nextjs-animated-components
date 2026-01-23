"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { getMotionVariants } from "@/lib/motion";
import { SectionReveal } from "@/components/scroll/section-reveal";

const COMPONENT_PREVIEWS = [
  {
    name: "TiltCard",
    category: "Cards",
    description: "3D perspective tilt on hover",
    preview: "tilt",
  },
  {
    name: "TextGenerate",
    category: "Text",
    description: "Word-by-word text reveal",
    preview: "text",
  },
  {
    name: "MagneticButton",
    category: "Effects",
    description: "Cursor-following magnetic pull",
    preview: "button",
  },
  {
    name: "ParallaxScroll",
    category: "Scroll",
    description: "Multi-layer scroll parallax",
    preview: "parallax",
  },
  {
    name: "GlowCard",
    category: "Cards",
    description: "Radial gradient glow on hover",
    preview: "glow",
  },
  {
    name: "Globe",
    category: "3D",
    description: "Interactive wireframe globe",
    preview: "globe",
  },
];

export function CarouselSection() {
  const { direction } = useTheme();
  const variants = getMotionVariants(direction);
  const meta = DIRECTION_META[direction];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="components" className="py-32 lg:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full text-caption font-medium border border-border bg-surface/50 mb-6">
            Component Library
          </span>
          <h2 className="text-heading-1 font-heading mb-4">
            Every Component.{" "}
            <span className="text-primary">Production Ready.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            Copy, paste, ship. Each component adapts to your chosen direction automatically.
          </p>
        </motion.div>
      </div>

      {/* Scrolling cards */}
      <div className="relative">
        <div className="flex gap-6 px-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
          {COMPONENT_PREVIEWS.map((component, i) => (
            <motion.div
              key={component.name}
              initial={{ opacity: 0, y: 80, rotateX: 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[340px] snap-center"
              style={{ perspective: 1000 }}
            >
              <TiltCard accent={meta.accent}>
                {/* Preview area */}
                <div className="aspect-[4/3] relative bg-muted/30 flex items-center justify-center overflow-hidden">
                  <ComponentPreview type={component.preview} accent={meta.accent} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption text-muted-foreground font-medium uppercase tracking-wider">
                      {component.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-heading-3 mb-1">{component.name}</h3>
                  <p className="text-body-sm text-muted-foreground">{component.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}

function ComponentPreview({ type, accent }: { type: string; accent: string }) {
  switch (type) {
    case "tilt":
      return (
        <motion.div
          whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
          className="w-32 h-20 rounded-xl border border-border bg-surface shadow-lg"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="p-3 space-y-1.5">
            <div className="h-1.5 rounded-full w-12" style={{ backgroundColor: accent }} />
            <div className="h-1 rounded-full w-20 bg-muted-foreground/20" />
            <div className="h-1 rounded-full w-16 bg-muted-foreground/15" />
          </div>
        </motion.div>
      );
    case "text":
      return (
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatDelay: 3, duration: 1.5 }}
            className="text-heading-3 font-heading"
            style={{ color: accent }}
          >
            Hello World
          </motion.span>
        </div>
      );
    case "button":
      return (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="px-6 py-2.5 rounded-full font-medium text-sm text-white"
          style={{ backgroundColor: accent }}
        >
          Hover me
        </motion.div>
      );
    case "parallax":
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-20 h-14 rounded-lg bg-muted-foreground/10 border border-border absolute"
            style={{ top: "20%" }}
          />
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-24 h-16 rounded-lg border border-border relative"
            style={{ backgroundColor: `${accent}15` }}
          />
        </div>
      );
    case "glow":
      return (
        <motion.div
          animate={{ boxShadow: [`0 0 20px ${accent}30`, `0 0 40px ${accent}50`, `0 0 20px ${accent}30`] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-32 h-20 rounded-xl border border-border bg-surface"
        />
      );
    case "globe":
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="w-24 h-24 rounded-full border-2 relative"
          style={{ borderColor: `${accent}40` }}
        >
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: `${accent}30` }} />
          <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ backgroundColor: `${accent}30` }} />
        </motion.div>
      );
    default:
      return null;
  }
}

function TiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateY((x - 0.5) * 10);
    setRotateX((0.5 - y) * 10);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className="group rounded-2xl border border-border bg-surface/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Cursor-following glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${accent}15, transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
