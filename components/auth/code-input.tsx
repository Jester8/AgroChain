"use client";

import { useRef } from "react";
import { cn } from "@/lib/format";

/** One box per digit. Typing advances, Backspace steps back, and pasting a whole code fills every box. */
export function CodeInput({
  length,
  value,
  onChange,
  onComplete,
  autoFocus,
}: {
  length: number;
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
}) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function update(i: number, raw: string) {
    const clean = raw.replace(/\D/g, "");
    let next: string;
    if (clean.length > 1) {
      next = clean.slice(0, length);
      inputs.current[Math.min(next.length, length - 1)]?.focus();
    } else {
      const arr = [...digits];
      arr[i] = clean;
      next = arr.join("").slice(0, length);
      if (clean && i < length - 1) inputs.current[i + 1]?.focus();
    }
    onChange(next);
    if (next.length === length) onComplete?.(next);
  }

  return (
    <fieldset>
      <legend className="sr-only">{length}-digit code</legend>
      <div className="flex justify-center gap-3">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={d}
            onChange={(e) => update(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !d && i > 0) inputs.current[i - 1]?.focus();
            }}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={length}
            aria-label={`Digit ${i + 1}`}
            autoFocus={autoFocus && i === 0}
            className={cn(
              "h-16 w-full min-w-0 max-w-20 flex-1 rounded-2xl border bg-white text-center text-2xl font-extrabold text-ink-900 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-700/10",
              d ? "border-forest-700/40" : "border-ink-900/12",
            )}
          />
        ))}
      </div>
    </fieldset>
  );
}

