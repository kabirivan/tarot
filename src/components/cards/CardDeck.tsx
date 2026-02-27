"use client";

import { motion } from "framer-motion";

interface CardDeckProps {
  count?: number;
  onDraw?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CardDeck({
  count = 5,
  onDraw,
  disabled = false,
  className,
}: CardDeckProps) {
  return (
    <motion.div
      className={`flex flex-wrap gap-2 justify-center ${className ?? ""}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.05 },
        },
        hidden: {},
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="w-20 h-[140px] sm:w-24 sm:h-[168px] rounded-xl card-surface flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={disabled ? undefined : onDraw}
        >
          <span className="text-3xl opacity-70">🎴</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
