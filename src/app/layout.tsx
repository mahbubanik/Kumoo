import React, { Suspense } from "react";
import type { Metadata } from "next";
import { DynaPuff, Nunito, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppPill } from "@/components/WhatsAppPill";
import { FloatingCart } from "@/components/FloatingCart";
import { MetaPixel } from "@/components/MetaPixel";
import { PromoBanner } from "@/components/PromoBanner";
import { StorefrontUI } from "@/components/StorefrontUI";
import { Toaster } from "sonner";

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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kumoo.shop'),
  title: {
    template: "%s | Kumoo",
    default: "Kumoo - Handcrafted Crochet Plushies & Accessories"
  },
  description:
    "Adorable handmade crochet plushies, bags, and keychains crafted with premium yarn. Made with love in Dhaka. Cash on delivery available.",
  keywords: [
    "handmade crochet plushies",
    "kawaii crochet amigurumi",
    "crochet keychains",
    "handmade crochet tote bag",
    "amigurumi",
    "leggy frog crochet",
    "cute stuffed animals handmade",
    "strawberry crochet keychain",
    "Dhaka",
    "Bangladesh",
    "handcrafted crochet gifts",
  ],
  openGraph: {
    title: "Kumoo - Handcrafted Crochet Plushies",
    description: "Adorable handmade crochet plushies, bags, and keychains crafted with premium yarn.",
    type: "website",
    locale: "en_US",
    siteName: "Kumoo Studio",
    images: [{ url: "/logo-new.png", width: 1200, height: 630, alt: "Kumoo Brand Logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumoo - Handcrafted Crochet Plushies",
    description: "Adorable handmade crochet plushies, bags, and keychains crafted with premium yarn.",
    images: ["/logo-new.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${dynaPuff.variable} ${caveat.variable} font-body antialiased min-h-screen flex flex-col selection:bg-melon selection:text-white`}>
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
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
