"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { SectionReveal } from "@/components/scroll/section-reveal";

export function CTASection() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 relative overflow-hidden">
      {/* Background glow that pulses on scroll entry */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ backgroundColor: meta.accent }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.25, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-display-sm font-heading">
            Ready to Build{" "}
            <span className="text-primary">Something Insane?</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">
            Stop shipping generic. Start building award-worthy experiences with 80+ components, 4 design directions, and zero compromise.
          </p>

          {/* CTA based on direction */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {direction === "cyberpunk" ? (
              <div className="relative group">
                <div className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: meta.accent }} />
                <a
                  href="https://github.com/itsjwill/awwwards-ui"
                  className="relative px-8 py-3 rounded-full font-mono text-sm font-medium text-black transition-transform hover:scale-105"
                  style={{ backgroundColor: meta.accent }}
                >
                  npm install awwwards-ui
                </a>
              </div>
            ) : (
              <a
                href="https://github.com/itsjwill/awwwards-ui"
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                Get Started
              </a>
            )}
            <a
              href="https://github.com/itsjwill/awwwards-ui"
              className="px-8 py-3 rounded-full border border-border text-foreground font-medium transition-all duration-300 hover:bg-muted hover:scale-105 inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
