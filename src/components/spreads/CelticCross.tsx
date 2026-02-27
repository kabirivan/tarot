"use client";

import Link from "next/link";
import { useTarotReading } from "@/hooks/useTarotReading";
import { HolographicCard, HolographicCardMeaning } from "@/components/cards/HolographicCard";
import { getMeaning } from "@/lib/cards/meanings";
import { spreadPositions } from "@/lib/cards/spreads";
import { AIInterpretation } from "@/components/cards/AIInterpretation";

const positions = spreadPositions["celtic-cross"];

export function CelticCrossSpread() {
  const { selectedCards, isRevealed, drawCards, saveReading, reset } =
    useTarotReading("celtic-cross");

  const handleDraw = () => {
    drawCards(10);
  };

  if (!isRevealed || selectedCards.length === 0) {
    return (
      <div className="space-y-6">
        <p className="text-white/80 text-center max-w-lg mx-auto">
          La Cruz Celta es una lectura profunda de 10 cartas. Tómate un momento para formular tu pregunta.
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleDraw}
            className="btn-primary text-white shadow-lg"
          >
            Realizar Cruz Celta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {selectedCards.map((rc, i) => (
          <div
            key={i}
            className="card-surface p-4 rounded-xl flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-secondary text-center">
              {positions[i].nameEs}
            </span>
            <HolographicCard card={rc.card} size="sm" />
            <p className="text-xs text-white/70 text-center line-clamp-3">
              {getMeaning(rc.card)}
            </p>
          </div>
        ))}
      </div>
      <AIInterpretation cards={selectedCards} spreadType="celtic-cross" />
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => saveReading()}
          className="px-4 py-2 rounded-lg bg-success/20 text-success border border-success/40 hover:bg-success/30 transition"
        >
          Guardar lectura
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg card-surface hover:bg-white/10 transition"
        >
          Nueva lectura
        </button>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg card-surface hover:bg-white/10 transition"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
