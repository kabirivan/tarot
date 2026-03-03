"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  },
};

const spreads = [
  {
    href: "/reading/daily",
    icon: "🌅",
    title: "Carta del Día",
    subtitle: "1 carta · 2 min",
    description: "Descubre la energía que te acompaña hoy con una sola carta.",
    color: "from-primary/20 to-primary/5",
  },
  {
    href: "/reading/three-card",
    icon: "🎴",
    title: "3 Cartas",
    subtitle: "3 cartas · 5 min",
    description: "Pasado, presente y futuro. Perfecta para decisiones importantes.",
    color: "from-accent/20 to-accent/5",
  },
  {
    href: "/reading/celtic-cross",
    icon: "🔮",
    title: "Cruz Celta",
    subtitle: "10 cartas · 10 min",
    description: "La tirada clásica para ver tu situación desde todos los ángulos.",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    href: "/reading/yes-no",
    icon: "❓",
    title: "Sí / No",
    subtitle: "1 carta",
    description: "Una respuesta directa con matices y consejo personalizado.",
    color: "from-success/20 to-success/5",
    soon: true,
  },
  {
    href: "/reading/question",
    icon: "📝",
    title: "Pregunta específica",
    subtitle: "1 carta",
    description: "Haz una pregunta abierta y deja que las cartas iluminen tu camino.",
    color: "from-primary/15 to-accent/5",
    soon: true,
  },
];

const steps = [
  {
    num: "01",
    icon: "🧘",
    title: "Respira y enfoca",
    description:
      "Busca un lugar tranquilo. Piensa en lo que te inquieta: amor, trabajo, plata, cambios… mientras más clara la intención, más sabrosa la lectura.",
  },
  {
    num: "02",
    icon: "✋",
    title: "Elige tus cartas",
    description:
      "Baraja con un toque, respira y selecciona las cartas que más te llamen. Las animaciones y brillos místicos se encargan de hacer la magia.",
  },
  {
    num: "03",
    icon: "🔮",
    title: "Lee tu historia",
    description:
      "El Mago Xavi te cuenta qué ven las cartas con un tono cercano, un poco pícaro y siempre esperanzador. Si te gusta, la guardas en PDF.",
  },
];

