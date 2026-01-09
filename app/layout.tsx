import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import AgroChatBot from "./components/chatbot";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AgroChain",
  description: "Africa's First AI + Blockchain Agricultural Trust Layer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} font-nunito-sans antialiased`}
      >
        {children}
        
        {/* Add the chatbot component here */}
        <AgroChatBot />
      </body>
    </html>
  );
}