"use client";

import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils/cn";

const positions = spreadPositions["three-card"];

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const mq = globalThis.window.matchMedia("(max-width: 1023px)");
    const set = () => setIsSmall(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return isSmall;
}

export function ThreeCardSpread() {
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
  } = useTarotReading("three-card");

  const [aiText, setAiText] = useState<string | null>(null);
  const [lightboxCardIndex, setLightboxCardIndex] = useState<number | null>(null);
  const isSmallScreen = useIsSmallScreen();
  const pickingScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "picking") return;
    pickingScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [phase]);

  useEffect(() => {
    if (phase !== "revealing" || selectedCards.length < 3) return;
    const t = setTimeout(() => goToRevealed(), 4500);
    return () => clearTimeout(t);
  }, [phase, selectedCards.length, goToRevealed]);

  return (
    <div className="h-[calc(100dvh-3.5rem)] flex flex-col overflow-y-auto overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {/* ───────── IDLE ───────── */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center gap-7 px-6 py-6 relative overflow-y-auto overflow-x-hidden"
          >
            {/* Atmospheric star decorations */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              {[
                { top: "20%", left: "8%", delay: "0.4s", size: "text-xs", color: "text-secondary/20" },
                { top: "25%", right: "11%", delay: "1.2s", size: "text-sm", color: "text-primary/25" },
                { bottom: "25%", left: "15%", delay: "0.6s", size: "text-[10px]", color: "text-accent/20" },
                { bottom: "20%", right: "10%", delay: "1.9s", size: "text-[10px]", color: "text-secondary/15" },
                { top: "52%", left: "5%", delay: "2.4s", size: "text-xs", color: "text-primary/15" },
                { top: "44%", right: "5%", delay: "1.0s", size: "text-[9px]", color: "text-accent/20" },
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

            {/* Triple Moon Symbol */}
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-[-24px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/15 blur-3xl animate-orb-pulse" />
              <div className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-full border border-primary/20 bg-gradient-to-br from-dark/80 to-dark-surface/60 backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)] ring-1 ring-white/5">
                <div className="absolute inset-3 rounded-full border border-white/5" />
                {/* Triple moon SVG */}
                <svg viewBox="0 0 64 28" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-7 sm:w-18 sm:h-8 text-secondary">
                  {/* Full center moon */}
                  <circle cx="32" cy="14" r="10" />
                  {/* Center dot */}
                  <circle cx="32" cy="14" r="2.5" fill="currentColor" />
                  {/* Left crescent (waxing) */}
                  <path d="M 10 8 A 6 6 0 1 0 10 20 A 4 4 0 1 1 10 8 Z" />
                  {/* Right crescent (waning) - mirror */}
                  <path d="M 54 8 A 4 4 0 1 0 54 20 A 6 6 0 1 1 54 8 Z" />
                  {/* Connecting lines */}
                  <line x1="16" y1="14" x2="22" y2="14" />
                  <line x1="42" y1="14" x2="48" y2="14" />
                </svg>
              </div>
            </motion.div>

            <div className="text-center space-y-4 max-w-sm">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-secondary/55 text-[10px] tracking-[0.35em] uppercase font-medium mb-3">
                  Tirada de tres cartas
                </p>
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light italic text-white/95 leading-tight">
                  Pasado · Presente · Futuro
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
                transition={{ delay: 0.32 }}
                className="text-white/50 text-sm sm:text-base leading-relaxed"
              >
                Concéntrate en tu pregunta y elige tres cartas. Cada una revelará una etapa de tu camino.
              </motion.p>
            </div>

            <motion.button
              type="button"
              onClick={startReading}
              className="btn-primary text-white px-10 py-4 shadow-2xl shadow-primary/35 font-display text-xl sm:text-2xl font-light italic tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
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
            ref={pickingScrollRef}
            key="picking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-y-auto overflow-x-hidden lg:overflow-visible pt-6 sm:pt-8 lg:pt-12"
          >
            {/* En móvil primero la selección (order-1); en lg a la derecha (order-2) */}
            <div className="lg:w-[30%] flex-shrink-0 flex flex-col items-center justify-center min-h-0 p-4 lg:border-l lg:border-white/5 order-1 lg:order-2">
              <p className="text-[10px] sm:text-xs font-semibold text-secondary/50 uppercase tracking-wider mb-2 lg:mb-3">
                Tu selección
              </p>
              <div className="flex flex-row gap-2 sm:gap-3 items-center justify-center flex-wrap">
                {positions.map((pos, i) => {
                  const card = selectedCards[i];
                  return card ? (
                    <motion.div
                      key={card.card.id}
                      initial={{ opacity: 0, scale: 0.7, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    >
                      <RevealedCard
                        reading={card}
                        index={i}
                        positionLabel={pos.nameEs}
                        size="lg"
                        hideMeaning
                      />
                    </motion.div>
                  ) : (
                    <div
                      key={pos.nameEs}
                      className="flex flex-col items-center gap-1 text-white/15"
                    >
                      <div className="w-[26vw] min-w-[80px] max-w-[100px] aspect-[2/3] sm:w-40 sm:min-w-0 sm:max-w-none sm:h-[272px] lg:w-52 lg:h-[357px] rounded-xl border border-dashed border-secondary/15 flex items-center justify-center flex-shrink-0">
                        <motion.span
                          className="text-2xl text-secondary/30"
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        >
                          ✦
                        </motion.span>
                      </div>
                      <span className="text-xs text-secondary/40">{pos.nameEs}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selector de cartas */}
            <div className="lg:w-[70%] flex-shrink-0 flex flex-col items-center justify-start min-h-0 p-4 order-2 lg:order-1">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-xl sm:text-2xl font-light italic text-white/75 mb-6 sm:mb-8 lg:mb-10 flex-shrink-0 tracking-wide"
              >
                {positions[pickedCount]?.nameEs ?? "..."}{" "}
                <span className="text-white/35 font-normal not-italic text-base">— Carta {pickedCount + 1}/3</span>
              </motion.h2>

              <div className="flex-1 min-h-[320px] flex flex-col items-center w-full overflow-visible">
                <div className="relative w-full flex-1 min-h-[320px] sm:min-h-[380px] sm:flex-none sm:w-[800px] sm:h-[640px] sm:min-h-0 mt-4 sm:mt-6 lg:mt-12">
                  <div className="absolute inset-0 picker-scale-md overflow-visible">
                    <CardPicker
                      pickedIndices={pickedVisualIndices}
                      onPick={pickCard}
                    />
                  </div>
                </div>
              </div>

              <motion.p
                className="text-white/25 text-xs mt-1 mb-2 flex-shrink-0 tracking-widest"
                animate={{ opacity: [0.25, 0.6, 0.25] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {pickedCount}/{totalNeeded} cartas seleccionadas
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* ───────── REVEALING — Modal con las 3 cartas ───────── */}
        {phase === "revealing" && selectedCards.length === 3 && (
          <motion.div
            key="revealing"
            className="fixed inset-0 z-50 flex flex-col min-h-0"
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

            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col items-center py-8 sm:py-10 px-4">
              <div className="flex flex-col items-center mt-auto mb-auto">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center flex-wrap w-full max-w-4xl" style={{ perspective: 1200 }}>
                  {selectedCards.map((rc, i) => {
                    const name = rc.card.nameEs ?? rc.card.name;
                    const pos = positions[i];
                    return (
                      <motion.div
                        key={rc.card.id}
                        className="flex flex-col items-center flex-shrink-0"
                        initial={{ scale: 0.88, rotateY: 20, opacity: 0 }}
                        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 22, delay: 0.2 + i * 0.12 }}
                      >
                        <div
                          className="holo-card holo-card-lg w-[min(72vw,220px)] aspect-[10/17] sm:w-[min(28vw,180px)] lg:w-[min(280px,20vw)]"
                          style={{ ["--frame" as string]: "12px" }}
                        >
                          <div className="holo-sparkle" />
                          <div className="holo-border" />
                          <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-1.5">
                            <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
                              <Image
                                src={rc.card.image}
                                alt={name}
                                fill
                                className={cn("object-contain", rc.card.reversedDrawn && "rotate-180")}
                                sizes="280px"
                                unoptimized
                                priority
                              />
                            </div>
                          </div>
                        </div>
                        <motion.span
                          className="text-xs font-semibold text-secondary/60 mt-2 tracking-wide uppercase"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                        >
                          {pos?.nameEs ?? ""}
                        </motion.span>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.button
                  type="button"
                  className="relative z-10 mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: [0, 0.9, 0.6, 0.9], y: [6, 0, 0, 0] }}
                  transition={{ delay: 2.2, duration: 2.2, repeat: Infinity }}
                  onClick={goToRevealed}
                >
                  <span className="text-[10px] tracking-wide uppercase">Ver interpretación completa</span>
                  <span className="text-sm">✦</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ───────── REVEALED ───────── */}
        {phase === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden"
          >
            {/* Interpretación: en móvil debajo (order-2); en lg a la derecha (order-2) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className={cn(
                "flex-1 flex flex-col min-h-0 min-w-0 p-3 sm:p-4 lg:p-8 lg:border-l lg:border-white/5",
                "order-2 lg:order-2"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-shrink-0 mb-4"
              >
                <h2 className="font-display text-2xl sm:text-3xl font-light italic text-white/95 leading-tight">
                  Pasado · Presente · Futuro
                </h2>
                <p className="text-xs text-white/35 mt-1">Las tres cartas revelan tu camino</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-secondary/30 to-transparent" />
                  <span className="text-secondary/30 text-[9px]">✦</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1"
              >
                <AIInterpretation
                  cards={selectedCards}
                  spreadType="three-card"
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

            {/* Cartas: en móvil arriba (order-1); en lg a la izquierda (order-1) */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 sm:p-4 lg:p-8",
                "order-1 lg:order-1",
                "w-full min-w-0 lg:w-[55%] lg:min-w-0",
                "mx-auto lg:mx-0",
                "overflow-x-auto overflow-y-visible"
              )}
            >
              <div className="flex flex-row gap-3 sm:gap-6 justify-center items-center flex-shrink-0 pb-2">
                {selectedCards.map((rc, i) => (
                  <button
                    key={rc.card.id}
                    type="button"
                    className="flex flex-col items-center cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg flex-shrink-0 w-[22vw] min-w-[80px] max-w-[112px] sm:min-w-0 sm:max-w-[160px] sm:w-auto lg:max-w-none"
                    onClick={() => setLightboxCardIndex(i)}
                  >
                    <RevealedCard
                      reading={rc}
                      index={i}
                      positionLabel={positions[i].nameEs}
                      size={isSmallScreen ? "md" : "xl"}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
