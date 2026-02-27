"use client";

import { useMemo } from "react";

const PARTICLE_COUNT = 20;

export function MagicParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/30 animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
