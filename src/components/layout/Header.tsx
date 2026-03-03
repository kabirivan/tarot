"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="h-14 min-h-[52px] sticky top-0 z-50 bg-dark-surface/70 backdrop-blur-md border-b border-white/[0.08] flex-shrink-0 transition-shadow duration-200">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight min-h-[44px] min-w-[44px] inline-flex items-center transition-opacity duration-200 hover:opacity-90 active:opacity-95"
        >
          🌙 Mystic Tarot
        </Link>
        <nav className="flex gap-1" aria-label="Navegación principal">
          {[
            { href: "/dashboard", label: "Inicio" },
            { href: "/history", label: "Historial" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm transition-colors duration-200 ease-out",
                pathname === href
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
