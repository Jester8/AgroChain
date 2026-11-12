import { BadgeCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Photo } from "@/components/ui/photo";

/** Split-screen frame for sign-in, sign-up and recovery pages: image on the left, form on the right. */
export function AuthShell({
  title,
  subtitle,
  children,
  image,
  quote,
  wide,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  image: string;
  quote: { text: string; by: string };
  wide?: boolean;
}) {
  return (
    <div className="grid min-h-dvh bg-white lg:grid-cols-[minmax(0,0.9fr)_1fr]">
      <aside className="relative hidden overflow-hidden bg-forest-900 lg:block">
        <div className="sticky top-0 h-dvh">
          <Photo src={image} alt="" tone="forest" sizes="45vw" priority className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/30 to-forest-950/10" />
          <div className="absolute inset-x-10 bottom-14 text-white xl:inset-x-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <BadgeCheck className="size-4 text-leaf-400" /> Verified harvests. Fair prices.
            </div>
            <blockquote className="mt-6 text-balance text-3xl font-extrabold leading-[1.15] tracking-[-0.035em]">&ldquo;{quote.text}&rdquo;</blockquote>
            <p className="mt-4 text-sm font-semibold text-white/70">{quote.by}</p>
          </div>
        </div>
      </aside>

      <div className="flex flex-col px-4 py-8 sm:px-10 lg:px-16">
        <div className="flex justify-center">
          <Logo />
        </div>
        <main className={`mx-auto flex w-full flex-1 flex-col justify-center py-12 ${wide ? "max-w-xl" : "max-w-md"}`}>
          <h1 className="text-balance text-center text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-forest-900 sm:text-4xl">{title}</h1>
          {subtitle && <div className="mt-3 text-center text-[1.02rem] leading-relaxed text-ink-600">{subtitle}</div>}
          <div className="mt-9">{children}</div>
        </main>
        <p className="text-center text-xs text-ink-400">
          Protected by encryption. Your data stays yours. ·{" "}
          <a href="mailto:info@agrochain.africa" className="font-semibold hover:text-ink-700">Need help?</a>
        </p>
      </div>
    </div>
  );
}
