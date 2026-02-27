import jsPDF from "jspdf";
import type { ReadingCard, SpreadType } from "@/types/tarot";

interface GenerateReadingPdfOptions {
  spreadType: SpreadType;
  cards: ReadingCard[];
  interpretation?: string | null;
  question?: string;
}

function getSpreadTitle(spreadType: SpreadType): string {
  switch (spreadType) {
    case "daily":
      return "Carta del día";
    case "three-card":
      return "Pasado · Presente · Futuro";
    case "celtic-cross":
      return "Cruz Celta";
    case "question":
      return "Lectura de pregunta";
    case "lunar":
      return "Lectura lunar";
    default:
      return "Lectura de tarot";
  }
}

const MARGIN = 40;
const PAGE_W = 595;
const PAGE_H = 842;
const CONTENT_W = PAGE_W - MARGIN * 2;
const LINE_HEIGHT = 1.35;
const FONT = "helvetica";

async function loadCardImageDataUrl(
  url: string,
  reversed: boolean
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        if (reversed) {
          ctx.translate(w, h);
          ctx.rotate(Math.PI);
          ctx.drawImage(img, 0, 0, w, h);
        } else {
          ctx.drawImage(img, 0, 0);
        }
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export async function generateReadingPdf({
  spreadType,
  cards,
  interpretation,
  question,
}: GenerateReadingPdfOptions) {
  if (typeof window === "undefined") return;

  const fecha = new Date().toLocaleString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = MARGIN;

  // Título
  doc.setFontSize(22);
  doc.setFont(FONT, "bold");
  doc.text(getSpreadTitle(spreadType), MARGIN, y);
  y += 28;

  // Subtítulo
  doc.setFontSize(11);
  doc.setFont(FONT, "normal");
  doc.text(`Interpretado por XAVI · ${fecha}`, MARGIN, y);
  y += 22;

  // Pregunta
  if (question) {
    doc.setFont(FONT, "bold");
    doc.text("Pregunta: ", MARGIN, y);
    const qLines = doc.splitTextToSize(question, CONTENT_W - 50);
    doc.setFont(FONT, "normal");
    qLines.forEach((line: string) => {
      doc.text(line, MARGIN + 50, y);
      y += 11 * LINE_HEIGHT;
    });
    y += 10;
  }

  // Sección: Cartas de la lectura
  doc.setFontSize(14);
  doc.setFont(FONT, "bold");
  doc.text("Cartas de la lectura", MARGIN, y);
  y += 20;

  // Imágenes de cartas (cargar y colocar)
  const cardW = cards.length <= 1 ? 100 : cards.length <= 3 ? 70 : 52;
  const cardH = (cardW * 17) / 10; // proporción clásica tarot 10:17
  const cardSpacing = 8;
  const cardsPerRow = cards.length <= 1 ? 1 : cards.length <= 3 ? 3 : 4;
  const cardBlockY = y;

  for (let i = 0; i < cards.length; i++) {
    const col = i % cardsPerRow;
    const row = Math.floor(i / cardsPerRow);
    const x = MARGIN + col * (cardW + cardSpacing);
    const imgY = cardBlockY + row * (cardH + 18);

    const rc = cards[i];
    const src = rc.card.image;
    if (src) {
      const dataUrl = await loadCardImageDataUrl(src, rc.card.reversedDrawn ?? false);
      if (dataUrl) {
        try {
          doc.addImage(dataUrl, "JPEG", x, imgY, cardW, cardH);
        } catch {
          // si falla la imagen, no la dibujamos
        }
      }
    }

    doc.setFontSize(9);
    doc.setFont(FONT, "normal");
    const name = (rc.card.nameEs ?? rc.card.name).slice(0, 22);
    doc.text(name, x, imgY + cardH + 12);
  }

  const numRows = Math.ceil(cards.length / cardsPerRow);
  y = cardBlockY + numRows * (cardH + 18) + 16;

  // Lista de cartas (texto)
  doc.setFontSize(11);
  doc.setFont(FONT, "normal");
  cards.forEach((rc, i) => {
    const name = rc.card.nameEs ?? rc.card.name;
    const pos = rc.positionMeaning ?? rc.position;
    const rev = rc.card.reversedDrawn ? " (invertida)" : "";
    const line = `${i + 1}. ${pos} — ${name}${rev}`;
    const lines = doc.splitTextToSize(line, CONTENT_W);
    lines.forEach((l: string) => {
      if (y > PAGE_H - MARGIN) {
        doc.addPage();
        y = MARGIN;
      }
      doc.text(l, MARGIN, y);
      y += 11 * LINE_HEIGHT;
    });
  });
  y += 18;

  // Interpretación por XAVI
  if (y > PAGE_H - 80) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFontSize(14);
  doc.setFont(FONT, "bold");
  doc.text("✦ Interpretación por XAVI", MARGIN, y);
  y += 20;

  doc.setFontSize(11);
  doc.setFont(FONT, "normal");
  const interpretationText =
    interpretation ||
    "No se ha generado la interpretación por XAVI. Pulsa «Interpretado por XAVI» en la app y vuelve a descargar.";
  const interpLines = doc.splitTextToSize(interpretationText, CONTENT_W);
  interpLines.forEach((line: string) => {
    if (y > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line, MARGIN, y);
    y += 11 * LINE_HEIGHT;
  });

  const filename = `lectura-tarot-${spreadType}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
