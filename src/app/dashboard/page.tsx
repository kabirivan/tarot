"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RecentReadings } from "@/components/dashboard/RecentReadings";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.19, 1, 0.22, 1] },
  },
};

const spreads = [
  {
    href: "/reading/daily",
    icon: "🌅",
    title: "Carta del Día",
    description: "Orientación rápida para hoy",
  },
  {
    href: "/reading/three-card",
    icon: "🎴",
    title: "3 Cartas",
    description: "Pasado, presente y futuro",
  },
  {
    href: "/reading/celtic-cross",
    icon: "🔮",
    title: "Cruz Celta",
    description: "Lectura profunda de 10 cartas",
  },
  {
    href: "/reading/yes-no",
    icon: "❓",
    title: "Sí / No",
    description: "Una respuesta rápida a una pregunta concreta",
    soon: true,
  },
  {
    href: "/reading/question",
    icon: "📝",
    title: "Pregunta específica",
    description: "Una lectura centrada en una sola duda",
    soon: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-white/50 text-sm">Elige un tipo de lectura para comenzar.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {spreads.map(({ href, icon, title, description, soon }) => {
          const CardContent = (
            <>
              <span className="text-4xl transition-transform duration-200 ease-out-expo group-hover:scale-110 motion-reduce:group-hover:scale-100">
                {icon}
              </span>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-semibold text-lg">{title}</h2>
                {soon && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-accent/20 text-accent/95">
                    Muy pronto
                  </span>
                )}
              </div>
              <p className="text-sm text-white/50 text-center">{description}</p>
            </>
          );

          if (soon) {
            return (
              <motion.div
                key={href}
                variants={item}
                className="card-surface p-6 rounded-2xl opacity-60 cursor-not-allowed flex flex-col items-center gap-3 group"
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
                className="card-surface p-6 rounded-2xl flex flex-col items-center gap-3 group block transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out-expo hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-[0.99] motion-reduce:hover:translate-y-0"
              >
                {CardContent}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <RecentReadings />
      </div>
    </div>
  );
}
