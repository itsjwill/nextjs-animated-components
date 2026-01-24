"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { SectionReveal } from "@/components/scroll/section-reveal";

export function ButtonShowcase() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header - direction aware */}
        {direction === "luxury" && <LuxuryHeader isInView={isInView} />}
        {direction === "cyberpunk" && <CyberpunkHeader isInView={isInView} />}
        {direction === "kinetic" && <KineticHeader isInView={isInView} />}
        {direction === "freestyle" && <FreestyleHeader isInView={isInView} />}

        {/* Button grid - completely different per direction */}
        <SectionReveal type="fade">
          {direction === "luxury" && <LuxuryButtons accent={meta.accent} isInView={isInView} />}
          {direction === "cyberpunk" && <CyberpunkButtons accent={meta.accent} isInView={isInView} />}
          {direction === "kinetic" && <KineticButtons accent={meta.accent} isInView={isInView} />}
          {direction === "freestyle" && <FreestyleButtons accent={meta.accent} isInView={isInView} />}
        </SectionReveal>
      </div>
    </section>
  );
}

// =============================================================================
// HEADERS - Each direction announces buttons differently
// =============================================================================

function LuxuryHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="mb-24"
    >
      <div className="flex items-center gap-6 mb-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground">
          Interactions
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <h2 className="text-heading-1 font-heading text-center" style={{ fontWeight: 100, letterSpacing: "0.08em" }}>
        Buttons that feel
      </h2>
    </motion.div>
  );
}

function CyberpunkHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="mb-16"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FFD1]/30 bg-[#00FFD1]/5 mb-4">
        <span className="w-1.5 h-1.5 bg-[#00FFD1] animate-pulse" />
        <span className="font-mono text-[10px] text-[#00FFD1] tracking-wider uppercase">
          UI_COMPONENTS::BUTTONS
        </span>
      </div>
      <h2 className="text-heading-1 font-heading font-bold tracking-wider">
        INPUT_ELEMENTS
      </h2>
      <p className="font-mono text-body-sm text-muted-foreground mt-2">
        {"// Interactive trigger components with hover states"}
      </p>
    </motion.div>
  );
}

function KineticHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="text-center mb-20"
    >
      <motion.span
        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-caption font-semibold mb-6"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
      >
        Buttons
      </motion.span>
      <h2 className="text-heading-1 font-heading font-extrabold tracking-tight">
        Click, hover, press.{" "}
        <span className="text-primary">Every one moves.</span>
      </h2>
    </motion.div>
  );
}

