"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme, DIRECTIONS, DIRECTION_META, type Direction } from "@/lib/theme";
import { SectionReveal } from "@/components/scroll/section-reveal";

export function DirectionShowcase() {
  const { direction, setDirection } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="directions" className="py-32 lg:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-caption font-medium border border-border bg-surface/50 mb-6">
            Design System
          </span>
          <h2 className="text-heading-1 font-heading mb-4">
            Four Directions.{" "}
            <span className="text-primary">One Library.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            The same components, completely different feelings. Pick your aesthetic or let users choose.
          </p>
        </motion.div>

        {/* Direction Cards */}
        <SectionReveal type="parallax">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIRECTIONS.map((d, i) => (
            <DirectionPreviewCard
              key={d}
              dir={d}
              isActive={direction === d}
              index={i}
              isInView={isInView}
              onSelect={setDirection}
            />
          ))}
        </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function DirectionPreviewCard({
  dir,
  isActive,
  index,
  isInView,
  onSelect,
}: {
  dir: Direction;
  isActive: boolean;
  index: number;
  isInView: boolean;
  onSelect: (d: Direction) => void;
}) {
  const meta = DIRECTION_META[dir];

  const previewStyles: Record<Direction, { bg: string; text: string; accent: string }> = {
    luxury: { bg: "bg-[#0a0a0a]", text: "text-[#f5f5f5]", accent: "bg-[#C9A84C]" },
    cyberpunk: { bg: "bg-[#0a0f1a]", text: "text-[#00FFD1]", accent: "bg-[#00FFD1]" },
    kinetic: { bg: "bg-[#0a0a14]", text: "text-[#e0e0e0]", accent: "bg-[#7C3AED]" },
    freestyle: { bg: "bg-[#0f0c0a]", text: "text-[#e8e2da]", accent: "bg-[#FF6B35]" },
  };

  const style = previewStyles[dir];

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      onClick={() => onSelect(dir)}
      className={`
        group relative p-6 rounded-2xl border text-left transition-all duration-500 overflow-hidden
        ${isActive
          ? "border-primary ring-1 ring-primary/20"
          : "border-border hover:border-muted-foreground/30"
        }
      `}
    >
      {/* Mini preview */}
      <div className={`${style.bg} rounded-xl p-5 mb-5 aspect-[16/9] relative overflow-hidden`}>
        {/* Fake UI preview */}
        <div className="space-y-3">
          <div className={`h-1.5 ${style.accent} w-8 rounded-full opacity-80`} />
          <div className={`h-6 ${style.text} opacity-90 font-bold text-sm`}>
            {meta.label} Mode
          </div>
          <div className="space-y-1.5">
            <div className={`h-1 bg-current opacity-20 w-3/4 rounded ${style.text}`} />
            <div className={`h-1 bg-current opacity-15 w-1/2 rounded ${style.text}`} />
          </div>
          {/* Direction-specific button previews */}
          <DirectionButtonPreview dir={dir} accent={meta.accent} />
        </div>

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${meta.accent}15, transparent 70%)`,
          }}
        />
      </div>

      {/* Label */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-heading-3 mb-1">{meta.label}</h3>
          <p className="text-body-sm text-muted-foreground">{meta.description}</p>
        </div>
        {isActive && (
          <motion.div
            layoutId="active-check"
            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-foreground">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

function DirectionButtonPreview({ dir, accent }: { dir: Direction; accent: string }) {
  switch (dir) {
    case "luxury":
      return (
        <div className="flex gap-3 pt-2">
          <div className="h-5 w-16 border border-white/10 flex items-center justify-center">
            <span className="text-[6px] text-white/50 tracking-[0.2em] uppercase font-light">View</span>
          </div>
          <div className="h-5 w-14 flex items-center justify-center">
            <span className="text-[6px] text-white/30 tracking-[0.15em] uppercase font-light">Details</span>
          </div>
        </div>
      );
    case "cyberpunk":
      return (
        <div className="flex gap-2 pt-2">
          <div
            className="h-5 w-16 flex items-center justify-center"
            style={{
              backgroundColor: accent,
              clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
            }}
          >
            <span className="text-[6px] text-black font-bold tracking-wider">EXEC</span>
          </div>
          <div
            className="h-5 w-14 flex items-center justify-center border"
            style={{
              borderColor: `${accent}60`,
              clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
            }}
          >
            <span className="text-[6px] font-mono" style={{ color: accent }}>INIT</span>
          </div>
        </div>
      );
    case "kinetic":
      return (
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
            <span className="text-[6px] text-white font-semibold">Start</span>
          </div>
          <div className="h-5 w-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: accent }}>
            <span className="text-[6px] font-semibold" style={{ color: accent }}>More</span>
          </div>
        </div>
      );
    case "freestyle":
      return (
        <div className="flex gap-2 pt-2 items-end">
          <div className="h-6 w-16 flex items-center justify-center" style={{ backgroundColor: accent }}>
            <span className="text-[7px] text-black font-black uppercase">GO!</span>
          </div>
          <div className="h-5 w-12 border-2 border-white/40 flex items-center justify-center" style={{ transform: "skewX(-5deg)" }}>
            <span className="text-[6px] text-white/70 font-black uppercase">NAH</span>
          </div>
        </div>
      );
  }
}
