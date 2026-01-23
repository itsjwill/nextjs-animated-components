"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollVideoProps {
  src: string;
  className?: string;
  startFrame?: number;
  endFrame?: number;
  sticky?: boolean;
}

export function ScrollVideo({
  src,
  className = "",
  startFrame = 0,
  endFrame,
  sticky = true,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleLoaded = () => {
      setIsReady(true);
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoaded);

    const handleScroll = () => {
      if (!video.duration) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));

      const start = startFrame || 0;
      const end = endFrame || video.duration;
      const targetTime = start + progress * (end - start);

      video.currentTime = targetTime;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startFrame, endFrame]);

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className={sticky ? "sticky top-0 h-screen flex items-center justify-center" : ""}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