function FreestyleHeader({ isInView }: { isInView: boolean }) {
  return (
    <div className="mb-16 relative">
      <motion.h2
        initial={{ opacity: 0, x: -100, rotate: -3 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: -1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-display font-heading font-black leading-none"
        style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
      >
        BTNS
      </motion.h2>
      <motion.span
        initial={{ opacity: 0, rotate: 12 }}
        animate={isInView ? { opacity: 1, rotate: 8 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute -top-2 right-[20%] bg-[#FF6B35] text-black text-caption font-black px-3 py-1 rounded-sm"
        style={{ transform: "rotate(8deg)" }}
      >
        TAP 'EM
      </motion.span>
    </div>
  );
}

// =============================================================================
// LUXURY BUTTONS - Understated, refined, barely-there
// =============================================================================

function LuxuryButtons({ accent, isInView }: { accent: string; isInView: boolean }) {
  return (
    <div className="space-y-16">
      {/* Row 1: Text-only buttons with gold underline hover */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-12"
      >
        <button className="group relative text-body-lg font-light tracking-widest uppercase text-foreground/60 hover:text-foreground transition-all duration-700">
          Explore
          <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-700" style={{ backgroundColor: accent }} />
        </button>
        <button className="group relative text-body-lg font-light tracking-widest uppercase text-foreground/60 hover:text-foreground transition-all duration-700">
          Collection
          <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-700" style={{ backgroundColor: accent }} />
        </button>
        <button className="group relative text-body-lg font-light tracking-widest uppercase text-foreground/60 hover:text-foreground transition-all duration-700">
          Acquire
          <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-700" style={{ backgroundColor: accent }} />
        </button>
      </motion.div>

      {/* Row 2: Ultra-thin bordered buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-8"
      >
        <button className="px-10 py-3 border border-foreground/10 hover:border-foreground/40 text-sm font-light tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-all duration-700">
          View Details
        </button>
        <button className="px-10 py-3 border border-foreground/10 hover:border-foreground/40 text-sm font-light tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-all duration-700 relative overflow-hidden group">
          <span className="relative z-10">Add to Cart</span>
          <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{ backgroundColor: `${accent}10` }} />
        </button>
      </motion.div>

      {/* Row 3: Single statement button - barely visible, expands on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="flex justify-center"
      >
        <button className="group relative px-14 py-4 transition-all duration-1000">
          <span className="text-sm font-light tracking-[0.3em] uppercase text-foreground/40 group-hover:text-foreground/80 transition-colors duration-1000">
            Begin
          </span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px group-hover:w-full transition-all duration-1000" style={{ backgroundColor: accent }} />
        </button>
      </motion.div>

      {/* Row 4: Icon-minimal buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-10"
      >
        <button className="w-12 h-12 border border-foreground/10 hover:border-foreground/30 flex items-center justify-center text-foreground/50 hover:text-foreground transition-all duration-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button className="w-12 h-12 border border-foreground/10 hover:border-foreground/30 flex items-center justify-center text-foreground/50 hover:text-foreground transition-all duration-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
        <button className="w-12 h-12 border border-foreground/10 hover:border-foreground/30 flex items-center justify-center text-foreground/50 hover:text-foreground transition-all duration-700 relative group">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="10" />
            <path d="M10 8l6 4-6 4z" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}

// =============================================================================
// CYBERPUNK BUTTONS - Neon, angular, HUD-like
// =============================================================================

function CyberpunkButtons({ accent, isInView }: { accent: string; isInView: boolean }) {
  return (
    <div className="space-y-12">
      {/* Row 1: Primary neon buttons with clip-path */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex flex-wrap items-center gap-4"
      >
        <button
          className="relative px-8 py-3 font-mono text-sm font-bold tracking-wider text-black hover:scale-105 transition-transform duration-150"
          style={{
            backgroundColor: accent,
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            boxShadow: `0 0 20px ${accent}50, inset 0 0 20px ${accent}20`,
          }}
        >
          EXECUTE
        </button>
        <button
          className="relative px-8 py-3 font-mono text-sm font-bold tracking-wider hover:scale-105 transition-transform duration-150"
          style={{
            border: `1px solid ${accent}`,
            color: accent,
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            boxShadow: `0 0 10px ${accent}20`,
          }}
        >
          INITIALIZE
        </button>
        <button
          className="px-8 py-3 font-mono text-sm tracking-wider text-muted-foreground hover:text-foreground border border-border/50 hover:border-foreground/30 transition-all duration-150"
          style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
        >
          ABORT
        </button>
      </motion.div>

      {/* Row 2: Status buttons with blinking indicators */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex flex-wrap items-center gap-4"
      >
        <button className="inline-flex items-center gap-2 px-5 py-2 border border-[#00FFD1]/30 bg-[#00FFD1]/5 font-mono text-xs tracking-wider hover:bg-[#00FFD1]/10 transition-colors duration-150">
          <span className="w-1.5 h-1.5 bg-[#00FFD1] animate-pulse" />
          <span style={{ color: accent }}>ONLINE</span>
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2 border border-yellow-400/30 bg-yellow-400/5 font-mono text-xs tracking-wider hover:bg-yellow-400/10 transition-colors duration-150">
          <span className="w-1.5 h-1.5 bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400">STANDBY</span>
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2 border border-red-400/30 bg-red-400/5 font-mono text-xs tracking-wider hover:bg-red-400/10 transition-colors duration-150">
          <span className="w-1.5 h-1.5 bg-red-400" />
          <span className="text-red-400">OFFLINE</span>
        </button>
      </motion.div>

      {/* Row 3: Terminal-style command buttons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex flex-wrap items-center gap-4"
      >
        <button className="px-6 py-2.5 bg-surface border border-border font-mono text-xs hover:border-[#00FFD1]/50 transition-colors duration-150 group">
          <span className="text-muted-foreground group-hover:text-[#00FFD1]">$ </span>
          <span className="text-foreground">npm install</span>
        </button>
        <button className="px-6 py-2.5 bg-surface border border-border font-mono text-xs hover:border-[#00FFD1]/50 transition-colors duration-150 group">
          <span className="text-muted-foreground group-hover:text-[#00FFD1]">$ </span>
          <span className="text-foreground">npx motioncraft init</span>
        </button>
      </motion.div>

      {/* Row 4: Icon + label with scan-line hover */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.3 }}
        className="flex flex-wrap items-center gap-4"
      >
        <button className="group relative inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-[#00FFD1]/40 transition-colors duration-150 overflow-hidden">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#00FFD1]">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="font-mono text-xs tracking-wider">DEPLOY</span>
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFD1]/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
        <button className="group relative inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-[#00FFD1]/40 transition-colors duration-150 overflow-hidden">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#00FFD1]">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span className="font-mono text-xs tracking-wider">DOWNLOAD</span>
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFD1]/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}

// =============================================================================
// KINETIC BUTTONS - Bouncy, rounded, playful springs
// =============================================================================

function KineticButtons({ accent, isInView }: { accent: string; isInView: boolean }) {
  return (
    <div className="space-y-14">
      {/* Row 1: Gradient-filled pills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="px-8 py-3 rounded-full text-sm font-semibold text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)`, boxShadow: `0 8px 30px ${accent}40` }}
        >
          Get Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="px-8 py-3 rounded-full text-sm font-semibold border-2 shadow-md hover:shadow-lg transition-shadow"
          style={{ borderColor: accent, color: accent }}
        >
          Learn More
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="px-8 py-3 rounded-full text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 shadow-md"
        >
          Watch Demo
        </motion.button>
      </motion.div>

      {/* Row 2: Icon pills with slide-in label */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ backgroundColor: accent, boxShadow: `0 6px 20px ${accent}50` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md"
          style={{ borderColor: accent, color: accent }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-muted text-foreground shadow-md"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Row 3: Expanding pill with label reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.05, width: "auto" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden"
          style={{ backgroundColor: accent }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span className="whitespace-nowrap">Play Video</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 overflow-hidden"
          style={{ borderColor: accent, color: accent }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="whitespace-nowrap">Contact Us</span>
        </motion.button>
      </motion.div>

      {/* Row 4: Jelly toggle buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.65 }}
        className="flex items-center justify-center"
      >
        <div className="inline-flex rounded-full bg-muted p-1 shadow-inner">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="px-6 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            Monthly
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="px-6 py-2 rounded-full text-sm font-medium text-muted-foreground"
          >
            Yearly
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// =============================================================================
// FREESTYLE BUTTONS - Bold, unexpected, rule-breaking
// =============================================================================

function FreestyleButtons({ accent, isInView }: { accent: string; isInView: boolean }) {
  return (
    <div className="space-y-12">
      {/* Row 1: Oversized bold buttons with thick borders */}
      <motion.div
        initial={{ opacity: 0, rotate: -2, x: -40 }}
        animate={isInView ? { opacity: 1, rotate: 0, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="flex flex-wrap items-center gap-4"
      >
        <button
          className="px-10 py-4 text-lg font-black uppercase tracking-tight text-white hover:scale-105 transition-transform duration-200 relative"
          style={{ backgroundColor: accent }}
        >
          SMASH IT
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-foreground rounded-full" />
        </button>
        <button className="px-10 py-4 text-lg font-black uppercase tracking-tight border-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-200">
          GO WILD
        </button>
        <button className="px-10 py-4 text-lg font-black uppercase tracking-tight bg-foreground text-background hover:scale-105 transition-transform duration-200" style={{ transform: "skewX(-5deg)" }}>
          LET'S GO
        </button>
      </motion.div>

      {/* Row 2: Sticker/badge buttons */}
      <motion.div
        initial={{ opacity: 0, rotate: 2, x: 40 }}
        animate={isInView ? { opacity: 1, rotate: 0, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        className="flex flex-wrap items-center gap-5"
      >
        <button className="px-6 py-2 bg-yellow-400 text-black text-sm font-black uppercase rounded-sm hover:rotate-3 transition-transform duration-200" style={{ transform: "rotate(-2deg)" }}>
          NEW
        </button>
        <button className="px-6 py-2 bg-emerald-400 text-black text-sm font-black uppercase rounded-sm hover:rotate--3 transition-transform duration-200" style={{ transform: "rotate(1deg)" }}>
          FREE
        </button>
        <button className="px-6 py-2 text-sm font-black uppercase rounded-sm hover:rotate-2 transition-transform duration-200" style={{ backgroundColor: accent, color: "black", transform: "rotate(-1deg)" }}>
          HOT
        </button>
        <button className="px-6 py-2 bg-pink-500 text-white text-sm font-black uppercase rounded-sm hover:rotate-3 transition-transform duration-200" style={{ transform: "rotate(2deg)" }}>
          WOW
        </button>
      </motion.div>

      {/* Row 3: Mixed sizes and weights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="flex flex-wrap items-end gap-4"
      >
        <button className="px-12 py-5 text-2xl font-black uppercase border-4 border-foreground hover:bg-foreground hover:text-background transition-all duration-200">
          BIG
        </button>
        <button className="px-4 py-1 text-xs font-bold uppercase border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-150">
          tiny
        </button>
        <button className="px-8 py-3 text-base font-black uppercase border-3 hover:scale-110 transition-transform duration-200" style={{ borderWidth: "3px", borderColor: accent, color: accent }}>
          MEDIUM
        </button>
        <button className="w-16 h-16 text-2xl font-black flex items-center justify-center text-white rounded-full hover:scale-110 transition-transform duration-200" style={{ backgroundColor: accent }}>
          →
        </button>
      </motion.div>

      {/* Row 4: Text with strikethrough / effects */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
        className="flex flex-wrap items-center gap-6"
      >
        <button className="group text-lg font-black uppercase">
          <span className="line-through text-muted-foreground group-hover:no-underline group-hover:text-foreground transition-all duration-200">BORING</span>
        </button>
        <button className="group text-lg font-black uppercase relative">
          <span className="relative z-10">CREATIVE</span>
          <span className="absolute bottom-0 left-0 w-full h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ backgroundColor: `${accent}40` }} />
        </button>
        <button className="text-lg font-black uppercase underline decoration-4 hover:decoration-wavy transition-all duration-200" style={{ textDecorationColor: accent }}>
          EXPRESSIVE
        </button>
      </motion.div>
    </div>
  );
}
