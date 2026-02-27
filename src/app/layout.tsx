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
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}
