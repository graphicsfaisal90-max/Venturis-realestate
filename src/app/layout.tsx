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
  title: {
    default: "Venturis Realtors | Luxury Real Estate & Premium Properties",
    template: "%s | Venturis Realtors",
  },
  description:
    "Discover world-class luxury properties with Venturis Realtors. Expert guidance for buying, selling, and investing in premium real estate across the globe.",
  keywords: [
    "luxury real estate",
    "premium properties",
    "luxury homes",
    "real estate agents",
    "property investment",
    "venturis realtors",
    "beverly hills real estate",
    "luxury villas",
    "penthouses",
    "commercial real estate",
  ],
  authors: [{ name: "Venturis Realtors" }],
  creator: "Venturis Realtors",
  publisher: "Venturis Realtors",
  metadataBase: new URL("https://venturisrealtors.com"),
  openGraph: {
    title: "Venturis Realtors | Luxury Real Estate",
    description:
      "Elevating Real Estate to an Art Form. Discover exceptional properties with Venturis Realtors.",
    url: "https://venturisrealtors.com",
    siteName: "Venturis Realtors",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Venturis Realtors - Luxury Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venturis Realtors | Luxury Real Estate",
    description:
      "Elevating Real Estate to an Art Form. Discover exceptional properties worldwide.",
    images: ["/images/og.jpg"],
    creator: "@venturisrealtors",
    site: "@venturisrealtors",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://venturisrealtors.com",
  },
  category: "real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Venturis Realtors",
    url: "https://venturisrealtors.com",
    logo: "/images/logo.png",
    image: "/images/og.jpg",
    description:
      "Discover world-class luxury properties with Venturis Realtors. Expert guidance for buying, selling, and investing in premium real estate.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "789 Luxury Avenue, Suite 1200",
      addressLocality: "Beverly Hills",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://instagram.com/venturisrealtors",
      "https://facebook.com/venturisrealtors",
      "https://twitter.com/venturisrealtors",
      "https://linkedin.com/company/venturisrealtors",
      "https://youtube.com/@venturisrealtors",
    ],
    areaServed: "US",
    priceRange: "$$$$",
  };

  return (
    <html lang="en" className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
