import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venturis Realtors | Luxury Real Estate",
  description: "Discover world-class luxury properties with Venturis Realtors. Expert guidance for buying, selling, and investing in premium real estate.",
  keywords: "luxury real estate, premium properties, villas, penthouses, commercial real estate, Venturis Realtors",
  openGraph: {
    title: "Venturis Realtors | Luxury Real Estate",
    description: "Elevating Real Estate to an Art Form",
    type: "website",
    locale: "en_US",
    siteName: "Venturis Realtors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0c0c0c] text-[#f8f7f4] font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
