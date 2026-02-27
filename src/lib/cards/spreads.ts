import type { SpreadType } from "@/types/tarot";

export interface SpreadPosition {
  id: string;
  name: string;
  nameEs: string;
  description: string;
}

export const spreadPositions: Record<SpreadType, SpreadPosition[]> = {
  daily: [
    { id: "card", name: "Card of the Day", nameEs: "Carta del Día", description: "Tu energía y enfoque para hoy." },
  ],
  "three-card": [
    { id: "past", name: "Past", nameEs: "Pasado", description: "Lo que ha influido en la situación." },
    { id: "present", name: "Present", nameEs: "Presente", description: "Energía y circunstancias actuales." },
    { id: "future", name: "Future", nameEs: "Futuro", description: "Resultado o dirección potencial." },
  ],
  "celtic-cross": [
    { id: "1", name: "Present", nameEs: "Presente", description: "Situación actual." },
    { id: "2", name: "Challenge", nameEs: "Desafío", description: "Desafío o influencia inmediata." },
    { id: "3", name: "Past", nameEs: "Pasado", description: "Pasado reciente y fundamentos." },
    { id: "4", name: "Recent Past", nameEs: "Pasado reciente", description: "Lo que está dejando tu vida." },
    { id: "5", name: "Best Outcome", nameEs: "Mejor resultado", description: "Lo mejor que se puede lograr." },
    { id: "6", name: "Near Future", nameEs: "Futuro cercano", description: "Lo que está llegando a tu vida." },
    { id: "7", name: "Self", nameEs: "Tú mismo", description: "Tu actitud y enfoque." },
    { id: "8", name: "External", nameEs: "Externo", description: "Influencias externas." },
    { id: "9", name: "Hopes/Fears", nameEs: "Esperanzas/Miedos", description: "Esperanzas y miedos." },
    { id: "10", name: "Outcome", nameEs: "Resultado", description: "Resultado final." },
  ],
  question: [
    { id: "answer", name: "Answer", nameEs: "Respuesta", description: "Orientación para tu pregunta." },
  ],
  lunar: [
    { id: "moon", name: "Lunar Energy", nameEs: "Energía lunar", description: "Influencia de la fase lunar actual." },
  ],
};

export const spreadSizes: Record<SpreadType, number> = {
  daily: 1,
  "three-card": 3,
  "celtic-cross": 10,
  question: 1,
  lunar: 1,
};
