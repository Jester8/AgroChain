import { cn } from "@/lib/format";

export function Eyebrow({ children, tone = "dark", className }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-leaf-600" : "text-leaf-400",
        className,
      )}
    >
      <span aria-hidden className="inline-block h-[3px] w-5 rounded-full bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone} className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-ink-900" : "text-cream-50",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-pretty text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-ink-600" : "text-cream-100/75")}>
          {intro}
        </p>
      )}
    </div>
  );
}
