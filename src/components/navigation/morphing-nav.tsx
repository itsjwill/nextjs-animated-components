"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { getMotionPreset } from "@/lib/motion";

type NavMode = "bar" | "pill" | "fullscreen";

interface NavItem {
  label: string;
  href: string;
}

interface MorphingNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
  className?: string;
}

export function MorphingNav({ items, logo, className = "" }: MorphingNavProps) {
  const [mode, setMode] = useState<NavMode>("bar");
  const [scrollY, setScrollY] = useState(0);
  const { direction } = useTheme();
  const preset = getMotionPreset(direction);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > 100 && current > lastScrollY.current) {
        setMode("pill");
      } else if (current <= 50) {
        setMode("bar");
      }
      lastScrollY.current = current;
      setScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const barVariants = {
    bar: {
      width: "100%",
      borderRadius: "0px",
      padding: "1rem 2rem",
      top: "0px",
    },
    pill: {
      width: "auto",
      borderRadius: "9999px",
      padding: "0.5rem 1.5rem",
      top: "1rem",
    },
  };

  return (
    <>
      <motion.nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl border border-border/50 bg-surface/80 ${className}`}
        variants={barVariants}
        animate={mode === "fullscreen" ? "pill" : mode}
        transition={preset.transition}
      >
        <div className="flex items-center justify-between gap-6">
          {logo && <div className="shrink-0">{logo}</div>}

          <AnimatePresence mode="wait">
            {mode === "bar" && (
              <motion.ul
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            onClick={() => setMode(mode === "fullscreen" ? "bar" : "fullscreen")}
            className="relative w-6 h-4 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-full h-0.5 bg-foreground origin-center"
              animate={mode === "fullscreen" ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={preset.transition}
            />
            <motion.span
              className="block w-full h-0.5 bg-foreground"
              animate={mode === "fullscreen" ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={preset.transition}
            />
            <motion.span
              className="block w-full h-0.5 bg-foreground origin-center"
              animate={mode === "fullscreen" ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={preset.transition}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mode === "fullscreen" && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={preset.transition}
          >
            <nav className="flex flex-col items-center gap-8">
              {items.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-display-sm font-heading hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ ...preset.transition, delay: i * preset.stagger.base }}
                  onClick={() => setMode("bar")}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
