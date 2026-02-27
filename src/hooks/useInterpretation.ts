"use client";

import { useCallback, useState } from "react";
import type { ReadingCard, SpreadType } from "@/types/tarot";

const FETCH_TIMEOUT_MS = 60000;

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

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
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const contentType = res.headers.get("content-type");
        const isJson = contentType?.includes("application/json");
        const data = isJson ? await res.json() : { error: "Respuesta inválida del servidor." };

        if (!res.ok) {
          setError(typeof data?.error === "string" ? data.error : "Error al interpretar.");
          return;
        }

        const text = data?.interpretation;
        setInterpretation(typeof text === "string" && text.trim() ? text : "No se pudo generar la interpretación.");
      } catch (err) {
        clearTimeout(timeoutId);
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            setError("La petición tardó demasiado. Reintenta.");
          } else {
            setError("No se pudo conectar con el servidor.");
          }
        } else {
          setError("No se pudo conectar con el servidor.");
        }
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
