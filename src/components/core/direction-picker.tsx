"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme, DIRECTIONS, DIRECTION_META, type Direction } from "@/lib/theme";

interface DirectionPickerProps {
  /** Show as full-screen overlay vs inline */
  variant?: "overlay" | "inline";
  onSelect?: (direction: Direction) => void;
}

export function DirectionPicker({ variant = "inline", onSelect }: DirectionPickerProps) {
  const { direction, setDirection, mode, toggleMode } = useTheme();
  const [hoveredDirection, setHoveredDirection] = useState<Direction | null>(null);

  const handleSelect = (d: Direction) => {
    setDirection(d);
    onSelect?.(d);
  };

  if (variant === "overlay") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
      >
        <div className="max-w-4xl w-full px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-sm font-heading text-center mb-4"
          >
            Choose Your Direction
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-center mb-12 text-body-lg"
          >
            Each direction transforms the entire experience.
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {DIRECTIONS.map((d, i) => (
              <DirectionCard
                key={d}
                direction={d}
                isActive={direction === d}
                isHovered={hoveredDirection === d}
                index={i}
                onSelect={handleSelect}
                onHover={setHoveredDirection}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {DIRECTIONS.map((d) => (
        <button
          key={d}
          onClick={() => handleSelect(d)}
          className={`
            relative px-3 py-1.5 rounded-full text-body-sm font-medium transition-all duration-300
            ${direction === d
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }
          `}
        >
          {DIRECTION_META[d].label}
          {direction === d && (
            <motion.div
              layoutId="direction-indicator"
              className="absolute inset-0 rounded-full bg-primary -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
      <button
        onClick={toggleMode}
        className="ml-2 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      >
        {mode === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
}

function DirectionCard({
  direction,
  isActive,
  isHovered,
  index,
  onSelect,
  onHover,
}: {
  direction: Direction;
  isActive: boolean;
  isHovered: boolean;
  index: number;
  onSelect: (d: Direction) => void;
  onHover: (d: Direction | null) => void;
}) {
  const meta = DIRECTION_META[direction];

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      onClick={() => onSelect(direction)}
      onMouseEnter={() => onHover(direction)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative group p-6 rounded-2xl border text-left transition-all duration-500
        ${isActive
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
          : "border-border hover:border-primary/50 bg-surface"
        }
      `}
    >
      {/* Accent dot */}
      <div
        className="w-3 h-3 rounded-full mb-4 transition-transform duration-300 group-hover:scale-125"
        style={{ backgroundColor: meta.accent }}
      />

      {/* Label */}
      <h3 className="font-heading text-heading-3 mb-2">{meta.label}</h3>

      {/* Description */}
      <p className="text-body-sm text-muted-foreground">{meta.description}</p>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="active-direction"
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"
        />
      )}
    </motion.button>
  );
}
