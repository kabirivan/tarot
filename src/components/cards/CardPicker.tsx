"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CardPickerProps {
  readonly totalCards?: number;
  readonly pickedIndices: number[];
  readonly onPick: (index: number) => void;
  readonly disabled?: boolean;
  readonly label?: string;
}

const CARD_COUNT = 40;

interface CardLayout {
  x: number;
  y: number;
  rotate: number;
}

function generateCircularLayout(count: number): CardLayout[] {
  const layouts: CardLayout[] = [];
  const radiusX = 340;
  const radiusY = 260;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const jitterX = (Math.random() - 0.5) * 28;
    const jitterY = (Math.random() - 0.5) * 22;
    const jitterR = (Math.random() - 0.5) * 30;

    layouts.push({
      x: Math.cos(angle) * radiusX + jitterX,
      y: Math.sin(angle) * radiusY + jitterY,
      rotate: (angle * 180) / Math.PI + 90 + jitterR,
    });
  }
  return layouts;
}

const CENTER_X = 400;
const CENTER_Y = 320;
const HALF_W = 60;
const HALF_H = 84;

export function CardPicker({
  totalCards = CARD_COUNT,
  pickedIndices,
  onPick,
  disabled = false,
  label,
}: CardPickerProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const count = Math.min(totalCards, CARD_COUNT);

  const layout = useMemo(() => generateCircularLayout(count), [count]);

  const cards = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count]
  );

  useEffect(() => {
    if (typeof globalThis === "undefined") return;
    const g = globalThis as unknown as Window & typeof globalThis;
    if (typeof g.matchMedia !== "function") return;
    const mq = g.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <motion.p
          key={label}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/90 text-center text-sm font-medium"
        >
          {label}
        </motion.p>
      )}

      {isMobile ? (
        <div className="grid grid-cols-4 gap-2 px-2 w-full max-w-sm mx-auto">
          <AnimatePresence>
            {cards.map((i) => {
              const isPicked = pickedIndices.includes(i);
              if (isPicked) return null;
              const isHovered = hoveredIdx === i;

              return (
                <motion.button
                  key={`card-mobile-${i}`}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.2, delay: i * 0.01 }}
                  disabled={disabled}
                  onMouseEnter={() => !disabled && setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => {
                    if (!disabled) onPick(i);
                  }}
                  className={cn(
                    "relative h-16 w-full rounded-lg overflow-hidden border border-white/15 bg-gradient-to-br from-primary/50 via-dark-surface to-accent/30",
                    "shadow-md active:scale-[0.97] transition-transform duration-150",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_60%)]" />
                  <div className="absolute inset-[4px] rounded-md border border-white/10 flex items-center justify-center">
                    <motion.span
                      className="text-lg opacity-80"
                      animate={
                        isHovered
                          ? { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }
                          : {}
                      }
                      transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                    >
                      ✦
                    </motion.span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="relative mx-auto"
          style={{ width: CENTER_X * 2, height: CENTER_Y * 2 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dark-surface/40 to-dark/60 border border-white/5" />

          <AnimatePresence>
            {cards.map((i) => {
              const isPicked = pickedIndices.includes(i);
              if (isPicked) return null;

              const { x, y, rotate } = layout[i];
              const isHovered = hoveredIdx === i;

              return (
                <motion.div
                  key={`card-${i}`}
                  initial={{
                    opacity: 0,
                    scale: 0.82,
                    x: CENTER_X - HALF_W,
                    y: CENTER_Y - HALF_H,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isHovered ? 1.06 : 1,
                    x: x + CENTER_X - HALF_W,
                    y: y + CENTER_Y - HALF_H,
                    rotate,
                    zIndex: isHovered ? 100 : 10 + i,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                      opacity: { delay: i * 0.02 },
                      x: { delay: i * 0.02 },
                      y: { delay: i * 0.02 },
                      scale: { type: "spring", stiffness: 320, damping: 22 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.06,
                    y: y + CENTER_Y - HALF_H - 24,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  onMouseEnter={() => !disabled && setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => {
                    if (!disabled) onPick(i);
                  }}
                  className={cn(
                    "absolute rounded-xl cursor-pointer select-none",
                    "shadow-lg hover:shadow-xl hover:shadow-primary/30",
                    disabled && "cursor-default opacity-50"
                  )}
                  style={{
                    width: HALF_W * 2,
                    height: HALF_H * 2,
                    transformOrigin: "center center",
                  }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden relative border border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-dark-surface to-accent/30" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_60%)]" />
                    <div className="absolute inset-[5px] rounded-lg border border-white/10 flex items-center justify-center">
                      <motion.span
                        className="text-2xl opacity-70"
                        animate={
                          isHovered
                            ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }
                            : {}
                        }
                        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                      >
                        ✦
                      </motion.span>
                    </div>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          boxShadow:
                            "inset 0 0 24px rgba(139,92,246,0.4), 0 0 18px rgba(236,72,153,0.3)",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
