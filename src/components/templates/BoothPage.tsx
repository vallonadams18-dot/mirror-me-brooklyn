import Link from "next/link";
import { Check } from "lucide-react";
import { BrandLogos } from "@/components/BrandLogos";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FillMedia } from "@/components/Media";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ReviewsSection } from "@/components/Reviews";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceAreasSection } from "@/components/ServiceAreas";
import { RatingLine } from "@/components/StarRating";
import { StepsSection } from "@/components/StepsSection";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Booth } from "@/data/types";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  offerJsonLd,
  serviceJsonLd,
} from "@/lib/jsonld";

export function BoothPage({ booth }: { booth: Booth }) {
  // Parse a real "starting at" price (e.g. "$899 for 3 hours") into Offer
  // schema fields. Only renders when booth.startingPrice is a genuine,
  // confirmed figure — never fabricated for booths without one.
  const priceMatch = booth.startingPrice?.match(/([\d,]+)/);
  const offerPrice = priceMatch ? priceMatch[1].replace(/,/g, "") : undefined;
  const hoursMatch = booth.startingPrice?.match(/for\s+(\d+)\s*hours?/i);
  const offerDescription = booth.startingPrice
    ? hoursMatch
      ? `${hoursMatch[1]} hour rental`
      : `${booth.startingPrice} rental`
    : undefined;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 0%, rgba(229,173,31,0.15) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
          <Breadcrumbs current={booth.breadcrumb} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <h1 className="text-[2rem] leading-[1.12] text-cream sm:text-4xl lg:text-[3.1rem]">
                {booth.h1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
                {booth.heroSub}
              </p>
              {booth.startingPrice && (
                <p className="mt-4 font-sans text-lg font-semibold text-gold sm:text-xl">
                  Starting at {booth.startingPrice}
                </p>
              )}
              <RatingLine className="mt-6" />
              <div className="mt-7">
                <CtaButton>Get a Free Quote</CtaButton>
              </div>
              <p className="mt-4 text-sm text-cream/50">
                Takes about 30 seconds. No obligation.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/15">
              <FillMedia
                src={booth.heroImg.src}
                alt={booth.heroImg.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </div>
          <div className="mt-14 rounded-card border border-white/10 bg-surface/50 p-7 sm:p-9">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {booth.includedLabel}
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {booth.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] text-cream/80"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {booth.slug === "branded-photo-booth" && <BrandLogos bg="white" />}

      {/* Video */}
      {booth.video && (
        <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="See it running"
                  heading={booth.video.heading}
                  sub={booth.video.sub}
                  align="left"
                />
                <div className="mt-8">
                  <CtaButton>Get a Free Quote</CtaButton>
                </div>
              </div>
              <VideoPlayer
                src={booth.video.src}
                poster={booth.video.poster}
                label={booth.video.label}
              />
            </div>
          </div>
        </section>
      )}

      {/* Prose */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            {booth.prose.map((block, i) => (
              <div key={block.heading} className={i === 0 ? "" : "mt-12"}>
                <h2 className="font-display text-2xl text-ink sm:text-3xl">
                  {block.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/75 sm:text-base">
                  {block.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-12 rounded-card border border-black/8 bg-cream p-7">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Best for
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {booth.bestFor.map((item) => (
                  <li
                    key={item}
                    className="rounded-pill border border-black/10 bg-white px-3.5 py-1.5 text-sm text-ink/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <CtaButton>Get a Free Quote</CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" heading={booth.galleryHeading} />
          <div className="mt-14">
            <PhotoCarousel images={booth.gallery} />
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <ServiceAreasSection
        heading={booth.areasHeading}
        sub={booth.areasSub}
        count={8}
      />

      <ReviewsSection bg="white" count={3} />

      <StepsSection bg="cream" />

      <FaqSection heading={booth.faqHeading} faqs={booth.faqs} bg="white" />

      {/* Related booths */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Also available" heading="Other booths we rent" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {booth.related.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-card border border-black/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg"
              >
                <h3 className="font-sans text-base font-semibold text-ink group-hover:text-gold-dark">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Combo links (service + location) */}
      {booth.comboLinks && booth.comboLinks.length > 0 && (
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="By borough" heading="Where we bring this booth" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {booth.comboLinks.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-card border border-black/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg"
                >
                  <h3 className="font-sans text-base font-semibold text-ink group-hover:text-gold-dark">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {card.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection heading={booth.cta.heading} sub={booth.cta.sub} />

      <JsonLd data={faqJsonLd(booth.faqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: booth.breadcrumb,
          description: booth.meta.description,
          path: `/${booth.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: booth.breadcrumb, path: `/${booth.slug}` },
        ])}
      />
      {offerPrice && offerDescription && (
        <JsonLd
          data={offerJsonLd({
            price: offerPrice,
            description: offerDescription,
            path: `/${booth.slug}`,
          })}
        />
      )}
    </>
  );
}
