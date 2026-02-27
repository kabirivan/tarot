import type { Metadata } from "next";
import { MagicParticles } from "@/components/cards/MagicParticles";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mystic Tarot - Lectura de Tarot",
  description: "Una experiencia de lectura de tarot moderna y mística.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <MagicParticles />
        <Header />
        <main className="h-[calc(100dvh-52px)] overflow-y-auto overflow-x-hidden pb-16">
          {children}
        </main>
        <footer className="w-full py-2 text-center text-[10px] text-white/65 bg-black/40 border-t border-white/10 backdrop-blur-sm">
          Desarrollado por{" "}
          <a
            href="https://www.xavieraguas.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:text-accent transition-colors"
          >
            Xavier Aguas
          </a>
        </footer>
        <div className="fixed bottom-4 right-4 z-40 group">
          <div className="flex items-center justify-end gap-2">
            <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-w-xs text-[11px] text-white/80 bg-black/80 border border-white/15 rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg shadow-black/40">
              <p className="font-semibold text-primary/90 mb-1">
                ¿Cómo empezar con Mystic Tarot?
              </p>
              <p>
                1) Elige un tipo de lectura. 2) Respira y piensa en tu pregunta. 3) Toca las
                cartas que más te llamen y deja que el Mago Xavi te cuente la historia.
              </p>
            </div>
            <button
              type="button"
              aria-label="Ayuda para usar Mystic Tarot"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/25 bg-black/40 text-[12px] text-white/80 hover:bg-primary/70 hover:border-primary/80 hover:text-white shadow-lg shadow-black/40 backdrop-blur-sm transition"
            >
              ?
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
