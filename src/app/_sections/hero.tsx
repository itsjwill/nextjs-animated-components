"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { MouseParallax } from "@/components/effects/mouse-parallax";
import { Particles } from "@/components/backgrounds/particles";
import { InfiniteGrid } from "@/components/backgrounds/infinite-grid";

export function HeroSection() {
  const { direction } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const meta = DIRECTION_META[direction];
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Direction-specific animated background */}
      {mounted && !prefersReduced && (
        <MouseParallax strength={0.015} inverted className="absolute inset-0 z-0">
          <HeroBackground direction={direction} accent={meta.accent} />
        </MouseParallax>
      )}

      {/* Static fallback for reduced motion */}
      {prefersReduced && <StaticBackground direction={direction} />}

      {/* Direction-specific layout — each is FUNDAMENTALLY different */}
      <div className="relative z-10 min-h-screen">
        {direction === "luxury" && <LuxuryHero accent={meta.accent} mounted={mounted} reduced={prefersReduced} />}
        {direction === "cyberpunk" && <CyberpunkHero accent={meta.accent} mounted={mounted} reduced={prefersReduced} />}
        {direction === "kinetic" && <KineticHero accent={meta.accent} mounted={mounted} reduced={prefersReduced} />}
        {direction === "freestyle" && <FreestyleHero accent={meta.accent} mounted={mounted} reduced={prefersReduced} />}
      </div>

      {/* Scroll indicator — direction-aware */}
      {mounted && <ScrollIndicator direction={direction} accent={meta.accent} />}
    </section>
  );
}

// =============================================================================
// LUXURY HERO — Editorial emptiness, serif whisper, gold precision
// Inspired by: Richard Mille, Hermès, Bottega Veneta, Architectural Digest
// The negative space IS the product. Every pixel costs $10,000.
// =============================================================================

