"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { api, ApiError } from "@/lib/client-api";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/format";

export function WaitlistForm({
  tone = "light",
  source,
  className,
}: {
  tone?: "light" | "dark";
  source: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      await api("/waitlist", { email, source });
      setState("done");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className={cn("flex items-center gap-2 text-sm font-semibold", tone === "dark" ? "text-leaf-400" : "text-forest-700", className)}>
        <span className="grid size-6 place-items-center rounded-full bg-leaf-500 text-forest-950"><Check className="size-3.5" /></span>
        You&apos;re on the list. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full p-1.5 transition focus-within:ring-2",
          tone === "dark" ? "bg-cream-50/8 ring-gold-400/60" : "bg-white shadow-[var(--shadow-soft)] ring-forest-700/30",
        )}
      >
        <label htmlFor={`wl-${source}`} className="sr-only">Email address</label>
        <input
          id={`wl-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "h-10 min-w-0 flex-1 bg-transparent pl-4 text-[0.95rem] outline-none",
            tone === "dark" ? "text-cream-50 placeholder:text-cream-100/40" : "text-ink-900 placeholder:text-ink-400",
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition disabled:opacity-70",
            tone === "dark" ? "bg-gold-400 text-ink-950 hover:bg-gold-500" : "bg-forest-800 text-cream-50 hover:bg-forest-700",
          )}
        >
          {state === "loading" ? <Spinner /> : <>Join <ArrowRight className="size-4" /></>}
        </button>
      </div>
      {error && <p role="alert" className={cn("mt-2 pl-4 text-sm", tone === "dark" ? "text-clay-100" : "text-clay-600")}>{error}</p>}
    </form>
  );
}
