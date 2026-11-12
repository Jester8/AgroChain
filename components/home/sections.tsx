import Image from "next/image";
import {
  ArrowRight,
  ClipboardCheck,
  Landmark,
  ShieldCheck,
  Smartphone,
  Sprout,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/reveal";

/* ------------------------------------------------------------------ */

const gaps = [
  { title: "No proof of origin", body: "Buyers can't tell where produce really came from, so every farmer gets the same low price." },
  { title: "No harvest history", body: "Years of good farming leave no record. Every season, a farmer starts from zero." },
  { title: "No shared quality standard", body: "Grade and moisture are argued at the gate, and produce is rejected after a long, costly trip." },
  { title: "No trusted identity", body: "Without a track record, lenders and insurers can't say yes, even to the best farmers." },
];

export function Problem() {
  return (
    <section className="bg-cream-100 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative aspect-[5/6] overflow-hidden rounded-[2rem]">
          <Image
            src="/img/more.jpg"
            alt="Two farmers walking back from the field carrying a woven basket and water containers"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="The problem"
            title="Farmers feed the nation. The system doesn't pay them like it."
            intro="Produce is underpriced, rejected or exploited. Not because it's poor, but because it can't be proven. When nobody can check, everybody discounts."
          />
          <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {gaps.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <dt className="flex items-center gap-2.5 font-bold text-ink-900">
                  <span className="grid size-6 place-items-center rounded-full bg-forest-800 text-[0.7rem] font-extrabold text-white">
                    {i + 1}
                  </span>
                  {g.title}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{g.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Smartphone,
    title: "Register with your phone",
    body: "Sign up in minutes. Add your farm location, crops and cooperative. No paperwork, no fees.",
  },
  {
    icon: ClipboardCheck,
    title: "Log and verify each harvest",
    body: "Record quantity, grade and photos. A field agent or your co-op lead confirms it, and it becomes part of your harvest record.",
  },
  {
    icon: Store,
    title: "Sell with proof",
    body: "List on the marketplace. Buyers see your verified record and make offers, and you choose the one that's fair.",
  },
  {
    icon: Sprout,
    title: "Grow your record",
    body: "Every delivered order builds your reputation, opening doors to input loans, insurance and bigger contracts.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="How it works"
            title="From farm gate to fair price in four steps."
            intro="Designed around the way farming already works: phones, cooperatives and trusted people on the ground."
          />
          <ButtonLink href="/signup" variant="outline" className="self-start lg:self-auto">
            Start for free <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <Carousel label="How AgroChain works" className="mt-14">
          {steps.map((s, i) => (
            <article key={s.title} className="flex h-full flex-col rounded-[1.75rem] border border-forest-700/10 bg-cream-100 p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-forest-800 text-white">
                  <s.icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="text-5xl font-extrabold tracking-[-0.05em] text-forest-700/15">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-xl font-bold tracking-[-0.025em] text-ink-900">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{s.body}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const audiences = [
  { icon: Users, title: "Farmers & cooperatives", body: "Prove your harvest, pool volume with your co-op and sell to buyers beyond your local market." },
  { icon: Store, title: "Buyers, processors & exporters", body: "Source verified produce with traceable origin, grade and moisture, before the truck leaves." },
  { icon: Truck, title: "Aggregators & logistics", body: "Coordinate pickups, match loads to routes and cut losses between farm and market." },
  { icon: Landmark, title: "Lenders & insurers", body: "Underwrite with real, farmer-permissioned production and sales history." },
  { icon: ShieldCheck, title: "Government & partners", body: "Target inputs and subsidies to real farmers, and measure impact with data you can trust." },
];

export function WhoWeServe() {
  return (
    <section className="overflow-hidden bg-forest-900 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading tone="light" eyebrow="Who it's for" title="One trusted record. Everyone in the value chain benefits." />
        <Carousel label="Who AgroChain is for" tone="dark" className="mt-14">
          {audiences.map((a) => (
            <article key={a.title} className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 transition-colors hover:bg-white/[0.1] lg:p-8">
              <span className="grid size-12 place-items-center rounded-xl bg-leaf-400 text-forest-950">
                <a.icon className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 text-xl font-bold tracking-[-0.02em]">{a.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{a.body}</p>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function CtaBand() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-forest-800 px-6 py-14 text-center sm:px-12 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-leaf-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-leaf-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            Ready when your harvest is.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Join the farmers, cooperatives and buyers building a fairer market, one verified harvest at a time.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/signup" variant="light" size="lg">
              Create a free account <ArrowRight className="size-5" />
            </ButtonLink>
            <ButtonLink href="/marketplace" variant="dark-outline" size="lg">
              Browse the marketplace
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
