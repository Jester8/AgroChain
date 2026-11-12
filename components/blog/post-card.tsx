import Link from "next/link";
import { Photo, type Tone } from "@/components/ui/photo";
import type { Post } from "@/lib/data/posts";
import { formatDate, cn } from "@/lib/format";

export const postTone: Record<Post["category"], Tone> = {
  "Farmer stories": "clay",
  Markets: "gold",
  Guides: "leaf",
  Finance: "adire",
  Product: "forest",
};

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group flex flex-col", className)}>
      <Photo
        src={post.cover}
        alt=""
        tone={postTone[post.category]}
        label={post.category}
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="aspect-[16/10] rounded-[1.25rem]"
        imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="mt-5 flex items-center gap-3 text-xs font-semibold text-ink-500">
        <span className="rounded-full bg-cream-200/70 px-2.5 py-1 text-forest-800">{post.category}</span>
        <span>{formatDate(post.publishedAt)}</span>
        <span aria-hidden>·</span>
        <span>{post.readMinutes} min read</span>
      </div>
      <h3 className="mt-3 text-balance text-xl font-bold leading-snug tracking-[-0.025em] text-ink-900 transition-colors group-hover:text-forest-700">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-ink-600">{post.excerpt}</p>
    </Link>
  );
}
