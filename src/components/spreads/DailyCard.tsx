"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTarotReading } from "@/hooks/useTarotReading";
import { getMeaning } from "@/lib/cards/meanings";
import { spreadPositions } from "@/lib/cards/spreads";
import { CardPicker } from "@/components/cards/CardPicker";
import { ShuffleAnimation } from "@/components/cards/ShuffleAnimation";
import { AIInterpretation } from "@/components/cards/AIInterpretation";
import { CardLightbox } from "@/components/cards/CardLightbox";
import { cn } from "@/lib/utils/cn";
import { generateReadingPdf } from "@/lib/pdf/generateReadingPdf";

export function DailyCardSpread() {
  const {
    selectedCards,
    pickedVisualIndices,
    phase,
    startReading,
    pickCard,
    goToRevealed,
    reset,
  } = useTarotReading("daily");

  const position = spreadPositions.daily[0];

  const [aiText, setAiText] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [revealStep, setRevealStep] = useState<"flip" | "glow" | "done">("flip");

  useEffect(() => {
    if (phase !== "revealing") {
      setRevealStep("flip");
      return;
    }
    const t1 = setTimeout(() => setRevealStep("glow"), 1200);
    const t2 = setTimeout(() => setRevealStep("done"), 2800);
    const t3 = setTimeout(() => goToRevealed(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase, goToRevealed]);

  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--rx", `${((my - 0.5) * -14).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((mx - 0.5) * 14).toFixed(2)}deg`);
    },
    []
  );
  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const revealCard = selectedCards[0];
  const revealDisplayName = revealCard
    ? (revealCard.card.nameEs ?? revealCard.card.name)
    : "";

  return (
    <div className="h-[calc(100dvh-3.5rem)] flex flex-col overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* ───────── IDLE ───────── */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center gap-7 px-6 relative overflow-hidden"
          >
            {/* Atmospheric star decorations */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              {[
                { top: "18%", left: "10%", delay: "0.3s", size: "text-xs", color: "text-secondary/20" },
                { top: "28%", right: "12%", delay: "1.1s", size: "text-sm", color: "text-primary/25" },
                { bottom: "28%", left: "14%", delay: "0.7s", size: "text-[10px]", color: "text-accent/20" },
                { bottom: "22%", right: "9%", delay: "1.8s", size: "text-[10px]", color: "text-secondary/15" },
                { top: "55%", left: "6%", delay: "2.3s", size: "text-xs", color: "text-primary/15" },
                { top: "45%", right: "6%", delay: "0.9s", size: "text-[9px]", color: "text-accent/20" },
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

            {/* Mystical Sun Symbol */}
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-[-24px] rounded-full bg-gradient-to-br from-secondary/10 to-primary/15 blur-3xl animate-orb-pulse" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-secondary/20 bg-gradient-to-br from-dark/80 to-dark-surface/60 backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.2)] ring-1 ring-white/5">
                <div className="absolute inset-3 rounded-full border border-white/5" />
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="w-12 h-12 sm:w-14 sm:h-14 text-secondary">
                  <line x1="20" y1="2" x2="20" y2="8" />
                  <line x1="31.1" y1="8.9" x2="26.9" y2="13.1" />
                  <line x1="38" y1="20" x2="32" y2="20" />
                  <line x1="31.1" y1="31.1" x2="26.9" y2="26.9" />
                  <line x1="20" y1="38" x2="20" y2="32" />
                  <line x1="8.9" y1="31.1" x2="13.1" y2="26.9" />
                  <line x1="2" y1="20" x2="8" y2="20" />
                  <line x1="8.9" y1="8.9" x2="13.1" y2="13.1" />
                  <circle cx="20" cy="20" r="8" />
                  <circle cx="20" cy="20" r="2.5" fill="currentColor" />
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
                  Tirada diaria
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light italic text-white/95 leading-tight">
                  Carta del Día
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
                {position.description}
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

        {/* ───────── PICKING — full width picker ───────── */}
        {phase === "picking" && (
          <motion.div
            key="picking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex-1 flex flex-col items-center justify-start min-h-0 overflow-visible px-4 pt-6 sm:pt-8 lg:pt-12 pb-4"
          >
            <motion.h2
              key="pick-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-xl sm:text-2xl font-light italic text-white/75 mb-6 sm:mb-8 lg:mb-10 flex-shrink-0 tracking-wide"
            >
              Elige tu carta del día
            </motion.h2>

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
              className="text-white/25 text-xs mt-1 mb-2 flex-shrink-0 tracking-widest"
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Toca una carta para revelarla
            </motion.p>
          </motion.div>
        )}

        {/* ───────── REVEALING — Modal surprise ───────── */}
        {phase === "revealing" && revealCard && (
          <motion.div
            key="revealing"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            {/* Dark overlay */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Particle glow behind card */}
            <motion.div
              className="absolute rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 blur-3xl"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={
                revealStep === "flip"
                  ? { width: 200, height: 200, opacity: 0.4 }
                  : { width: 500, height: 500, opacity: 0.6 }
              }
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Card container */}
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

            {/* Card name */}
            <motion.div
              className="relative z-10 mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <p className="font-display text-xl sm:text-2xl font-light italic text-white/90">
                {revealDisplayName}
              </p>
              <p className="text-[10px] text-secondary/50 mt-1 tracking-widest uppercase">{position.nameEs}</p>
            </motion.div>

            {/* "Continue" hint */}
            <motion.button
              type="button"
              className="relative z-10 mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.9, 0.6, 0.9], y: [6, 0, 0, 0] }}
              transition={{ delay: 2.6, duration: 2.2, repeat: Infinity }}
              onClick={goToRevealed}
            >
              <span className="text-[10px] tracking-wide uppercase">Ver interpretación completa</span>
              <span className="text-sm">✦</span>
            </motion.button>
          </motion.div>
        )}

        {/* ───────── REVEALED ───────── */}
        {phase === "revealed" &&
          selectedCards.length > 0 &&
          (() => {
            const rc = selectedCards[0];
            const card = rc.card;
            const displayName = card.nameEs ?? card.name;
            const meaning = getMeaning(rc.card);

            return (
              <motion.div
                key="revealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden"
              >
                {/* ── LEFT: Card (clickable → lightbox) ── */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1 p-3 sm:p-4 lg:p-6 xl:p-8 w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-none lg:w-[48%] xl:w-[52%] mx-auto lg:mx-0">
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[10px] sm:text-xs font-semibold text-secondary/65 tracking-[0.25em] uppercase flex-shrink-0"
                  >
                    {position.nameEs}
                  </motion.span>

                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 18 }}
                    className="flex-1 min-h-0 flex items-center justify-center w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                    style={{ perspective: 900 }}
                    onClick={() => setLightboxOpen(true)}
                  >
                    <div
                      ref={cardRef}
                      aria-hidden="true"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
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
                            className={cn("object-contain", card.reversedDrawn && "rotate-180")}
                            sizes="(max-width: 1024px) 45vw, 30vw"
                            unoptimized
                            priority
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                const fb = document.createElement("div");
                                fb.className = "absolute inset-0 flex items-center justify-center text-center text-sm font-medium text-primary px-2";
                                fb.textContent = displayName;
                                parent.appendChild(fb);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {lightboxOpen && selectedCards[0] && (
                    <CardLightbox
                      reading={selectedCards[0]}
                      positionLabel={position.nameEs}
                      onClose={() => setLightboxOpen(false)}
                    />
                  )}
                </AnimatePresence>

                {/* ── RIGHT: Interpretation ── */}
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
                      {displayName}
                    </h2>
                    {card.reversedDrawn && (
                      <span className="text-accent text-xs sm:text-sm font-medium">Invertida</span>
                    )}
                    {card.keywords && (
                      <p className="text-xs text-secondary/45 mt-1.5 tracking-wide">
                        {card.keywords.join(" · ")}
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
                    className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1"
                  >
                    <div className="relative text-sm sm:text-base text-white/65 leading-relaxed p-4 sm:p-5 rounded-xl bg-dark/50 border border-white/8">
                      <div className="absolute left-0 top-4 bottom-4 w-px rounded-full bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />
                      <div className="pl-3">{meaning}</div>
                    </div>
                    <AIInterpretation
                      cards={selectedCards}
                      spreadType="daily"
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
                          spreadType: "daily",
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
                      Otra carta
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