const faqs = [
  {
    q: "¿Es gratis? ¿Necesito registrarme?",
    a: "100% gratis y sin registro. Tus lecturas se guardan en tu navegador, privadas para ti.",
  },
  {
    q: "¿Puedo repetir la misma pregunta?",
    a: "Mejor no. Cada lectura refleja el momento presente. Espera a que algo cambie en tu situación antes de preguntar lo mismo.",
  },
  {
    q: "¿El tarot predice el futuro?",
    a: "No. El tarot te muestra patrones, ángulos y posibilidades. Tu futuro depende de tus acciones y decisiones.",
  },
  {
    q: "¿Qué tipo de preguntas puedo hacer?",
    a: "Preguntas claras y específicas funcionan mejor. Evita las muy vagas o las dobles. Por ejemplo: \"¿Qué necesito saber sobre mi relación?\" en vez de \"¿Qué va a pasar?\".",
  },
  {
    q: "¿Hay temas prohibidos?",
    a: "El tarot es para crecimiento personal. No sustituye consejos médicos, legales o financieros. Para eso, busca un profesional.",
  },
  {
    q: "¿Quién es el Mago Xavi?",
    a: "Es el alma de Mystic Tarot. Lee tus cartas con un lenguaje cercano, coqueto y un poquito misterioso. Siempre te deja un consejo práctico.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 sm:gap-20 py-10 sm:py-14">

        {/* ═══ HERO ═══ */}
        <motion.section
          className="relative text-center flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <div className="pointer-events-none absolute -inset-20 -z-10">
            <div className="animate-hero-glow absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,_rgba(236,72,153,0.35),transparent_50%),radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.15),transparent_60%)] blur-3xl motion-reduce:animate-none" />
          </div>

          <motion.span
            variants={item}
            className="inline-block mb-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-primary/15 text-primary/90 border border-primary/25"
          >
            Lecturas de tarot gratuitas
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-5 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight max-w-4xl"
          >
            Tarot bonito, místico y sin drama
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg lg:text-xl text-white/65 mb-6 max-w-2xl leading-relaxed"
          >
            Elige tus cartas, deja que el Mago Xavi se ponga coqueto con la interpretación
            y guarda tu lectura en un PDF precioso. Todo en español, directo en tu navegador.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-3 mb-4"
          >
            <Link
              href="/dashboard"
              className="btn-primary text-white text-base sm:text-lg px-10 py-3.5 shadow-lg shadow-primary/30"
            >
              Empezar una lectura
            </Link>
            <a
              href="#como-funciona"
              className="text-sm text-white/50 hover:text-white/80 transition-colors duration-200 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              Ver cómo funciona
            </a>
          </motion.div>

          <motion.p
            variants={item}
            className="text-[11px] text-white/35"
          >
            Sin registro · Gratis · En español · 78 cartas
          </motion.p>
        </motion.section>

        {/* ═══ SPREADS / GAME OPTIONS ═══ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="scroll-mt-20"
        >
          <motion.div variants={item} className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white/95 mb-2">
              ¿Qué quieres jugar hoy?
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
              Elige un tipo de lectura y deja que las cartas hagan su magia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {spreads.map(({ href, icon, title, subtitle, description, color, soon }, i) => {
              const CardContent = (
                <>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out`} />
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="text-3xl sm:text-4xl transition-transform duration-200 ease-out-expo group-hover:scale-110 motion-reduce:group-hover:scale-100">
                      {icon}
                    </span>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white/95">{title}</h3>
                      {soon && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-accent/20 text-accent/95">
                          Muy pronto
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                      {subtitle}
                    </span>
                    <p className="text-xs sm:text-sm text-white/55 leading-relaxed">{description}</p>
                  </div>
                </>
              );

              if (soon) {
                return (
                  <motion.div
                    key={href}
                    variants={item}
                    className="relative card-surface p-5 sm:p-6 rounded-2xl opacity-55 cursor-not-allowed flex flex-col gap-2 group overflow-hidden"
                    aria-disabled="true"
                  >
                    {CardContent}
                  </motion.div>
                );
              }

              return (
                <motion.div key={href} variants={item}>
                  <Link
                    href={href}
                    className="relative card-surface p-5 sm:p-6 rounded-2xl flex flex-col gap-2 group overflow-hidden block transition-[border-color,box-shadow,transform] duration-200 ease-out-expo hover:border-primary/50 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-1 active:scale-[0.99] motion-reduce:hover:translate-y-0"
                  >
                    {CardContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══ ABOUT ═══ */}
        <motion.section
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.25),transparent_70%)] blur-2xl" />
          </div>

          <motion.div variants={item} className="card-surface rounded-2xl p-6 sm:p-8 lg:p-10 border-primary/20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-center">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white/95 mb-4">
                  Sobre Mystic Tarot
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-white/60 leading-relaxed">
                  <p>
                    Mystic Tarot combina la simbología clásica de las <span className="text-white/80 font-medium">78 cartas del tarot
                    Rider-Waite</span> con interpretaciones personalizadas del <span className="text-primary font-medium">Mago Xavi</span>,
                    creando una experiencia de lectura moderna, bonita y profundamente personal.
                  </p>
                  <p>
                    Cada lectura genera una interpretación única que conecta todas tus cartas
                    entre sí, contándote una historia en un tono cercano, coqueto y un poquito
                    enigmático. No es una lista de significados: es <span className="text-white/80 font-medium">tu historia</span>.
                  </p>
                  <p>
                    Creemos que el tarot es una herramienta poderosa para la <span className="text-accent font-medium">reflexión personal</span>,
                    la autoexploración y el crecimiento. No predice el futuro, pero te ayuda a
                    ver las cosas desde ángulos que quizás no habías considerado.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { num: "78", label: "Cartas en español", color: "text-primary" },
                  { num: "5", label: "Tipos de lectura", color: "text-accent" },
                  { num: "∞", label: "Lecturas gratis", color: "text-secondary" },
                  { num: "0", label: "Registro necesario", color: "text-success" },
                ].map(({ num, label, color }) => (
                  <div
                    key={label}
                    className="card-surface p-4 rounded-xl text-center group transition-[border-color,transform] duration-200 ease-out-expo hover:border-primary/30 hover:scale-[1.02] motion-reduce:hover:scale-100"
                  >
                    <p className={`font-display text-2xl sm:text-3xl font-bold ${color} mb-1 transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100`}>
                      {num}
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══ HOW IT WORKS ═══ */}
        <motion.section
          id="como-funciona"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="scroll-mt-20"
        >
          <motion.div variants={item} className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white/95 mb-2">
              ¿Cómo funciona?
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
              No hay ciencia oculta (bueno, un poquito). Tres pasos y listo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {steps.map(({ num, icon, title, description }, i) => (
              <motion.div
                key={num}
                variants={item}
                className="relative card-surface p-5 sm:p-6 rounded-2xl flex flex-col gap-3 group overflow-hidden transition-[border-color,transform] duration-200 ease-out-expo hover:border-primary/40 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <span className="absolute top-3 right-3 text-4xl sm:text-5xl font-black text-white/[0.04] select-none font-display">
                  {num}
                </span>
                <span className="text-3xl transition-transform duration-200 ease-out-expo group-hover:scale-110 motion-reduce:group-hover:scale-100">
                  {icon}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white/90">{title}</h3>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ PREPARATION TIPS ═══ */}
        <motion.section
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_right,_rgba(236,72,153,0.2),transparent_60%)] blur-2xl" />
          </div>

          <motion.div variants={item} className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white/95 mb-2">
              Prepárate para tu lectura
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
              Un par de cositas que hacen la diferencia entre una lectura &quot;meh&quot; y una que te deje pensando.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: "🌬️",
                title: "Respira",
                description: "Busca un lugar tranquilo, pon música suave si quieres y date un par de inhalaciones profundas. Tu energía importa.",
              },
              {
                icon: "🎯",
                title: "Enfoca tu intención",
                description: "Piensa en una situación concreta. Evita preguntas vagas o hacer mil a la vez. Mientras más clara la pregunta, más potente la lectura.",
              },
              {
                icon: "🤲",
                title: "Confía en el proceso",
                description: "El tarot no adivina el futuro, pero sí te ayuda a ver patrones, opciones y caminos que quizás no estabas mirando.",
              },
            ].map(({ icon, title, description }) => (
              <motion.div
                key={title}
                variants={item}
                className="card-surface p-5 sm:p-6 rounded-2xl flex flex-col gap-3 group transition-[border-color,transform] duration-200 ease-out-expo hover:border-accent/30 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <span className="text-3xl transition-transform duration-200 ease-out-expo group-hover:scale-110 motion-reduce:group-hover:scale-100">
                  {icon}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white/90">{title}</h3>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FAQ ═══ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          <motion.div variants={item} className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white/95 mb-2">
              Preguntas frecuentes
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
              Todo lo que necesitas saber antes de sacar tu primera carta.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map(({ q, a }) => (
              <motion.div
                key={q}
                variants={item}
                className="card-surface p-4 sm:p-5 rounded-2xl group transition-[border-color,color] duration-200 hover:border-primary/30"
              >
                <p className="font-semibold text-sm sm:text-base text-white/85 mb-2 transition-colors duration-200 group-hover:text-primary/90">
                  {q}
                </p>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FINAL CTA ═══ */}
        <motion.section
          className="relative text-center pb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <div className="animate-hero-glow absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.3),transparent_55%)] blur-3xl motion-reduce:animate-none" />
          </div>

          <motion.h2 variants={item} className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white/95 mb-3">
            ¿Lista/o para descubrir qué dicen las cartas?
          </motion.h2>
          <motion.p variants={item} className="text-sm sm:text-base text-white/50 mb-6 max-w-md mx-auto">
            Sin drama, sin registro, sin costo. Solo tú, las cartas y el Mago Xavi.
          </motion.p>
          <motion.div variants={item}>
            <Link
              href="/dashboard"
              className="inline-block btn-primary text-white text-base sm:text-lg px-10 py-3.5 shadow-lg shadow-primary/30"
            >
              Empezar ahora
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
