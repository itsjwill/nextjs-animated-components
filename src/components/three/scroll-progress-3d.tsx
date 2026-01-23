"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";
import { useScroll } from "framer-motion";

interface ScrollProgress3DProps {
  className?: string;
  wireframe?: boolean;
  stages?: number;
}

function ProgressScene({ wireframe, stages }: { wireframe: boolean; stages: number }) {
  const { direction } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0);

  const color = useMemo(() => {
    switch (direction) {
      case "cyberpunk": return new THREE.Color("hsl(174, 100%, 50%)");
      case "kinetic": return new THREE.Color("hsl(263, 70%, 50%)");
      case "luxury": return new THREE.Color("hsl(43, 74%, 49%)");
      default: return new THREE.Color("hsl(16, 85%, 55%)");
    }
  }, [direction]);

  useFrame(() => {
    if (!meshRef.current) return;

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    scrollRef.current += (progress - scrollRef.current) * 0.05;
    const p = scrollRef.current;

    const stage = Math.floor(p * stages) / stages;

    meshRef.current.rotation.x = p * Math.PI * 2;
    meshRef.current.rotation.y = p * Math.PI * 4;

    const scale = 1 + Math.sin(p * Math.PI) * 0.5;
    meshRef.current.scale.setScalar(scale);

    const morphProgress = (p * stages) % 1;
    meshRef.current.morphTargetInfluences &&
      meshRef.current.morphTargetInfluences.forEach((_, i, arr) => {
        arr[i] = 0;
      });
  });

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.5, 3);
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export function ScrollProgress3D({
  className = "",
  wireframe = true,
  stages = 4,
}: ScrollProgress3DProps) {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ProgressScene wireframe={wireframe} stages={stages} />
      </Canvas>
    </div>
  );
}
