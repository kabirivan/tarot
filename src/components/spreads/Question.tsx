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

const position = spreadPositions.question[0];

export function QuestionSpread() {
  const {
    selectedCards,
    pickedVisualIndices,
    phase,
    startReading,
    pickCard,
    goToRevealed,
    reset,
  } = useTarotReading("question");

  const [aiText, setAiText] = useState<string | null>(null);
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
    <div className="min-h-[calc(100dvh-3.5rem)] flex flex-col overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {/* ───────── IDLE ───────── */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100dvh-3.5rem)] flex flex-col items-center justify-center gap-5 sm:gap-6 px-6 py-6 relative overflow-x-hidden"
          >
            {/* Atmospheric star decorations */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              {[
                { top: "16%", left: "9%", delay: "0.6s", size: "text-xs", color: "text-primary/20" },
                { top: "32%", right: "11%", delay: "1.3s", size: "text-sm", color: "text-accent/20" },
                { bottom: "32%", left: "13%", delay: "0.9s", size: "text-[10px]", color: "text-secondary/20" },
                { bottom: "18%", right: "7%", delay: "2.1s", size: "text-[10px]", color: "text-primary/15" },
                { top: "48%", left: "5%", delay: "1.6s", size: "text-xs", color: "text-accent/15" },
                { top: "40%", right: "5%", delay: "0.4s", size: "text-[9px]", color: "text-secondary/20" },
              ].map((star, i) => (
                <span
                  key={i}
                  className={`absolute ${star.size} ${star.color} animate-star-twinkle`}
                  style={{ top: star.top, left: (star as { left?: string }).left, right: (star as { right?: string }).right, bottom: (star as { bottom?: string }).bottom, animationDelay: star.delay }}
                >
                  ✦
                </span>
              ))}
            </div>

            {/* Mystical Eye / Moon Symbol */}
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-[-24px] rounded-full bg-gradient-to-br from-primary/10 to-accent/15 blur-3xl animate-orb-pulse" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-primary/20 bg-gradient-to-br from-dark/80 to-dark-surface/60 backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)] ring-1 ring-white/5">
                <div className="absolute inset-3 rounded-full border border-white/5" />
                {/* All-seeing eye SVG */}
                <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 sm:w-13 sm:h-13 text-secondary">
                  {/* Eye outline */}
                  <path d="M 4 22 Q 22 7 40 22 Q 22 37 4 22 Z" />
                  {/* Iris */}
                  <circle cx="22" cy="22" r="7" />
                  {/* Pupil */}
                  <circle cx="22" cy="22" r="3" fill="currentColor" />
                  {/* Rays above eye */}
                  <line x1="22" y1="3" x2="22" y2="7" />
                  <line x1="14" y1="5.5" x2="15.8" y2="9" />
                  <line x1="30" y1="5.5" x2="28.2" y2="9" />
                </svg>
              </div>
            </motion.div>

            <div className="text-center space-y-4 max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-secondary/55 text-[10px] tracking-[0.35em] uppercase font-medium mb-3">
                  Tirada de guía
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light italic text-white/95 leading-tight">
                  Lectura con Pregunta
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.4 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.28, duration: 0.7 }}
                className="flex items-center gap-3 justify-center"
              >
                <div className="h-px w-14 bg-gradient-to-r from-transparent to-secondary/40" />
                <span className="text-secondary/45 text-xs">✦</span>
                <div className="h-px w-14 bg-gradient-to-l from-transparent to-secondary/40" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/50 text-sm sm:text-base leading-relaxed"
              >
                Escribe una pregunta abierta (cómo, por qué, qué puedo hacer...) y elige una carta.
                La lectura se centrará solo en esa duda.
              </motion.p>

              {/* Question input */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-1 w-full"
              >
                <label
                  htmlFor="question-spread-question"
                  className="flex items-center gap-2 mb-2"
                >
                  <div className="h-px flex-1 max-w-[50px] bg-gradient-to-r from-transparent to-secondary/30" />
                  <span className="text-[10px] font-medium text-secondary/55 tracking-[0.25em] uppercase">
                    Tu pregunta
                  </span>
                  <div className="h-px flex-1 max-w-[50px] bg-gradient-to-l from-transparent to-secondary/30" />
                </label>
                <div className="relative">
                  <textarea
                    id="question-spread-question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={2}
                    className="mystical-textarea"
                    placeholder="¿Qué debo aprender de esta situación? ¿Qué camino me conviene tomar ahora?…"
                  />
                  <span className="absolute bottom-2.5 right-3 text-white/10 text-xs pointer-events-none select-none">✦</span>
                </div>
                <p className="mt-1.5 text-[11px] text-white/35 text-left">
                  Evita preguntas de solo sí/no. Mientras más clara sea la pregunta, mejor la guía.
                </p>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={startReading}
              disabled={!canStart}
              className={cn(
                "btn-primary text-white px-10 py-4 shadow-2xl shadow-primary/35 font-display text-xl sm:text-2xl font-light italic tracking-wide",
                !canStart && "opacity-50 cursor-not-allowed"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              whileHover={canStart ? { scale: 1.04 } : undefined}
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
            className="min-h-[calc(100dvh-3.5rem)] flex flex-col items-center justify-start overflow-visible px-4 pt-6 sm:pt-8 lg:pt-12 pb-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-xl sm:text-2xl font-light italic text-white/75 mb-6 sm:mb-8 lg:mb-10 flex-shrink-0 text-center tracking-wide"
            >
              Mantén tu pregunta en mente y elige una carta
            </motion.h2>

            <div className="flex-1 min-h-0 flex flex-col items-center w-full overflow-visible">
              <div className="relative w-full flex-1 min-h-[380px] sm:flex-none sm:w-[800px] sm:h-[640px] sm:min-h-0 mt-6 sm:mt-8 lg:mt-12">
                <div className="absolute inset-0 picker-scale-md overflow-visible">
                  <CardPicker pickedIndices={pickedVisualIndices} onPick={pickCard} />
                </div>
              </div>
            </div>

            <motion.p
              className="text-white/25 text-xs mt-1 mb-2 flex-shrink-0 tracking-widest"
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Toca una carta para tu respuesta
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
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 120, damping: 22 }}
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
                      className={cn("object-contain", revealCard.card.reversedDrawn && "rotate-180")}
                      sizes="280px"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 mt-5 text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <p className="font-display text-xl sm:text-2xl font-light italic text-white/90">
                {revealDisplayName}
              </p>
              <p className="text-[10px] text-secondary/50 mt-1 tracking-widest uppercase">{position.nameEs}</p>
            </motion.div>

            <motion.button
              type="button"
              className="relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.9, 0.6, 0.9], y: [6, 0, 0, 0] }}
              transition={{ delay: 1.6, duration: 2.2, repeat: Infinity }}
              onClick={goToRevealed}
            >
              <span className="text-[10px] tracking-wide uppercase">Ver interpretación de tu pregunta</span>
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
              className="min-h-[calc(100dvh-3.5rem)] flex flex-col lg:flex-row overflow-x-hidden"
            >
              {/* LEFT: Card (clickable) */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 p-3 sm:p-4 lg:p-6 xl:p-8 w-full max-w-[256px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-none lg:w-[48%] xl:w-[52%] mx-auto lg:mx-0">
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[10px] sm:text-xs font-semibold text-secondary/65 tracking-[0.25em] uppercase flex-shrink-0"
                >
                  {position.nameEs}
                </motion.span>

                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, type: "spring", stiffness: 150, damping: 20 }}
                  className="flex-1 min-h-0 flex items-center justify-center w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  style={{ perspective: 900 }}
                  onClick={() => setLightboxOpen(true)}
                >
                  <div
                    className="holo-card holo-card-lg w-[min(68vw,176px)] sm:w-[min(88vw,240px)] md:w-[min(88vw,260px)] lg:w-[min(88vw,280px)] max-w-[176px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] aspect-[10/17] shrink-0"
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
                          className={cn("object-contain", card.reversedDrawn && "rotate-180")}
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
                  className="flex-shrink-0 mb-4"
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-light italic text-white/95 leading-tight">
                    Respuesta para tu pregunta
                  </h2>
                  {question && (
                    <p className="mt-1.5 text-xs text-white/45 line-clamp-2 italic">
                      "{question}"
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-secondary/30 to-transparent" />
                    <span className="text-secondary/30 text-[9px]">✦</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="flex-1 min-w-0 space-y-3 pr-1"
                >
                  <AIInterpretation
                    cards={selectedCards}
                    spreadType="question"
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
