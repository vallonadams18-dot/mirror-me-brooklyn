import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ReviewsSection } from "@/components/Reviews";
import { SectionHeading } from "@/components/SectionHeading";
import { RatingLine } from "@/components/StarRating";
import { StepsSection } from "@/components/StepsSection";
import { eventCards, heroFeatures } from "@/data/home";
import type { LocationPage as LocationPageData } from "@/data/types";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessAreaJsonLd,
} from "@/lib/jsonld";

export function LocationPage({ location }: { location: LocationPageData }) {
  const introParas = location.introParas.filter(
    (p) => !p.includes("Travel:"),
  );
  // "Photo Booth Rental in Brooklyn" -> "in Brooklyn" (or "on Staten Island")
  const locPhrase = location.h1.replace(/^Photo Booth Rental /, "");

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
          <Breadcrumbs current={location.breadcrumb} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <MapPin className="size-3.5" aria-hidden="true" />
                {location.eyebrow}
              </p>
              <h1 className="mt-4 text-[2rem] leading-[1.12] text-cream sm:text-4xl lg:text-[3.1rem]">
                {location.h1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
                {location.heroSub}
              </p>
              <RatingLine className="mt-6" />
              <div className="mt-7">
                <CtaButton>Get a Free Quote</CtaButton>
              </div>
              <p className="mt-4 text-sm text-cream/50">
                Takes about 30 seconds. No obligation.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/15">
              <Image
                src={location.heroImg.src}
                alt={location.heroImg.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {heroFeatures.map((feature) => (
                <div key={feature.title} className="bg-ink p-6">
                  <Check className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-sans text-base font-semibold text-cream">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {location.introHeading}
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/75 sm:text-base">
              {introParas.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p>
                <strong className="font-semibold text-ink">Travel:</strong>{" "}
                {location.travelNote}
              </p>
            </div>
            <div className="mt-9">
              <CtaButton>Get a Free Quote</CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-ink px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Local coverage"
            heading={location.nbHeading}
            sub={location.nbSub}
            tone="dark"
          />
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {location.neighborhoods.map((nb) => (
              <li
                key={nb}
                className="flex items-center gap-2.5 rounded-card border border-white/10 bg-surface/60 px-4 py-3.5"
              >
                <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm leading-tight text-cream/85">{nb}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      {/* Booths available */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Choose your booth"
            heading={location.boothsHeading}
            sub={location.boothsSub}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {location.boothCards.map((booth) => (
              <Link
                key={booth.href}
                href={booth.href}
                className="group overflow-hidden rounded-card border border-black/8 bg-white transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={booth.img}
                    alt={booth.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="flex items-center gap-1.5 font-sans text-lg font-semibold text-ink group-hover:text-gold-dark">
                    {booth.title}
                    <ArrowUpRight
                      className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                    {booth.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Real events" heading={location.galleryHeading} />
          <div className="mt-14">
            <PhotoCarousel images={location.gallery} />
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What we cover" heading={location.eventsHeading} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {eventCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-card border border-black/8 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg"
              >
                <h3 className="font-sans text-lg font-semibold text-ink group-hover:text-gold-dark">
                  {card.title} {locPhrase}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection bg="white" count={3} />

      <StepsSection bg="cream" step1Desc={location.step1} />

      <FaqSection heading={location.faqHeading} faqs={location.faqs} bg="white" />

      {/* Also serving */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Also available" heading="Also serving" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {location.alsoServing.map((card) => (
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

      <CtaSection heading={location.cta.heading} sub={location.cta.sub} />

      <JsonLd data={faqJsonLd(location.faqs)} />
      <JsonLd
        data={localBusinessAreaJsonLd({
          areaName: location.breadcrumb,
          path: `/${location.slug}`,
          description: location.meta.description,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: location.breadcrumb, path: `/${location.slug}` },
        ])}
      />
    </>
  );
}
