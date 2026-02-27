"use client";

import Link from "next/link";
import { useReadingsStore } from "@/lib/store/readingsStore";

const spreadLabels: Record<string, string> = {
  daily: "Carta del Día",
  "three-card": "3 Cartas",
  "celtic-cross": "Cruz Celta",
  "yes-no": "Sí / No",
  question: "Pregunta",
  lunar: "Lunar",
};

export default function HistoryPage() {
  const { readings, clearHistory } = useReadingsStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Historial de lecturas</h1>
        {readings.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="text-sm text-accent hover:underline"
          >
            Borrar todo
          </button>
        )}
      </div>
      <p className="text-white/70 mb-6">
        Las lecturas se guardan en tu navegador. Sin registro ni base de datos.
      </p>
      {readings.length === 0 ? (
        <div className="card-surface p-8 rounded-2xl text-center">
          <p className="text-white/60 mb-4">Aún no hay lecturas guardadas.</p>
          <Link href="/dashboard" className="text-primary hover:underline">
            Ir al dashboard
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {readings.map((r, i) => (
            <li
              key={r.createdAt ?? i}
              className="card-surface p-4 rounded-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">
                  {spreadLabels[r.spreadType] ?? r.spreadType}
                </span>
                <span className="text-xs text-white/50">
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleString("es")
                    : ""}
                </span>
              </div>
              <ul className="text-sm text-white/80 space-y-1">
                {r.cards.map((rc, j) => (
                  <li key={j}>
                    {rc.positionMeaning ? `${rc.positionMeaning}: ` : ""}
                    {rc.card.nameEs ?? rc.card.name}
                    {rc.card.reversedDrawn ? " (invertida)" : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
