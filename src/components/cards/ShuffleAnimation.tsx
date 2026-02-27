"use client";

import { motion } from "framer-motion";

export function ShuffleAnimation() {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative w-40 h-56 sm:w-48 sm:h-64">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl border border-white/15 bg-gradient-to-br from-primary/50 via-dark-surface to-accent/30 shadow-lg"
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
            animate={{
              x: [0, (i - 2) * 40, 0, -(i - 2) * 40, 0],
              y: [0, -20, 0, -20, 0],
              rotate: [0, (i - 2) * 15, 0, -(i - 2) * 15, 0],
              opacity: [0, 1, 1, 1, 0.8],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <span className="text-5xl">🔮</span>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/70 text-sm animate-pulse"
      >
        Mezclando las cartas...
      </motion.p>
    </div>
  );
}
