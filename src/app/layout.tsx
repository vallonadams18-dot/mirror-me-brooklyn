import type { Metadata } from "next";
import { Barlow, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { businessJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Photo Booth Rental NYC | Mirror, 360 & Glam Booths | Magic Mirror Brooklyn",
  description:
    "Photo booth rental across NYC and the tri-state area. Mirror, 360, glam and roaming booths with unlimited prints, a pro attendant and instant sharing. 4.9★ from 210 reviews.",
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE.url}/img/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Magic Mirror Brooklyn photo booth rental NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${playfair.variable}`}>
      <head>
        {/* Static-export sites replace every JS chunk on deploy. A phone
            holding a cached page then loads scripts that 404 and the page
            sits frozen until a manual refresh. Reload once (guarded) so
            visitors never see the dead state. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var K="mmb-chunk-reload";window.addEventListener("error",function(e){var t=e.target;if(t&&t.tagName==="SCRIPT"&&t.src&&t.src.indexOf("/_next/")>-1){var l=+(sessionStorage.getItem(K)||0);if(Date.now()-l>15000){sessionStorage.setItem(K,String(Date.now()));location.reload();}}},true);})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={businessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
