"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { ButtonLink, buttonClass } from "@/components/ui/button";
import { mainNav } from "@/lib/site";
import { useSession } from "@/lib/use-session";
import { cn } from "@/lib/format";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const firstName = user?.firstName;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-ink-900/8 bg-cream-50/85 backdrop-blur-xl" : "border-b border-transparent bg-cream-50",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors",
                  isActive(item.href) ? "text-forest-800" : "text-ink-600 hover:text-ink-900",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-gold-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <span className="text-sm font-semibold text-ink-600">
                  Welcome, <span className="text-ink-900">{firstName}</span>
                </span>
                <button onClick={signOut} className={buttonClass("outline", "sm")}>
                  <LogOut className="size-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <ButtonLink href="/signin" variant="ghost" size="sm">
                  Sign in
                </ButtonLink>
                <ButtonLink href="/signup" size="sm" className="pl-5 pr-4">
                  Get started <ArrowRight className="size-4" />
                </ButtonLink>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 grid size-11 place-items-center rounded-full text-ink-900 hover:bg-ink-900/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-cream-50 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-4 pb-10 pt-4">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-ink-900/8 py-5 text-2xl font-bold tracking-[-0.03em] text-ink-900"
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-ink-400" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 grid gap-3">
                {user ? (
                  <button onClick={signOut} className={buttonClass("outline", "lg")}>
                    Sign out
                  </button>
                ) : (
                  <>
                    <ButtonLink href="/signup" size="lg">
                      Create a free account
                    </ButtonLink>
                    <ButtonLink href="/signin" variant="outline" size="lg">
                      Sign in
                    </ButtonLink>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
