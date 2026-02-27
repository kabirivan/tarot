"use client";

import { motion } from "framer-motion";

export function ShuffleAnimation() {
  const cards = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full py-8">
      <div className="relative w-72 h-60 sm:w-96 sm:h-72">
        {/* Ambient glow layers */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-accent/15 blur-2xl"
          animate={{ scale: [1.3, 0.8, 1.3], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Shuffling cards */}
        {cards.map((i) => {
          const startAngle = (i / cards.length) * 360;
          const rad = (startAngle * Math.PI) / 180;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -ml-8 -mt-12 w-16 h-24 rounded-xl border border-white/25 bg-gradient-to-br from-primary/70 via-dark-surface to-accent/50"
              style={{ boxShadow: "0 4px 20px rgba(139,92,246,0.25)" }}
              initial={{ rotate: 0, x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{
                rotate: [startAngle, startAngle + 360, startAngle + 720],
                x: [0, Math.cos(rad) * 115, 0],
                y: [0, Math.sin(rad) * 88, 0],
                opacity: [0, 1, 1, 0.85, 0],
                scale: [0.4, 1, 0.95, 1, 0.9],
              }}
              transition={{
                duration: 2,
                delay: i * 0.03,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-[3px] rounded-lg border border-white/10 flex items-center justify-center">
                <motion.span
                  className="text-white/30 text-xs"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                >
                  ✦
                </motion.span>
              </div>
            </motion.div>
          );
        })}

        {/* Central orb */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.3, 0.3, 1.4, 1.1, 0.9],
          }}
          transition={{ duration: 2, delay: 0.3, ease: "backOut" }}
        >
          <span className="text-7xl drop-shadow-2xl">🔮</span>
        </motion.div>
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
