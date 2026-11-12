import { Logo } from "@/components/site/logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-cream-50">
      <div className="relative mx-auto flex w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Logo />
      </div>
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-forest-800 sm:text-[10rem]">404</p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-ink-900 sm:text-3xl">This path doesn&apos;t lead to any farm.</h1>
        <p className="mt-3 max-w-md text-ink-600">The page may have moved, or the link might be wrong. Let&apos;s get you back to the market.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/marketplace" variant="outline">Browse the marketplace</ButtonLink>
        </div>
      </main>
    </div>
  );
}
