import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard, postTone } from "@/components/blog/post-card";
import { Photo } from "@/components/ui/photo";
import { ButtonLink } from "@/components/ui/button";
import { getPost, getPosts } from "@/lib/api";
import { posts as samplePosts, type Block } from "@/lib/data/posts";
import { formatDate } from "@/lib/format";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return samplePosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "quote":
      return <blockquote key={i}>{block.text}</blockquote>;
    case "list":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-16">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900">
          <ArrowLeft className="size-4" /> Journal
        </Link>
        <p className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink-500">
          <span className="rounded-full bg-cream-200/70 px-3 py-1 text-forest-800">{post.category}</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readMinutes} min read</span>
        </p>
        <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] text-ink-900 sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-600">{post.excerpt}</p>
        <p className="mt-6 text-sm font-semibold text-ink-700">By {post.author}</p>
      </header>

      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <Photo
          src={post.cover}
          alt=""
          tone={postTone[post.category]}
          label={post.category}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="aspect-[16/9] rounded-[1.75rem]"
        />
      </div>

      <div className="prose-agro mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">{post.body.map(renderBlock)}</div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] bg-cream-100 p-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold text-ink-900">Grow with proof.</p>
            <p className="mt-1 text-ink-600">Create a free AgroChain account and start your harvest record.</p>
          </div>
          <ButtonLink href="/signup" className="shrink-0">Get started</ButtonLink>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl border-t border-ink-900/8 px-4 pb-4 pt-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-ink-900">Keep reading</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-6">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
