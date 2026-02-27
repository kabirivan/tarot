import type { TarotCard } from "@/types/tarot";

export function getMeaning(card: TarotCard): string {
  return card.reversedDrawn ? card.reversed : card.upright;
}

export function getKeywords(card: TarotCard): string {
  return card.keywords?.join(", ") || "";
}
