import type { TarotCard, Suit } from "@/types/tarot";
import { getMajorArcanaImageUrl, getMinorArcanaImageUrl } from "./cardImages";

const majorArcana: Omit<TarotCard, "arcana" | "suit">[] = [
  { id: 0, name: "The Fool", nameEs: "El Loco", image: getMajorArcanaImageUrl(0), keywords: ["nuevos comienzos", "inocencia", "espontaneidad"], upright: "Nuevos comienzos, optimismo, confianza en la vida.", reversed: "Imprudencia, ingenuidad, inconsideración." },
  { id: 1, name: "The Magician", nameEs: "El Mago", image: getMajorArcanaImageUrl(1), keywords: ["manifestación", "ingenio", "poder"], upright: "Manifestación, ingenio, poder, acción inspirada.", reversed: "Manipulación, mala planificación, talentos sin explotar." },
  { id: 2, name: "The High Priestess", nameEs: "La Sacerdotisa", image: getMajorArcanaImageUrl(2), keywords: ["intuición", "misterio", "voz interior"], upright: "Intuición, conocimiento sagrado, lo femenino divino, subconsciente.", reversed: "Secretos, desconexión de la intuición, aislamiento." },
  { id: 3, name: "The Empress", nameEs: "La Emperatriz", image: getMajorArcanaImageUrl(3), keywords: ["feminidad", "belleza", "naturaleza", "nutrición"], upright: "Feminidad, belleza, naturaleza, cuidado, abundancia.", reversed: "Bloqueo creativo, dependencia de otros." },
  { id: 4, name: "The Emperor", nameEs: "El Emperador", image: getMajorArcanaImageUrl(4), keywords: ["autoridad", "estructura", "figura paterna"], upright: "Autoridad, estabilidad, estructura, figura paterna.", reversed: "Dominación, control excesivo, falta de disciplina." },
  { id: 5, name: "The Hierophant", nameEs: "El Hierofante", image: getMajorArcanaImageUrl(5), keywords: ["sabiduría espiritual", "creencias", "conformidad"], upright: "Sabiduría espiritual, creencias religiosas, conformidad, tradición.", reversed: "Creencias personales, libertad, desafiar el statu quo." },
  { id: 6, name: "The Lovers", nameEs: "Los Enamorados", image: getMajorArcanaImageUrl(6), keywords: ["amor", "armonía", "relaciones", "valores"], upright: "Amor, armonía, relaciones, alineación de valores, decisiones.", reversed: "Amor propio, desarmonía, desequilibrio, desalineación." },
  { id: 7, name: "The Chariot", nameEs: "El Carro", image: getMajorArcanaImageUrl(7), keywords: ["control", "voluntad", "éxito", "acción"], upright: "Control, fuerza de voluntad, éxito, acción, determinación.", reversed: "Autodisciplina, oposición, falta de dirección." },
  { id: 8, name: "Strength", nameEs: "La Fuerza", image: getMajorArcanaImageUrl(8), keywords: ["fuerza", "coraje", "paciencia", "control"], upright: "Fuerza, coraje, paciencia, control, compasión.", reversed: "Fuerza interior, dudas sobre uno mismo, baja energía." },
  { id: 9, name: "The Hermit", nameEs: "El Ermitaño", image: getMajorArcanaImageUrl(9), keywords: ["búsqueda interior", "introspección", "guía interior"], upright: "Búsqueda del alma, introspección, guía interior, soledad.", reversed: "Aislamiento, soledad, retraimiento." },
  { id: 10, name: "Wheel of Fortune", nameEs: "La Rueda de la Fortuna", image: getMajorArcanaImageUrl(10), keywords: ["buena suerte", "karma", "ciclos de vida", "destino"], upright: "Buena suerte, karma, ciclos de vida, destino, punto de inflexión.", reversed: "Mala suerte, resistencia al cambio, romper ciclos." },
  { id: 11, name: "Justice", nameEs: "La Justicia", image: getMajorArcanaImageUrl(11), keywords: ["justicia", "equidad", "verdad", "ley"], upright: "Justicia, equidad, verdad, causa y efecto, ley.", reversed: "Injusticia, falta de responsabilidad, deshonestidad." },
  { id: 12, name: "The Hanged Man", nameEs: "El Colgado", image: getMajorArcanaImageUrl(12), keywords: ["pausa", "entrega", "soltar", "nuevas perspectivas"], upright: "Pausa, entrega, soltar el control, nuevas perspectivas.", reversed: "Retrasos, resistencia, estancamiento, indecisión." },
  { id: 13, name: "Death", nameEs: "La Muerte", image: getMajorArcanaImageUrl(13), keywords: ["finales", "cambio", "transformación", "transición"], upright: "Finales, cambio, transformación, transición.", reversed: "Resistencia al cambio, transformación personal, purga interior." },
  { id: 14, name: "Temperance", nameEs: "La Templanza", image: getMajorArcanaImageUrl(14), keywords: ["equilibrio", "moderación", "paciencia", "propósito"], upright: "Equilibrio, moderación, paciencia, propósito, significado.", reversed: "Desequilibrio, exceso, autosanación, realineación." },
  { id: 15, name: "The Devil", nameEs: "El Diablo", image: getMajorArcanaImageUrl(15), keywords: ["sombra", "apego", "adicción", "restricción"], upright: "Sombra interior, apego, adicción, restricción, sexualidad.", reversed: "Liberación de creencias limitantes, explorar pensamientos oscuros, desapego." },
  { id: 16, name: "The Tower", nameEs: "La Torre", image: getMajorArcanaImageUrl(16), keywords: ["cambio repentino", "caos", "revelación", "despertar"], upright: "Cambio repentino, conmoción, caos, revelación, despertar.", reversed: "Transformación personal, miedo al cambio, evitar el desastre." },
  { id: 17, name: "The Star", nameEs: "La Estrella", image: getMajorArcanaImageUrl(17), keywords: ["esperanza", "fe", "propósito", "renovación"], upright: "Esperanza, fe, propósito, renovación, espiritualidad.", reversed: "Falta de fe, desesperación, desconfianza en uno mismo, desconexión." },
  { id: 18, name: "The Moon", nameEs: "La Luna", image: getMajorArcanaImageUrl(18), keywords: ["ilusión", "miedo", "ansiedad", "intuición"], upright: "Ilusión, miedo, ansiedad, subconsciente, intuición.", reversed: "Liberación del miedo, emociones reprimidas, confusión interior." },
  { id: 19, name: "The Sun", nameEs: "El Sol", image: getMajorArcanaImageUrl(19), keywords: ["positividad", "alegría", "calidez", "éxito"], upright: "Positividad, alegría, calidez, éxito, vitalidad.", reversed: "Niño interior, desánimo, optimismo excesivo." },
  { id: 20, name: "Judgement", nameEs: "El Juicio", image: getMajorArcanaImageUrl(20), keywords: ["reflexión", "evaluación", "llamado interior", "absolución"], upright: "Reflexión, evaluación, llamado interior, absolución.", reversed: "Dudas sobre uno mismo, crítico interior, ignorar el llamado." },
  { id: 21, name: "The World", nameEs: "El Mundo", image: getMajorArcanaImageUrl(21), keywords: ["completitud", "logro", "viaje", "integración"], upright: "Completitud, logro, viaje, integración.", reversed: "Búsqueda de cierre personal, atajos." },
];

