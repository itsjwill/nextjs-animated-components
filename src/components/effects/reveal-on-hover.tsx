"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RevealOnHoverProps {
  text: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function RevealOnHover({
  text,
  imageSrc,
  imageAlt = "",
  className = "",
  imageWidth = 300,
  imageHeight = 400,
}: RevealOnHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="text-display font-heading relative z-10 hover:text-primary transition-colors duration-300">
        {text}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="fixed pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              left: mousePos.x + (containerRef.current?.getBoundingClientRect().left || 0),
              top: mousePos.y + (containerRef.current?.getBoundingClientRect().top || 0),
              width: imageWidth,
              height: imageHeight,
              transform: "translate(-50%, -110%)",
            }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-border/50">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
