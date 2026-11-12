import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft green glow behind the headline */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-leaf-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 lg:pb-16 lg:pt-24">
        <h1 className="animate-rise text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-forest-900 sm:text-6xl lg:text-7xl">
          Your harvest, <span className="text-leaf-600">proven.</span>
          <br />
          Your price, <span className="text-leaf-600">fair.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl animate-rise text-pretty text-lg leading-relaxed text-ink-600 [animation-delay:100ms] sm:text-xl">
          AgroChain gives farmers a verified record of every harvest, and connects them to buyers who pay what it&apos;s really worth.
        </p>

        <div className="mt-10 flex animate-rise flex-col justify-center gap-3 [animation-delay:200ms] sm:flex-row">
          <ButtonLink href="/signup" size="lg">
            Sell your harvest <ArrowRight className="size-5" />
          </ButtonLink>
          <ButtonLink href="/marketplace" variant="outline" size="lg">
            Browse the marketplace
          </ButtonLink>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl animate-rise px-4 pb-16 [animation-delay:300ms] sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-forest-800 shadow-[var(--shadow-lift)] sm:aspect-[21/9]">
          <Image
            src="/img/main.jpg"
            alt="A smiling farmer tending his maize field"
            fill
            priority
            quality={85}
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover object-[30%_35%]"
          />
        </div>
      </div>
    </section>
  );
}
