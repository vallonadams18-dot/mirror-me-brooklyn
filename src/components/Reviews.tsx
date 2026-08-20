import { Quote } from "lucide-react";
import { reviews, type Review } from "@/data/reviews";
import { SITE } from "@/lib/site";
import { CtaButton } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { Stars } from "./StarRating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex flex-col rounded-card border border-black/5 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <Quote className="size-7 shrink-0 text-gold/35" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/75">
        {review.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-black/5 pt-5">
        <span
          role="img"
          className="flex items-center gap-0.5"
          aria-label="Rated 5 out of 5 stars"
        >
          <Stars />
        </span>
        <p className="mt-2 font-semibold text-ink">{review.name}</p>
      </figcaption>
    </figure>
  );
}

interface ReviewsSectionProps {
  bg?: "cream" | "white";
  count?: 3 | 6;
  sub?: string;
  showGoogleLink?: boolean;
  showCta?: boolean;
}

export function ReviewsSection({
  bg = "cream",
  count = 3,
  sub,
  showGoogleLink = false,
  showCta = false,
}: ReviewsSectionProps) {
  return (
    <section
      className={`cv-auto ${bg === "cream" ? "bg-cream" : "bg-white"} px-4 py-20 sm:px-6 sm:py-24 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What clients say"
          heading={`${SITE.rating} stars from ${SITE.reviewCount} Google reviews`}
          sub={sub}
        />
        {showGoogleLink && (
          <div className="mt-8 flex justify-center">
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
        )}
        <div className="mt-12">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, count).map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
        {showCta && (
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
}
