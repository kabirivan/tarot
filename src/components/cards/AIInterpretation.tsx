"use client";

import { useInterpretation } from "@/hooks/useInterpretation";
import type { ReadingCard, SpreadType } from "@/types/tarot";

interface AIInterpretationProps {
  cards: ReadingCard[];
  spreadType: SpreadType;
  question?: string;
}

export function AIInterpretation({
  cards,
  spreadType,
  question,
}: AIInterpretationProps) {
  const { interpretation, loading, error, interpret } = useInterpretation();

  const handleClick = () => {
    interpret(cards, spreadType, question);
  };

  if (interpretation) {
    return (
      <div className="w-full max-w-2xl mx-auto card-surface p-6 rounded-2xl space-y-3 animate-fade-in">
        <h3 className="font-semibold text-primary flex items-center gap-2">
          <span>✨</span> Interpretación con IA
        </h3>
        <div className="text-sm text-white/85 leading-relaxed whitespace-pre-line">
          {interpretation}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Interpretando...
          </span>
        ) : (
          "✨ Interpretar con IA"
        )}
      </button>
      {error && (
        <p className="text-sm text-accent/90">{error}</p>
      )}
    </div>
  );
}
