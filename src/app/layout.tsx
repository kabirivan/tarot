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
      </body>
    </html>
  );
}
