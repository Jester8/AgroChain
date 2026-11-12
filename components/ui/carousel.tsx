"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";

/**
 * Horizontal slider built on native scroll-snap: swipe on touch screens,
 * arrow buttons (or trackpad) on desktop. `itemClassName` sets slide widths.
 */
export function Carousel({
  children,
  label,
  itemClassName = "w-[85%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]",
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  label: string;
  itemClassName?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);

  /** Scroll position of each slide, relative to the first one. */
  const positions = useCallback(() => {
    const el = track.current;
    if (!el) return [];
    const items = Array.from(el.children) as HTMLElement[];
    const origin = items[0]?.offsetLeft ?? 0;
    return items.map((item) => item.offsetLeft - origin);
  }, []);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const pos = positions();
    let nearest = 0;
    pos.forEach((p, i) => {
      if (Math.abs(p - el.scrollLeft) < Math.abs(pos[nearest] - el.scrollLeft)) nearest = i;
    });
    setActive(nearest);
  }, [positions]);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function goTo(i: number) {
    const el = track.current;
    const pos = positions();
    if (!el || !pos.length) return;
    el.scrollTo({ left: pos[Math.max(0, Math.min(i, pos.length - 1))], behavior: "smooth" });
  }

  const go = (dir: 1 | -1) => goTo(active + dir);

  const arrow = cn(
    "grid size-11 place-items-center rounded-full border transition disabled:pointer-events-none disabled:opacity-30",
    tone === "light"
      ? "border-ink-900/12 bg-white text-ink-900 hover:border-forest-700/40 hover:text-forest-700"
      : "border-white/20 text-white hover:bg-white/10",
  );

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {slides.map((child, i) => (
          <li key={i} className={cn("shrink-0 snap-start", itemClassName)} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
            {child}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-hidden>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active
                  ? cn("w-7", tone === "light" ? "bg-forest-700" : "bg-white")
                  : cn("w-1.5", tone === "light" ? "bg-ink-900/15" : "bg-white/25"),
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={!canPrev} className={arrow} aria-label="Previous">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={!canNext} className={arrow} aria-label="Next">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
