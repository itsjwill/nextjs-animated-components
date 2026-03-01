"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BOID_COUNT = 3000;

function Boids() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetShape = useRef(0); // 0=sphere, 1=cube, 2=torus, 3=DNA helix
  const morphProgress = useRef(0);
  const lastShapeChange = useRef(0);
  const { viewport } = useThree();

  const { positions, velocities, targets, dummy } = useMemo(() => {
    const positions = new Float32Array(BOID_COUNT * 3);
    const velocities = new Float32Array(BOID_COUNT * 3);
    const targets = new Float32Array(BOID_COUNT * 3);

    for (let i = 0; i < BOID_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 3;
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions, velocities, targets, dummy: new THREE.Object3D() };
  }, []);

  // Generate target positions for different shapes
  const generateShape = useCallback((shape: number, time: number) => {
    for (let i = 0; i < BOID_COUNT; i++) {
      const i3 = i * 3;
      const t = i / BOID_COUNT;

      switch (shape) {
        case 0: {
          // Sphere
          const phi = Math.acos(2 * t - 1);
          const theta = t * Math.PI * (1 + Math.sqrt(5)); // golden angle
          const r = 2.5;
          targets[i3] = r * Math.sin(phi) * Math.cos(theta);
          targets[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          targets[i3 + 2] = r * Math.cos(phi);
          break;
        }
        case 1: {
          // DNA Double Helix
          const strand = i % 2;
          const idx = Math.floor(i / 2);
          const tt = (idx / (BOID_COUNT / 2)) * Math.PI * 8;
          const helixR = 1.8;
          const offset = strand * Math.PI;
          targets[i3] = Math.cos(tt + offset) * helixR;
          targets[i3 + 1] = (t - 0.5) * 8;
          targets[i3 + 2] = Math.sin(tt + offset) * helixR;
          break;
        }
        case 2: {
          // Torus knot
          const p = 2, q = 3;
          const u = t * Math.PI * 2 * 3;
          const R = 2, rr = 0.8;
          const x = (R + rr * Math.cos(q * u)) * Math.cos(p * u);
          const y = (R + rr * Math.cos(q * u)) * Math.sin(p * u);
          const z = rr * Math.sin(q * u);
          targets[i3] = x;
          targets[i3 + 1] = y;
          targets[i3 + 2] = z;
          break;
        }
        case 3: {
          // Infinity / Figure-8
          const angle = t * Math.PI * 2;
          const scale = 3;
          targets[i3] = scale * Math.sin(angle);
          targets[i3 + 1] = scale * Math.sin(angle) * Math.cos(angle);
          targets[i3 + 2] = Math.sin(angle * 3) * 0.5;
          break;
        }
      }
    }
  }, [targets]);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    mouseRef.current.copy(event.point);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    // Auto-morph every 4 seconds
    if (time - lastShapeChange.current > 4) {
      targetShape.current = (targetShape.current + 1) % 4;
      generateShape(targetShape.current, time);
      lastShapeChange.current = time;
      morphProgress.current = 0;
    }

    // Initialize targets on first frame
    if (lastShapeChange.current === 0) {
      generateShape(0, 0);
      lastShapeChange.current = time;
    }

    morphProgress.current = Math.min(1, morphProgress.current + 0.008);
    const eased = 1 - Math.pow(1 - morphProgress.current, 3); // ease out cubic

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < BOID_COUNT; i++) {
      const i3 = i * 3;

      // Steer toward target shape
      const tx = targets[i3];
      const ty = targets[i3 + 1];
      const tz = targets[i3 + 2];

      const dx = tx - positions[i3];
      const dy = ty - positions[i3 + 1];
      const dz = tz - positions[i3 + 2];

      // Attraction to shape target
      const attractForce = 0.003 * eased;
      velocities[i3] += dx * attractForce;
      velocities[i3 + 1] += dy * attractForce;
      velocities[i3 + 2] += dz * attractForce;

      // Repulsion from cursor
      const cmx = mx - positions[i3];
      const cmy = my - positions[i3 + 1];
      const cursorDist = Math.sqrt(cmx * cmx + cmy * cmy) + 0.01;
      if (cursorDist < 2) {
        const repel = 0.02 / (cursorDist * cursorDist);
        velocities[i3] -= (cmx / cursorDist) * repel;
        velocities[i3 + 1] -= (cmy / cursorDist) * repel;
      }

      // Damping
      velocities[i3] *= 0.96;
      velocities[i3 + 1] *= 0.96;
      velocities[i3 + 2] *= 0.96;

      // Apply
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Rotation over time
      const rotAngle = time * 0.2;
      const rx = positions[i3] * Math.cos(rotAngle) - positions[i3 + 2] * Math.sin(rotAngle);
      const rz = positions[i3] * Math.sin(rotAngle) + positions[i3 + 2] * Math.cos(rotAngle);

      dummy.position.set(rx, positions[i3 + 1], rz);
      dummy.scale.setScalar(0.02 + (1 - cursorDist / 3) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color: shift with morph progress and position
      const hue = (i / BOID_COUNT + time * 0.05) % 1;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <mesh
        onPointerMove={handlePointerMove}
        visible={false}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, BOID_COUNT]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export function SwarmIntelligence({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Boids />
      </Canvas>
    </div>
  );
}
