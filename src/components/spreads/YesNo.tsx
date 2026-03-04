"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotReading } from "@/hooks/useTarotReading";
import { spreadPositions } from "@/lib/cards/spreads";
import { CardPicker } from "@/components/cards/CardPicker";
import { ShuffleAnimation } from "@/components/cards/ShuffleAnimation";
import { AIInterpretation } from "@/components/cards/AIInterpretation";
import { CardLightbox } from "@/components/cards/CardLightbox";
import { cn } from "@/lib/utils/cn";
import { generateReadingPdf } from "@/lib/pdf/generateReadingPdf";

const position = spreadPositions["yes-no"][0];

export function YesNoSpread() {
  const {
    selectedCards,
    pickedVisualIndices,
    phase,
    startReading,
    pickCard,
    goToRevealed,
    reset,
  } = useTarotReading("yes-no");

  const [aiText, setAiText] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (phase === "idle") {
      setAiText(null);
    }
  }, [phase]);

  const revealCard = selectedCards[0];
  const revealDisplayName = revealCard
    ? (revealCard.card.nameEs ?? revealCard.card.name)
    : "";

  const canStart = question.trim().length > 3;

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
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/25 blur-2xl animate-orb-pulse" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl drop-shadow-2xl">❓</span>
              </div>
            </motion.div>

            <div className="text-center space-y-3 max-w-md w-full">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/95"
              >
                Pregunta de Sí / No
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-white/60 text-sm sm:text-base leading-relaxed"
              >
                Formula una pregunta clara que se responda con <span className="font-semibold text-white/80">sí o no</span>.
                Luego elige una carta para ver la tendencia y el consejo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-2"
              >
                <label
                  htmlFor="yes-no-question"
                  className="block text-xs text-white/60 mb-1 text-left"
                >
                  Tu pregunta
                </label>
                <textarea
                  id="yes-no-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/60"
                  placeholder="¿Esta decisión es buena para mí? ¿Debería aceptar esta propuesta?..."
                />
                <p className="mt-1 text-[11px] text-white/40 text-left">
                  Intenta ser específico/a y evitar preguntas dobles.
                </p>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={startReading}
              disabled={!canStart}
              className={cn(
                "btn-primary text-white text-base sm:text-lg px-10 py-3.5 shadow-lg shadow-primary/30",
                !canStart && "opacity-50 cursor-not-allowed"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={canStart ? { scale: 1.05 } : undefined}
              whileTap={canStart ? { scale: 0.97 } : undefined}
            >
              Comenzar lectura
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
            className="flex-1 flex flex-col items-center justify-start min-h-0 overflow-visible px-4 pt-6 sm:pt-8 lg:pt-12 pb-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg font-medium text-white/80 mb-6 sm:mb-8 lg:mb-10 flex-shrink-0 text-center"
            >
              Piensa en tu pregunta de Sí / No y elige una carta
            </motion.h2>

            <div className="flex-1 min-h-0 flex flex-col items-center w-full overflow-visible">
              <div className="relative w-full flex-1 min-h-[380px] sm:flex-none sm:w-[800px] sm:h-[640px] sm:min-h-0 mt-6 sm:mt-8 lg:mt-12">
                <div className="absolute inset-0 picker-scale-md overflow-visible">
                  <CardPicker pickedIndices={pickedVisualIndices} onPick={pickCard} />
                </div>
              </div>
            </div>

            <motion.p
              className="text-white/25 text-xs mt-1 mb-2 flex-shrink-0"
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Concéntrate en tu pregunta y toca una carta
            </motion.p>
          </motion.div>
        )}

        {/* ───────── REVEALING — Modal ───────── */}
        {phase === "revealing" && revealCard && (
          <motion.div
            key="revealing"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
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
              animate={{ width: 420, height: 420, opacity: 0.55 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />

            <motion.div
              className="relative z-10"
              style={{ perspective: 1200 }}
              initial={{ scale: 0.88, rotateY: 20, opacity: 0 }}
              animate={{
                scale: 1,
                rotateY: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                type: "spring",
                stiffness: 120,
                damping: 22,
              }}
            >
              <div
                className="holo-card holo-card-lg w-[min(82vw,320px)] aspect-[10/17] sm:w-[min(55vw,280px)]"
                style={{ ["--frame" as string]: "10px" }}
              >
                <div className="holo-sparkle" />
                <div className="holo-border" />
                <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-2">
                  <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
                    <Image
                      src={revealCard.card.image}
                      alt={revealDisplayName}
                      fill
                      className={cn(
                        "object-contain",
                        revealCard.card.reversedDrawn && "rotate-180"
                      )}
                      sizes="280px"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              type="button"
              className="relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: [0, 0.9, 0.6, 0.9],
                y: [6, 0, 0, 0],
              }}
              transition={{ delay: 1.6, duration: 2.2, repeat: Infinity }}
              onClick={goToRevealed}
            >
              <span className="text-[10px] tracking-wide uppercase">
                Ver interpretación de Sí / No
              </span>
              <span className="text-sm">✦</span>
            </motion.button>
          </motion.div>
        )}

        {/* ───────── REVEALED ───────── */}
        {phase === "revealed" && selectedCards.length > 0 && (() => {
          const rc = selectedCards[0];
          const card = rc.card;
          const displayName = card.nameEs ?? card.name;

          return (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden"
            >
              {/* LEFT: Card (clickable) */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 p-3 sm:p-4 lg:p-6 xl:p-8 w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-none lg:w-[48%] xl:w-[52%] mx-auto lg:mx-0">
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[10px] sm:text-xs font-semibold text-secondary tracking-widest uppercase flex-shrink-0"
                >
                  {position.nameEs}
                </motion.span>

                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                  className="flex-1 min-h-0 flex items-center justify-center w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  style={{ perspective: 900 }}
                  onClick={() => setLightboxOpen(true)}
                >
                  <div
                    className="holo-card holo-card-lg w-[min(85vw,220px)] sm:w-[min(88vw,240px)] md:w-[min(88vw,260px)] lg:w-[min(88vw,280px)] max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] aspect-[10/17] shrink-0"
                    style={{ ["--frame" as string]: "10px" }}
                  >
                    <div className="holo-sparkle" />
                    <div className="holo-border" />
                    <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-1.5 sm:p-2">
                      <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
                        <Image
                          src={card.image}
                          alt={displayName}
                          fill
                          className={cn(
                            "object-contain",
                            card.reversedDrawn && "rotate-180"
                          )}
                          sizes="(max-width: 1024px) 45vw, 30vw"
                          unoptimized
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {lightboxOpen && (
                    <CardLightbox
                      reading={rc}
                      positionLabel={position.nameEs}
                      onClose={() => setLightboxOpen(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT: Interpretation */}
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
                    Respuesta para tu pregunta
                  </h2>
                  {question && (
                    <p className="mt-1 text-xs text-white/50 line-clamp-2">
                      “{question}”
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1"
                >
                  <AIInterpretation
                    cards={selectedCards}
                    spreadType="yes-no"
                    question={question}
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
                        spreadType: "yes-no",
                        cards: selectedCards,
                        interpretation: aiText ?? undefined,
                        question,
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
                    Nueva pregunta
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
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

