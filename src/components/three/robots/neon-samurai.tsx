"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function SamuraiBody() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const swordGlowRef = useRef<THREE.Mesh>(null);
  const crestGlowRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Rich dark metal — visible against black
  const armorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a2a3a",
        metalness: 0.85,
        roughness: 0.2,
      }),
    []
  );

  // Lighter plates for contrast
  const plateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4a4a5e",
        metalness: 0.8,
        roughness: 0.25,
      }),
    []
  );

  // Bright neon — the accent that pops
  const neonGreen = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ffaa",
        emissive: "#00ffaa",
        emissiveIntensity: 3,
        metalness: 0.2,
        roughness: 0.3,
      }),
    []
  );

  const neonRed = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff2255",
        emissive: "#ff2255",
        emissiveIntensity: 2.5,
        metalness: 0.3,
        roughness: 0.3,
      }),
    []
  );

  // Gold trim — traditional samurai accent
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd700",
        emissive: "#ff8c00",
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.15,
      }),
    []
  );

  useFrame((state) => {
    const pointer = state.pointer;
    const t = state.clock.elapsedTime;

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        pointer.x * 0.45,
        0.07
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -pointer.y * 0.2,
        0.07
      );
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.0) * 0.04;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.1,
        0.03
      );
    }

    // Eye pulse
    if (leftEyeRef.current && rightEyeRef.current) {
      const p = 2 + Math.sin(t * 3) * 1;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = p;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = p;
    }

    // Visor sweep
    if (visorRef.current) {
      const flick = Math.sin(t * 6) > 0.92 ? 5 : 1.5 + Math.sin(t * 2) * 0.5;
      (visorRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flick;
    }

    // Sword glow pulse
    if (swordGlowRef.current) {
      const sg = 2 + Math.sin(t * 1.5) * 1;
      (swordGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = sg;
    }

    // Crest glow
    if (crestGlowRef.current) {
      const cg = 1.5 + Math.sin(t * 2.5) * 0.8;
      (crestGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = cg;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* ============ KABUTO HELMET ============ */}
      <group ref={headRef} position={[0, 2.15, 0]}>
        {/* Helmet dome — rounded top */}
        <mesh position={[0, 0.12, -0.02]} material={armorMat}>
          <sphereGeometry args={[0.42, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Helmet base */}
        <mesh position={[0, -0.02, 0]} material={armorMat}>
          <boxGeometry args={[0.78, 0.3, 0.7]} />
        </mesh>

        {/* Maedate — tall front crest (the iconic samurai crest) */}
        <mesh ref={crestGlowRef} position={[0, 0.6, 0.1]} material={goldMat}>
          <boxGeometry args={[0.04, 0.55, 0.15]} />
        </mesh>
        {/* Crest crescent moon shape — two angled pieces */}
        <mesh position={[0.25, 0.52, 0.1]} rotation={[0, 0, -0.5]} material={goldMat}>
          <boxGeometry args={[0.3, 0.04, 0.08]} />
        </mesh>
        <mesh position={[-0.25, 0.52, 0.1]} rotation={[0, 0, 0.5]} material={goldMat}>
          <boxGeometry args={[0.3, 0.04, 0.08]} />
        </mesh>

        {/* Shikoro — neck guard flaps (layered plates hanging from back/sides) */}
        {[0, -0.08, -0.16].map((y, i) => (
          <mesh
            key={`shikoro-${i}`}
            position={[0, -0.15 + y, -0.2 - i * 0.05]}
            material={plateMat}
          >
            <boxGeometry args={[0.8 - i * 0.05, 0.06, 0.3]} />
          </mesh>
        ))}

        {/* Fukigaeshi — side horn flaps */}
        <mesh position={[0.42, 0.05, 0.05]} rotation={[0, 0.3, 0.2]} material={plateMat}>
          <boxGeometry args={[0.12, 0.2, 0.25]} />
        </mesh>
        <mesh position={[-0.42, 0.05, 0.05]} rotation={[0, -0.3, -0.2]} material={plateMat}>
          <boxGeometry args={[0.12, 0.2, 0.25]} />
        </mesh>

        {/* Menpo — face mask */}
        <mesh position={[0, -0.15, 0.3]} material={armorMat}>
          <boxGeometry args={[0.6, 0.2, 0.12]} />
        </mesh>
        {/* Menpo lower jaw — angular */}
        <mesh position={[0, -0.22, 0.28]} material={plateMat}>
          <boxGeometry args={[0.5, 0.08, 0.1]} />
        </mesh>

        {/* Visor slit — bright green line across the eyes */}
        <mesh ref={visorRef} position={[0, 0.0, 0.36]} material={neonGreen}>
          <boxGeometry args={[0.55, 0.05, 0.02]} />
        </mesh>

        {/* Eyes behind visor */}
        <mesh ref={leftEyeRef} position={[0.14, 0.0, 0.37]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={3} />
        </mesh>
        <mesh ref={rightEyeRef} position={[-0.14, 0.0, 0.37]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={3} />
        </mesh>

        {/* Gold trim line on helmet */}
        <mesh position={[0, 0.12, 0.34]} material={goldMat}>
          <boxGeometry args={[0.7, 0.025, 0.01]} />
        </mesh>
      </group>

      {/* ============ DO — CHEST ARMOR ============ */}
      <group position={[0, 1.2, 0]}>
        {/* Main chest plate */}
        <mesh material={armorMat}>
          <boxGeometry args={[0.85, 0.85, 0.5]} />
        </mesh>
        {/* Horizontal armor bands across chest (traditional do style) */}
        {[-0.2, -0.05, 0.1, 0.25].map((y, i) => (
          <mesh key={`band-${i}`} position={[0, y, 0.26]} material={plateMat}>
            <boxGeometry args={[0.75, 0.08, 0.02]} />
          </mesh>
        ))}
        {/* Neon accent between bands */}
        {[-0.12, 0.03, 0.18].map((y, i) => (
          <mesh key={`neon-${i}`} position={[0, y, 0.27]} material={neonGreen}>
            <boxGeometry args={[0.6, 0.015, 0.01]} />
          </mesh>
        ))}
        {/* Center crest on chest */}
        <mesh position={[0, 0.1, 0.28]} material={goldMat}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
        </mesh>
        {/* Core — red glow */}
        <mesh position={[0, -0.08, 0.28]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#ff2255" emissive="#ff2255" emissiveIntensity={2} />
        </mesh>

        {/* SODE — large shoulder guards (layered plates) */}
        {/* Right shoulder */}
        <group position={[0.6, 0.35, 0]}>
          {[0, -0.08, -0.16].map((y, i) => (
            <mesh key={`rsode-${i}`} position={[0, y, 0]} material={plateMat}>
              <boxGeometry args={[0.35, 0.07, 0.4 - i * 0.03]} />
            </mesh>
          ))}
          <mesh position={[0, 0.05, 0]} material={goldMat}>
            <boxGeometry args={[0.33, 0.02, 0.38]} />
          </mesh>
        </group>
        {/* Left shoulder */}
        <group position={[-0.6, 0.35, 0]}>
          {[0, -0.08, -0.16].map((y, i) => (
            <mesh key={`lsode-${i}`} position={[0, y, 0]} material={plateMat}>
              <boxGeometry args={[0.35, 0.07, 0.4 - i * 0.03]} />
            </mesh>
          ))}
          <mesh position={[0, 0.05, 0]} material={goldMat}>
            <boxGeometry args={[0.33, 0.02, 0.38]} />
          </mesh>
        </group>
      </group>

      {/* ============ KUSAZURI — WAIST SKIRT PLATES ============ */}
      <group position={[0, 0.6, 0]}>
        <mesh material={armorMat}>
          <boxGeometry args={[0.7, 0.2, 0.45]} />
        </mesh>
        {/* Hanging skirt plates — front */}
        {[-0.25, -0.08, 0.08, 0.25].map((x, i) => (
          <mesh key={`skirt-${i}`} position={[x, -0.15, 0.15]} material={plateMat}>
            <boxGeometry args={[0.14, 0.15, 0.08]} />
          </mesh>
        ))}
        {/* Gold obi (belt) */}
        <mesh position={[0, 0.05, 0.23]} material={goldMat}>
          <boxGeometry args={[0.65, 0.06, 0.01]} />
        </mesh>
        {/* Red accent on belt */}
        <mesh position={[0, 0.05, 0.24]} material={neonRed}>
          <boxGeometry args={[0.15, 0.04, 0.01]} />
        </mesh>
      </group>

      {/* ============ KOTE — ARM ARMOR ============ */}
      {/* Right arm */}
      <group position={[0.6, 0.85, 0]}>
        <mesh material={armorMat}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
        </mesh>
        {/* Forearm with plates */}
        <mesh position={[0, -0.42, 0]} material={plateMat}>
          <boxGeometry args={[0.17, 0.38, 0.17]} />
        </mesh>
        {/* Forearm neon strips */}
        <mesh position={[0.09, -0.42, 0]} material={neonGreen}>
          <boxGeometry args={[0.01, 0.3, 0.03]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.7, 0]} material={armorMat}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
        </mesh>
      </group>
      {/* Left arm — holds katana */}
      <group position={[-0.6, 0.85, 0]}>
        <mesh material={armorMat}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
        </mesh>
        <mesh position={[0, -0.42, 0]} material={plateMat}>
          <boxGeometry args={[0.17, 0.38, 0.17]} />
        </mesh>
        <mesh position={[-0.09, -0.42, 0]} material={neonGreen}>
          <boxGeometry args={[0.01, 0.3, 0.03]} />
        </mesh>
        {/* Hand gripping katana */}
        <mesh position={[0, -0.7, 0.05]} material={armorMat}>
          <boxGeometry args={[0.12, 0.12, 0.14]} />
        </mesh>

        {/* KATANA */}
        <group position={[0, -0.5, 0.18]} rotation={[0.3, 0, 0]}>
          {/* Tsuka (handle) */}
          <mesh position={[0, 0.15, 0]} material={armorMat}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
          </mesh>
          {/* Tsuba (guard) — diamond shape */}
          <mesh position={[0, 0.3, 0]} material={goldMat}>
            <boxGeometry args={[0.12, 0.03, 0.12]} />
          </mesh>
          {/* Blade */}
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.025, 0.7, 0.06]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={1}
              roughness={0.02}
            />
          </mesh>
          {/* Blade edge glow */}
          <mesh ref={swordGlowRef} position={[0.02, 0.7, 0]} material={neonGreen}>
            <boxGeometry args={[0.005, 0.68, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* ============ SUNEATE — LEG ARMOR ============ */}
      {/* Right leg */}
      <group position={[0.2, 0.05, 0]}>
        <mesh material={armorMat}>
          <boxGeometry args={[0.2, 0.45, 0.2]} />
        </mesh>
        {/* Shin guard */}
        <mesh position={[0, -0.42, 0.02]} material={plateMat}>
          <boxGeometry args={[0.19, 0.4, 0.19]} />
        </mesh>
        {/* Shin neon */}
        <mesh position={[0.1, -0.42, 0]} material={neonGreen}>
          <boxGeometry args={[0.01, 0.3, 0.02]} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.72, 0.04]} material={armorMat}>
          <boxGeometry args={[0.22, 0.12, 0.28]} />
        </mesh>
      </group>
      {/* Left leg */}
      <group position={[-0.2, 0.05, 0]}>
        <mesh material={armorMat}>
          <boxGeometry args={[0.2, 0.45, 0.2]} />
        </mesh>
        <mesh position={[0, -0.42, 0.02]} material={plateMat}>
          <boxGeometry args={[0.19, 0.4, 0.19]} />
        </mesh>
        <mesh position={[-0.1, -0.42, 0]} material={neonGreen}>
          <boxGeometry args={[0.01, 0.3, 0.02]} />
        </mesh>
        <mesh position={[0, -0.72, 0.04]} material={armorMat}>
          <boxGeometry args={[0.22, 0.12, 0.28]} />
        </mesh>
      </group>
    </group>
  );
}

export function NeonSamurai({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Much brighter lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#aaddff" />
        <pointLight position={[0, 2.5, 3]} intensity={1.5} color="#00ffaa" distance={10} />
        <pointLight position={[-1, 1, 3]} intensity={0.6} color="#ff2255" distance={8} />
        <pointLight position={[1, 0, 2]} intensity={0.4} color="#ffffff" distance={6} />
        <SamuraiBody />
      </Canvas>
    </div>
  );
}
