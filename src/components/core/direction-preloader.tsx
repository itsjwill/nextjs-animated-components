"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

// Module-level flag: only show preloader once per page session (survives HMR)
let hasShownPreloader = false;

export function DirectionPreloader({ children }: { children: React.ReactNode }) {
  const shouldShow = useRef(!hasShownPreloader);
  const [isLoading, setIsLoading] = useState(shouldShow.current);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !shouldShow.current) return;
    if (prefersReduced) {
      setIsLoading(false);
      hasShownPreloader = true;
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
      hasShownPreloader = true;
    }, 1800);
    return () => clearTimeout(timer);
  }, [prefersReduced, mounted]);

  useEffect(() => {
    if (isLoading && mounted && shouldShow.current) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isLoading, mounted]);

  // Skip preloader entirely if already shown or not mounted yet
  if (!mounted || !shouldShow.current) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <PreloaderScreen key="preloader" />}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.4s ease" }}>
        {children}
      </div>
    </>
  );
}

function PreloaderScreen() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {direction === "luxury" && <LuxuryPreloader accent={meta.accent} />}
      {direction === "cyberpunk" && <CyberpunkPreloader accent={meta.accent} />}
      {direction === "kinetic" && <KineticPreloader accent={meta.accent} />}
      {direction === "freestyle" && <FreestylePreloader accent={meta.accent} />}
    </motion.div>
  );
}

function LuxuryPreloader({ accent }: { accent: string }) {
  return (
    <div className="relative">
      <motion.div
        className="overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-4xl md:text-6xl font-heading font-bold whitespace-nowrap" style={{ color: accent }}>
          Motion Primitives
        </h1>
      </motion.div>
      <motion.div
        className="absolute top-0 bottom-0 w-[2px]"
        style={{ backgroundColor: accent }}
        initial={{ left: 0, opacity: 1 }}
        animate={{ left: "100%", opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function CyberpunkPreloader({ accent }: { accent: string }) {
  const [counter, setCounter] = useState(0);
  const [glitchText, setGlitchText] = useState("INITIALIZING");

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => {
        if (c >= 99) {
          clearInterval(interval);
          return 99;
        }
        return c + 3;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const texts = ["INITIALIZING", "LOADING_NODES", "SYNCING_UI", "MOTION_PRIMITIVES"];
    let idx = 0;
    let scrambleInterval: ReturnType<typeof setInterval> | null = null;

    const interval = setInterval(() => {
      idx = (idx + 1) % texts.length;
      const target = texts[idx];
      let iteration = 0;

      if (scrambleInterval) clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        setGlitchText(
          target.split("").map((char, i) => {
            if (i < iteration) return target[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }).join("")
        );
        iteration += 1;
        if (iteration >= target.length && scrambleInterval) {
          clearInterval(scrambleInterval);
          scrambleInterval = null;
        }
      }, 25);
    }, 400);

    return () => {
      clearInterval(interval);
      if (scrambleInterval) clearInterval(scrambleInterval);
    };
  }, []);

  return (
    <div className="text-center font-mono">
      <motion.div
        className="text-6xl md:text-8xl font-bold mb-4"
        style={{ color: accent, textShadow: `0 0 20px ${accent}60` }}
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 0.1, repeatDelay: 0.8 }}
      >
        {String(counter).padStart(2, "0")}
      </motion.div>
      <div className="text-sm tracking-[0.3em] text-muted-foreground">
        {glitchText}
      </div>
    </div>
  );
}

function KineticPreloader({ accent }: { accent: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/20" />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={264}
            strokeDashoffset={264 - (264 * progress) / 100}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-lg font-heading font-bold"
          style={{ color: accent }}
        >
          {progress}%
        </div>
      </div>
      <motion.p
        className="font-heading text-sm text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading experience
      </motion.p>
    </div>
  );
}

function FreestylePreloader({ accent }: { accent: string }) {
  return (
    <div className="flex gap-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-16 h-24 md:w-20 md:h-32 rounded-lg"
          style={{ backgroundColor: accent, opacity: 0.8 - i * 0.15 }}
          initial={{ y: 0, scaleY: 1 }}
          animate={{ y: [-20, 20, -20], scaleY: [1, 1.3, 1] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
