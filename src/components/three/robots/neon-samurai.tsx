"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/robot-expressive.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Clone so we can tint it without affecting other instances
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Tint the robot with a samurai color scheme — dark with green/gold accents
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          // Darken the base and add metallic sheen
          const hsl = { h: 0, s: 0, l: 0 };
          mat.color.getHSL(hsl);
          // Shift toward dark teal/green
          mat.color.setHSL(0.45, hsl.s * 0.6 + 0.3, hsl.l * 0.55);
          mat.metalness = Math.min(mat.metalness + 0.3, 1.0);
          mat.roughness = Math.max(mat.roughness - 0.15, 0.05);
          // Add emissive glow on lighter parts
          if (hsl.l > 0.5) {
            mat.emissive = new THREE.Color("#00ffaa");
            mat.emissiveIntensity = 0.4;
          }
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  // Play idle animation
  useEffect(() => {
    const idle = actions["Idle"];
    if (idle) {
      idle.reset().fadeIn(0.5).play();
    }
    return () => {
      idle?.fadeOut(0.5);
    };
  }, [actions]);

  // Cursor tracking — smooth head follow + body lean
  useFrame((state) => {
    if (!groupRef.current) return;
    const pointer = state.pointer;
    const t = state.clock.elapsedTime;

    // Body leans slightly toward cursor
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.3,
      0.05
    );

    // Subtle hover bob
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.02 - 1.2;

    // Find the head bone and rotate it toward cursor
    const head = groupRef.current.getObjectByName("Head_4");
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(
        head.rotation.y,
        pointer.x * 0.6,
        0.08
      );
      head.rotation.x = THREE.MathUtils.lerp(
        head.rotation.x,
        -pointer.y * 0.3,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.1}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function NeonSamurai({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={1.0} />
        <pointLight position={[0, 2, 3]} intensity={1.0} color="#00ffaa" distance={8} />
        <pointLight position={[-2, 1, 2]} intensity={0.5} color="#ffd700" distance={6} />
        <Environment preset="city" />
        <RobotModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/robot-expressive.glb");
