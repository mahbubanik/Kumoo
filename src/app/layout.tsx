import React, { Suspense } from "react";
import type { Metadata } from "next";
import { DynaPuff, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppPill } from "@/components/WhatsAppPill";
import { FloatingCart } from "@/components/FloatingCart";
import { MetaPixel } from "@/components/MetaPixel";
import { PromoBanner } from "@/components/PromoBanner";
import { StorefrontUI } from "@/components/StorefrontUI";

const dynaPuff = DynaPuff({
  variable: "--font-dynapuff",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kumoo — Handcrafted Crochet Plushies & Accessories",
  description:
    "Adorable handmade crochet plushies, bags, and keychains crafted with premium yarn. Made with love in Dhaka. Cash on delivery available.",
  keywords: [
    "crochet",
    "handmade",
    "plushies",
    "amigurumi",
    "keychains",
    "bags",
    "Dhaka",
    "Bangladesh",
    "handcrafted",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${dynaPuff.variable} font-body antialiased min-h-screen flex flex-col selection:bg-melon selection:text-white`}>
        <StorefrontUI>
          <PromoBanner />
          <Navbar />
        </StorefrontUI>

        <main className="flex-grow">{children}</main>

        <StorefrontUI>
          <Footer />
          <WhatsAppPill />
          <FloatingCart />
        </StorefrontUI>

        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </body>
    </html>
  );
}
