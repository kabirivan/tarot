"use client";

import { useCallback, useState } from "react";
import { fullDeck, shuffleArray } from "@/lib/cards/tarotDeck";
import { spreadPositions, spreadSizes } from "@/lib/cards/spreads";
import { useReadingsStore } from "@/lib/store/readingsStore";
import type { ReadingCard, SpreadType, TarotCard } from "@/types/tarot";

export type ReadingPhase = "idle" | "shuffling" | "picking" | "revealed";

export function useTarotReading(spreadType: SpreadType) {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<ReadingCard[]>([]);
  const [phase, setPhase] = useState<ReadingPhase>("idle");
  const addReading = useReadingsStore((s) => s.addReading);

  const totalNeeded = spreadSizes[spreadType];
  const positions = spreadPositions[spreadType];
  const pickedCount = selectedCards.length;
  const isComplete = pickedCount >= totalNeeded;

  const startReading = useCallback(() => {
    setPhase("shuffling");
    setSelectedCards([]);
    const shuffled = shuffleArray([...fullDeck]);
    setTimeout(() => {
      setShuffledDeck(shuffled);
      setPhase("picking");
    }, 1200);
  }, []);

  const pickCard = useCallback(
    (deckIndex: number) => {
      if (phase !== "picking" || isComplete) return;
      const card = shuffledDeck[deckIndex];
      if (!card) return;
      if (selectedCards.some((rc) => rc.card.id === card.id)) return;

      const posIndex = selectedCards.length;
      const reversed = Math.random() > 0.5;
      const reading: ReadingCard = {
        card: { ...card, reversedDrawn: reversed },
        position: positions[posIndex]?.id ?? String(posIndex),
        positionMeaning: positions[posIndex]?.description,
      };

      const newCards = [...selectedCards, reading];
      setSelectedCards(newCards);

      if (newCards.length >= totalNeeded) {
        setTimeout(() => setPhase("revealed"), 600);
      }
    },
    [phase, isComplete, shuffledDeck, selectedCards, positions, totalNeeded]
  );

  const saveReading = useCallback(
    (question?: string) => {
      if (selectedCards.length === 0) return;
      addReading({
        spreadType,
        cards: selectedCards,
        question,
        createdAt: new Date().toISOString(),
      });
    },
    [selectedCards, spreadType, addReading]
  );

  const reset = useCallback(() => {
    setShuffledDeck([]);
    setSelectedCards([]);
    setPhase("idle");
  }, []);

  return {
    shuffledDeck,
    selectedCards,
    phase,
    totalNeeded,
    pickedCount,
    isComplete,
    startReading,
    pickCard,
    saveReading,
    reset,
  };
}
