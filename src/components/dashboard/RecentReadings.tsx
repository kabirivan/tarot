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

export function RecentReadings() {
  const readings = useReadingsStore((s) => s.readings);

  if (readings.length === 0) return null;

  return (
    <section className="card-surface p-6 rounded-2xl transition-[border-color] duration-200 hover:border-white/15">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg">Lecturas recientes</h2>
        <Link
          href="/history"
          className="text-sm text-primary hover:text-primary/90 min-h-[44px] min-w-[44px] inline-flex items-center justify-center -m-2 px-2 transition-colors duration-200 hover:underline"
        >
          Ver todo
        </Link>
      </div>
      <ul className="space-y-2">
        {readings.slice(0, 5).map((r, i) => (
          <li
            key={r.createdAt ?? i}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 transition-colors duration-150 hover:text-white/90"
          >
            <span className="text-white/80">
              {spreadLabels[r.spreadType] ?? r.spreadType} •{" "}
              {r.cards[0]?.card.nameEs ?? r.cards[0]?.card.name}
            </span>
            <span className="text-xs text-white/50">
              {r.createdAt
                ? new Date(r.createdAt).toLocaleDateString("es", {
                    day: "numeric",
                    month: "short",
                  })
                : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
