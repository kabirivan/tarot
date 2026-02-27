"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="h-[52px] sticky top-0 z-50 bg-dark-surface/70 backdrop-blur-md border-b border-white/[0.08] flex-shrink-0">
      <div className="h-full max-w-7xl mx-auto px-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight"
        >
          🌙 Mystic Tarot
        </Link>
        <nav className="flex gap-1">
          {[
            { href: "/dashboard", label: "Inicio" },
            { href: "/history", label: "Historial" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-all duration-200",
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
