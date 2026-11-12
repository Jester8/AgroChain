import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AgroChain: Proof, fair prices and trusted trade for farmers",
    template: "%s · AgroChain",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "AgroChain",
    locale: "en_NG",
    title: "AgroChain: Proof, fair prices and trusted trade for farmers",
    description: site.description,
    images: ["/img/main.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#12331d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={montserrat.variable}>
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
