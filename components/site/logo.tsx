import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

/**
 * The AgroChain brand logo (hexagon sprout + wordmark).
 * logo.png is the original white artwork for dark surfaces;
 * logo-green.png is the same artwork in brand forest green for light surfaces.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label="AgroChain home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={tone === "dark" ? "/logo/logo-green.png" : "/logo/logo.png"}
        alt="AgroChain: Secure farm records"
        width={2680}
        height={817}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
