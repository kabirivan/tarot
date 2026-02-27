"use client";

import { useCallback, useRef, useState } from "react";

export function useAudio(ambientSrc?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  const toggleAmbient = useCallback(() => {
    if (!ambientSrc || typeof window === "undefined") return;
    if (!ambientRef.current) {
      ambientRef.current = new Audio(ambientSrc);
      ambientRef.current.loop = true;
    }
    const audio = ambientRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [ambientSrc, isPlaying]);

  const playFlip = useCallback(() => {
    if (typeof window === "undefined") return;
    const a = new Audio("/audio/card-flip.mp3");
    a.volume = 0.3;
    a.play().catch(() => {});
  }, []);

  return { isPlaying, toggleAmbient, playFlip };
}
