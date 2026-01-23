"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { getMotionPreset } from "@/lib/motion";

interface MasonryItem {
  id: string | number;
  content: React.ReactNode;
  category?: string;
  height?: number;
}

interface AnimatedMasonryProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
  categories?: string[];
  className?: string;
}

export function AnimatedMasonry({
  items,
  columns = 3,
  gap = 16,
  categories,
  className = "",
}: AnimatedMasonryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { direction } = useTheme();
  const preset = getMotionPreset(direction);

  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  const allCategories = categories ||
    Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[];

  const getColumns = (): MasonryItem[][] => {
    const cols: MasonryItem[][] = Array.from({ length: columns }, () => []);
    filteredItems.forEach((item, i) => {
      cols[i % columns].push(item);
    });
    return cols;
  };

  return (
    <div className={className}>
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-body-sm transition-all border ${
              activeCategory === null
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-body-sm transition-all border capitalize ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="flex" style={{ gap }}>
        {getColumns().map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col" style={{ gap }}>
            <AnimatePresence mode="popLayout">
              {column.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    ...preset.transition,
                    delay: (colIndex * column.length + itemIndex) * preset.stagger.base,
                  }}
                  style={{ minHeight: item.height }}
                >
                  <div className="bg-surface border border-border rounded-xl overflow-hidden h-full">
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
