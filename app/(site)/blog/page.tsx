import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard, postTone } from "@/components/blog/post-card";
import { Photo } from "@/components/ui/photo";
import { WaitlistForm } from "@/components/site/waitlist-form";
import { getPosts } from "@/lib/api";
import { postCategories } from "@/lib/data/posts";
import { cn, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Journal: farmer stories, market notes and guides",
  description: "Stories from Nigerian farms, notes on produce markets from Mile 12 to Dawanau, and practical guides for farmers and buyers.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const posts = await getPosts();
  const active = postCategories.find((c) => c === category);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const list = active ? posts.filter((p) => p.category === active) : posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <section className="border-b border-ink-900/8 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf-600">The AgroChain journal</p>
              <h1 className="mt-3 text-balance text-5xl font-extrabold leading-[1] tracking-[-0.05em] text-ink-900 sm:text-6xl">
                Notes from the field.
              </h1>
            </div>
            <div className="max-w-sm">
              <p className="text-ink-600">Farmer stories, market notes and practical guides, once a month, in your inbox.</p>
              <WaitlistForm source="journal" className="mt-4" />
            </div>
          </div>

          {featured && !active && (
            <Link href={`/blog/${featured.slug}`} className="group mt-14 grid overflow-hidden rounded-[2rem] bg-forest-900 text-cream-50 lg:grid-cols-2">
              <Photo
                src={featured.cover}
                alt=""
                tone={postTone[featured.category]}
                label={featured.category}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="relative flex flex-col justify-center p-8 sm:p-12">
                <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Featured · {featured.category}</p>
                <h2 className="relative mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-4xl">{featured.title}</h2>
                <p className="relative mt-4 text-lg leading-relaxed text-cream-100/70">{featured.excerpt}</p>
                <p className="relative mt-8 flex items-center gap-2 text-sm font-bold text-gold-400">
                  Read the story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  <span className="ml-auto font-medium text-cream-100/50">{formatDate(featured.publishedAt)} · {featured.readMinutes} min</span>
                </p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <nav aria-label="Journal categories" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {[undefined, ...postCategories].map((c) => (
            <Link
              key={c ?? "all"}
              href={c ? `/blog?category=${encodeURIComponent(c)}` : "/blog"}
              scroll={false}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                c === active ? "bg-forest-800 text-cream-50" : "bg-white text-ink-700 ring-1 ring-ink-900/10 hover:ring-ink-900/25",
              )}
            >
              {c ?? "All stories"}
            </Link>
          ))}
        </nav>
        {list.length > 0 ? (
          <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-ink-600">No stories in this category yet. Check back soon.</p>
        )}
      </section>
    </>
  );
}
