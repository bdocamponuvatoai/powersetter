import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";
const manrope = localFont({
  src: "../../public/fonts/manrope.woff2",
  variable: "--font-heading",
  weight: "200 800",
  display: "swap",
});
const inter = localFont({
  src: "../../public/fonts/inter.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://powersetter-energy-mockup.arkostechnol-7313.chatgpt.site",
  ),
  title: {
    default: "PowerSetter — Better energy. On your terms.",
    template: "%s | PowerSetter",
  },
  description:
    "A clearer way to explore electricity, natural gas and community solar for your home or business.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "PowerSetter — Better energy. On your terms.",
    description: "More choice. A clearer picture. A little more power to you.",
    images: [{ url: "/assets/solar-home.webp", width: 1536, height: 1024 }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
