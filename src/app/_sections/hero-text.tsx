"use client";

import { motion } from "framer-motion";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { useState, useEffect, useCallback } from "react";

export function HeroText() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <StaticHeroText accent={meta.accent} />;
  }

  return (
    <div className="space-y-8">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-caption font-medium border border-border bg-surface/50 backdrop-blur-sm">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: meta.accent }}
          />
          95+ Premium Components
        </span>
      </motion.div>

      {/* Direction-specific heading */}
      <div>
        {direction === "luxury" && <LuxuryHeading accent={meta.accent} />}
        {direction === "cyberpunk" && <CyberpunkHeading accent={meta.accent} />}
        {direction === "kinetic" && <KineticHeading accent={meta.accent} />}
        {direction === "freestyle" && <FreestyleHeading accent={meta.accent} />}
      </div>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-body-lg text-muted-foreground max-w-2xl mx-auto"
      >
        The animation toolkit for developers who refuse to build boring.
        GSAP + Framer Motion + Three.js + Lenis. One library, four design directions.
      </motion.p>
    </div>
  );
}

function StaticHeroText({ accent }: { accent: string }) {
  return (
    <div className="space-y-8">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-caption font-medium border border-border bg-surface/50">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        95+ Premium Components
      </span>
      <h1 className="text-display font-heading">
        <span className="block">Build Websites</span>
        <span className="block" style={{ color: accent }}>That Win Awards</span>
      </h1>
      <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
        The animation toolkit for developers who refuse to build boring.
        GSAP + Framer Motion + Three.js + Lenis. One library, four design directions.
      </p>
    </div>
  );
}

/** Luxury: Clip-path mask reveal per word */
function LuxuryHeading({ accent }: { accent: string }) {
  const words1 = "Build Websites".split(" ");
  const words2 = "That Win Awards".split(" ");

  return (
    <h1 className="text-display font-heading">
      <span className="block">
        {words1.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="block" style={{ color: accent }}>
        {words2.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

/** Cyberpunk: Character scramble effect */
function CyberpunkHeading({ accent }: { accent: string }) {
  const line1 = "Build Websites";
  const line2 = "That Win Awards";
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

  useEffect(() => {
    let iteration1 = 0;
    const interval1 = setInterval(() => {
      setText1(
        line1.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration1) return line1[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join("")
      );
      iteration1 += 0.5;
      if (iteration1 >= line1.length) {
        clearInterval(interval1);
        setText1(line1);
      }
    }, 30);

    const timer2 = setTimeout(() => {
      let iteration2 = 0;
      const interval2 = setInterval(() => {
        setText2(
          line2.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration2) return line2[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }).join("")
        );
        iteration2 += 0.5;
        if (iteration2 >= line2.length) {
          clearInterval(interval2);
          setText2(line2);
        }
      }, 30);
    }, 400);

    return () => {
      clearInterval(interval1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <h1 className="text-display font-heading">
      <span className="block">{text1 || "\u00A0"}</span>
      <motion.span
        className="block"
        style={{ color: accent, textShadow: `0 0 30px ${accent}40` }}
      >
        {text2 || "\u00A0"}
      </motion.span>
    </h1>
  );
}

/** Kinetic: Spring-bounce per character */
function KineticHeading({ accent }: { accent: string }) {
  const line1 = "Build Websites";
  const line2 = "That Win Awards";

  return (
    <h1 className="text-display font-heading">
      <span className="block">
        {line1.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 60, rotate: -15, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
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
      <span className="block" style={{ color: accent }}>
        {line2.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 60, rotate: 15, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 0.6 + i * 0.03,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

/** Freestyle: Split entry — lines from opposite sides */
function FreestyleHeading({ accent }: { accent: string }) {
  return (
    <h1 className="text-display font-heading overflow-hidden">
      <motion.span
        className="block"
        initial={{ x: -200, rotate: -5, opacity: 0 }}
        animate={{ x: 0, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        Build Websites
      </motion.span>
      <motion.span
        className="block"
        style={{ color: accent }}
        initial={{ x: 200, rotate: 5, opacity: 0 }}
        animate={{ x: 0, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        That Win Awards
      </motion.span>
    </h1>
  );
}
