import Link from "next/link";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Photo, type Tone } from "@/components/ui/photo";
import { categories, type Category, type Listing } from "@/lib/data/listings";
import { formatNaira } from "@/lib/format";

export const categoryTone: Record<Category, Tone> = {
  tubers: "clay",
  grains: "gold",
  vegetables: "leaf",
  fruits: "leaf",
  "cash-crops": "forest",
  spices: "clay",
  oils: "gold",
};

export const categoryLabel = (c: Category) => categories.find((x) => x.value === c)?.label ?? c;

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/marketplace/${listing.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-ink-900/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative">
        <Photo
          src={listing.image}
          alt={`${listing.title} from ${listing.lga}, ${listing.state}`}
          tone={categoryTone[listing.category]}
          label={listing.title}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3]"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {listing.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-bold text-forest-800 shadow-sm backdrop-blur">
              <BadgeCheck className="size-3.5 text-leaf-600" /> Verified
            </span>
          )}
          <span className="rounded-full bg-ink-950/70 px-2.5 py-1 text-[0.7rem] font-bold text-cream-50 backdrop-blur">
            Grade {listing.grade}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
          <MapPin className="size-3.5 text-leaf-600" />
          {listing.lga}, {listing.state}
        </p>
        <h3 className="mt-2 text-[1.05rem] font-bold leading-snug tracking-[-0.02em] text-ink-900 group-hover:text-forest-700">
          {listing.title}
        </h3>
        <p className="mt-1 truncate text-sm text-ink-500">{listing.seller.name}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p>
            <span className="text-xl font-extrabold tracking-[-0.03em] text-forest-800">{formatNaira(listing.price)}</span>
            <span className="text-sm font-medium text-ink-500"> / {listing.unit}</span>
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ink-700">
            <Star className="size-3.5 fill-gold-400 text-gold-400" />
            {listing.seller.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
