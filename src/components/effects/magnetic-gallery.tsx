"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  id: string | number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface MagneticGalleryProps {
  items: GalleryItem[];
  strength?: number;
  className?: string;
  gap?: number;
}

export function MagneticGallery({
  items,
  strength = 30,
  className = "",
  gap = 16,
}: MagneticGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap }}
    >
      {items.map((item) => (
        <MagneticItem
          key={item.id}
          item={item}
          mousePos={mousePos}
          isHovering={isHovering}
          strength={strength}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

function MagneticItem({
  item,
  mousePos,
  isHovering,
  strength,
  containerRef,
}: {
  item: GalleryItem;
  mousePos: { x: number; y: number };
  isHovering: boolean;
  strength: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const getOffset = () => {
    if (!isHovering || !itemRef.current || !containerRef.current) {
      return { x: 0, y: 0 };
    }

    const itemRect = itemRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const itemCenterX = itemRect.left - containerRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top - containerRect.top + itemRect.height / 2;

    const dx = mousePos.x - itemCenterX;
    const dy = mousePos.y - itemCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 300;

    if (dist > maxDist) return { x: 0, y: 0 };

    const factor = (1 - dist / maxDist) * (strength / 100);
    return { x: dx * factor, y: dy * factor };
  };

  const offset = getOffset();

  return (
    <motion.div
      ref={itemRef}
      className="relative overflow-hidden rounded-lg aspect-square"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover"
        width={item.width}
        height={item.height}
      />
    </motion.div>
  );
}
