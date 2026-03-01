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
    <div className="h-[calc(100dvh-52px)] flex flex-col overflow-hidden relative">
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
                <span className="text-5xl sm:text-6xl drop-shadow-2xl">
                  🌅
                </span>
              </div>
            </motion.div>

            <div className="text-center space-y-2 max-w-md">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/95"
              >
                Carta del Día
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-white/60 text-sm sm:text-base leading-relaxed"
              >
                {position.description}
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
            className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden px-4"
          >
            <motion.h2
              key="pick-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg font-medium text-white/80 mb-3 flex-shrink-0"
            >
              Elige tu carta del día
            </motion.h2>

            <div className="flex-1 min-h-0 flex items-center justify-center w-full">
              <div
                className="relative"
                style={{ width: 800, height: 640 }}
              >
                <div
                  className="absolute inset-0 origin-center"
                  style={{ transform: "scale(var(--picker-scale, 0.78))" }}
                >
                  <CardPicker
                    pickedIndices={pickedVisualIndices}
                    onPick={pickCard}
                  />
                </div>
              </div>
            </div>

            <motion.p
              className="text-white/25 text-xs mt-1 mb-2 flex-shrink-0"
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
                  <motion.p
                    className="text-xs sm:text-sm text-center text-white/90 mt-1.5 font-semibold truncate w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    {revealDisplayName}
                  </motion.p>
                  {revealCard.card.reversedDrawn && (
                    <motion.span
                      className="text-[10px] text-accent font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      Invertida
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Card name and sparkle text */}
            <motion.div
              className="relative z-10 mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <p className="text-lg sm:text-xl font-bold text-white/90">
                {revealDisplayName}
              </p>
              <p className="text-sm text-white/40 mt-1">{position.nameEs}</p>
            </motion.div>

            {/* "Continue" hint */}
            <motion.button
              type="button"
              className="relative z-10 mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-medium bg-white/10 text-white hover:bg-white/20 border border-white/25 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: [0, 0.9, 0.6, 0.9],
                y: [6, 0, 0, 0],
              }}
              transition={{ delay: 2.6, duration: 2.2, repeat: Infinity }}
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
                <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1 p-3 sm:p-4 lg:p-8 lg:w-[55%]">
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[10px] sm:text-xs font-semibold text-secondary tracking-widest uppercase flex-shrink-0"
                  >
                    {position.nameEs}
                  </motion.span>

                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                      damping: 18,
                    }}
                    className="flex-1 min-h-0 flex items-center justify-center w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                    style={{ perspective: 900 }}
                    onClick={() => setLightboxOpen(true)}
                  >
                    <div
                      ref={cardRef}
                      aria-hidden="true"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="holo-card holo-card-lg w-[min(88vw,320px)] min-h-[50vh] max-h-[72vh] aspect-[10/17] sm:w-full sm:min-h-0 sm:max-h-[75vh] lg:max-h-[92%]"
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
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                const fb = document.createElement("div");
                                fb.className =
                                  "absolute inset-0 flex items-center justify-center text-center text-sm font-medium text-primary px-2";
                                fb.textContent = displayName;
                                parent.appendChild(fb);
                              }
                            }}
                          />
                        </div>
                        <p className="text-[10px] sm:text-xs text-center text-white/90 mt-1 font-medium truncate w-full">
                          {displayName}
                        </p>
                        {card.reversedDrawn && (
                          <span className="text-[9px] sm:text-[10px] text-accent font-medium">
                            Invertida
                          </span>
                        )}
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
                    className="flex-shrink-0 mb-3"
                  >
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white/95 leading-tight">
                      {displayName}
                    </h2>
                    {card.reversedDrawn && (
                      <span className="text-accent text-xs sm:text-sm font-medium">
                        Invertida
                      </span>
                    )}
                    {card.keywords && (
                      <p className="text-xs text-white/40 mt-1">
                        {card.keywords.join(" · ")}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                    className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1"
                  >
                    <div className="text-sm sm:text-base text-white/70 leading-relaxed p-4 sm:p-5 card-surface rounded-xl">
                      {meaning}
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
