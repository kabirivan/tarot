"use client";

import { useRef, useState } from "react";
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
  sm: "w-20 h-[140px] sm:w-24 sm:h-[168px]",
  md: "w-28 h-[196px] sm:w-36 sm:h-[252px]",
  lg: "w-36 h-[252px] sm:w-44 sm:h-[308px]",
};

export function HolographicCard({
  card,
  onClick,
  revealed = true,
  className,
  size = "md",
}: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse({ x: 0.5, y: 0.5 });

  const displayName = card.nameEs ?? card.name;
  const meaning = card.reversedDrawn ? card.reversed : card.upright;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] holographic holographic-glow",
        sizeClasses[size],
        className
      )}
      style={{
        transform: `perspective(800px) rotateX(${(mouse.y - 0.5) * -8}deg) rotateY(${(mouse.x - 0.5) * 8}deg)`,
      }}
    >
      <div className="holographic-card-inner absolute inset-0 card-surface flex flex-col items-center justify-center p-2">
        {revealed ? (
          <>
            <div className="relative w-full h-full min-h-[80%] rounded-lg overflow-hidden bg-dark/50">
              <Image
                src={card.image}
                alt={displayName}
                fill
                className={cn(
                  "object-contain",
                  card.reversedDrawn && "rotate-180"
                )}
                sizes="(max-width: 640px) 144px, 176px"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className = "absolute inset-0 flex items-center justify-center text-center text-xs font-medium text-primary px-1";
                    fallback.textContent = displayName;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <p className="text-[10px] sm:text-xs text-center text-white/90 mt-1 truncate w-full">
              {displayName}
            </p>
            {card.reversedDrawn && (
              <span className="text-[9px] text-accent">Invertida</span>
            )}
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
