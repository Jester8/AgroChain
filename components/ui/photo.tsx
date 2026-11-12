"use client";

import Image from "next/image";
import { useState } from "react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/format";

const palettes = {
  forest: "from-forest-700 to-forest-900 text-cream-50",
  leaf: "from-leaf-400 to-leaf-600 text-forest-950",
  gold: "from-gold-400 to-gold-600 text-ink-950",
  clay: "from-forest-500 to-forest-700 text-white",
  adire: "from-adire-800 to-adire-900 text-cream-50",
  cream: "from-cream-100 to-cream-300 text-forest-900",
} as const;

export type Tone = keyof typeof palettes;

/**
 * next/image with a designed fallback. Images listed in IMAGE_PROMPTS.md can be
 * dropped into /public at their planned paths and will replace the fallback.
 */
export function Photo({
  src,
  alt,
  tone = "forest",
  label,
  sublabel,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  tone?: Tone;
  label?: string;
  sublabel?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {failed ? (
        <div className={cn("absolute inset-0 bg-gradient-to-br", palettes[tone])} role="img" aria-label={alt}>
          <Sprout aria-hidden className="absolute -right-6 -top-6 size-40 opacity-10" strokeWidth={1.25} />
          {label && (
            <div className="absolute inset-x-5 bottom-6">
              {sublabel && <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] opacity-70">{sublabel}</p>}
              <p className="mt-1 text-xl font-extrabold leading-tight tracking-[-0.03em]">{label}</p>
            </div>
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
