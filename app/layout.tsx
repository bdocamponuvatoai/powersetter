import type { Metadata, Viewport } from "next";
import { Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from "next/font/google";
import type { ReactNode } from "react";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allowIndexing, siteUrl } from "@/lib/env";
import { site } from "@/lib/site";
import "./globals.css";

const display = Red_Hat_Display({ subsets: ["latin"], variable: "--font-rh-display", display: "swap" });
const text = Red_Hat_Text({ subsets: ["latin"], variable: "--font-rh-text", display: "swap" });
const mono = Red_Hat_Mono({ subsets: ["latin"], variable: "--font-rh-mono", display: "swap", preload: false });

const description =
  "Compare electricity and natural gas suppliers for your home or business, and explore community solar. Your utility still delivers; you choose who supplies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name}: compare electricity and gas suppliers`, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name}: compare electricity and gas suppliers`,
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  viewportFit: "cover",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  telephone: "+1-800-833-6952",
  faxNumber: "+1-866-783-7466",
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: site.listedStates.map((state) => ({ "@type": "State", name: state })),
  sameAs: site.social.map((profile) => profile.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
