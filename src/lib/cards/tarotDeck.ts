import type { TarotCard, Suit } from "@/types/tarot";
import { getMajorArcanaImageUrl, getMinorArcanaImageUrl } from "./cardImages";

const majorArcana: Omit<TarotCard, "arcana" | "suit">[] = [
  { id: 0, name: "The Fool", nameEs: "El Loco", image: getMajorArcanaImageUrl(0), keywords: ["empezar de cero", "inocencia", "aventura"], upright: "Es hora de lanzarte a algo nuevo. Confía en ti y da el primer paso sin miedo.", reversed: "Cuidado con actuar sin pensar. No te apures, planifica antes de saltar." },
  { id: 1, name: "The Magician", nameEs: "El Mago", image: getMajorArcanaImageUrl(1), keywords: ["creatividad", "habilidad", "acción"], upright: "Tienes todo lo que necesitas para lograr lo que quieres. Usa tus talentos y ponte en acción.", reversed: "No dejes que te manipulen ni te engañes a ti mismo. Organízate mejor." },
  { id: 2, name: "The High Priestess", nameEs: "La Sacerdotisa", image: getMajorArcanaImageUrl(2), keywords: ["intuición", "secretos", "sabiduría"], upright: "Hazle caso a tu intuición, esa vocecita interior sabe más de lo que crees.", reversed: "Estás desconectado/a de ti mismo/a. Para, respira y escúchate." },
  { id: 3, name: "The Empress", nameEs: "La Emperatriz", image: getMajorArcanaImageUrl(3), keywords: ["abundancia", "cariño", "naturaleza"], upright: "Viene abundancia y cariño a tu vida. Cuida de ti y de los tuyos con amor.", reversed: "Te estás descuidando. Date un tiempo para ti, no todo es dar a los demás." },
  { id: 4, name: "The Emperor", nameEs: "El Emperador", image: getMajorArcanaImageUrl(4), keywords: ["orden", "estabilidad", "liderazgo"], upright: "Es momento de poner orden y tomar el control de tu vida con firmeza.", reversed: "Estás siendo muy controlador/a o muy rígido/a. Afloja un poco." },
  { id: 5, name: "The Hierophant", nameEs: "El Hierofante", image: getMajorArcanaImageUrl(5), keywords: ["tradición", "guía", "valores"], upright: "Busca consejo de alguien con experiencia. Las tradiciones y valores te dan base.", reversed: "No sigas reglas solo porque sí. Cuestiona y busca tu propio camino." },
  { id: 6, name: "The Lovers", nameEs: "Los Enamorados", image: getMajorArcanaImageUrl(6), keywords: ["amor", "decisión", "conexión"], upright: "Hay amor y armonía en el aire. También puede ser una decisión importante que tomar.", reversed: "Hay desbalance en una relación o en tus valores. Revisa qué está fallando." },
  { id: 7, name: "The Chariot", nameEs: "El Carro", image: getMajorArcanaImageUrl(7), keywords: ["determinación", "victoria", "avance"], upright: "Vas con todo y vas a lograrlo. Tu fuerza de voluntad te lleva al éxito.", reversed: "Te sientes sin rumbo o con muchos obstáculos. Enfócate en una sola meta." },
  { id: 8, name: "Strength", nameEs: "La Fuerza", image: getMajorArcanaImageUrl(8), keywords: ["valentía", "paciencia", "fortaleza"], upright: "Tienes más fuerza de la que crees. Con paciencia y corazón, superas cualquier cosa.", reversed: "Estás dudando de ti. Recuerda lo que ya has superado, eres más fuerte." },
  { id: 9, name: "The Hermit", nameEs: "El Ermitaño", image: getMajorArcanaImageUrl(9), keywords: ["reflexión", "soledad", "búsqueda"], upright: "Necesitas un tiempo a solas para pensar y encontrar respuestas dentro de ti.", reversed: "Te estás aislando demasiado. Está bien estar solo, pero no te encierres." },
  { id: 10, name: "Wheel of Fortune", nameEs: "La Rueda de la Fortuna", image: getMajorArcanaImageUrl(10), keywords: ["suerte", "cambios", "ciclos"], upright: "Las cosas están por cambiar a tu favor. La suerte está girando para ti.", reversed: "Estás en una mala racha, pero es temporal. Todo ciclo tiene su fin." },
  { id: 11, name: "Justice", nameEs: "La Justicia", image: getMajorArcanaImageUrl(11), keywords: ["verdad", "equilibrio", "consecuencias"], upright: "Lo que hagas tendrá consecuencias. Actúa con honestidad y las cosas saldrán bien.", reversed: "Algo no es justo o no estás siendo honesto/a contigo. Enfrenta la verdad." },
  { id: 12, name: "The Hanged Man", nameEs: "El Colgado", image: getMajorArcanaImageUrl(12), keywords: ["pausa", "sacrificio", "ver diferente"], upright: "A veces hay que soltar y ver las cosas desde otro ángulo. La pausa trae claridad.", reversed: "Estás estancado/a porque no quieres soltar algo. Deja ir lo que ya no sirve." },
  { id: 13, name: "Death", nameEs: "La Muerte", image: getMajorArcanaImageUrl(13), keywords: ["cambio", "cierre", "renovación"], upright: "Algo termina para que algo mejor empiece. No tengas miedo al cambio, es necesario.", reversed: "Te resistes a cerrar un ciclo. Mientras no sueltes lo viejo, lo nuevo no llega." },
  { id: 14, name: "Temperance", nameEs: "La Templanza", image: getMajorArcanaImageUrl(14), keywords: ["equilibrio", "calma", "armonía"], upright: "Busca el balance en tu vida. Con calma y paciencia todo fluye mejor.", reversed: "Estás yendo a los extremos. Para un poco y busca el punto medio." },
  { id: 15, name: "The Devil", nameEs: "El Diablo", image: getMajorArcanaImageUrl(15), keywords: ["apego", "tentación", "atadura"], upright: "Algo te tiene atado/a: un vicio, una relación tóxica o un miedo. Reconócelo.", reversed: "Estás listo/a para liberarte de lo que te ata. Dale, suelta esas cadenas." },
  { id: 16, name: "The Tower", nameEs: "La Torre", image: getMajorArcanaImageUrl(16), keywords: ["sacudón", "revelación", "cambio brusco"], upright: "Viene un cambio fuerte e inesperado. Aunque duela, te libera y te abre camino.", reversed: "Sientes que algo se viene abajo pero lo estás evitando. Mejor enfréntalo." },
  { id: 17, name: "The Star", nameEs: "La Estrella", image: getMajorArcanaImageUrl(17), keywords: ["esperanza", "fe", "sanación"], upright: "Después de la tormenta sale el sol. Hay esperanza, fe y luz en tu camino.", reversed: "Te cuesta creer que las cosas van a mejorar. No pierdas la fe, ya viene algo bueno." },
  { id: 18, name: "The Moon", nameEs: "La Luna", image: getMajorArcanaImageUrl(18), keywords: ["confusión", "miedos", "intuición"], upright: "No todo es lo que parece. Confía en tu intuición para ver más allá de las ilusiones.", reversed: "Los miedos que tenías empiezan a irse. La confusión se va aclarando." },
  { id: 19, name: "The Sun", nameEs: "El Sol", image: getMajorArcanaImageUrl(19), keywords: ["alegría", "éxito", "vitalidad"], upright: "Todo sale bien. Alegría, éxito y buena energía te rodean. Disfrútalo.", reversed: "Algo te tiene desanimado/a. Busca lo positivo, la alegría está más cerca de lo que crees." },
  { id: 20, name: "Judgement", nameEs: "El Juicio", image: getMajorArcanaImageUrl(20), keywords: ["despertar", "decisión", "propósito"], upright: "Es hora de evaluarte y tomar una decisión importante. Escucha tu llamado interior.", reversed: "Estás ignorando algo importante. No te hagas el/la de la vista gorda." },
  { id: 21, name: "The World", nameEs: "El Mundo", image: getMajorArcanaImageUrl(21), keywords: ["logro", "completar", "plenitud"], upright: "Lograste lo que te propusiste. Un ciclo se completa con éxito. Celébralo.", reversed: "Estás cerca de terminar algo pero te falta ese último empujón. No aflojes." },
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
    wands: { upright: "Se abre una puerta nueva. Hay chispa, ganas y oportunidades para empezar algo chévere.", reversed: "Te falta dirección. Hay muchas distracciones y no arrancas con nada." },
    cups: { upright: "Llega amor nuevo, una conexión bonita o un momento de mucha ternura.", reversed: "Necesitas quererte más a ti mismo/a antes de dar amor a otros." },
    swords: { upright: "Momento de claridad mental. Una idea brillante o una verdad que necesitabas escuchar.", reversed: "Estás confundido/a y no piensas con claridad. No tomes decisiones así." },
    pentacles: { upright: "Viene una oportunidad de plata o de negocio. El inicio de algo que puede crecer.", reversed: "Se te fue una oportunidad. Planifica mejor para la próxima." },
  };

  const numberMeanings: Record<Suit, Record<number, { upright: string; reversed: string }>> = {
    wands: {
      2: { upright: "Estás planificando algo importante. Tómate tu tiempo para decidir bien.", reversed: "Le tienes miedo a lo nuevo. Deja de darle vueltas y actúa." },
      3: { upright: "Tus planes están avanzando. Se ve un buen futuro si sigues así.", reversed: "Hay trabas y retrasos que te frustran. Paciencia, ya se destrancan." },
      4: { upright: "Momento de celebrar y disfrutar en familia o con los panas.", reversed: "Hay roces en la casa o con la gente cercana. Busca la armonía." },
      5: { upright: "Hay competencia o roces con otros. No te dejes provocar fácilmente.", reversed: "Evita los pleitos innecesarios. No toda pelea vale la pena." },
      6: { upright: "Viene un reconocimiento o un triunfo público. Tu esfuerzo se nota.", reversed: "Sientes que nadie valora lo que haces. No dejes que el ego te gane." },
      7: { upright: "Te toca defender lo tuyo. No aflojes, tienes razón de tu lado.", reversed: "Estás agotado/a de pelear. A veces es mejor soltar que seguir insistiendo." },
      8: { upright: "Las cosas se mueven rápido. Noticias, viajes o cambios que llegan de golpe.", reversed: "Todo está parado y te desesperas. Calma, el movimiento ya viene." },
      9: { upright: "Estás pasando una prueba dura pero la estás aguantando. Eres resiliente.", reversed: "Estás al límite. Pide ayuda, no tienes que cargar todo solo/a." },
      10: { upright: "Cargas mucha responsabilidad. El peso es real pero estás cerca de la meta.", reversed: "No puedes con todo. Aprende a delegar y a decir que no." },
    },
    cups: {
      2: { upright: "Hay una conexión especial con alguien. Amor, amistad o una sociedad que fluye.", reversed: "Algo está desbalanceado en una relación. Hablen, no dejen que se enfríe." },
      3: { upright: "Momento de festejo con amigos o familia. Buena onda y creatividad.", reversed: "Te sientes solo/a o fuera de grupo. Busca a tu gente, están ahí." },
      4: { upright: "Estás aburrido/a o desconectado/a de lo que antes te emocionaba.", reversed: "Vuelven las ganas de vivir. Se abre una nueva motivación." },
      5: { upright: "Hay una pérdida o decepción que duele. Permítete sentirlo.", reversed: "Ya es hora de soltar esa tristeza. Mira lo que todavía tienes." },
      6: { upright: "Recuerdos bonitos de la infancia o del pasado te llenan de nostalgia.", reversed: "Vivir en el pasado no te deja avanzar. Mira hacia adelante." },
      7: { upright: "Tienes muchas opciones pero no te decides. No todo lo que brilla es oro.", reversed: "No te dejes llevar por las ilusiones. Aterriza y elige con la cabeza." },
      8: { upright: "Es hora de alejarte de algo que ya no te llena. Duele, pero es necesario.", reversed: "Tienes miedo de irte o de cambiar. Pero quedarte así tampoco es opción." },
      9: { upright: "Lo que deseabas se cumple. Satisfacción, tranquilidad, buena vibra.", reversed: "Nada te llena por más que tengas. Busca la felicidad por dentro, no por fuera." },
      10: { upright: "Felicidad familiar, armonía en el hogar, todo fluye bonito.", reversed: "Hay tensión en la familia o los valores no coinciden. Conversen." },
    },
    swords: {
      2: { upright: "Tienes una decisión difícil y estás evitándola. No puedes seguir así.", reversed: "Demasiada información te tiene confundido/a. Simplifica." },
      3: { upright: "Dolor en el corazón. Algo te hirió profundamente. Date tiempo para sanar.", reversed: "Empieza la recuperación. El perdón te libera, aunque cueste." },
      4: { upright: "Necesitas descansar. Tu mente y cuerpo te piden una pausa.", reversed: "No descansas ni paras. Vas a explotar si sigues así. Relájate." },
      5: { upright: "Hay un conflicto o pelea que te agota. No todos los combates se ganan.", reversed: "El conflicto empieza a resolverse. Busca la paz." },
      6: { upright: "Estás dejando atrás una etapa difícil. El camino se va poniendo mejor.", reversed: "Sigues cargando problemas del pasado. Suéltalos para poder avanzar." },
      7: { upright: "Alguien no está siendo sincero, o tú estás ocultando algo. Ojo con eso.", reversed: "La verdad sale a la luz. Es mejor confesarlo tú que esperar a que te descubran." },
      8: { upright: "Te sientes atrapado/a, como que no tienes salida. Pero sí la hay.", reversed: "Empiezas a ver la salida. Te estás liberando de lo que te tenía preso/a." },
      9: { upright: "La ansiedad y las preocupaciones no te dejan dormir. Es más miedo que realidad.", reversed: "Los miedos empiezan a irse. Te das cuenta de que no era tan grave." },
      10: { upright: "Un final doloroso, una traición o una crisis fuerte. Toca fondo, pero de ahí se sube.", reversed: "Lo peor ya pasó. Estás resurgiendo y aprendiendo de lo vivido." },
    },
    pentacles: {
      2: { upright: "Estás haciendo malabares con todo. Organízate para que nada se te caiga.", reversed: "El desorden te tiene loco/a. Pon tus prioridades en claro." },
      3: { upright: "Trabajo en equipo te lleva lejos. Aprende de otros y colabora.", reversed: "No hay buen trabajo en equipo. Si no hay compromiso, no funciona." },
      4: { upright: "Estás cuidando lo tuyo con uñas y dientes. Seguridad ante todo.", reversed: "No seas tan tacaño/a. Guardar todo no es lo mismo que ser sabio." },
      5: { upright: "Momento económico difícil. Se siente la escasez pero es pasajero.", reversed: "La recuperación viene. Puede llegar ayuda inesperada o un nuevo ingreso." },
      6: { upright: "Generosidad y solidaridad. Dar y recibir están en equilibrio.", reversed: "Cuidado con las deudas o con dar más de lo que puedes." },
      7: { upright: "Lo que sembraste va a dar frutos. Sigue trabajando con paciencia.", reversed: "Te desesperas por ver resultados ya. Las cosas buenas toman tiempo." },
      8: { upright: "Tu dedicación y esfuerzo se nota. Estás perfeccionando algo importante.", reversed: "Buscas la perfección y eso te paraliza. Hecho es mejor que perfecto." },
      9: { upright: "Bienestar económico, lujos merecidos, independencia. Lo lograste.", reversed: "Cuida tu plata. No gastes de más solo por aparentar." },
      10: { upright: "Estabilidad familiar y financiera. Legado, herencia, base sólida.", reversed: "Problemas de plata en la familia. Hablen claro y organícense." },
    },
  };

  const courtMeanings: Record<Suit, Record<string, { upright: string; reversed: string }>> = {
    wands: {
      Page: { upright: "Llega algo que te emociona. Hay ganas de explorar, de aprender, de aventurarte.", reversed: "Tienes ideas pero no las concretas. Deja de solo soñar y haz algo." },
      Knight: { upright: "Mucha energía y pasión. Te lanzas de cabeza a lo que quieres.", reversed: "Estás siendo muy impulsivo/a. Piensa antes de actuar." },
      Queen: { upright: "Eres valiente, independiente y no te dejas de nadie. Esa seguridad atrae.", reversed: "Cuidado con los celos o con querer controlarlo todo." },
      King: { upright: "Liderazgo natural, visión clara y ganas de emprender. Dale con todo.", reversed: "Estás siendo mandón/a o esperando demasiado de los demás." },
    },
    cups: {
      Page: { upright: "Llega un mensaje bonito, una propuesta creativa o un detalle de amor.", reversed: "Inmadurez emocional. No juegues con los sentimientos de nadie." },
      Knight: { upright: "Romance en el aire. Alguien encantador aparece o vuelve.", reversed: "No te dejes llevar por las ilusiones. Ese príncipe azul puede ser pura fachada." },
      Queen: { upright: "Eres la calma en medio de la tormenta. Tu empatía y cariño curan.", reversed: "Estás dando demasiado sin recibir nada. Cuídate tú también." },
      King: { upright: "Madurez emocional. Sabes manejar tus sentimientos con sabiduría.", reversed: "Estás siendo frío/a o manipulando emocionalmente a alguien." },
    },
    swords: {
      Page: { upright: "Curiosidad, ganas de aprender, noticias que llegan. Mantente atento/a.", reversed: "Cuidado con el chisme o con hablar de más. Piensa antes de decir." },
      Knight: { upright: "Acción rápida y decidida. No pierdes tiempo y vas directo al grano.", reversed: "Estás siendo agresivo/a o hiriente con tus palabras. Cuidado." },
      Queen: { upright: "Ves las cosas con claridad y no te dejas engañar. Directa y sincera.", reversed: "Estás siendo demasiado dura/o o cortante. Suaviza un poco." },
      King: { upright: "Inteligencia, verdad y autoridad. Tu palabra tiene peso y respeto.", reversed: "Estás abusando del poder o de tu posición. Eso tiene consecuencias." },
    },
    pentacles: {
      Page: { upright: "Ganas de aprender algo nuevo o de empezar un proyecto que dé plata.", reversed: "Pereza o falta de enfoque. Si no empiezas, nunca va a pasar nada." },
      Knight: { upright: "Trabajo duro y constante. Eres responsable y cumplido/a.", reversed: "Solo trabajas y no vives. El dinero no lo es todo." },
      Queen: { upright: "Abundancia, generosidad y buen manejo del hogar y las finanzas.", reversed: "Te preocupa mucho la plata. No dejes que la inseguridad te domine." },
      King: { upright: "Éxito financiero, disciplina y liderazgo. Tienes las cosas claras.", reversed: "La avaricia o la terquedad te están jugando en contra." },
    },
  };

  const ace = aces[suit];
  cards.push({ ...buildMinorCard(suit, `Ace of ${suitLabel.en}`, `As de ${suitLabel.es}`, 1, ["empezar de nuevo", "oportunidad"], ace.upright, ace.reversed), id: baseId });
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
