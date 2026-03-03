"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { TarotCard } from "@/types/tarot";

interface HolographicCardProps {
  card: TarotCard;
  onClick?: () => void;
  revealed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-24 h-[156px] sm:w-28 sm:h-[182px]",
  md: "w-32 h-[220px] sm:w-40 sm:h-[275px]",
  lg: "w-44 h-[302px] sm:w-52 sm:h-[357px]",
};

export function HolographicCard({
  card,
  onClick,
  revealed = true,
  className,
  size = "md",
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const displayName = card.nameEs ?? card.name;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;
    const ry = (mx - 0.5) * 16;
    const rx = (my - 0.5) * -16;

    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "holo-card cursor-pointer",
        size === "lg" && "holo-card-lg",
        sizeClasses[size],
        className
      )}
    >
      <div className="holo-sparkle" />
      <div className="holo-border" />

      <div className="holo-content bg-dark-surface flex flex-col items-center justify-center p-2">
        {revealed ? (
          <>
            <div className="relative w-full flex-1 min-h-0 rounded-lg overflow-hidden bg-dark/60">
              <Image
                src={card.image}
                alt={displayName}
                fill
                className={cn(
                  "object-contain",
                  card.reversedDrawn && "rotate-180"
                )}
                sizes="(max-width: 640px) 160px, 192px"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "absolute inset-0 flex items-center justify-center text-center text-xs font-medium text-primary px-2";
                    fallback.textContent = displayName;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg">
            <span className="text-4xl opacity-80">✨</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function HolographicCardMeaning({ meaning }: { meaning: string }) {
  return (
    <p className="text-sm text-white/80 leading-relaxed mt-2 p-3 card-surface rounded-xl">
      {meaning}
    </p>
  );
}
