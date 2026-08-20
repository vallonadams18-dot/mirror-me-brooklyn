import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { BoothCard } from "@/components/BoothCard";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { boothCards } from "@/data/home";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMeta({
  title: "All Photo Booth Rentals NYC | Magic Mirror Brooklyn",
  description:
    "Every photo booth we rent in NYC — mirror, 360, glam, roaming, AI, enclosed and more. All with an attendant, unlimited prints and instant sharing.",
  path: "/photo-booths",
  image: "/img/og/mirror-photo-booth.jpg",
  imageAlt: "Magic Mirror Brooklyn photo booth lineup",
});

export default function PhotoBoothsPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The full lineup
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Every Photo Booth Experience We Rent
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Eighteen booths, one standard: a trained attendant, a
            custom-designed print template and unlimited prints with every
            single one.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boothCards.map((booth) => (
              <BoothCard key={booth.href} booth={booth} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Not sure which one fits your room?"
        sub="Tell us the venue, the date and the crowd. We will recommend the booth that actually suits the night — no upselling, no pressure."
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Photo Booths", path: "/photo-booths" },
        ])}
      />
    </>
  );
}
