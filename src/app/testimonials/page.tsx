import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { ReviewCard } from "@/components/Reviews";
import { Stars } from "@/components/StarRating";
import { reviews } from "@/data/reviews";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Photo Booth Reviews NYC | Magic Mirror Brooklyn",
  description:
    "New York clients on Magic Mirror Brooklyn — rated 4.9 stars across 210 Google reviews for weddings, corporate events and parties.",
  path: "/testimonials",
});

/**
 * This page deliberately publishes NO Review or AggregateRating markup.
 *
 * It used to emit an AggregateRating plus one Review per testimonial, attached
 * to `${SITE.url}/#business` -- i.e. bolted onto the sitewide LocalBusiness
 * entity. That directly contradicted the policy documented in `lib/jsonld.ts`,
 * which omits aggregateRating on purpose: Google treats a business marking up
 * its own review score as self-serving review markup and may issue a manual
 * action for it. Self-serving reviews are not eligible for rich results on a
 * LocalBusiness anyway, so the markup carried the risk without the upside.
 * Search Console reported 11 "valid" Review snippets from this page, which only
 * means the syntax parsed -- not that they qualified for anything.
 *
 * The ratings and quotes still render in the UI. That is allowed and honest;
 * only the structured-data claim is gone. Do not add it back.
 */

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Testimonials
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            {SITE.rating} Stars From {SITE.reviewCount} Google Reviews
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Reproduced word for word from the people who booked us.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center">
            <a
              href={SITE.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-pill border border-black/10 bg-white px-5 py-3 text-sm transition-colors hover:border-gold"
            >
              <Stars />
              <span className="text-ink/75">
                <strong className="font-semibold text-ink">{SITE.rating}</strong>{" "}
                from {SITE.reviewCount} {SITE.reviewSource} reviews
              </span>
            </a>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Join them"
        sub="Tell us your date and we will come back with pricing built for your event."
      />

    </>
  );
}
