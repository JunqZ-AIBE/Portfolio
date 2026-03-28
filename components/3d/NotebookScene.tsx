"use client";

/// <reference types="@react-three/fiber" />

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Notebook() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 - 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 + 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Base do notebook */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.6]} />
        <meshStandardMaterial
          color="#1a1a1f"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Tela (inclinada ~105°) */}
      <mesh position={[0, 0.75, -0.75]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.06]} />
        <meshStandardMaterial
          color="#141417"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Glow da tela */}
      <mesh position={[0, 0.76, -0.72]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[2.1, 1.3]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={0.08}
          roughness={1}
        />
      </mesh>

      {/* Linha de código na tela */}
      <mesh position={[-0.4, 0.78, -0.69]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[0.8, 0.04]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh position={[-0.6, 0.68, -0.66]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[0.5, 0.03]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={0.7}
        />
      </mesh>

      <mesh position={[-0.3, 0.58, -0.64]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[1.0, 0.03]} />
        <meshStandardMaterial
          color="#4AE3B5"
          emissive="#4AE3B5"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const positions: [number, number, number][] = [
    [1.4, 0.6, 0.2],
    [-1.5, 0.3, -0.3],
    [1.0, -0.4, 0.5],
    [-0.8, 1.2, -0.5],
    [0.5, -0.8, 0.8],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={pos.join(",")} speed={1.5 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#4AE3B5"
              emissive="#4AE3B5"
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function NotebookScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 40 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} />
      <pointLight position={[-2, 2, -2]} intensity={0.5} color="#4AE3B5" />
      <Notebook />
      <Particles />
    </Canvas>
  );
}
