"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "./HolographicCard";
import type { TarotCard } from "@/types/tarot";

interface CardFlipProps {
  card: TarotCard;
  revealed: boolean;
  onReveal?: () => void;
  index?: number;
  size?: "sm" | "md" | "lg";
}

export function CardFlip({
  card,
  revealed,
  onReveal,
  index = 0,
  size = "md",
}: CardFlipProps) {
  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: revealed ? 180 : 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative"
    >
      <div
        onClick={!revealed ? onReveal : undefined}
        style={{ backfaceVisibility: "hidden" }}
      >
        <HolographicCard
          card={card}
          revealed={revealed}
          size={size}
        />
      </div>
    </motion.div>
  );
}
