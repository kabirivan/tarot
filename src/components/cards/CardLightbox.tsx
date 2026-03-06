"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { ReadingCard } from "@/types/tarot";

interface CardLightboxProps {
  readonly reading: ReadingCard | null;
  readonly positionLabel: string;
  readonly onClose: () => void;
  readonly onPrev?: () => void;
  readonly onNext?: () => void;
  readonly cardIndex?: number;
  readonly totalCards?: number;
}

export function CardLightbox({
  reading,
  positionLabel,
  onClose,
  onPrev,
  onNext,
  cardIndex,
  totalCards,
}: CardLightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  if (!reading) return null;

  const { card } = reading;
  const displayName = card.nameEs ?? card.name;
  const meaning = card.reversedDrawn ? card.reversed : card.upright;
  const showCounter = cardIndex !== undefined && totalCards !== undefined;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Nav arrow — anterior */}
      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/12 hover:text-white/85 hover:border-white/25 transition-all duration-150 text-xl leading-none"
          aria-label="Carta anterior (←)"
        >
          ‹
        </button>
      )}

      {/* Nav arrow — siguiente */}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/12 hover:text-white/85 hover:border-white/25 transition-all duration-150 text-xl leading-none"
          aria-label="Carta siguiente (→)"
        >
          ›
        </button>
      )}

      {/* Panel principal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          className="relative z-10 flex flex-col sm:flex-row w-full max-h-[88vh] bg-[#0c0a1e] border border-white/12 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
          style={{ maxWidth: "min(88vw, 560px)" }}
          initial={{ scale: 0.94, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0, y: -4 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Línea accent superior */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent pointer-events-none" />

          {/* Columna izquierda — imagen de la carta */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 sm:border-r sm:border-white/[0.07]">
            <div
              className="holo-card holo-card-lg w-[min(52vw,155px)] sm:w-[150px] aspect-[10/17]"
              style={{ ["--frame" as string]: "8px" }}
            >
              <div className="holo-sparkle" />
              <div className="holo-border" />
              <div className="holo-content bg-dark-surface p-1.5 flex flex-col">
                <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
                  <Image
                    src={card.image}
                    alt={displayName}
                    fill
                    className={cn("object-contain", card.reversedDrawn && "rotate-180")}
                    sizes="155px"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {showCounter && (
              <p className="text-[10px] text-white/18 tracking-[0.28em] tabular-nums font-medium select-none">
                {String(cardIndex! + 1).padStart(2, "0")}
                <span className="text-white/10 mx-1">/</span>
                {String(totalCards!).padStart(2, "0")}
              </p>
            )}
          </div>

          {/* Columna derecha — información */}
          <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-5 overflow-y-auto">

            {/* Badge de posición */}
            <div className="flex-shrink-0 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full bg-secondary/15 border border-secondary/25 text-secondary/85 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span className="text-secondary/35 text-[7px]">✦</span>
                {positionLabel}
              </span>
            </div>

            {/* Nombre de la carta */}
            <div className="flex-shrink-0 mb-1">
              <h3 className="font-display text-xl sm:text-2xl font-light italic text-white/95 leading-tight">
                {displayName}
              </h3>
              {card.reversedDrawn && (
                <span className="inline-block mt-0.5 text-[11px] font-medium text-accent/70 tracking-wide">
                  Invertida
                </span>
              )}
            </div>

            {/* Palabras clave */}
            {card.keywords.length > 0 && (
              <p className="flex-shrink-0 text-[9px] sm:text-[10px] text-secondary/65 tracking-[0.14em] mb-3 leading-relaxed">
                {card.keywords.join(" · ")}
              </p>
            )}

            {/* Divisor ornamental */}
            <div className="flex-shrink-0 flex items-center gap-2 mb-3">
              <div className="h-px flex-1 max-w-[36px] bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-secondary/20 text-[7px]">✦</span>
            </div>

            {/* Significado de la posición */}
            {reading.positionMeaning && (
              <p className="flex-shrink-0 text-[10px] sm:text-[11px] text-secondary/72 italic leading-relaxed mb-3 pl-3 border-l-2 border-secondary/30">
                {reading.positionMeaning}
              </p>
            )}

            {/* Significado de la carta */}
            <p className="text-xs sm:text-sm text-white/88 leading-relaxed flex-1 min-h-0">
              {meaning}
            </p>

            {/* Botón cerrar */}
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 mt-4 self-end inline-flex items-center gap-1.5 min-h-[36px] px-3 rounded-lg text-[10px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-all duration-150"
            >
              <span className="text-white/12 font-mono">Esc</span>
              <span className="text-white/10">·</span>
              <span>Cerrar</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
