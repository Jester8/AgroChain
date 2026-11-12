"use client";

import { useRef } from "react";
import { Search } from "lucide-react";
import { nigerianStates } from "@/lib/site";
import type { ListingFilters } from "@/lib/api";

const selectClass =
  "h-12 w-full appearance-none rounded-full border border-ink-900/10 bg-white bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7064' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[position:right_1rem_center] bg-no-repeat pl-4 pr-10 text-[0.95rem] font-medium text-ink-900 outline-none transition focus:border-forest-700/40 focus:ring-2 focus:ring-forest-700/20";

/** Search + filter bar. A plain GET form, so it works without JavaScript; selects submit on change. */
export function MarketFilters({ initial }: { initial: ListingFilters }) {
  const form = useRef<HTMLFormElement>(null);
  const submit = () => form.current?.requestSubmit();

  return (
    <form ref={form} action="/marketplace" method="get" role="search" className="mt-8 grid gap-3 lg:grid-cols-[1fr_13rem_12rem_auto]">
      {initial.category && <input type="hidden" name="category" value={initial.category} />}
      <label className="relative">
        <span className="sr-only">Search produce</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          name="q"
          defaultValue={initial.q}
          placeholder="Search yam, rice, Kano, a cooperative…"
          className="h-12 w-full rounded-full border border-ink-900/10 bg-white pl-12 pr-4 text-[0.95rem] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-forest-700/40 focus:ring-2 focus:ring-forest-700/20"
        />
      </label>
      <label>
        <span className="sr-only">State</span>
        <select name="state" defaultValue={initial.state ?? ""} onChange={submit} className={selectClass}>
          <option value="">All states</option>
          {nigerianStates.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Sort by</span>
        <select name="sort" defaultValue={initial.sort ?? "newest"} onChange={submit} className={selectClass}>
          <option value="newest">Newest harvest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>
      <label className="flex h-12 cursor-pointer select-none items-center gap-3 rounded-full border border-ink-900/10 bg-white px-4 text-[0.95rem] font-semibold text-ink-900 has-[:checked]:border-forest-700/40 has-[:checked]:bg-leaf-100">
        <input
          type="checkbox"
          name="verified"
          value="true"
          defaultChecked={initial.verified}
          onChange={submit}
          className="size-4 accent-forest-700"
        />
        Verified only
      </label>
    </form>
  );
}
