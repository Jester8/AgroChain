import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
