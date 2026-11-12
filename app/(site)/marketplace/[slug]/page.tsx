import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarDays, ChevronRight, Layers, MapPin, Package, ShieldCheck, Star } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { ListingCard, categoryLabel, categoryTone } from "@/components/market/listing-card";
import { OfferForm } from "@/components/market/offer-form";
import { getListing, getListings } from "@/lib/api";
import { listings as sampleListings } from "@/lib/data/listings";
import { formatDate, formatNaira } from "@/lib/format";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return sampleListings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const listing = await getListing((await params).slug);
  if (!listing) return {};
  return {
    title: `${listing.title}, ${listing.lga}, ${listing.state}`,
    description: `${formatNaira(listing.price)} per ${listing.unit}. ${listing.description.slice(0, 140)}`,
  };
}

export default async function ListingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();

  const { items: related } = await getListings({ category: listing.category });
  const more = related.filter((l) => l.id !== listing.id).slice(0, 4);

  const facts = [
    { icon: Package, label: "Minimum order", value: `${listing.minOrder.toLocaleString("en-NG")} × ${listing.unit}` },
    { icon: Layers, label: "Available", value: `${listing.available.toLocaleString("en-NG")} × ${listing.unit}` },
    { icon: CalendarDays, label: "Harvested", value: formatDate(listing.harvestedOn) },
    { icon: ShieldCheck, label: "Grade", value: `Grade ${listing.grade}` },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-ink-500">
          <Link href="/marketplace" className="hover:text-ink-900">Marketplace</Link>
          <ChevronRight className="size-4" />
          <Link href={`/marketplace?category=${listing.category}`} className="hover:text-ink-900">{categoryLabel(listing.category)}</Link>
          <ChevronRight className="size-4" />
          <span className="truncate text-ink-900">{listing.title}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-6 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-8">
        <div>
          <Photo
            src={listing.image}
            alt={`${listing.title} from ${listing.lga}, ${listing.state}`}
            tone={categoryTone[listing.category]}
            label={listing.title}
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] rounded-[1.75rem]"
          />

          <div className="mt-10">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-ink-900">About this produce</h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-600">{listing.description}</p>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-ink-900/8 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf-600">Harvest passport</p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.02em] text-ink-900">From farm to this listing</h2>
              </div>
              {listing.verified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-3 py-1.5 text-xs font-bold text-forest-700">
                  <BadgeCheck className="size-4" /> Verified
                </span>
              ) : (
                <span className="rounded-full bg-cream-200 px-3 py-1.5 text-xs font-bold text-ink-600">Awaiting verification</span>
              )}
            </div>
            <ol className="relative mt-7 space-y-6 before:absolute before:bottom-2 before:left-[0.6875rem] before:top-2 before:w-px before:bg-ink-900/10">
              {listing.trace.map((t) => (
                <li key={t.label} className="relative flex gap-4">
                  <span className="relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest-800 ring-4 ring-white">
                    <span className="size-2 rounded-full bg-gold-400" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{t.label}</p>
                    <p className="mt-0.5 text-sm text-ink-500">
                      {formatDate(t.date)} · {t.place}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-500">
            <MapPin className="size-4 text-leaf-600" /> {listing.lga}, {listing.state} State
          </p>
          <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-ink-900 sm:text-4xl">
            {listing.title}
          </h1>

          <p className="mt-6">
            <span className="text-4xl font-extrabold tracking-[-0.04em] text-forest-800">{formatNaira(listing.price)}</span>
            <span className="text-lg font-medium text-ink-500"> / {listing.unit}</span>
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-cream-100 p-4">
                <dt className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                  <f.icon className="size-3.5" /> {f.label}
                </dt>
                <dd className="mt-1 font-bold text-ink-900">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-ink-900/8 bg-white p-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-forest-800 text-lg font-extrabold text-cream-50">
              {listing.seller.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate font-bold text-ink-900">
                {listing.seller.name}
                {listing.seller.verified && <BadgeCheck className="size-4 shrink-0 text-leaf-600" aria-label="Verified seller" />}
              </p>
              <p className="text-sm text-ink-500">
                {listing.seller.type} · on AgroChain since {listing.seller.since}
              </p>
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1 font-bold text-ink-900">
                <Star className="size-4 fill-gold-400 text-gold-400" /> {listing.seller.rating.toFixed(1)}
              </p>
              <p className="text-xs text-ink-500">{listing.seller.trades} trades</p>
            </div>
          </div>

          <OfferForm listing={{ id: listing.id, slug: listing.slug, price: listing.price, unit: listing.unit, minOrder: listing.minOrder }} />
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-t border-ink-900/8 bg-cream-100 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-ink-900">More {categoryLabel(listing.category).toLowerCase()}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
