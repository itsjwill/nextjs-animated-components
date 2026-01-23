"use client";

import { useEffect, useRef, useState } from "react";

interface AudioReactiveProps {
  children: React.ReactNode;
  sensitivity?: number;
  className?: string;
  barCount?: number;
  showBars?: boolean;
}

export function AudioReactive({
  children,
  sensitivity = 1.5,
  className = "",
  barCount = 32,
  showBars = true,
}: AudioReactiveProps) {
  const [isActive, setIsActive] = useState(false);
  const [levels, setLevels] = useState<number[]>(Array(barCount).fill(0));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animRef = useRef<number>();

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = barCount * 4;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      setIsActive(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const animate = () => {
        analyser.getByteFrequencyData(dataArray);
        const step = Math.floor(dataArray.length / barCount);
        const newLevels = Array.from({ length: barCount }, (_, i) => {
          const val = dataArray[i * step] / 255;
          return val * sensitivity;
        });
        setLevels(newLevels);
        animRef.current = requestAnimationFrame(animate);
      };

      animRef.current = requestAnimationFrame(animate);
    } catch {
      console.warn("Microphone access denied");
    }
  };

  const stopListening = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    audioContextRef.current?.close();
    setIsActive(false);
    setLevels(Array(barCount).fill(0));
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      audioContextRef.current?.close();
    };
  }, []);

  const avgLevel = levels.reduce((a, b) => a + b, 0) / levels.length;

  return (
    <div className={`relative ${className}`}>
      <div
        style={{
          transform: `scale(${1 + avgLevel * 0.1})`,
          transition: "transform 0.05s linear",
        }}
      >
        {children}
      </div>

      {showBars && (
        <div className="flex items-end gap-0.5 h-16 mt-4 justify-center">
          {levels.map((level, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full transition-all duration-75"
              style={{
                height: `${Math.max(4, level * 64)}px`,
                opacity: 0.4 + level * 0.6,
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={isActive ? stopListening : startListening}
        className="mt-4 px-4 py-2 text-body-sm rounded-full border border-border hover:bg-surface transition-colors mx-auto block"
      >
        {isActive ? "Stop" : "Enable Audio"}
      </button>
    </div>
  );
}
