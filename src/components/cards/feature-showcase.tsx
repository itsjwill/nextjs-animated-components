"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Feature Showcase - Interactive tabbed bento with live demo + code panel
// =============================================================================
// Three-column layout: sidebar nav → live animation → code implementation
// Clicking items on the left switches the center demo and code.

interface FeatureShowcaseItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  demo: React.ReactNode;
  code: string;
  tags?: string[];
}

interface FeatureShowcaseProps {
  title?: string;
  subtitle?: string;
  label?: string;
  items: FeatureShowcaseItem[];
  className?: string;
  color?: "blue" | "purple" | "cyan" | "orange" | "pink" | "emerald";
}

export function FeatureShowcase({
  title,
  subtitle,
  label = "SYSTEMS",
  items,
  className,
  color = "blue",
}: FeatureShowcaseProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");
  const [copied, setCopied] = useState(false);
  const activeItem = items.find((i) => i.id === activeId) || items[0];

  const colorMap = {
    blue: { accent: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400", activeBg: "bg-blue-500/15", glow: "shadow-blue-500/20" },
    purple: { accent: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400", activeBg: "bg-purple-500/15", glow: "shadow-purple-500/20" },
    cyan: { accent: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", dot: "bg-cyan-400", activeBg: "bg-cyan-500/15", glow: "shadow-cyan-500/20" },
    orange: { accent: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", dot: "bg-orange-400", activeBg: "bg-orange-500/15", glow: "shadow-orange-500/20" },
    pink: { accent: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30", dot: "bg-pink-400", activeBg: "bg-pink-500/15", glow: "shadow-pink-500/20" },
    emerald: { accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400", activeBg: "bg-emerald-500/15", glow: "shadow-emerald-500/20" },
  };
  const c = colorMap[color];

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(activeItem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeItem.code]);

  // Group items by category
  const categories = items.reduce<Record<string, FeatureShowcaseItem[]>>((acc, item) => {
    const cat = item.category || "Features";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      {/* Header */}
      {(title || label) && (
        <div className="mb-6">
          {label && (
            <div className={cn("flex items-center gap-2 text-sm font-medium uppercase tracking-wider mb-3", c.accent)}>
              <span className={cn("w-2 h-2 rounded-full", c.dot)} />
              {label}
            </div>
          )}
          {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
          {subtitle && <p className="text-zinc-400 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr] gap-4">
        {/* Left Panel: Navigation */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-4">
          {Object.entries(categories).map(([category, categoryItems]) => (
            <div key={category}>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 px-3">
                {category}
              </div>
              <div className="space-y-1">
                {categoryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      activeId === item.id
                        ? cn(c.activeBg, "border", c.border, c.accent, "font-medium")
                        : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                    )}
                  >
                    {activeId === item.id && <span className="mr-1.5">•</span>}
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center Panel: Live Demo */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Preview</span>
            {activeItem.tags && (
              <div className="flex gap-1.5">
                {activeItem.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-zinc-800 text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 min-h-[280px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="w-full flex flex-col items-center justify-center"
              >
                {activeItem.demo}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Bottom info */}
          {activeItem.description && (
            <div className="px-4 py-3 border-t border-zinc-800">
              <p className="text-sm text-zinc-400">{activeItem.description}</p>
            </div>
          )}
        </div>

        {/* Right Panel: Code */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Implementation</span>
            <button
              onClick={handleCopy}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              )}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 text-sm text-zinc-300 font-mono overflow-x-auto max-h-[400px] overflow-y-auto"
            >
              <code>{activeItem.code}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