function LuxuryHero({ accent, mounted, reduced }: { accent: string; mounted: boolean; reduced: boolean }) {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Top bar — barely visible, editorial numbering */}
      <motion.div
        className="flex items-center justify-between px-8 md:px-16 lg:px-24 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
      >
        <span className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/40 font-light">
          No. 001
        </span>
        <span className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/40 font-light">
          Collection 2026
        </span>
      </motion.div>

      {/* Center — the void with a single statement */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="text-center max-w-[900px]">
          {/* Tiny gold marker above heading */}
          <motion.div
            className="flex justify-center mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 2 }}
          >
            <div className="w-[1px] h-12" style={{ backgroundColor: `${accent}50` }} />
          </motion.div>

          {/* The heading — each word is an event, impossibly light */}
          <h1 className="mb-20">
            {/* Line 1 — "Crafted" in thin serif-feeling type */}
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[clamp(1rem,2.5vw,1.5rem)] tracking-[0.4em] uppercase text-muted-foreground/60 mb-8"
                style={{ fontWeight: 200 }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Crafted for those who
              </motion.span>
            </span>

            {/* Line 2 — "Demand" massive, thin */}
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-[0.02em]"
                style={{ fontWeight: 100 }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.3, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Demand
              </motion.span>
            </span>

            {/* Line 3 — "More" in gold, same massive scale */}
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-[0.02em] italic"
                style={{ fontWeight: 100, color: accent }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 1.6, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              >
                More.
              </motion.span>
            </span>
          </h1>

          {/* Sub-statement — barely there */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.0, duration: 2 }}
            className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground/50 font-extralight max-w-xs mx-auto leading-[2]"
          >
            Ninety-five components. Four directions.
            <br />
            One standard.
          </motion.p>
        </div>
      </div>

      {/* Bottom — the only interactive elements, pushed to the very edge */}
      <motion.div
        className="flex items-end justify-between px-8 md:px-16 lg:px-24 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
      >
        {/* Left CTA — just text, barely a link */}
        <a
          href="#components"
          className="group text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 hover:text-foreground transition-all duration-1000 font-light"
        >
          <span className="flex items-center gap-4">
            <motion.span
              className="block w-8 h-[0.5px] origin-left"
              style={{ backgroundColor: accent }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            Explore
          </span>
        </a>

        {/* Center — scroll line */}
        <motion.div
          className="hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 4.5, duration: 2 }}
        >
          <span className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/30">
            Scroll
          </span>
          <motion.div
            className="w-[0.5px] h-16"
            style={{ backgroundColor: `${accent}40` }}
            animate={{ scaleY: [0, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right — direction label */}
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30 font-light">
          Luxury
        </span>
      </motion.div>

      {/* Ambient gold light — barely visible, asymmetric */}
      {mounted && !reduced && (
        <>
          <motion.div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accent}04, transparent 70%)` }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          {/* Single floating gold particle — one is luxury, many is middle class */}
          <motion.div
            className="absolute top-[40%] left-[15%] w-[2px] h-[2px] rounded-full pointer-events-none"
            style={{ backgroundColor: accent }}
            animate={{ opacity: [0, 0.6, 0], y: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}

// =============================================================================
// CYBERPUNK HERO — HUD panels, angular cuts, terminal aesthetic, dense info
// Inspired by: Blade Runner, GMUNK, Ghost in the Shell interfaces
// =============================================================================

function CyberpunkHero({ accent, mounted, reduced }: { accent: string; mounted: boolean; reduced: boolean }) {
  const [statusText, setStatusText] = useState("INITIALIZING");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const statuses = ["INITIALIZING", "LOADING_ASSETS", "COMPILING_SHADERS", "SYSTEM_READY"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = Math.min(idx + 1, statuses.length - 1);
      setStatusText(statuses[idx]);
      if (idx >= statuses.length - 1) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev < 99 ? prev + 1 : 99);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 md:p-6 font-mono">
      {/* Top HUD bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="flex items-center justify-between text-[10px] tracking-[0.2em] text-primary/60"
      >
        <div className="flex items-center gap-4">
          <span className="cyber-flicker">SYS::{statusText}</span>
          <span className="w-px h-3 bg-primary/30" />
          <span>VER::4.0.1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>MEM::94%</span>
          <span className="w-px h-3 bg-primary/30" />
          <span>NODES::95+</span>
        </div>
      </motion.div>

      {/* Main content — grid layout with HUD panels */}
      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full max-w-[var(--container-max)] mx-auto">
          {/* Left data panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-3 hidden lg:block"
          >
            <div className="cyber-clip border border-primary/20 p-4 space-y-3">
              <div className="text-[9px] tracking-[0.2em] text-primary/50">COMPONENT_DATA</div>
              {["GSAP", "FRAMER", "THREE.JS", "LENIS"].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-primary/70">{item}</span>
                  <span className="text-accent/80">[LOADED]</span>
                </div>
              ))}
              <div className="h-px bg-primary/10 my-2" />
              <div className="text-[9px] text-primary/40">
                {">"} DIRECTIONS: 4<br />
                {">"} COMPONENTS: 95+<br />
                {">"} STATUS: OPERATIONAL
              </div>
            </div>
          </motion.div>

          {/* Center — main heading area */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">
            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[120px] md:text-[180px] leading-none font-bold tabular-nums"
              style={{ color: accent, textShadow: `0 0 60px ${accent}30, 0 0 120px ${accent}15` }}
            >
              {String(counter).padStart(2, "0")}
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-[clamp(1.5rem,4vw,3rem)] leading-tight mt-4"
            >
              <span className="block text-foreground">BUILD_WEBSITES</span>
              <span className="block neon-text" style={{ color: accent }}>THAT_WIN_AWARDS</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[11px] tracking-[0.15em] text-muted-foreground mt-6 max-w-sm"
            >
              {">"} ANIMATION TOOLKIT FOR DEVELOPERS WHO REFUSE TO BUILD BORING
            </motion.p>

            {/* CTA buttons — angular, neon borders */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="flex items-center gap-4 mt-8"
            >
              <a
                href="#components"
                className="cyber-clip-sm px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold neon-border"
                style={{ color: accent }}
              >
                EXPLORE::COMPONENTS
              </a>
              <a
                href="#directions"
                className="px-6 py-3 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary border border-primary/20 hover:border-primary/50 transition-all duration-150"
              >
                SEE::DIRECTIONS
              </a>
            </motion.div>
          </div>

          {/* Right data panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-3 hidden lg:block"
          >
            <div className="cyber-clip border border-accent/20 p-4 space-y-3">
              <div className="text-[9px] tracking-[0.2em] text-accent/50">SIGNAL_FEED</div>
              {[
                { label: "LUXURY", status: "ACTIVE" },
                { label: "CYBERPUNK", status: "ACTIVE" },
                { label: "KINETIC", status: "ACTIVE" },
                { label: "FREESTYLE", status: "ACTIVE" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-accent/70">{item.label}</span>
                  <span className="text-primary/60">[{item.status}]</span>
                </div>
              ))}
              <div className="h-px bg-accent/10 my-2" />
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-6 transition-all"
                    style={{
                      backgroundColor: `${accent}${Math.floor(20 + Math.random() * 60).toString(16)}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="flex items-center justify-between text-[10px] tracking-[0.15em] text-primary/40"
      >
        <span>SCAN_COMPLETE</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>AWAITING_INPUT</span>
        </div>
      </motion.div>
    </div>
  );
}

// =============================================================================
// KINETIC HERO — Centered, oversized, bouncy, pill shapes, gradient fills
// Inspired by: Stripe, Linear, Vercel marketing pages
// =============================================================================

function KineticHero({ accent, mounted, reduced }: { accent: string; mounted: boolean; reduced: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mb-10"
          style={{
            background: `linear-gradient(135deg, ${accent}15, ${accent}05)`,
            border: `1px solid ${accent}30`,
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accent }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span style={{ color: accent }}>95+ Components</span>
          <motion.span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: `${accent}20`, color: accent }}
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            NEW
          </motion.span>
        </motion.div>

        {/* Big heading — per-character spring bounce */}
        <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.95] mb-8">
          <span className="block">
            {"Build Websites".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 80, opacity: 0, rotate: -20 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 0.4 + i * 0.03,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <span className="block kinetic-gradient">
            {"That Win Awards".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={char !== " " ? {
                  background: `linear-gradient(135deg, ${accent}, hsl(172, 70%, 55%))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : undefined}
                initial={{ y: 80, opacity: 0, rotate: 20 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 0.7 + i * 0.03,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12"
        >
          The animation toolkit for developers who refuse to build boring.
          GSAP + Framer Motion + Three.js + Lenis.
        </motion.p>

        {/* CTA buttons — big pill shapes, gradient fills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#components"
            className="group relative px-8 py-4 rounded-full text-white font-semibold text-lg overflow-hidden shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${accent}, hsl(172, 70%, 55%))`,
              boxShadow: `0 20px 40px ${accent}30`,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explore Components</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, hsl(172, 70%, 55%), ${accent})` }}
            />
          </motion.a>
          <motion.a
            href="#directions"
            className="px-8 py-4 rounded-full text-foreground font-semibold text-lg border-2 border-border hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            See Directions
          </motion.a>
        </motion.div>

        {/* Floating gradient orbs */}
        {mounted && !reduced && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]"
              style={{ backgroundColor: `${accent}15` }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[80px]"
              style={{ backgroundColor: "hsl(172, 70%, 55%, 0.1)" }}
              animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1.1, 1, 1.1] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// FREESTYLE HERO — Broken grid, overlapping, rotated text, asymmetric, LOUD
// Inspired by: David Carson, Virgil Abloh, Brutalist web design
// =============================================================================

function FreestyleHero({ accent, mounted, reduced }: { accent: string; mounted: boolean; reduced: boolean }) {
  return (
    <div className="min-h-screen relative flex items-center px-6 md:px-12 overflow-hidden">
      {/* Background decorative text — massive, rotated, behind everything */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 0.04, scale: 1, rotate: -8 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <span className="text-[20vw] font-black whitespace-nowrap leading-none">
          AWWWARDS
        </span>
      </motion.div>

      {/* Main content — asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full max-w-none relative z-10">
        {/* Left side — tilted heading */}
        <div className="lg:col-span-7 lg:col-start-1">
          {/* Badge — sticker style */}
          <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -3, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span
              className="inline-block px-4 py-2 text-xs font-extrabold uppercase tracking-wider border-2 border-current transform -rotate-2"
              style={{ color: accent }}
            >
              95+ Components
            </span>
          </motion.div>

          {/* Heading — massive, tilted, overlapping */}
          <div className="relative">
            <motion.h1
              className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.8] -tracking-[0.04em]"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="block"
                animate={!reduced ? { rotate: [-1, 0.5, -1] } : undefined}
                transition={{ repeat: Infinity, duration: 6 }}
              >
                Build
              </motion.span>
            </motion.h1>

            <motion.h1
              className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.8] -tracking-[0.04em] -mt-2 md:-mt-4"
              style={{ color: accent }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="block freestyle-marker"
                animate={!reduced ? { rotate: [1, -0.5, 1] } : undefined}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                Websites
              </motion.span>
            </motion.h1>

            <motion.h1
              className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.8] -tracking-[0.04em] -mt-2 md:-mt-4"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block">
                That Win
              </span>
            </motion.h1>

            {/* "Awards" with color block behind it */}
            <motion.div
              className="relative inline-block -mt-2 md:-mt-4"
              initial={{ opacity: 0, y: 60, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              <span
                className="absolute inset-0 -inset-x-4 -inset-y-2"
                style={{ backgroundColor: `${accent}20` }}
              />
              <h1 className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.8] -tracking-[0.04em] relative" style={{ color: accent }}>
                Awards
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Right side — description + buttons, offset vertically */}
        <motion.div
          className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end mt-12 lg:mt-0 lg:pb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {/* Description — raw, no container */}
          <p className="text-lg md:text-xl text-muted-foreground leading-snug mb-8 max-w-sm">
            The animation toolkit for developers who refuse to build boring.
            <span className="block mt-2 text-foreground font-bold">Rules are suggestions.</span>
          </p>

          {/* CTA buttons — raw, bold, stacked */}
          <div className="flex flex-col gap-3">
            <motion.a
              href="#components"
              className="inline-flex items-center px-6 py-4 font-extrabold text-lg border-[3px] hover:translate-x-1 hover:-translate-y-1 transition-transform"
              style={{ borderColor: accent, color: accent }}
              whileHover={{ rotate: -1 }}
            >
              EXPLORE COMPONENTS
              <span className="ml-auto text-2xl">→</span>
            </motion.a>
            <motion.a
              href="#directions"
              className="inline-flex items-center px-6 py-4 font-extrabold text-lg border-[3px] border-foreground/30 text-foreground/70 hover:border-foreground hover:text-foreground hover:translate-x-1 hover:-translate-y-1 transition-all"
              whileHover={{ rotate: 1 }}
            >
              SEE DIRECTIONS
              <span className="ml-auto text-2xl">↗</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative circles — scattered, overlapping */}
      {mounted && !reduced && (
        <>
          <motion.div
            className="absolute top-[15%] right-[10%] w-32 h-32 rounded-full border-[3px] opacity-20"
            style={{ borderColor: accent }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, scale: { repeat: Infinity, duration: 4 } }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[5%] w-20 h-20 opacity-15"
            style={{ backgroundColor: accent }}
            animate={{ rotate: [0, 90, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <motion.div
            className="absolute top-[40%] right-[25%] w-4 h-4 rounded-full"
            style={{ backgroundColor: "hsl(150, 80%, 45%)" }}
            animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </>
      )}
    </div>
  );
}

// =============================================================================
// BACKGROUNDS — Direction-specific
// =============================================================================

function HeroBackground({ direction, accent }: { direction: string; accent: string }) {
  switch (direction) {
    case "luxury":
      return (
        <div className="absolute inset-0">
          {/* Nothing. The void is the design. Maybe a single horizontal hair-line. */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[0.5px] pointer-events-none"
            style={{ background: `linear-gradient(to right, transparent, ${accent}08, transparent)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 3 }}
          />
        </div>
      );
    case "cyberpunk":
      return (
        <div className="absolute inset-0">
          <InfiniteGrid speed={0.5} className="absolute inset-0 opacity-20" />
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanline opacity-20" />
          {/* Glow spots */}
          <div
            className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] animate-pulse-glow"
            style={{ backgroundColor: `${accent}10` }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] rounded-full blur-[80px] animate-pulse-glow"
            style={{ backgroundColor: "#FF006015", animationDelay: "1.5s" }}
          />
        </div>
      );
    case "kinetic":
      return (
        <div className="absolute inset-0">
          <Particles
            quantity={50}
            speed={0.8}
            color={accent}
            className="absolute inset-0"
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(ellipse at 30% 50%, ${accent}10, transparent 60%)`,
                `radial-gradient(ellipse at 70% 50%, ${accent}10, transparent 60%)`,
                `radial-gradient(ellipse at 30% 50%, ${accent}10, transparent 60%)`,
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
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Bold color blocks */}
          <motion.div
            className="absolute top-0 right-0 w-1/3 h-1/2"
            style={{ backgroundColor: `${accent}06` }}
            animate={{ scaleX: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-1/2 h-1/3"
            style={{ backgroundColor: "hsl(150, 80%, 45%, 0.04)" }}
            animate={{ scaleY: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 8, delay: 1 }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background" />
        </div>
      );
    case "cyberpunk":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
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
          <div className="absolute inset-0 bg-background" />
        </div>
      );
  }
}

// =============================================================================
// SCROLL INDICATOR — Direction-aware
// =============================================================================

function ScrollIndicator({ direction, accent }: { direction: string; accent: string }) {
  if (direction === "luxury") {
    // Luxury: built into the hero layout itself, no separate indicator needed
    return null;
  }

  if (direction === "cyberpunk") {
    // Cyberpunk: blinking arrow
    return (
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 text-xs tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ▼ SCROLL
        </motion.span>
      </motion.div>
    );
  }

  if (direction === "freestyle") {
    // Freestyle: rotated text
    return (
      <motion.div
        className="absolute bottom-8 right-8 text-sm font-bold transform rotate-90 origin-bottom-right text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        SCROLL ↓
      </motion.div>
    );
  }

  // Kinetic: bouncy circle
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center"
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary/50"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  );
}
