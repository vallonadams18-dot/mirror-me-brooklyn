import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FillMedia } from "@/components/Media";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ReviewsSection } from "@/components/Reviews";
import { SectionHeading } from "@/components/SectionHeading";
import { RatingLine } from "@/components/StarRating";
import { StepsSection } from "@/components/StepsSection";
import type { ComboPage as ComboPageData } from "@/data/types";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";

export function ComboPage({ combo }: { combo: ComboPageData }) {
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
          <Breadcrumbs current={combo.breadcrumb} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <h1 className="text-[2rem] leading-[1.12] text-cream sm:text-4xl lg:text-[3.1rem]">
                {combo.h1}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
                {combo.heroSub}
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
              <FillMedia
                src={combo.heroImg.src}
                alt={combo.heroImg.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </div>
          <div className="mt-14 rounded-card border border-white/10 bg-surface/50 p-7 sm:p-9">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {combo.includedLabel}
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {combo.included.map((item) => (
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

      {/* Intro */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {combo.introHeading}
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/75 sm:text-base">
              {combo.introParas.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
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
            heading={`Neighborhoods we cover in ${combo.locationLabel}`}
            tone="dark"
          />
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {combo.neighborhoods.map((nb) => (
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

      {/* Gallery */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" heading={combo.galleryHeading} />
          <div className="mt-14">
            <PhotoCarousel images={combo.gallery} />
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <ReviewsSection bg="white" count={3} />

      <StepsSection bg="cream" />

      <FaqSection heading={combo.faqHeading} faqs={combo.faqs} bg="white" />

      {/* Reciprocal links */}
      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Learn more" heading="Related pages" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <Link
              href={combo.boothHref}
              className="group rounded-card border border-black/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg"
            >
              <h3 className="font-sans text-base font-semibold text-ink group-hover:text-gold-dark">
                {combo.boothLabel}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                See full details, pricing and gallery for this booth.
              </p>
            </Link>
            <Link
              href={combo.locationHref}
              className="group rounded-card border border-black/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg"
            >
              <h3 className="font-sans text-base font-semibold text-ink group-hover:text-gold-dark">
                {combo.locationLabel}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                See every booth we rent in {combo.locationLabel}.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <CtaSection heading={combo.cta.heading} sub={combo.cta.sub} />

      <JsonLd
        data={serviceJsonLd({
          name: combo.breadcrumb,
          description: combo.meta.description,
          path: `/${combo.slug}`,
        })}
      />
      <JsonLd data={faqJsonLd(combo.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: combo.boothLabel, path: combo.boothHref },
          { name: combo.locationLabel },
        ])}
      />
    </>
  );
}
