const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatNaira(amount: number) {
  return naira.format(amount).replace("NGN", "₦").replace(/\s/g, "");
}

/** Compact form for tickers and tight spaces: ₦8.6m, ₦145k. */
export function formatNairaCompact(amount: number) {
  if (amount >= 1_000_000) return `₦${+(amount / 1_000_000).toFixed(1)}m`;
  if (amount >= 10_000) return `₦${Math.round(amount / 1000)}k`;
  return formatNaira(amount);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
