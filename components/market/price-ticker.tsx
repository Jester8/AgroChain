import { TrendingDown, TrendingUp } from "lucide-react";
import type { MarketPrice } from "@/lib/data/prices";
import { formatNaira } from "@/lib/format";

/** Scrolling market board of produce prices from major Nigerian markets. */
export function PriceTicker({ prices }: { prices: MarketPrice[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {prices.map((p) => {
        const up = p.change >= 0;
        return (
          <li key={`${p.commodity}-${p.market}`} className="flex items-center gap-3 whitespace-nowrap px-6 text-sm">
            <span className="font-bold text-cream-50">{p.commodity}</span>
            <span className="text-cream-100/50">{p.market}</span>
            <span className="font-semibold tabular-nums text-cream-50">
              {formatNaira(p.price)}
              <span className="text-cream-100/50">/{p.unit}</span>
            </span>
            <span className={`inline-flex items-center gap-0.5 text-xs font-bold tabular-nums ${up ? "text-leaf-400" : "text-clay-100"}`}>
              {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
              {up ? "+" : ""}
              {p.change.toFixed(1)}%
            </span>
            <span aria-hidden className="ml-3 size-1 rounded-full bg-gold-500" />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative flex items-stretch overflow-hidden bg-forest-900">
      <div className="relative z-10 flex shrink-0 items-center gap-2 bg-gold-400 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-950 sm:px-5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-forest-700 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-forest-800" />
        </span>
        Market board
      </div>
      <div className="group flex min-w-0 flex-1 py-3.5 [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
