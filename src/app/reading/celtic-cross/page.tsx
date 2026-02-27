import { CelticCrossSpread } from "@/components/spreads/CelticCross";

export default function CelticCrossReadingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Cruz Celta
      </h1>
      <CelticCrossSpread />
    </div>
  );
}
