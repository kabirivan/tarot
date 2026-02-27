import type { SpreadType } from "@/types/tarot";

export interface SpreadPosition {
  id: string;
  name: string;
  nameEs: string;
  description: string;
}

export const spreadPositions: Record<SpreadType, SpreadPosition[]> = {
  daily: [
    { id: "card", name: "Card of the Day", nameEs: "Carta del Día", description: "Qué energía te acompaña hoy y en qué enfocarte." },
  ],
  "yes-no": [
    {
      id: "yes-no",
      name: "Yes / No",
      nameEs: "Sí / No",
      description: "Una respuesta rápida de sí o no, con una breve guía.",
    },
  ],
  "three-card": [
    { id: "past", name: "Past", nameEs: "Pasado", description: "Lo que ya pasó y cómo influyó en tu situación." },
    { id: "present", name: "Present", nameEs: "Presente", description: "Cómo están las cosas ahora mismo." },
    { id: "future", name: "Future", nameEs: "Futuro", description: "Hacia dónde van las cosas si sigues por este camino." },
  ],
  "celtic-cross": [
    { id: "1", name: "Present", nameEs: "Ahora", description: "Tu situación actual, lo que estás viviendo." },
    { id: "2", name: "Challenge", nameEs: "El obstáculo", description: "Lo que te está frenando o complicando." },
    { id: "3", name: "Past", nameEs: "Lo que pasó", description: "De dónde vienes y qué te trajo hasta aquí." },
    { id: "4", name: "Recent Past", nameEs: "Lo que se va", description: "Algo que ya está quedando atrás." },
    { id: "5", name: "Best Outcome", nameEs: "Lo mejor posible", description: "Lo máximo que puedes lograr con esto." },
    { id: "6", name: "Near Future", nameEs: "Lo que viene", description: "Lo que está por llegar a tu vida." },
    { id: "7", name: "Self", nameEs: "Tú", description: "Tu actitud frente a todo esto." },
    { id: "8", name: "External", nameEs: "Los demás", description: "Cómo te afectan las personas a tu alrededor." },
    { id: "9", name: "Hopes/Fears", nameEs: "Esperanzas y miedos", description: "Lo que deseas y lo que te da miedo." },
    { id: "10", name: "Outcome", nameEs: "Resultado", description: "Cómo termina todo esto." },
  ],
  question: [
    { id: "answer", name: "Answer", nameEs: "Respuesta", description: "La guía para tu pregunta." },
  ],
  lunar: [
    { id: "moon", name: "Lunar Energy", nameEs: "Energía lunar", description: "Cómo te afecta la luna en este momento." },
  ],
};

export const spreadSizes: Record<SpreadType, number> = {
  daily: 1,
  "yes-no": 1,
  "three-card": 3,
  "celtic-cross": 10,
  question: 1,
  lunar: 1,
};
