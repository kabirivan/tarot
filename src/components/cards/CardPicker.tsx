"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CardPickerProps {
  totalCards?: number;
  pickedIndices: number[];
  onPick: (index: number) => void;
  disabled?: boolean;
  label?: string;
}

const FAN_COUNT = 18;

export function CardPicker({
  totalCards = FAN_COUNT,
  pickedIndices,
  onPick,
  disabled = false,
  label,
}: CardPickerProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const count = Math.min(totalCards, FAN_COUNT);

  const cards = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count]
  );

  return (
    <div className="flex flex-col items-center gap-6">
      {label && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/80 text-center text-sm"
        >
          {label}
        </motion.p>
      )}
      <div className="relative h-52 sm:h-64 w-full max-w-2xl mx-auto flex items-end justify-center">
        <AnimatePresence>
          {cards.map((i) => {
            const isPicked = pickedIndices.includes(i);
            if (isPicked) return null;

            const angle = (i - count / 2) * 4.5;
            const xOffset = (i - count / 2) * 28;
            const yOffset = Math.abs(i - count / 2) * 3;
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  y: isHovered ? -30 - yOffset : -yOffset,
                  x: xOffset,
                  rotate: angle,
                  scale: isHovered ? 1.12 : 1,
                  zIndex: isHovered ? 50 : i,
                }}
                exit={{
                  opacity: 0,
                  y: -120,
                  scale: 1.3,
                  transition: { duration: 0.4 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                onMouseEnter={() => !disabled && setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => !disabled && onPick(i)}
                className={cn(
                  "absolute bottom-0 w-16 h-24 sm:w-20 sm:h-[120px] rounded-lg cursor-pointer select-none",
                  "bg-gradient-to-br from-primary/60 via-dark-surface to-accent/40",
                  "border border-white/15 shadow-lg",
                  "hover:shadow-primary/40 hover:shadow-xl",
                  disabled && "cursor-default opacity-60"
                )}
                style={{ transformOrigin: "bottom center" }}
              >
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,0.3),transparent_70%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(236,72,153,0.2),transparent_70%)]" />
                  <span className="text-2xl sm:text-3xl opacity-80 z-10">✦</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
