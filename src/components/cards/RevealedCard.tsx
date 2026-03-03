"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { ReadingCard } from "@/types/tarot";

interface RevealedCardProps {
  reading: ReadingCard;
  index: number;
  positionLabel: string;
  size?: "sm" | "md" | "lg" | "xl";
  hideMeaning?: boolean;
}

const sizeClasses = {
  sm: "w-24 h-[156px] sm:w-28 sm:h-[182px]",
  /* En mobile (grid 2 cols): ocupa la celda con buena proporción; en sm+ tamaño fijo */
  md: "w-full max-w-[160px] aspect-[2/3] h-auto mx-auto sm:max-w-none sm:mx-0 sm:w-40 sm:h-[275px] sm:aspect-auto",
  lg: "w-44 h-[302px] sm:w-52 sm:h-[357px]",
  /* En mobile: ocupa el ancho del contenedor (ej. max-w-[280px]) con proporción 2:3; en sm+ tamaños fijos */
  xl: "w-full max-w-[280px] min-w-[200px] aspect-[2/3] h-auto sm:max-w-none sm:min-w-0 sm:w-52 sm:h-[357px] sm:aspect-auto lg:w-60 lg:h-[413px]",
};

export function RevealedCard({
  reading,
  index,
  positionLabel,
  size = "md",
  hideMeaning = false,
}: RevealedCardProps) {
  const { card } = reading;
  const displayName = card.nameEs ?? card.name;
  const meaning = card.reversedDrawn ? card.reversed : card.upright;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    const ry = (mx - 0.5) * 16;
    const rx = (my - 0.5) * -16;

    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -20, scale: 0.93 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.35,
        type: "spring",
        stiffness: 180,
        damping: 24,
      }}
      className="flex flex-col items-center gap-1"
      style={{ perspective: 600 }}
    >
      <motion.span
        initial={{ opacity: 0, y: -3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 + 0.15 }}
        className="text-[10px] sm:text-xs font-semibold text-secondary"
      >
        {positionLabel}
      </motion.span>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "holo-card cursor-pointer",
          (size === "lg" || size === "xl") && "holo-card-lg",
          sizeClasses[size]
        )}
      >
        <div className="holo-sparkle" />
        <div className="holo-border" />

        <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-1.5">
          <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
            <Image
              src={card.image}
              alt={displayName}
              fill
              className={cn(
                "object-contain",
                card.reversedDrawn && "rotate-180"
              )}
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 176px, 240px"
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className =
                    "absolute inset-0 flex items-center justify-center text-center text-xs font-medium text-primary px-2";
                  fallback.textContent = displayName;
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </div>
      </div>

      {!hideMeaning && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.25 }}
          className="text-[10px] sm:text-xs text-white/60 text-center max-w-[180px] line-clamp-2 leading-snug"
        >
          {meaning}
        </motion.p>
      )}
    </motion.div>
  );
}
