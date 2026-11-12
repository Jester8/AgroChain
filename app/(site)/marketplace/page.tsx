import type { Metadata } from "next";
import Link from "next/link";
import { Info, PackageSearch, PartyPopper } from "lucide-react";
import { ListingCard } from "@/components/market/listing-card";
import { MarketFilters } from "@/components/market/filters";
import { categories, type Category } from "@/lib/data/listings";
import { getListings, type ListingFilters } from "@/lib/api";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Marketplace: verified produce from Nigerian farms",
  description:
    "Buy yam, rice, ginger, tomatoes, cocoa, sesame and more directly from verified Nigerian farmers and cooperatives, with origin and grade on record.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function MarketplacePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const category = categories.some((c) => c.value === str(sp.category)) ? (str(sp.category) as Category) : undefined;
  const sort = (["newest", "price-asc", "price-desc"] as const).find((s) => s === str(sp.sort));
  const filters: ListingFilters = {
    q: str(sp.q),
    category,
    state: str(sp.state),
    verified: str(sp.verified) === "true",
    sort,
  };
  const { items, total, source } = await getListings(filters);

  const chipHref = (value?: Category) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries(filters)) if (v && k !== "category") next.set(k, String(v));
    if (value) next.set("category", value);
    const qs = next.toString();
    return qs ? `/marketplace?${qs}` : "/marketplace";
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100">
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-12 lg:pt-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf-600">Marketplace</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] text-ink-900 sm:text-5xl">
            Buy direct from Nigerian farms, <span className="text-forest-700">with proof.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">
            Every verified listing carries its harvest passport: where it grew, who grew it, and how it was graded.
          </p>
          <MarketFilters initial={filters} />
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-ink-900/8 bg-cream-50/90 backdrop-blur-xl lg:top-[72px]">
        <nav aria-label="Categories" className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {[{ value: undefined, label: "All produce" }, ...categories].map((c) => {
            const active = c.value === category;
            return (
              <Link
                key={c.label}
                href={chipHref(c.value)}
                scroll={false}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active ? "bg-forest-800 text-cream-50" : "bg-white text-ink-700 ring-1 ring-ink-900/10 hover:ring-ink-900/25",
                )}
              >
                {c.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {str(sp.welcome) && (
          <p className="mb-6 flex items-start gap-2.5 rounded-2xl bg-forest-800 px-4 py-3 text-sm text-cream-50">
            <PartyPopper className="mt-0.5 size-4 shrink-0 text-gold-400" />
            <span>
              <strong className="font-bold">Welcome to AgroChain! Your account is ready.</strong> Browse verified produce below and make your first offer.
            </span>
          </p>
        )}
        {source === "sample" && (
          <p className="mb-8 flex items-start gap-2.5 rounded-2xl border border-gold-500/30 bg-gold-100 px-4 py-3 text-sm text-ink-700">
            <Info className="mt-0.5 size-4 shrink-0 text-gold-600" />
            <span>
              <strong className="font-bold text-ink-900">Marketplace preview.</strong> These are sample listings with illustrative
              prices while we onboard our first farmers and cooperatives.
            </span>
          </p>
        )}

        <p className="text-sm font-semibold text-ink-500">
          {total} {total === 1 ? "listing" : "listings"}
          {filters.state && ` in ${filters.state}`}
        </p>

        {items.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-[1.75rem] border border-dashed border-ink-900/15 bg-white px-6 py-20 text-center">
            <PackageSearch className="size-10 text-ink-300" strokeWidth={1.5} />
            <h2 className="mt-4 text-xl font-bold text-ink-900">No produce matches that search</h2>
            <p className="mt-2 max-w-sm text-ink-600">Try another state or category, or tell us what you&apos;re looking for and we&apos;ll find a farmer.</p>
            <Link href="/marketplace" className="mt-6 text-sm font-bold text-forest-700 underline-offset-4 hover:underline">
              Clear all filters
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
