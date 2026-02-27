/**
 * URLs de imágenes Rider-Waite desde jsDelivr (tarot-card-img npm).
 * Dominio público. Sin necesidad de descargar archivos localmente.
 */
const CDN_BASE = "https://cdn.jsdelivr.net/npm/tarot-card-img@0.1.0";

export function getMajorArcanaImageUrl(id: number): string {
  return `${CDN_BASE}/major/${id}m.jpg`;
}

const SUIT_LETTER: Record<string, string> = {
  wands: "w",
  cups: "c",
  swords: "s",
  pentacles: "p",
};

/** Page=p, Knight=n, Queen=q, King=k. Números 1-10. */
function getMinorCardSuffix(name: string): string {
  const first = name.split(" ")[0];
  if (first === "Ace") return "1";
  if (first === "Page") return "p";
  if (first === "Knight") return "n";
  if (first === "Queen") return "q";
  if (first === "King") return "k";
  const n = Number.parseInt(first, 10);
  if (n >= 1 && n <= 10) return String(n);
  return "1";
}

export function getMinorArcanaImageUrl(suit: string, name: string): string {
  const suitLetter = SUIT_LETTER[suit] ?? "w";
  const cardSuffix = getMinorCardSuffix(name);
  return `${CDN_BASE}/${suit}/${cardSuffix}${suitLetter}.jpg`;
}
