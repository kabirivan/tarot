import Link from "next/link";
import { RecentReadings } from "@/components/dashboard/RecentReadings";

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
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-white/50 text-sm">Elige un tipo de lectura para comenzar.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {spreads.map(({ href, icon, title, description, soon }) => {
          const CardContent = (
            <>
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {icon}
              </span>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">{title}</h2>
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
              <div
                key={href}
                    className="card-surface p-6 rounded-2xl opacity-60 cursor-not-allowed flex flex-col items-center gap-3 group"
                aria-disabled="true"
              >
                {CardContent}
              </div>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className="card-surface p-6 rounded-2xl hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col items-center gap-3 group"
            >
              {CardContent}
            </Link>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <RecentReadings />
      </div>
    </div>
  );
}
