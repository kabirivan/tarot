"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { ReadingCard } from "@/types/tarot";

interface RevealedCardProps {
  reading: ReadingCard;
  index: number;
  positionLabel: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-20 h-[140px] sm:w-24 sm:h-[168px]",
  md: "w-28 h-[196px] sm:w-36 sm:h-[252px]",
  lg: "w-36 h-[252px] sm:w-44 sm:h-[308px]",
};

export function RevealedCard({
  reading,
  index,
  positionLabel,
  size = "md",
}: RevealedCardProps) {
  const { card } = reading;
  const displayName = card.nameEs ?? card.name;
  const meaning = card.reversedDrawn ? card.reversed : card.upright;

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90, scale: 0.6 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="flex flex-col items-center gap-2"
    >
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.3 }}
        className="text-xs font-semibold text-secondary"
      >
        {positionLabel}
      </motion.span>

      <div
        className={cn(
          "relative rounded-xl overflow-hidden holographic holographic-glow",
          sizeClasses[size]
        )}
      >
        <div className="holographic-card-inner absolute inset-0 card-surface flex flex-col items-center justify-center p-2">
          <div className="relative w-full h-full min-h-[80%] rounded-lg overflow-hidden bg-dark/50">
            <Image
              src={card.image}
              alt={displayName}
              fill
              className={cn(
                "object-contain",
                card.reversedDrawn && "rotate-180"
              )}
              sizes="(max-width: 640px) 144px, 176px"
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className =
                    "absolute inset-0 flex items-center justify-center text-center text-xs font-medium text-primary px-1";
                  fallback.textContent = displayName;
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <p className="text-[10px] sm:text-xs text-center text-white/90 mt-1 truncate w-full">
            {displayName}
          </p>
          {card.reversedDrawn && (
            <span className="text-[9px] text-accent">Invertida</span>
          )}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.5 }}
        className="text-xs text-white/70 text-center max-w-[180px] line-clamp-3"
      >
        {meaning}
      </motion.p>
    </motion.div>
  );
}
