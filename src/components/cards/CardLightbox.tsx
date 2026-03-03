"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { ReadingCard } from "@/types/tarot";

interface CardLightboxProps {
  readonly reading: ReadingCard | null;
  readonly positionLabel: string;
  readonly onClose: () => void;
}

export function CardLightbox({ reading, positionLabel, onClose }: CardLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    globalThis.addEventListener("keydown", handleEscape);
    return () => globalThis.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!reading) return null;

  const { card } = reading;
  const displayName = card.nameEs ?? card.name;
  const meaning = card.reversedDrawn ? card.reversed : card.upright;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
        <button
          type="button"
          aria-label="Cerrar"
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 flex flex-col items-center max-w-[90vw] max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="holo-card holo-card-lg w-[min(70vw,320px)]"
            style={{ aspectRatio: "2/3", ["--frame" as string]: "10px" }}
          >
            <div className="holo-sparkle" />
            <div className="holo-border" />
            <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-2">
              <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
                <Image
                  src={card.image}
                  alt={displayName}
                  fill
                  className={cn(
                    "object-contain",
                    card.reversedDrawn && "rotate-180"
                  )}
                  sizes="320px"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-center space-y-2 max-w-md">
            <p className="text-sm font-semibold text-secondary">{positionLabel}</p>
            {reading.positionMeaning && (
              <p className="text-xs text-white/50">{reading.positionMeaning}</p>
            )}
            <p className="text-sm text-white/85 leading-snug">{meaning}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-xs text-white/40 hover:text-white/70 transition"
          >
            Cerrar (Esc)
          </button>
        </motion.div>
    </motion.div>
  );
}
