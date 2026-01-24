"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";

export function CTASection() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 relative overflow-hidden">
      {/* Background glow - direction-aware */}
      <div className="absolute inset-0 pointer-events-none">
        {direction !== "luxury" && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
            style={{ backgroundColor: meta.accent }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        {direction === "luxury" && (
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {direction === "luxury" && <LuxuryCTA isInView={isInView} accent={meta.accent} />}
        {direction === "cyberpunk" && <CyberpunkCTA isInView={isInView} accent={meta.accent} />}
        {direction === "kinetic" && <KineticCTA isInView={isInView} accent={meta.accent} />}
        {direction === "freestyle" && <FreestyleCTA isInView={isInView} accent={meta.accent} />}
      </div>
    </section>
  );
}

function LuxuryCTA({ isInView, accent }: { isInView: boolean; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center space-y-12"
    >
      <p className="text-heading-2 font-heading" style={{ fontWeight: 100, letterSpacing: "0.05em" }}>
        Ready to begin.
      </p>
      <div className="flex items-center justify-center gap-12">
        <a
          href="https://github.com/itsjwill/motioncraft"
          className="group relative text-sm font-light tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground/80 transition-all duration-1000"
        >
          Get Started
          <span className="absolute -bottom-2 left-0 w-0 h-px group-hover:w-full transition-all duration-1000" style={{ backgroundColor: accent }} />
        </a>
        <a
          href="https://github.com/itsjwill/motioncraft"
          className="group relative text-sm font-light tracking-[0.25em] uppercase text-foreground/30 hover:text-foreground/60 transition-all duration-1000"
        >
          GitHub
          <span className="absolute -bottom-2 left-0 w-0 h-px group-hover:w-full transition-all duration-1000 bg-foreground/20" />
        </a>
      </div>
    </motion.div>
  );
}

function CyberpunkCTA({ isInView, accent }: { isInView: boolean; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FFD1]/30 bg-[#00FFD1]/5">
        <span className="w-1.5 h-1.5 bg-[#00FFD1] animate-pulse" />
        <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>SYSTEM::READY</span>
      </div>
      <h2 className="text-heading-1 font-heading font-bold tracking-wider">
        DEPLOY_NOW
      </h2>
      <p className="font-mono text-body-sm text-muted-foreground">
        {"// 80+ components. Zero config. Ship today."}
      </p>
      <div className="flex flex-wrap items-center gap-4 pt-4">
        <a
          href="https://github.com/itsjwill/motioncraft"
          className="px-8 py-3 font-mono text-sm font-bold tracking-wider text-black hover:scale-105 transition-transform duration-150"
          style={{
            backgroundColor: accent,
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            boxShadow: `0 0 20px ${accent}50`,
          }}
        >
          npm install motioncraft
        </a>
        <a
          href="https://github.com/itsjwill/motioncraft"
          className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs tracking-wider border border-border hover:border-[#00FFD1]/40 transition-colors duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#00FFD1]">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>STAR_REPO</span>
        </a>
      </div>
    </motion.div>
  );
}

function KineticCTA({ isInView, accent }: { isInView: boolean; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="text-center space-y-8"
    >
      <h2 className="text-display-sm font-heading font-extrabold tracking-tight">
        Ready to Build{" "}
        <span className="text-primary">Something Insane?</span>
      </h2>
      <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">
        Stop shipping generic. Start building award-worthy experiences.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <motion.a
          href="https://github.com/itsjwill/motioncraft"
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="px-10 py-4 rounded-full text-sm font-bold text-white shadow-xl inline-block"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)`, boxShadow: `0 12px 40px ${accent}50` }}
        >
          Get Started Free
        </motion.a>
        <motion.a
          href="https://github.com/itsjwill/motioncraft"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="px-8 py-3.5 rounded-full border-2 text-sm font-semibold inline-flex items-center gap-2 shadow-md"
          style={{ borderColor: accent, color: accent }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Star on GitHub
        </motion.a>
      </div>
    </motion.div>
  );
}

function FreestyleCTA({ isInView, accent }: { isInView: boolean; accent: string }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -60, rotate: -2 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <h2 className="text-display font-heading font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          STOP<br />
          <span style={{ color: accent }}>BORING.</span>
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/itsjwill/motioncraft"
            className="px-10 py-4 text-lg font-black uppercase text-black hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: accent }}
          >
            GET IT NOW →
          </a>
          <a
            href="https://github.com/itsjwill/motioncraft"
            className="px-8 py-4 text-lg font-black uppercase border-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-200 inline-flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GITHUB
          </a>
        </div>
      </motion.div>
      {/* Decorative sticker */}
      <motion.div
        initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
        animate={isInView ? { opacity: 1, rotate: 12, scale: 1 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 12 }}
        className="absolute -top-4 right-0 md:right-12 bg-yellow-400 text-black text-xs font-black px-3 py-1.5 rounded-sm"
      >
        FREE & OSS
      </motion.div>
    </div>
  );
}
