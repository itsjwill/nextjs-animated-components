"use client";

import { Suspense, lazy, useCallback } from "react";
import type { Application, SPEObject } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

const ROBOT_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export interface ColorTheme {
  /** Primary body color — CSS hex like "#1a1a2e" */
  body: string;
  /** Accent/highlight color */
  accent: string;
  /** Eye/visor glow color */
  glow: string;
}

interface SplineRecolorProps {
  theme: ColorTheme;
  className?: string;
}

export function SplineRecolor({ theme, className }: SplineRecolorProps) {
  const onLoad = useCallback(
    (splineApp: Application) => {
      try {
        const allObjects = splineApp.getAllObjects();
        for (const obj of allObjects) {
          recolorObject(obj, theme);
        }
      } catch {
        // Silently fail if recolor doesn't work — robot still displays normally
      }
    },
    [theme]
  );

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline scene={ROBOT_URL} className={className} onLoad={onLoad} />
    </Suspense>
  );
}

function recolorObject(obj: SPEObject, theme: ColorTheme) {
  const name = (obj.name || "").toLowerCase();

  try {
    // Eyes, lights, glowing parts → glow color
    if (
      name.includes("eye") ||
      name.includes("light") ||
      name.includes("glow") ||
      name.includes("emit") ||
      name.includes("visor") ||
      name.includes("screen") ||
      name.includes("led")
    ) {
      obj.color = theme.glow;
    }
    // Accent/detail parts → accent color
    else if (
      name.includes("accent") ||
      name.includes("detail") ||
      name.includes("stripe") ||
      name.includes("line") ||
      name.includes("trim") ||
      name.includes("button") ||
      name.includes("joint") ||
      name.includes("antenna")
    ) {
      obj.color = theme.accent;
    }
    // Main body parts → body color
    else if (
      name.includes("body") ||
      name.includes("torso") ||
      name.includes("arm") ||
      name.includes("leg") ||
      name.includes("head") ||
      name.includes("chest") ||
      name.includes("robot") ||
      name.includes("main") ||
      name.includes("hull") ||
      name.includes("shell") ||
      name.includes("frame") ||
      name.includes("base")
    ) {
      obj.color = theme.body;
    }
  } catch {
    // Some objects might not support color changes
  }
}
