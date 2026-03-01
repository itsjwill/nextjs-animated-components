"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const RING_COUNT = 40;
const PARTICLES_PER_RING = 60;
const TOTAL = RING_COUNT * PARTICLES_PER_RING;

function Rift() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const isHovering = useRef(false);
  const { viewport } = useThree();

  const { dummy } = useMemo(() => {
    return { dummy: new THREE.Object3D() };
  }, []);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    mouseRef.current.copy(event.point);
    isHovering.current = true;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const hover = isHovering.current ? 1 : 0;

    for (let ring = 0; ring < RING_COUNT; ring++) {
      const ringT = ring / RING_COUNT;
      const ringRadius = 0.3 + ringT * 3.5;
      const ringZ = (ringT - 0.5) * 8;
      const ringSpeed = 1 + ringT * 2;
      const ringPhase = ring * 0.3;

      // Warp factor: rings closer to center spin faster and wobble
      const warpIntensity = Math.max(0, 1 - ringT) * hover;
      const wobbleX = Math.sin(time * 2 + ringPhase) * warpIntensity * 0.5;
      const wobbleY = Math.cos(time * 1.7 + ringPhase) * warpIntensity * 0.5;

      for (let p = 0; p < PARTICLES_PER_RING; p++) {
        const idx = ring * PARTICLES_PER_RING + p;
        const angle =
          (p / PARTICLES_PER_RING) * Math.PI * 2 + time * ringSpeed * 0.3;

        // Tunnel shape: rings form a tunnel through space
        const x = Math.cos(angle) * ringRadius + wobbleX;
        const y = Math.sin(angle) * ringRadius + wobbleY;

        // Z position: tunnel depth with pull toward cursor
        const cursorPull = hover * Math.max(0, 1 - ringT * 2) * 2;
        const z = ringZ - cursorPull;

        // Cursor attraction on the entry plane
        const attractX = hover * (mx - x) * 0.05 * (1 - ringT);
        const attractY = hover * (my - y) * 0.05 * (1 - ringT);

        dummy.position.set(x + attractX, y + attractY, z);

        // Scale: smaller at back, larger at front, pulsing
        const pulse = 1 + Math.sin(time * 3 + ring + p * 0.2) * 0.2;
        const depthScale = 0.02 + (1 - ringT) * 0.04;
        dummy.scale.setScalar(depthScale * pulse);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);

        // Color: deep blue at back, bright cyan/white at the event horizon (front)
        const hue = 0.55 + ringT * 0.15; // blue → cyan
        const saturation = 0.8 - (1 - ringT) * 0.5;
        const lightness = 0.3 + (1 - ringT) * 0.5 + warpIntensity * 0.2;
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        meshRef.current.setColorAt(idx, color);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <mesh
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          isHovering.current = false;
        }}
        visible={false}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export function DimensionalRift({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 70 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Rift />
      </Canvas>
    </div>
  );
}
