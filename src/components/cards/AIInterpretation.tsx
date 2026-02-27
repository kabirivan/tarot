"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInterpretation } from "@/hooks/useInterpretation";
import type { ReadingCard, SpreadType } from "@/types/tarot";

interface AIInterpretationProps {
  readonly cards: ReadingCard[];
  readonly spreadType: SpreadType;
  readonly question?: string;
  readonly autoStart?: boolean;
  readonly onInterpretationChange?: (text: string | null) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function AIInterpretation({
  cards,
  spreadType,
  question,
  autoStart = true,
  onInterpretationChange,
}: AIInterpretationProps) {
  const { interpretation, loading, error, interpret } = useInterpretation();

  useEffect(() => {
    if (onInterpretationChange) {
      onInterpretationChange(interpretation);
    }
  }, [interpretation, onInterpretationChange]);

  useEffect(() => {
    if (!autoStart) return;
    if (cards.length === 0) return;
    if (loading || interpretation || error) return;
    interpret(cards, spreadType, question);
  }, [autoStart, cards, spreadType, question, interpret, loading, interpretation, error]);

  const showLoading = loading;

  const handleRetry = () => {
    interpret(cards, spreadType, question);
  };

  const paragraphs = interpretation
    ? interpretation
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];
  const hasParagraphs = paragraphs.length > 0;

  return (
    <AnimatePresence mode="wait">
      {showLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="w-full card-surface p-5 sm:p-6 rounded-xl overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <motion.div
              className="relative w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <div className="h-2 w-40 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-sm text-white/50 flex items-center gap-1">
              Conectando con la energía
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ...
              </motion.span>
            </p>
          </div>
        </motion.div>
      )}

      {error && !loading && (
        <motion.div
          key="error"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full card-surface p-5 sm:p-6 rounded-xl space-y-3"
        >
          <p className="text-sm text-accent/90">{error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition"
          >
            Reintentar
          </button>
        </motion.div>
      )}

      {interpretation && !loading && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full card-surface p-5 sm:p-6 rounded-xl space-y-3"
        >
          <motion.h3
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-primary flex items-center gap-2"
          >
            <span>✨</span> Interpretado por XAVI
          </motion.h3>
          <motion.div
            className="text-sm sm:text-base text-white/85 leading-relaxed whitespace-pre-line space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {hasParagraphs
              ? paragraphs.map((paragraph) => (
                  <motion.p
                    key={paragraph.slice(0, 80)}
                    variants={item}
                    className="text-white/85"
                  >
                    {paragraph}
                  </motion.p>
                ))
              : (
                  <motion.p variants={item} className="text-white/85">
                    {interpretation}
                  </motion.p>
                )}
          </motion.div>
        </motion.div>
      )}

      {!interpretation && !showLoading && !error && (
        <motion.div
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <button
            type="button"
            onClick={handleRetry}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          >
            ✨ Interpretar de nuevo
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
