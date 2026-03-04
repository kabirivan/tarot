"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotReading } from "@/hooks/useTarotReading";
import { spreadPositions } from "@/lib/cards/spreads";
import { CardPicker } from "@/components/cards/CardPicker";
import { ShuffleAnimation } from "@/components/cards/ShuffleAnimation";
import { RevealedCard } from "@/components/cards/RevealedCard";
import { CardLightbox } from "@/components/cards/CardLightbox";
import { AIInterpretation } from "@/components/cards/AIInterpretation";
import { generateReadingPdf } from "@/lib/pdf/generateReadingPdf";
import { cn } from "@/lib/utils/cn";

const positions = spreadPositions["celtic-cross"];

export function CelticCrossSpread() {
  const {
    selectedCards,
    pickedVisualIndices,
    phase,
    pickedCount,
    totalNeeded,
    startReading,
    pickCard,
    goToRevealed,
    reset,
  } = useTarotReading("celtic-cross");

  const [aiText, setAiText] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [lightboxCardIndex, setLightboxCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (phase !== "revealing" || selectedCards.length < totalNeeded) return;
    const t = setTimeout(() => goToRevealed(), 5500);
    return () => clearTimeout(t);
  }, [phase, selectedCards.length, totalNeeded, goToRevealed]);

  return (
    <div className="h-[calc(100dvh-3.5rem)] flex flex-col overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* ───────── IDLE ───────── */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center gap-6 px-6"
          >
            <motion.div
              className="relative w-28 h-28 sm:w-36 sm:h-36"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/25 blur-2xl animate-orb-pulse" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl drop-shadow-2xl">🔮</span>
              </div>
            </motion.div>

            <div className="text-center space-y-2 max-w-md">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/95"
              >
                Cruz Celta
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-white/60 text-sm sm:text-base leading-relaxed"
              >
                Una lectura profunda de 10 cartas que revela tu situación desde todos los ángulos.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-white/40 text-xs"
              >
                Tómate un momento para formular tu pregunta y elige 10 cartas, una por una.
              </motion.p>
            </div>

            <motion.button
              type="button"
              onClick={startReading}
              className="btn-primary text-white text-base sm:text-lg px-10 py-3.5 shadow-lg shadow-primary/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Comenzar Cruz Celta
            </motion.button>
          </motion.div>
        )}

        {/* ───────── SHUFFLING ───────── */}
        {phase === "shuffling" && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <ShuffleAnimation />
          </motion.div>
        )}

        {/* ───────── PICKING ───────── */}
        {phase === "picking" && (
          <motion.div
            key="picking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-visible pt-6 sm:pt-8 lg:pt-12"
          >
            <div className="lg:w-[70%] flex-shrink-0 flex flex-col items-center justify-start min-h-0 p-4">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base sm:text-lg font-medium text-white/80 mb-1 flex-shrink-0"
              >
                {positions[pickedCount]?.nameEs ?? "..."}
              </motion.h2>

              {/* Contador 4/10 + barra de progreso */}
              <div className="flex flex-col items-center gap-2 mb-4 sm:mb-6 lg:mb-8 flex-shrink-0 w-full max-w-[280px]">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white/95 tabular-nums">
                    {pickedCount}
                    <span className="text-white/40 font-normal text-lg">/</span>
                    {totalNeeded}
                  </span>
                  <span className="text-sm text-white/50">cartas</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={false}
                    animate={{ width: `${(pickedCount / totalNeeded) * 100}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  />
                </div>
                <div className="flex justify-between w-full gap-0.5">
                  {Array.from({ length: totalNeeded }).map((_, i) => (
                    <div
                      key={positions[i]?.nameEs ?? `step-${i}`}
                      className={cn(
                        "flex-1 h-1.5 rounded-full transition-all duration-300",
                        i < pickedCount && "bg-primary",
                        i === pickedCount && "bg-accent scale-y-125",
                        i > pickedCount && "bg-white/15"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col items-center w-full overflow-visible">
                <div className="relative w-full flex-1 min-h-[380px] sm:flex-none sm:w-[800px] sm:h-[640px] sm:min-h-0 mt-6 sm:mt-8 lg:mt-12">
                  <div className="absolute inset-0 picker-scale-md overflow-visible">
                    <CardPicker
                      pickedIndices={pickedVisualIndices}
                      onPick={pickCard}
                    />
                  </div>
                </div>
              </div>

              <motion.p
                className="text-white/30 text-xs mt-1 mb-2 flex-shrink-0"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Elige la carta para: {positions[pickedCount]?.nameEs ?? "..."}
              </motion.p>
            </div>

            <div className="lg:w-[30%] flex-shrink-0 flex flex-col items-center justify-center min-h-0 p-4 lg:border-l lg:border-white/5">
              {selectedCards.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 justify-items-center max-w-[420px]">
                  {selectedCards.map((rc, i) => (
                    <motion.div
                      key={rc.card.id}
                      initial={{ opacity: 0, scale: 0.5, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 22 }}
                    >
                      <RevealedCard
                        reading={rc}
                        index={i}
                        positionLabel={positions[i].nameEs}
                        size="md"
                        hideMeaning
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-2 sm:gap-3 opacity-15 max-w-[420px]">
                  {positions.slice(0, 5).map((pos) => (
                    <div key={pos.nameEs} className="flex flex-col items-center gap-1">
                      <div className="w-24 h-[164px] sm:w-28 sm:h-[191px] rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                        <span className="text-lg text-white/30">✦</span>
                      </div>
                      <span className="text-[10px] text-white/20 text-center truncate w-full">
                        {pos.nameEs}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ───────── REVEALING — Modal con las 10 cartas (misma estructura que ThreeCard) ───────── */}
        {phase === "revealing" && selectedCards.length >= totalNeeded && (
          <motion.div
            key="revealing"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            <motion.div
              className="absolute rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 blur-3xl"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: 500, height: 500, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <motion.h2
              className="relative z-10 text-xl sm:text-2xl font-bold text-white/95 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Cruz Celta
            </motion.h2>

            <div
              className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2 w-full px-2 sm:px-4 max-w-[100vw]"
              style={{ perspective: 1200 }}
            >
              {selectedCards.slice(0, totalNeeded).map((rc, i) => {
                const name = rc.card.nameEs ?? rc.card.name;
                const pos = positions[i];
                return (
                  <motion.div
                    key={rc.card.id}
                    className="flex flex-col items-center w-full min-w-0"
                    initial={{ scale: 0.88, rotateY: 20, opacity: 0 }}
                    animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 120,
                      damping: 22,
                      delay: 0.2 + i * 0.05,
                    }}
                  >
                    <div
                      className="holo-card w-full aspect-[2/3] max-w-[42vw] sm:max-w-[17vw] min-w-0"
                      style={{ ["--frame" as string]: "6px" }}
                    >
                      <div className="holo-sparkle" />
                      <div className="holo-border" />
                      <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-1">
                        <div className="relative w-full flex-1 min-h-0 rounded-md overflow-hidden bg-dark/60">
                          <Image
                            src={rc.card.image}
                            alt={name}
                            fill
                            className={cn(
                              "object-contain",
                              rc.card.reversedDrawn && "rotate-180"
                            )}
                            sizes="(max-width: 640px) 15vw, 17vw"
                            unoptimized
                            priority
                          />
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-medium text-secondary mt-1 text-center w-full line-clamp-1 break-words">
                      {pos?.nameEs ?? ""}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              type="button"
              className="relative z-10 mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: [0, 0.9, 0.6, 0.9],
                y: [6, 0, 0, 0],
              }}
              transition={{ delay: 2.2, duration: 2.2, repeat: Infinity }}
              onClick={goToRevealed}
            >
              <span className="text-[10px] tracking-wide uppercase">
                Ver interpretación completa
              </span>
              <span className="text-sm">✦</span>
            </motion.button>
          </motion.div>
        )}

        {/* ───────── REVEALED ───────── */}
        {phase === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex-shrink-0 flex flex-col items-center justify-center p-3 sm:p-4 lg:p-8 lg:w-[58%] min-h-0 overflow-y-auto"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 justify-items-center w-full max-w-[580px] mx-auto">
                {selectedCards.map((rc, i) => (
                  <button
                    key={rc.card.id}
                    type="button"
                    className="flex flex-col items-center gap-1 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                    onClick={() => setLightboxCardIndex(i)}
                  >
                    <RevealedCard
                      reading={rc}
                      index={i}
                      positionLabel={positions[i].nameEs}
                      size="md"
                      hideMeaning
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {lightboxCardIndex !== null && selectedCards[lightboxCardIndex] && (
                <CardLightbox
                  reading={selectedCards[lightboxCardIndex]}
                  positionLabel={positions[lightboxCardIndex]?.nameEs ?? ""}
                  onClose={() => setLightboxCardIndex(null)}
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="flex-1 flex flex-col min-h-0 min-w-0 p-3 sm:p-4 lg:p-8 lg:border-l lg:border-white/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-shrink-0 mb-3"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white/95 leading-tight">
                  Cruz Celta
                </h2>
                <p className="text-xs text-white/40 mt-1">
                  10 cartas, una lectura completa
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1"
              >
                <AIInterpretation
                  cards={selectedCards}
                  spreadType="celtic-cross"
                  autoStart
                  onInterpretationChange={setAiText}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="flex flex-wrap gap-2 pt-3 flex-shrink-0 border-t border-white/5 mt-3"
              >
                <button
                  type="button"
                  disabled={generatingPdf}
                  onClick={async () => {
                    setGeneratingPdf(true);
                    await generateReadingPdf({
                      spreadType: "celtic-cross",
                      cards: selectedCards,
                      interpretation: aiText ?? undefined,
                    });
                    setGeneratingPdf(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-success/20 text-success text-sm font-medium border border-success/40 hover:bg-success/30 transition disabled:opacity-60"
                >
                  {generatingPdf ? "Generando PDF…" : "Descargar PDF"}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-4 py-2 rounded-lg card-surface text-sm hover:bg-white/10 transition"
                >
                  Nueva lectura
                </button>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg card-surface text-sm hover:bg-white/10 transition"
                >
                  Volver
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
