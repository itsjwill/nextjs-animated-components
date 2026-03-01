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

export interface TransformRule {
  /** Object name pattern to match (case-insensitive, partial match) */
  match: string;
  /** Scale multiplier — e.g. { x: 1.5, y: 1, z: 1.5 } to widen */
  scale?: { x: number; y: number; z: number };
  /** Position offset — added to current position */
  positionOffset?: { x: number; y: number; z: number };
  /** Rotation offset in radians — added to current rotation */
  rotationOffset?: { x: number; y: number; z: number };
  /** Override color specifically for this part */
  color?: string;
  /** Hide this part entirely */
  visible?: boolean;
}

interface SplineRecolorProps {
  theme: ColorTheme;
  transforms?: TransformRule[];
  className?: string;
}

export function SplineRecolor({
  theme,
  transforms,
  className,
}: SplineRecolorProps) {
  const onLoad = useCallback(
    (splineApp: Application) => {
      try {
        const allObjects = splineApp.getAllObjects();

        // Apply color theme
        for (const obj of allObjects) {
          recolorObject(obj, theme);
        }

        // Apply transforms if provided
        if (transforms && transforms.length > 0) {
          for (const obj of allObjects) {
            applyTransforms(obj, transforms);
          }
        }
      } catch {
        // Silently fail — robot still displays normally
      }
    },
    [theme, transforms]
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
    } else if (
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
    } else if (
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
      name.includes("base") ||
      name.includes("shoulder") ||
      name.includes("hand") ||
      name.includes("foot") ||
      name.includes("neck")
    ) {
      obj.color = theme.body;
    }
  } catch {
    // Some objects might not support color changes
  }
}

function applyTransforms(obj: SPEObject, transforms: TransformRule[]) {
  const name = (obj.name || "").toLowerCase();

  for (const rule of transforms) {
    if (!name.includes(rule.match.toLowerCase())) continue;

    try {
      if (rule.visible === false) {
        obj.visible = false;
      }

      if (rule.scale) {
        obj.scale = {
          x: obj.scale.x * rule.scale.x,
          y: obj.scale.y * rule.scale.y,
          z: obj.scale.z * rule.scale.z,
        };
      }

      if (rule.positionOffset) {
        obj.position = {
          x: obj.position.x + rule.positionOffset.x,
          y: obj.position.y + rule.positionOffset.y,
          z: obj.position.z + rule.positionOffset.z,
        };
      }

      if (rule.rotationOffset) {
        obj.rotation = {
          x: obj.rotation.x + rule.rotationOffset.x,
          y: obj.rotation.y + rule.rotationOffset.y,
          z: obj.rotation.z + rule.rotationOffset.z,
        };
      }

      if (rule.color) {
        obj.color = rule.color;
      }
    } catch {
      // Some properties might not be writable
    }
  }
}
