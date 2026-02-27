import { ThreeCardSpread } from "@/components/spreads/ThreeCard";

export default function ThreeCardReadingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Pasado, Presente, Futuro
      </h1>
      <ThreeCardSpread />
    </div>
  );
}
