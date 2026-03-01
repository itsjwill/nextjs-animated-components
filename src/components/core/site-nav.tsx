"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { DirectionPicker } from "./direction-picker";

export function SiteNav() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-500
          ${scrolled
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "py-5"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div
              className="w-6 h-6 rounded-md transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: meta.accent }}
            />
            <span className="font-heading font-semibold text-lg">
              Motion Primitives
            </span>
          </a>

          {/* Nav links with animated underline */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "#components", label: "Components" },
              { href: "#directions", label: "Directions" },
              { href: "https://github.com/itsjwill/motion-primitives-website", label: "Docs" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-body-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: meta.accent }}
                />
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <DirectionPicker variant="inline" />
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
