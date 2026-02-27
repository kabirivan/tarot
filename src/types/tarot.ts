export type Suit = "wands" | "cups" | "swords" | "pentacles";

export interface TarotCard {
  id: number;
  name: string;
  nameEs?: string;
  image: string;
  keywords: string[];
  upright: string;
  reversed: string;
  suit?: Suit;
  arcana: "major" | "minor";
  reversedDrawn?: boolean;
}

export type SpreadType =
  | "daily"
  | "three-card"
  | "celtic-cross"
  | "question"
  | "lunar";

export interface ReadingCard {
  card: TarotCard;
  position: string;
  positionMeaning?: string;
}

export interface Reading {
  id?: string;
  userId?: string;
  spreadType: SpreadType;
  cards: ReadingCard[];
  interpretation?: string;
  question?: string;
  createdAt?: string;
}
