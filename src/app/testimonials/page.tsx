import type { Metadata } from "next";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { ReviewCard } from "@/components/Reviews";
import { Stars } from "@/components/StarRating";
import { reviews } from "@/data/reviews";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews & Testimonials | Photo Booth Rental NYC | Magic Mirror Brooklyn",
  description:
    "Read what New York clients say about Magic Mirror Brooklyn photo booth rentals. Rated 4.9 stars across 210 Google reviews for weddings, corporate events and parties.",
  alternates: { canonical: `${SITE.url}/testimonials` },
};

function reviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
    })),
  };
}

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

      <JsonLd data={reviewsJsonLd()} />
    </>
  );
}
