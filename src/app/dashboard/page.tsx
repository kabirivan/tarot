import Link from "next/link";
import { RecentReadings } from "@/components/dashboard/RecentReadings";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-white/70 mb-8">
        Elige un tipo de lectura para comenzar.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Link
          href="/reading/daily"
          className="card-surface p-6 rounded-2xl hover:border-primary/50 transition flex flex-col items-center gap-3 group"
        >
          <span className="text-4xl group-hover:scale-110 transition">🌅</span>
          <h2 className="font-semibold text-lg">Carta del Día</h2>
          <p className="text-sm text-white/60 text-center">
            Orientación rápida para hoy
          </p>
        </Link>
        <Link
          href="/reading/three-card"
          className="card-surface p-6 rounded-2xl hover:border-primary/50 transition flex flex-col items-center gap-3 group"
        >
          <span className="text-4xl group-hover:scale-110 transition">🎴</span>
          <h2 className="font-semibold text-lg">3 Cartas</h2>
          <p className="text-sm text-white/60 text-center">
            Pasado, presente y futuro
          </p>
        </Link>
        <Link
          href="/reading/celtic-cross"
          className="card-surface p-6 rounded-2xl hover:border-primary/50 transition flex flex-col items-center gap-3 group"
        >
          <span className="text-4xl group-hover:scale-110 transition">✝️</span>
          <h2 className="font-semibold text-lg">Cruz Celta</h2>
          <p className="text-sm text-white/60 text-center">
            Lectura profunda de 10 cartas
          </p>
        </Link>
      </div>
      <RecentReadings />
    </div>
  );
}
