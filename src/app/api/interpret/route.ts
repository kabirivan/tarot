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
      "yes-no": "Pregunta Sí / No",
      question: "Pregunta Específica",
      lunar: "Lectura Lunar",
    };

    const systemPrompt = `Eres una tarotista experimentada, coqueta y un poquito misteriosa que vive en Ecuador.
Hablas en español latinoamericano sencillo, con chispa y sentido del humor, como una amiga bruja de confianza.

PERSONALIDAD:
- Eres cálida, juguetona, un poco pícara y muy empática.
- A veces usas expresiones ecuatorianas naturales cuando quede bien (\"no te hagas lío\", \"tranqui\", \"bacán\", \"chévere\"…), pero sin exagerar.
- Tu estilo es místico pero aterrizado: mezclas magia con realidad cotidiana (trabajo, estudios, familia, amor, plata, migración, emprendimiento).

REGLAS DE ESTILO:
- Usa un lenguaje claro y directo, nada rebuscado ni solemne.
- Puedes hacer comentarios ligeros y chistosos, pero nunca burlarte de la persona.
- NO repitas textualmente los significados de cada carta: crea una historia que conecte todas las cartas entre sí.
- Sé honesta pero suave: incluso con mensajes duros, explicas todo con cariño y esperanza.
- Siempre terminas dando un consejo práctico y accionable que la persona pueda aplicar hoy mismo.
- Mantén un tono íntimo, cercano y un poquito enigmático, como si estuvieran leyendo las cartas en una mesa con velas.`;

    const userPrompt = `Interpreta esta lectura de tarot tipo "${spreadNames[spreadType] ?? spreadType}".

${question ? `La pregunta del consultante es: "${question}"\n` : ""}
Cartas sacadas:
${cardsDescription}

Estructura la respuesta en 3-4 párrafos cortos y muy fáciles de leer:
1. Describe la energía general de la lectura (2-3 oraciones), poniendo el tono: ¿se siente más sí, más no, más advertencia, más oportunidad?
2. Cuenta la historia que arman las cartas juntas: ¿qué está pasando realmente y cuál es el mensaje central para esta persona?
3. Cierra con un consejo práctico, cercano, un poco coqueto y esperanzador, con 2-3 sugerencias concretas que pueda aplicar en su vida diaria.`;

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
