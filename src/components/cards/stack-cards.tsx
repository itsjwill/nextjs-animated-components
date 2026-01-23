"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackCard {
  id: string | number;
  content: React.ReactNode;
}

interface StackCardsProps {
  cards: StackCard[];
  className?: string;
  cardClassName?: string;
  offset?: number;
}

export function StackCards({
  cards,
  className = "",
  cardClassName = "",
  offset = 30,
}: StackCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${100 + cards.length * 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {cards.map((card, i) => (
          <StackCardItem
            key={card.id}
            index={i}
            total={cards.length}
            progress={scrollYProgress}
            offset={offset}
            className={cardClassName}
          >
            {card.content}
          </StackCardItem>
        ))}
      </div>
    </div>
  );
}

function StackCardItem({
  index,
  total,
  progress,
  offset,
  className,
  children,
}: {
  index: number;
  total: number;
  progress: any;
  offset: number;
  className: string;
  children: React.ReactNode;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const y = useTransform(progress, [start, end], [100 + index * offset, index * -offset]);
  const scale = useTransform(progress, [start, end], [1, 1 - (total - index) * 0.02]);
  const opacity = useTransform(
    progress,
    [start, Math.min(end + 0.1, 1)],
    [1, index === total - 1 ? 1 : 0.6]
  );

  return (
    <motion.div
      className={`absolute w-full max-w-2xl mx-auto px-6 ${className}`}
      style={{
        y,
        scale,
        opacity,
        zIndex: total - index,
      }}
    >
      <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl">
        {children}
      </div>
    </motion.div>
  );
}
