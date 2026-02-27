"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 card-surface border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          🌙 Mystic Tarot
        </Link>
        <nav className="flex gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Inicio
          </Link>
          <Link
            href="/history"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Historial
          </Link>
        </nav>
      </div>
    </header>
  );
}
