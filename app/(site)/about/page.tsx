import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/home/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "AgroChain is rebuilding trust in Nigerian agriculture, one farmer, one handshake and one verified harvest at a time.",
};

const pillars = [
  { word: "Proof", color: "text-forest-700", body: "Verified farmer profiles, production records, harvest confirmation and delivery history. A record that belongs to the farmer." },
  { word: "Pricing", color: "text-leaf-600", body: "Market-aligned price visibility, fewer layers between farm and buyer, and negotiation backed by data instead of guesswork." },
  { word: "Prosperity", color: "text-forest-600", body: "Steadier incomes, markets beyond the local buyer, and real pathways to credit, insurance and long-term partnerships." },
];

const principles = [
  { title: "Farmer-owned data", body: "Farmers own their records. Access is permission-based and purpose-driven, collected to empower, never to exploit." },
  { title: "Trust over hype", body: "We use technology where it earns trust, not to sound futuristic. If a farmer can't use it on a basic phone, it isn't finished." },
  { title: "Real people on the ground", body: "Field agents and cooperative leads verify what software alone can't. Relationships stay at the heart of the market." },
  { title: "Built to scale, not to break", body: "From a single cooperative in Ibadan to national agricultural networks. Modular, low-bandwidth and resilient." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream-50">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf-600">About AgroChain</p>
          <h1 className="mt-4 max-w-4xl text-balance text-5xl font-extrabold leading-[1] tracking-[-0.05em] text-ink-900 sm:text-6xl lg:text-7xl">
            Nigerian agriculture doesn&apos;t lack farmers. <span className="text-forest-700">It lacks trust.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-600">
            AgroChain is the trust and coordination layer for African agriculture, starting in Nigeria. We connect farmers, buyers,
            aggregators and institutions through verifiable records, fair pricing and trusted partnerships, without forcing
            complexity on farmers.
          </p>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-auto">
            <Image src="/img/more.jpg" alt="Farmers walking home from the field" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Why we exist"
              title="The problem isn't production. It's proof."
              intro="Nigerian farmers grow enormous amounts of food, yet much of it is underpriced, rejected or sold through long chains of middlemen. Buyers struggle to verify quality. Lenders have no data to lend against. Smallholders have no digital identity or track record."
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              We believe farmers deserve transparency, dignity and economic power. So we&apos;re building the simplest possible way to
              turn a good harvest into a trusted record, and a trusted record into a fair price.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-24 text-cream-50 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading tone="light" eyebrow="What we stand for" title="Proof. Pricing. Prosperity." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.word} delay={i * 0.08} className="rounded-[1.75rem] bg-cream-50 p-8 text-ink-900">
                <p className={`text-4xl font-extrabold tracking-[-0.045em] ${p.color}`}>{p.word}.</p>
                <p className="mt-4 leading-relaxed text-ink-600">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How we work" title="Principles we won't trade away." />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.06} className="border-t-2 border-forest-800 pt-6">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-ink-900">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{p.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20">
            <Photo
              src="/img/about/field-team.jpg"
              alt="The AgroChain field team with farmers"
              tone="forest"
              label="Our field team, in your LGA"
              sublabel="AgroChain"
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="aspect-[16/9] rounded-[2rem] sm:aspect-[21/9]"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <SectionHeading eyebrow="Talk to us" title="Farmers, buyers, partners: our door is open." />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: MapPin, label: "Visit", value: site.location },
              { icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
              { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
              { icon: MessageCircle, label: "WhatsApp", value: "Join our community", href: site.whatsappGroup },
            ].map((c) => {
              const inner = (
                <>
                  <c.icon className="size-5 text-forest-700" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">{c.label}</p>
                  <p className="mt-1 font-bold text-ink-900">{c.value}</p>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-[1.25rem] border border-ink-900/8 bg-cream-50 p-6 transition hover:border-forest-700/30">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="rounded-[1.25rem] border border-ink-900/8 bg-cream-50 p-6">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
