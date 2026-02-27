"use client";

import { useCallback, useState } from "react";
import { fullDeck, shuffleArray } from "@/lib/cards/tarotDeck";
import { spreadPositions, spreadSizes } from "@/lib/cards/spreads";
import { useReadingsStore } from "@/lib/store/readingsStore";
import type { ReadingCard, SpreadType, TarotCard } from "@/types/tarot";

export type ReadingPhase = "idle" | "shuffling" | "picking" | "revealing" | "revealed";

export function useTarotReading(spreadType: SpreadType) {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<ReadingCard[]>([]);
  const [pickedVisualIndices, setPickedVisualIndices] = useState<number[]>([]);
  const [phase, setPhase] = useState<ReadingPhase>("idle");
  const addReading = useReadingsStore((s) => s.addReading);

  const totalNeeded = spreadSizes[spreadType];
  const positions = spreadPositions[spreadType];
  const pickedCount = selectedCards.length;
  const isComplete = pickedCount >= totalNeeded;

  const startReading = useCallback(() => {
    setPhase("shuffling");
    setSelectedCards([]);
    setPickedVisualIndices([]);
    const shuffled = shuffleArray([...fullDeck]);
    setTimeout(() => {
      setShuffledDeck(shuffled);
      setPhase("picking");
    }, 1400);
  }, []);

  const pickCard = useCallback(
    (visualIndex: number) => {
      if (phase !== "picking" || isComplete) return;
      if (pickedVisualIndices.includes(visualIndex)) return;

      const card = shuffledDeck[visualIndex];
      if (!card) return;

      const posIndex = selectedCards.length;
      const reversed = Math.random() > 0.5;
      const reading: ReadingCard = {
        card: { ...card, reversedDrawn: reversed },
        position: positions[posIndex]?.id ?? String(posIndex),
        positionMeaning: positions[posIndex]?.description,
      };

      const newCards = [...selectedCards, reading];
      const newIndices = [...pickedVisualIndices, visualIndex];
      setSelectedCards(newCards);
      setPickedVisualIndices(newIndices);

      if (newCards.length >= totalNeeded) {
        // Transición inmediata a revealing para que el modal se muestre en el mismo ciclo
        setPhase("revealing");
      }
    },
    [phase, isComplete, shuffledDeck, selectedCards, pickedVisualIndices, positions, totalNeeded]
  );

  const goToRevealed = useCallback(() => {
    setPhase("revealed");
  }, []);

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
    setPickedVisualIndices([]);
    setPhase("idle");
  }, []);

  return {
    shuffledDeck,
    selectedCards,
    pickedVisualIndices,
    phase,
    totalNeeded,
    pickedCount,
    isComplete,
    startReading,
    pickCard,
    goToRevealed,
    saveReading,
    reset,
  };
}
