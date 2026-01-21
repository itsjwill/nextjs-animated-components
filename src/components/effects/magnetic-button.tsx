"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden",
        "hover:bg-zinc-100 transition-colors",
        className
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

// Shiny button with hover effect
interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({ children, className }: ShinyButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full overflow-hidden group",
        "border border-zinc-700 hover:border-zinc-500 transition-colors",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </span>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Gradient border button
interface GradientBorderButtonProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  onClick?: () => void;
}

export function GradientBorderButton({
  children,
  className,
  gradient = "from-purple-500 via-pink-500 to-red-500",
  onClick,
}: GradientBorderButtonProps) {
  return (
    <motion.button
      className={cn("relative p-[2px] rounded-full group", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Gradient border */}
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r opacity-75 group-hover:opacity-100 transition-opacity blur-sm",
          gradient
        )}
      />
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r",
          gradient
        )}
      />

      {/* Inner content */}
      <span className="relative block px-8 py-4 bg-zinc-950 rounded-full text-white font-semibold">
        {children}
      </span>
    </motion.button>
  );
}

// Expanding button
interface ExpandingButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function ExpandingButton({
  children,
  icon,
  className,
}: ExpandingButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 group-hover:translate-x-[-4px] transition-transform">
        {children}
      </span>
      {icon && (
        <motion.span
          className="relative z-10"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="group-hover:translate-x-1 transition-transform inline-block">
            {icon}
          </span>
        </motion.span>
      )}

      {/* Background expand effect */}
      <span className="absolute inset-0 bg-zinc-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </motion.button>
  );
}

// Liquid button
interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidButton({ children, className }: LiquidButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 text-white font-semibold rounded-full overflow-hidden group",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background layers */}
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Liquid blob effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/20 rounded-full scale-0 group-hover:scale-[4] transition-transform duration-700 ease-out" />
      </span>

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Glitch button
interface GlitchButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchButton({ children, className }: GlitchButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-black text-white font-bold uppercase tracking-wider border-2 border-white group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glitch layers */}
      <span className="absolute inset-0 bg-cyan-500 translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform mix-blend-multiply" />
      <span className="absolute inset-0 bg-red-500 translate-x-0 translate-y-0 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform mix-blend-multiply" />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
