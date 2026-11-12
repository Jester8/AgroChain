import Link from "next/link";
import { Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";
import { Logo } from "./logo";
import { WaitlistForm } from "./waitlist-form";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/marketplace", label: "Marketplace" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/signup", label: "Sell your harvest" },
      { href: "/signup?role=buyer", label: "Buy verified produce" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About AgroChain" },
      { href: "/blog", label: "Journal" },
      { href: `mailto:${site.email}`, label: "Contact us" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto bg-forest-950 text-cream-100">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream-100/65">
              The trust layer for African agriculture. Proof of harvest, fair prices and verified trade.
            </p>
            <div className="mt-8 max-w-md">
              <p className="text-sm font-bold text-cream-50">Get market notes in your inbox</p>
              <p className="mt-1 text-sm text-cream-100/55">Monthly prices, farmer stories and launch news. No spam.</p>
              <WaitlistForm tone="dark" source="footer" className="mt-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[0.95rem] text-cream-100/70 transition-colors hover:text-cream-50">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Reach us</p>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-cream-100/70">
                <li className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-leaf-400" />{site.location}</li>
                <li><a href={site.phoneHref} className="flex gap-2.5 hover:text-cream-50"><Phone className="mt-0.5 size-4 shrink-0 text-leaf-400" />{site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="flex gap-2.5 hover:text-cream-50"><Mail className="mt-0.5 size-4 shrink-0 text-leaf-400" />{site.email}</a></li>
                <li><a href={site.whatsappGroup} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 hover:text-cream-50"><MessageCircle className="mt-0.5 size-4 shrink-0 text-leaf-400" />WhatsApp community</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream-50/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-cream-100/50">
            <p>© {year} AgroChain. All rights reserved.</p>
            <p className="mt-1 text-xs">A product of {site.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={site.socials.x} target="_blank" rel="noopener noreferrer" aria-label="AgroChain on X" className="grid size-10 place-items-center rounded-full border border-cream-50/10 text-cream-100/70 transition hover:border-cream-50/30 hover:text-cream-50"><Twitter className="size-4" /></a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="AgroChain on LinkedIn" className="grid size-10 place-items-center rounded-full border border-cream-50/10 text-cream-100/70 transition hover:border-cream-50/30 hover:text-cream-50"><Linkedin className="size-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
