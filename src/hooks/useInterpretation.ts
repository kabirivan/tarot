"use client";

import { useCallback, useState } from "react";
import type { ReadingCard, SpreadType } from "@/types/tarot";

export function useInterpretation() {
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interpret = useCallback(
    async (
      cards: ReadingCard[],
      spreadType: SpreadType,
      question?: string
    ) => {
      setLoading(true);
      setError(null);
      setInterpretation(null);

      try {
        const payload = {
          spreadType,
          question,
          cards: cards.map((rc) => ({
            name: rc.card.name,
            nameEs: rc.card.nameEs ?? rc.card.name,
            position: rc.positionMeaning ?? rc.position,
            upright: rc.card.upright,
            reversed: rc.card.reversed,
            isReversed: rc.card.reversedDrawn ?? false,
          })),
        };

        const res = await fetch("/api/interpret", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Error al interpretar.");
          return;
        }

        setInterpretation(data.interpretation);
      } catch {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setInterpretation(null);
    setError(null);
  }, []);

  return { interpretation, loading, error, interpret, reset };
}
