"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/robot-expressive.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Clone with a warm, friendly pastel color scheme
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          const hsl = { h: 0, s: 0, l: 0 };
          mat.color.getHSL(hsl);
          // Shift toward warm pink/coral palette
          mat.color.setHSL(0.92, hsl.s * 0.5 + 0.35, hsl.l * 0.7 + 0.3);
          mat.metalness = Math.min(mat.metalness + 0.1, 0.7);
          mat.roughness = Math.max(mat.roughness + 0.1, 0.2);
          // Soft glow on lighter parts
          if (hsl.l > 0.4) {
            mat.emissive = new THREE.Color("#ff88aa");
            mat.emissiveIntensity = 0.15;
          }
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  // Play a friendly animation — try Wave, ThumbsUp, or Idle
  useEffect(() => {
    const wave = actions["Wave"] || actions["ThumbsUp"] || actions["Idle"];
    if (wave) {
      wave.reset().fadeIn(0.5).play();
    }
    return () => {
      wave?.fadeOut(0.5);
    };
  }, [actions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const pointer = state.pointer;
    const t = state.clock.elapsedTime;

    // Playful body lean — more exaggerated than the others
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.4,
      0.06
    );

    // Bouncy hover
    groupRef.current.position.y =
      Math.sin(t * 2.0) * 0.04 + Math.sin(t * 3.5) * 0.015 - 1.2;

    // Head tracking — curious, tilts head
    const head = groupRef.current.getObjectByName("Head_4");
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(
        head.rotation.y,
        pointer.x * 0.7,
        0.1
      );
      head.rotation.x = THREE.MathUtils.lerp(
        head.rotation.x,
        -pointer.y * 0.35,
        0.1
      );
      // Curious head tilt
      head.rotation.z = THREE.MathUtils.lerp(
        head.rotation.z,
        pointer.x * -0.15,
        0.06
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.1}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function BubbleBot({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 5]} intensity={1.0} color="#fff5f5" />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#ff88aa" distance={8} />
        <pointLight position={[-2, 1, 2]} intensity={0.4} color="#c084fc" distance={6} />
        <Environment preset="sunset" />
        <RobotModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/robot-expressive.glb");
