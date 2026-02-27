"use client";

import Link from "next/link";
import { useTarotReading } from "@/hooks/useTarotReading";
import { HolographicCard, HolographicCardMeaning } from "@/components/cards/HolographicCard";
import { getMeaning } from "@/lib/cards/meanings";
import { spreadPositions } from "@/lib/cards/spreads";
import { AIInterpretation } from "@/components/cards/AIInterpretation";

export function DailyCardSpread() {
  const { selectedCards, isRevealed, drawCards, saveReading, reset } =
    useTarotReading("daily");
  const position = spreadPositions.daily[0];

  const handleDraw = () => {
    drawCards(1);
  };

  const handleSave = () => {
    if (selectedCards.length > 0) {
      saveReading();
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-white/80 text-center max-w-md mx-auto">
        {position.description}
      </p>
      {!isRevealed || selectedCards.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleDraw}
            className="btn-primary text-white shadow-lg"
          >
            Revelar carta del día
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <HolographicCard card={selectedCards[0].card} size="lg" />
          <div className="w-full max-w-md">
            <h3 className="text-secondary font-medium text-sm mb-1">
              {position.nameEs}
            </h3>
            <HolographicCardMeaning
              meaning={getMeaning(selectedCards[0].card)}
            />
          </div>
          <AIInterpretation cards={selectedCards} spreadType="daily" />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-success/20 text-success border border-success/40 hover:bg-success/30 transition"
            >
              Guardar lectura
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg card-surface hover:bg-white/10 transition"
            >
              Otra carta
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg card-surface hover:bg-white/10 transition"
            >
              Volver
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
