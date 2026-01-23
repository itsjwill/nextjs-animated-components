"use client";

import { useState } from "react";
import { useTheme, DIRECTIONS, type Direction } from "@/lib/theme";

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({ children, className = "" }: ComponentPreviewProps) {
  const { direction, setDirection } = useTheme();

  return (
    <div className={`rounded-xl border border-border overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <span className="text-caption text-muted-foreground">Preview</span>
        <div className="flex items-center gap-1">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`px-2 py-1 text-caption rounded capitalize transition-colors ${
                direction === d
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="p-8 bg-background min-h-[200px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
