import type { Metadata } from "next";
import { Nunito_Sans, Roboto_Slab, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import AgroChatBot from "../components/chatbot";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-slab",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa-slab",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AgroChain",
  description: "Data storage solution for farmers using AI and blockchain technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${robotoSlab.variable} ${alfaSlabOne.variable} font-nunito-sans antialiased`}
      >
        {children}
        <AgroChatBot />
      </body>
    </html>
  );
}