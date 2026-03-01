"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/robot-expressive.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Clone with a chrome/gold luxury color scheme
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          const hsl = { h: 0, s: 0, l: 0 };
          mat.color.getHSL(hsl);
          // Full chrome — shift to blue-silver
          mat.color.setHSL(0.6, hsl.s * 0.3 + 0.1, hsl.l * 0.6 + 0.4);
          mat.metalness = 1.0;
          mat.roughness = 0.05;
          // Gold emissive on accent parts
          if (hsl.l > 0.5) {
            mat.emissive = new THREE.Color("#4488ff");
            mat.emissiveIntensity = 0.3;
          } else {
            mat.emissive = new THREE.Color("#ffd700");
            mat.emissiveIntensity = 0.1;
          }
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  // Play a strong pose — try Punch or Idle
  useEffect(() => {
    const anim = actions["Idle"];
    if (anim) {
      anim.reset().fadeIn(0.5).play();
      // Slow it down for a heavy, deliberate feel
      anim.timeScale = 0.6;
    }
    return () => {
      anim?.fadeOut(0.5);
    };
  }, [actions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const pointer = state.pointer;
    const t = state.clock.elapsedTime;

    // Slow, deliberate body rotation — heavy bot doesn't move fast
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.2,
      0.03
    );

    // Minimal hover — heavy bot barely floats
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.01 - 1.2;

    // Head tracking — slow and deliberate
    const head = groupRef.current.getObjectByName("Head_4");
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(
        head.rotation.y,
        pointer.x * 0.4,
        0.04
      );
      head.rotation.x = THREE.MathUtils.lerp(
        head.rotation.x,
        -pointer.y * 0.2,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.15}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function ChromeTitan({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#aaddff" />
        <pointLight position={[0, 2, 3]} intensity={1.0} color="#4488ff" distance={10} />
        <pointLight position={[2, 0, 3]} intensity={0.5} color="#ffd700" distance={8} />
        <Environment preset="night" />
        <RobotModel />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/robot-expressive.glb");
