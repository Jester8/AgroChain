import Link from "next/link";
import { cn } from "@/lib/format";

type Variant = "primary" | "gold" | "outline" | "ghost" | "light" | "dark-outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-forest-800 text-cream-50 hover:bg-forest-700 shadow-[inset_0_-2px_0_rgb(0_0_0/0.2)]",
  gold: "bg-gold-400 text-ink-950 hover:bg-gold-500 shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]",
  outline: "border border-ink-900/15 bg-white/60 text-ink-900 hover:border-ink-900/30 hover:bg-white",
  ghost: "text-ink-700 hover:bg-ink-900/5 hover:text-ink-900",
  light: "bg-cream-50 text-forest-900 hover:bg-white",
  "dark-outline": "border border-cream-50/25 text-cream-50 hover:bg-cream-50/10 hover:border-cream-50/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...props
}: Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
