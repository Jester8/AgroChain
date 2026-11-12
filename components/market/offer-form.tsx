"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authApi, ApiError, hasSession } from "@/lib/client-api";
import { formatNaira } from "@/lib/format";

type Props = { listing: { id: string; slug: string; price: number; unit: string; minOrder: number } };

const inputClass =
  "h-12 w-full rounded-xl border border-ink-900/12 bg-white px-4 text-[0.95rem] font-semibold text-ink-900 outline-none transition focus:border-forest-700/40 focus:ring-2 focus:ring-forest-700/20";

export function OfferForm({ listing }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(listing.minOrder);
  const [price, setPrice] = useState(listing.price);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState("");

  const total = quantity * price;
  const belowMin = quantity < listing.minOrder;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (belowMin) return;
    setError("");
    const signInUrl = `/signin?next=${encodeURIComponent(`/marketplace/${listing.slug}`)}`;
    if (!hasSession()) {
      router.push(signInUrl);
      return;
    }
    setState("loading");
    try {
      await authApi(`/listings/${listing.id}/offers`, { quantity, pricePerUnit: price, ...(message.trim() && { message: message.trim() }) });
      setState("sent");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push(signInUrl);
        return;
      }
      setError(err instanceof ApiError ? err.message : "Could not send your offer.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="mt-6 rounded-[1.5rem] bg-forest-900 p-6 text-cream-50">
        <CheckCircle2 className="size-8 text-leaf-400" />
        <h3 className="mt-3 text-xl font-bold">Offer sent</h3>
        <p className="mt-1 text-cream-100/75">
          The seller has been notified. We&apos;ve emailed you a copy, and you&apos;ll get their reply by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 rounded-[1.5rem] border border-ink-900/8 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <h2 className="text-lg font-bold tracking-[-0.02em] text-ink-900">Make an offer</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-semibold text-ink-500">Quantity ({listing.unit})</span>
          <input
            type="number"
            inputMode="numeric"
            min={listing.minOrder}
            value={quantity || ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={`${inputClass} mt-1.5`}
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink-500">Your price (₦ / {listing.unit})</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={`${inputClass} mt-1.5`}
          />
        </label>
      </div>
      {belowMin && (
        <p className="mt-2 text-sm text-clay-600">Minimum order is {listing.minOrder.toLocaleString("en-NG")}.</p>
      )}
      <label className="mt-3 block">
        <span className="text-xs font-semibold text-ink-500">Message (optional)</span>
        <textarea
          rows={2}
          value={message}
          maxLength={500}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Delivery to Ikeja by Friday, crates preferred…"
          className="mt-1.5 w-full resize-none rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-[0.95rem] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-forest-700/40 focus:ring-2 focus:ring-forest-700/20"
        />
      </label>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-cream-100 px-4 py-3">
        <span className="text-sm font-semibold text-ink-600">Offer total</span>
        <span className="text-lg font-extrabold tabular-nums text-forest-800">{formatNaira(total || 0)}</span>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-clay-600">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="mt-4 w-full" disabled={state === "loading" || belowMin || !price}>
        {state === "loading" ? <Spinner /> : "Send offer"}
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-ink-500">
        <Lock className="size-3.5" /> No payment now. You only pay once the seller accepts.
      </p>
    </form>
  );
}