function buildMinorCard(
  suit: Suit,
  name: string,
  nameEs: string,
  id: number,
  keywords: string[],
  upright: string,
  reversed: string
): TarotCard {
  return {
    id: 0, // set in buildMinorArcana
    name,
    nameEs,
    arcana: "minor",
    suit,
    image: getMinorArcanaImageUrl(suit, name),
    keywords,
    upright,
    reversed,
  };
}

const courtNames = ["Page", "Knight", "Queen", "King"];
const suitNames: Record<Suit, { en: string; es: string }> = {
  wands: { en: "Wands", es: "Bastos" },
  cups: { en: "Cups", es: "Copas" },
  swords: { en: "Swords", es: "Espadas" },
  pentacles: { en: "Pentacles", es: "Oros" },
};

const SUITS: Suit[] = ["wands", "cups", "swords", "pentacles"];

function buildMinorArcana(suit: Suit): TarotCard[] {
  const cards: TarotCard[] = [];
  const suitLabel = suitNames[suit];
  const baseId = 22 + SUITS.indexOf(suit) * 14;
  const aces: Record<Suit, { upright: string; reversed: string }> = {
    wands: { upright: "Inspiración, nuevas oportunidades, crecimiento, potencial.", reversed: "Falta de dirección, distracciones, retrasos." },
    cups: { upright: "Amor, nuevas relaciones, compasión, creatividad.", reversed: "Amor propio, intuición, emociones reprimidas." },
    swords: { upright: "Avance, nuevas ideas, claridad mental.", reversed: "Juicio nublado, confusión, caos." },
    pentacles: { upright: "Manifestación, abundancia, nueva oportunidad financiera.", reversed: "Oportunidad perdida, falta de planificación." },
  };

  const numberMeanings: Record<Suit, Record<number, { upright: string; reversed: string }>> = {
    wands: {
      2: { upright: "Planificación, decisiones futuras, descubrimiento.", reversed: "Miedo a lo desconocido, falta de planificación." },
      3: { upright: "Progreso, expansión, visión a largo plazo.", reversed: "Obstáculos, retrasos, frustración." },
      4: { upright: "Celebración, armonía, hogar, estabilidad.", reversed: "Conflicto en el hogar, falta de armonía." },
      5: { upright: "Competencia, conflicto, rivalidad, tensión.", reversed: "Evitar el conflicto, diversidad de opiniones." },
      6: { upright: "Victoria, reconocimiento público, éxito.", reversed: "Falta de reconocimiento, ego, orgullo." },
      7: { upright: "Desafío, perseverancia, defender tu posición.", reversed: "Sentirse abrumado, ceder, renunciar." },
      8: { upright: "Movimiento rápido, acción, viaje, progreso.", reversed: "Retrasos, frustración, esperar." },
      9: { upright: "Resiliencia, coraje, perseverancia, prueba.", reversed: "Agotamiento, paranoia, estar a la defensiva." },
      10: { upright: "Responsabilidad, carga, trabajo duro, estrés.", reversed: "Incapacidad de delegar, sobrecarga." },
    },
    cups: {
      2: { upright: "Unión, asociación, amor mutuo, atracción.", reversed: "Desequilibrio, ruptura, desconexión." },
      3: { upright: "Celebración, amistad, creatividad, comunidad.", reversed: "Exceso, soledad, aislamiento social." },
      4: { upright: "Apatía, contemplación, desconexión, aburrimiento.", reversed: "Nueva motivación, despertar, aceptación." },
      5: { upright: "Pérdida, duelo, arrepentimiento, decepción.", reversed: "Aceptación, seguir adelante, perdón." },
      6: { upright: "Nostalgia, recuerdos felices, inocencia, infancia.", reversed: "Vivir en el pasado, falta de realismo." },
      7: { upright: "Ilusiones, fantasía, muchas opciones, soñar despierto.", reversed: "Tentación, ilusión, dispersión." },
      8: { upright: "Abandono, caminar lejos, soltar, buscar algo más.", reversed: "Miedo a abandonar, estancamiento, indecisión." },
      9: { upright: "Deseo cumplido, satisfacción, bienestar emocional.", reversed: "Insatisfacción, materialismo, codicia." },
      10: { upright: "Felicidad, armonía familiar, realización emocional.", reversed: "Desarmonía, valores desalineados." },
    },
    swords: {
      2: { upright: "Decisión difícil, bloqueo, evitar la verdad.", reversed: "Confusión, sobrecarga de información." },
      3: { upright: "Dolor, corazón roto, sufrimiento, traición.", reversed: "Recuperación, perdón, seguir adelante." },
      4: { upright: "Descanso, restauración, contemplación, recuperación.", reversed: "Inquietud, agotamiento, falta de descanso." },
      5: { upright: "Conflicto, desacuerdo, competencia, derrota.", reversed: "Reconciliación, fin del conflicto." },
      6: { upright: "Transición, dejar atrás, avanzar, viaje.", reversed: "Estancamiento, asuntos sin resolver." },
      7: { upright: "Engaño, estrategia, astucia, actuar en secreto.", reversed: "Confesión, conciencia, cambio de enfoque." },
      8: { upright: "Restricción, atrapado, víctima, impotencia.", reversed: "Liberación, nuevas perspectivas, empoderamiento." },
      9: { upright: "Ansiedad, preocupación, miedo, pesadillas.", reversed: "Esperanza, superación del miedo, abrirse." },
      10: { upright: "Traición, final doloroso, crisis, pérdida total.", reversed: "Recuperación, resurgir, aprender de la derrota." },
    },
    pentacles: {
      2: { upright: "Equilibrio, adaptabilidad, gestión del tiempo.", reversed: "Desorganización, desequilibrio financiero." },
      3: { upright: "Trabajo en equipo, aprendizaje, colaboración.", reversed: "Falta de trabajo en equipo, mediocridad." },
      4: { upright: "Seguridad, conservación, control, posesividad.", reversed: "Avaricia, materialismo excesivo." },
      5: { upright: "Dificultad financiera, pobreza, aislamiento.", reversed: "Recuperación, ayuda espiritual, nuevo empleo." },
      6: { upright: "Generosidad, caridad, dar y recibir, compartir.", reversed: "Deuda, egoísmo, desequilibrio en la generosidad." },
      7: { upright: "Inversión a largo plazo, perseverancia, recompensa.", reversed: "Impaciencia, malas inversiones, frustración." },
      8: { upright: "Dedicación, maestría, habilidad, trabajo detallado.", reversed: "Perfeccionismo, falta de motivación." },
      9: { upright: "Abundancia, lujo, independencia, logro.", reversed: "Pérdidas financieras, falta de autosuficiencia." },
      10: { upright: "Riqueza, herencia, legado familiar, estabilidad.", reversed: "Pérdida financiera, problemas familiares." },
    },
  };

  const courtMeanings: Record<Suit, Record<string, { upright: string; reversed: string }>> = {
    wands: {
      Page: { upright: "Entusiasmo, exploración, descubrimiento, espíritu libre.", reversed: "Falta de dirección, ideas sin concretar." },
      Knight: { upright: "Energía, pasión, aventura, impulsividad.", reversed: "Impaciencia, imprudencia, retrasos." },
      Queen: { upright: "Coraje, confianza, independencia, determinación.", reversed: "Egoísmo, celos, temperamento." },
      King: { upright: "Liderazgo, visión, honor, emprendimiento.", reversed: "Impulsividad, tiranía, expectativas altas." },
    },
    cups: {
      Page: { upright: "Mensajes de amor, creatividad, intuición.", reversed: "Inmadurez emocional, inseguridad." },
      Knight: { upright: "Romance, encanto, imaginación, caballero ideal.", reversed: "Ilusión, celos, mal humor." },
      Queen: { upright: "Compasión, calma, empatía, cuidado.", reversed: "Inseguridad emocional, dependencia." },
      King: { upright: "Equilibrio emocional, generosidad, diplomacia.", reversed: "Manipulación emocional, frialdad." },
    },
    swords: {
      Page: { upright: "Curiosidad, nuevas ideas, comunicación.", reversed: "Chismes, ideas dispersas, falta de planificación." },
      Knight: { upright: "Acción rápida, ambición, determinación.", reversed: "Agresividad, impaciencia, crueldad." },
      Queen: { upright: "Percepción clara, independencia, comunicación directa.", reversed: "Frialdad, crueldad, amargura." },
      King: { upright: "Autoridad intelectual, verdad, ética, claridad.", reversed: "Abuso de poder, manipulación, tiranía." },
    },
    pentacles: {
      Page: { upright: "Ambición, deseo de aprender, nuevos inicios financieros.", reversed: "Falta de progreso, pereza, desenfoque." },
      Knight: { upright: "Trabajo duro, responsabilidad, rutina, eficiencia.", reversed: "Aburrimiento, estancamiento, obsesión con el trabajo." },
      Queen: { upright: "Abundancia, seguridad, practicidad, generosidad.", reversed: "Inseguridad financiera, dependencia material." },
      King: { upright: "Riqueza, seguridad, liderazgo, disciplina.", reversed: "Avaricia, materialismo, terquedad." },
    },
  };

  const ace = aces[suit];
  cards.push({ ...buildMinorCard(suit, `Ace of ${suitLabel.en}`, `As de ${suitLabel.es}`, 1, ["nuevos comienzos", "potencial"], ace.upright, ace.reversed), id: baseId });
  for (let i = 2; i <= 10; i++) {
    const meanings = numberMeanings[suit][i];
    cards.push({ ...buildMinorCard(suit, `${i} of ${suitLabel.en}`, `${i} de ${suitLabel.es}`, i, [], meanings.upright, meanings.reversed), id: baseId + i - 1 });
  }
  courtNames.forEach((title, idx) => {
    const meanings = courtMeanings[suit][title];
    cards.push({ ...buildMinorCard(suit, `${title} of ${suitLabel.en}`, `${title} de ${suitLabel.es}`, 11 + idx, [], meanings.upright, meanings.reversed), id: baseId + 10 + idx });
  });
  return cards;
}

const minorWands = buildMinorArcana("wands");
const minorCups = buildMinorArcana("cups");
const minorSwords = buildMinorArcana("swords");
const minorPentacles = buildMinorArcana("pentacles");

export const majorArcanaDeck: TarotCard[] = majorArcana.map((c) => ({
  ...c,
  arcana: "major" as const,
}));

export const minorArcanaDecks: Record<Suit, TarotCard[]> = {
  wands: minorWands,
  cups: minorCups,
  swords: minorSwords,
  pentacles: minorPentacles,
};

export const fullDeck: TarotCard[] = [
  ...majorArcanaDeck,
  ...minorWands,
  ...minorCups,
  ...minorSwords,
  ...minorPentacles,
];

export function getCardById(id: number): TarotCard | undefined {
  return fullDeck.find((c) => c.id === id);
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
