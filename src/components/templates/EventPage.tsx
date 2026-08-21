import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { BrandLogos } from "@/components/BrandLogos";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ReviewsSection } from "@/components/Reviews";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceAreasSection } from "@/components/ServiceAreas";
import { RatingLine } from "@/components/StarRating";
import { StepsSection } from "@/components/StepsSection";
import type { EventPage as EventPageData } from "@/data/types";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";

const CORPORATE_SLUGS = new Set(["corporate-events", "trade-show-photo-booth"]);

export function EventPage({ event }: { event: EventPageData }) {
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
          <Breadcrumbs current={event.breadcrumb} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <h1 className="text-[2rem] leading-[1.12] text-cream sm:text-4xl lg:text-[3.1rem]">
                {event.h1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
                {event.heroSub}
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
                src={event.heroImg.src}
                alt={event.heroImg.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {event.checklist.map((item) => (
                <div key={item.title} className="bg-ink p-6">
                  <Check className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-sans text-base font-semibold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {CORPORATE_SLUGS.has(event.slug) && <BrandLogos bg="cream" />}

      {/* Prose */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            {event.prose.map((block, i) => (
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
            <div className="mt-10">
              <CtaButton>Get a Free Quote</CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended booths */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={event.recEyebrow}
            heading={event.recHeading}
            sub={event.recSub}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {event.recCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group overflow-hidden rounded-card border border-black/8 bg-white transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="flex items-center gap-1.5 font-sans text-lg font-semibold text-ink group-hover:text-gold-dark">
                    {card.title}
                    <ArrowUpRight
                      className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                    {card.desc}
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
          <SectionHeading
            eyebrow={event.galleryEyebrow}
            heading={event.galleryHeading}
            sub={event.gallerySub ?? undefined}
          />
          <div className="mt-14">
            <PhotoCarousel images={event.gallery} />
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <ServiceAreasSection
        heading={event.areasHeading}
        sub={event.areasSub}
        count={8}
      />

      <ReviewsSection bg="cream" count={3} />

      <StepsSection bg="white" />

      <FaqSection heading={event.faqHeading} faqs={event.faqs} bg="cream" />

      {/* Browse the booths */}
      {event.browse.length > 0 && (
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Also available"
              heading={event.browseHeading ?? "Browse the booths"}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {event.browse.map((card) => (
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

      {/* Combo links (service + location) */}
      {event.comboLinks && event.comboLinks.length > 0 && (
        <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="By borough" heading="Where we run this event" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {event.comboLinks.map((card) => (
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

      <CtaSection heading={event.cta.heading} sub={event.cta.sub} />

      <JsonLd data={faqJsonLd(event.faqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: event.h1,
          description: event.meta.description,
          path: `/${event.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: event.breadcrumb, path: `/${event.slug}` },
        ])}
      />
    </>
  );
}
