import { DailyCardSpread } from "@/components/spreads/DailyCard";

export default function DailyReadingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Carta del Día
      </h1>
      <DailyCardSpread />
    </div>
  );
}
