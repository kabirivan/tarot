"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// 14 cards split into two interleaving halves.
// Each card arcs from one side to the other — simulating a riffle shuffle.
// easeOut going up (decelerate against gravity), easeIn coming down (accelerate with gravity).
const CARD_COUNT = 14;

interface ShuffleCard {
  id: string;
  startX: number;
  arcHeight: number;
  duration: number;
  delay: number;
  startR: number;
  peakR: number;
  endR: number;
}

function buildCardData(): ShuffleCard[] {
  return Array.from({ length: CARD_COUNT }, (_, i) => {
    const isLeft = i % 2 === 0;
    // Seeded variation so no Math.random() on every render
    const v = (Math.sin(i * 1.9 + 0.7) * 0.5 + 0.5); // deterministic 0..1

    const startX = isLeft ? -(72 + v * 44) : (72 + v * 44);
    const arcHeight = 52 + v * 72; // 52..124px — realistic card arc variation
    const duration = 1.25 + v * 0.35; // slight weight variation
    const delay = i * 0.092; // cascade stagger

    const startR = isLeft ? -(6 + v * 14) : (6 + v * 14);
    const peakR = isLeft ? (v * 3) : -(v * 3); // nearly flat at apex
    const endR = -startR;

    return { id: `sc-${i}`, startX, arcHeight, duration, delay, startR, peakR, endR };
  });
}

export function ShuffleAnimation() {
  const cards = useMemo(buildCardData, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full py-8">
      {/* Stage */}
      <div
        className="relative"
        style={{ width: 320, height: 220, perspective: 900 }}
      >
        {/* Ambient glow — breathes with the shuffle rhythm */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/15 blur-3xl"
          animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-accent/10 blur-2xl"
          animate={{ scale: [1.2, 0.85, 1.2], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Cards */}
        {cards.map((c, idx) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              width: 50,
              height: 75,
              left: "50%",
              top: "50%",
              marginLeft: -25,
              marginTop: -37,
              zIndex: idx,
            }}
            animate={{
              // Cards cross from their start side to the opposite side,
              // peaking at center (x=0) at the apex of the arc.
              x: [c.startX, 0, -c.startX],
              y: [0, -c.arcHeight, 0],
              rotate: [c.startR, c.peakR, c.endR],
              opacity: [0, 0.92, 0],
              scale: [0.86, 1, 0.86],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              repeatDelay: 0.15,
              // 3 keyframes → 2 easing segments:
              // segment 1 (0→peak): easeOut  — card decelerates as it rises
              // segment 2 (peak→0): easeIn   — card accelerates as it falls
              ease: ["easeOut", "easeIn"],
              times: [0, 0.43, 1],
            }}
          >
            {/* Card back */}
            <div className="w-full h-full rounded-lg overflow-hidden relative border border-white/20 shadow-lg shadow-primary/20"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.55) 0%, rgba(15,10,31,0.9) 55%, rgba(236,72,153,0.35) 100%)",
              }}
            >
              {/* Inner frame */}
              <div className="absolute inset-[3px] rounded-md border border-white/8" />
              {/* Corner light */}
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 30% 25%, rgba(245,158,11,0.16), transparent 60%)" }}
              />
              {/* Center mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/18 text-[9px]">✦</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Central glow orb — pulses with each pass */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            className="rounded-full bg-primary/35 blur-xl"
            animate={{
              width: [16, 36, 16],
              height: [16, 36, 16],
              opacity: [0.3, 0.85, 0.3],
            }}
            transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-1.5"
      >
        <motion.p
          className="text-white/80 text-base font-medium tracking-wide"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Mezclando las cartas...
        </motion.p>
        <motion.p
          className="text-white/30 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          El universo está alineándose para ti
        </motion.p>
      </motion.div>
    </div>
  );
}
