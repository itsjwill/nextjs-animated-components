"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// =============================================================================
// Types
// =============================================================================

export type Direction = "luxury" | "cyberpunk" | "kinetic" | "freestyle";
export type Mode = "light" | "dark";

interface ThemeContextValue {
  direction: Direction;
  mode: Mode;
  setDirection: (direction: Direction) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  cycleDirection: () => void;
}

// =============================================================================
// Constants
// =============================================================================

export const DIRECTIONS: Direction[] = [
  "luxury",
  "cyberpunk",
  "kinetic",
  "freestyle",
];

export const DIRECTION_META: Record<
  Direction,
  { label: string; description: string; accent: string }
> = {
  luxury: {
    label: "Luxury",
    description: "Minimalist elegance. Apple meets Linear.",
    accent: "#C9A84C",
  },
  cyberpunk: {
    label: "Cyberpunk",
    description: "Neon-soaked dark interfaces. The future is now.",
    accent: "#00FFD1",
  },
  kinetic: {
    label: "Kinetic",
    description: "Everything moves. Stripe-level motion design.",
    accent: "#7C3AED",
  },
  freestyle: {
    label: "Freestyle",
    description: "Bold and unexpected. Rules are suggestions.",
    accent: "#FF6B35",
  },
};

const STORAGE_KEY_DIRECTION = "motion-primitives-direction";
const STORAGE_KEY_MODE = "motion-primitives-mode";

// =============================================================================
// Context
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// =============================================================================
// Provider
// =============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultDirection?: Direction;
  defaultMode?: Mode;
}

export function ThemeProvider({
  children,
  defaultDirection = "freestyle",
  defaultMode = "dark",
}: ThemeProviderProps) {
  const [direction, setDirectionState] = useState<Direction>(defaultDirection);
  const [mode, setModeState] = useState<Mode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    const storedDirection = localStorage.getItem(
      STORAGE_KEY_DIRECTION
    ) as Direction | null;
    const storedMode = localStorage.getItem(STORAGE_KEY_MODE) as Mode | null;

    if (storedDirection && DIRECTIONS.includes(storedDirection)) {
      setDirectionState(storedDirection);
    }
    if (storedMode && (storedMode === "light" || storedMode === "dark")) {
      setModeState(storedMode);
    }

    setMounted(true);
  }, []);

  // Apply to DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Set direction
    root.setAttribute("data-direction", direction);

    // Set mode
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Persist
    localStorage.setItem(STORAGE_KEY_DIRECTION, direction);
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  }, [direction, mode, mounted]);

  const setDirection = useCallback((d: Direction) => {
    setDirectionState(d);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const cycleDirection = useCallback(() => {
    setDirectionState((prev) => {
      const idx = DIRECTIONS.indexOf(prev);
      return DIRECTIONS[(idx + 1) % DIRECTIONS.length];
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ direction, mode, setDirection, setMode, toggleMode, cycleDirection }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

const FALLBACK_THEME: ThemeContextValue = {
  direction: "freestyle",
  mode: "dark",
  setDirection: () => {},
  setMode: () => {},
  toggleMode: () => {},
  cycleDirection: () => {},
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  // Return fallback instead of throwing — prevents crashes during HMR/Fast Refresh
  return context || FALLBACK_THEME;
}

// =============================================================================
// Utilities
// =============================================================================

/** Get the font class names for the current direction */
export function getDirectionFonts(direction: Direction) {
  switch (direction) {
    case "luxury":
      return { heading: "font-luxury-heading", body: "font-luxury-body" };
    case "cyberpunk":
      return { heading: "font-cyber-heading", body: "font-cyber-body" };
    case "kinetic":
      return { heading: "font-kinetic-heading", body: "font-kinetic-body" };
    case "freestyle":
      return { heading: "font-free-heading", body: "font-free-body" };
  }
}
