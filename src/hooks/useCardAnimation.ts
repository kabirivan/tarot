"use client";

import { useState, useCallback } from "react";

export function useCardAnimation(delayMs = 80) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const flip = useCallback((index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: true }));
  }, []);

  const flipAll = useCallback(
    (count: number) => {
      let i = 0;
      const id = setInterval(() => {
        setFlipped((prev) => ({ ...prev, [i]: true }));
        i++;
        if (i >= count) clearInterval(id);
      }, delayMs);
      return () => clearInterval(id);
    },
    [delayMs]
  );

  const reset = useCallback(() => setFlipped({}), []);

  const isFlipped = useCallback(
    (index: number) => flipped[index] ?? false,
    [flipped]
  );

  return { flipped, flip, flipAll, reset, isFlipped };
}
