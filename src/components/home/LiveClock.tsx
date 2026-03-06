"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Reloj en tiempo real para transmitir que las lecturas son en vivo */
export function LiveClock() {
  const [time, setTime] = useState<string>("--:--:--");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
    };
    format();
    const t = setInterval(format, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="inline-flex flex-col items-center gap-0.5 sm:flex-row sm:items-center sm:gap-2"
      aria-live="polite"
      aria-label={`Hora actual: ${time}. ${date}. Lecturas en vivo.`}
    >
      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-white/40 tracking-wide">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse"
          aria-hidden
        />
        En vivo
      </span>
      <span className="font-mono text-sm sm:text-base font-medium text-white/70 tabular-nums">
        {time}
      </span>
      <span className="text-[10px] sm:text-xs text-white/35 capitalize hidden sm:inline">
        {date}
      </span>
    </motion.div>
  );
}
