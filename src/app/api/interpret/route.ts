import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface CardPayload {
  name: string;
  nameEs: string;
  position: string;
  upright: string;
  reversed: string;
  isReversed: boolean;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY no está configurada. Añádela en .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { cards, spreadType, question } = body as {
      cards: CardPayload[];
      spreadType: string;
      question?: string;
    };

    if (!cards || cards.length === 0) {
      return NextResponse.json(
        { error: "No se enviaron cartas." },
        { status: 400 }
      );
    }

    const cardsDescription = cards
      .map((c, i) => {
        const meaning = c.isReversed ? c.reversed : c.upright;
        const direction = c.isReversed ? "invertida" : "al derecho";
        return `${i + 1}. ${c.nameEs} (${direction}) — Posición: ${c.position}\n   Significado: ${meaning}`;
      })
      .join("\n");

    const spreadNames: Record<string, string> = {
      daily: "Carta del Día",
      "three-card": "Pasado, Presente y Futuro",
      "celtic-cross": "Cruz Celta",
      question: "Pregunta Específica",
      lunar: "Lectura Lunar",
    };

    const systemPrompt = `Eres una tarotista experta y empática. Interpretas lecturas de tarot de manera profunda, personalizada y esperanzadora. Siempre respondes en español. Tu tono es cálido, místico y sabio. No repitas el significado textual de cada carta, sino que crea una narrativa cohesiva que conecte todas las cartas entre sí.`;

    const userPrompt = `Interpreta esta lectura de tarot tipo "${spreadNames[spreadType] ?? spreadType}".

${question ? `La pregunta del consultante es: "${question}"\n` : ""}
Cartas sacadas:
${cardsDescription}

Ofrece una interpretación completa en 3-4 párrafos:
1. Un resumen general de la energía de la lectura.
2. La conexión entre las cartas y su mensaje central.
3. Consejo práctico y esperanzador para el consultante.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Groq API error:", response.status, errBody);
      return NextResponse.json(
        { error: `Error del modelo IA (${response.status})` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const interpretation =
      data.choices?.[0]?.message?.content ?? "No se pudo generar la interpretación.";

    return NextResponse.json({ interpretation });
  } catch (err) {
    console.error("Interpret route error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
