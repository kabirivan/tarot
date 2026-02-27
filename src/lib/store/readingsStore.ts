import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reading } from "@/types/tarot";

interface ReadingsState {
  readings: Reading[];
  addReading: (reading: Reading) => void;
  clearHistory: () => void;
}

export const useReadingsStore = create<ReadingsState>()(
  persist(
    (set) => ({
      readings: [],
      addReading: (reading) =>
        set((state) => ({
          readings: [
            { ...reading, createdAt: new Date().toISOString() },
            ...state.readings,
          ].slice(0, 50),
        })),
      clearHistory: () => set({ readings: [] }),
    }),
    { name: "mystic-tarot-readings" }
  )
);
