import "server-only";
import { listings as sampleListings, type Category, type Listing } from "./data/listings";
import { posts as samplePosts, type Post } from "./data/posts";
import { marketPrices as samplePrices, type MarketPrice } from "./data/prices";

/**
 * Server-side data access. Reads from the AgroChain API on Render when
 * NEXT_PUBLIC_API_URL is set and reachable; otherwise falls back to the bundled
 * sample data so pages always render.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export type Source = "live" | "sample";

async function fromApi<T>(path: string, revalidate = 60): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export type ListingFilters = {
  q?: string;
  category?: Category;
  state?: string;
  verified?: boolean;
  sort?: "newest" | "price-asc" | "price-desc";
};

export async function getListings(filters: ListingFilters = {}) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.state) params.set("state", filters.state);
  if (filters.verified) params.set("verified", "true");
  if (filters.sort) params.set("sort", filters.sort);

  const live = await fromApi<{ items: Listing[]; total: number }>(`/listings?${params}`, 30);
  if (live) return { ...live, source: "live" as Source };

  const q = filters.q?.toLowerCase().trim();
  let items = sampleListings.filter(
    (l) =>
      (!filters.category || l.category === filters.category) &&
      (!filters.state || l.state === filters.state) &&
      (!filters.verified || l.verified) &&
      (!q ||
        [l.title, l.localName, l.state, l.lga, l.seller.name]
          .filter(Boolean)
          .some((s) => s!.toLowerCase().includes(q))),
  );
  if (filters.sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  else if (filters.sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  else items = [...items].sort((a, b) => b.harvestedOn.localeCompare(a.harvestedOn));
  return { items, total: items.length, source: "sample" as Source };
}

export async function getListing(slug: string) {
  const live = await fromApi<Listing>(`/listings/${encodeURIComponent(slug)}`, 30);
  if (live) return live;
  return sampleListings.find((l) => l.slug === slug) ?? null;
}

export async function getPosts() {
  const live = await fromApi<Post[]>("/posts", 300);
  const items = live ?? samplePosts;
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string) {
  const live = await fromApi<Post>(`/posts/${encodeURIComponent(slug)}`, 300);
  if (live) return live;
  return samplePosts.find((p) => p.slug === slug) ?? null;
}

export async function getMarketPrices(): Promise<MarketPrice[]> {
  return (await fromApi<MarketPrice[]>("/market/prices", 600)) ?? samplePrices;
}
