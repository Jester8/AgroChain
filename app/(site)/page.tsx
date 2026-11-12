import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { CtaBand, HowItWorks, Problem, WhoWeServe } from "@/components/home/sections";
import { PriceTicker } from "@/components/market/price-ticker";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { getMarketPrices, getPosts } from "@/lib/api";

export default async function HomePage() {
  const [prices, posts] = await Promise.all([getMarketPrices(), getPosts()]);

  return (
    <>
      <Hero />
      <PriceTicker prices={prices} />
      <Problem />
      <HowItWorks />

      <WhoWeServe />

      <section className="overflow-hidden bg-white pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="The journal" title="Notes from the field and the market." />
            <ButtonLink href="/blog" variant="outline" className="shrink-0 self-start sm:self-auto">
              Read the journal <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <Carousel label="Latest from the journal" className="mt-14">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </Carousel>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
