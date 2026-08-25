import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { ReviewRedirect } from "./ReviewRedirect";

/**
 * A short, textable URL that lands past clients on the Google review box.
 * Static export cannot do server redirects, so the hop happens client side.
 * Deliberately noindexed: it is a shortcut for people we message, not a page
 * we want competing in search.
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: "Leave a Review | Magic Mirror Brooklyn",
    description:
      "Thanks for celebrating with Magic Mirror Brooklyn. This page takes you straight to our Google review form.",
    path: "/review",
  }),
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(229,173,31,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <h1 className="text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
          Thank you for celebrating with us
        </h1>
        <p className="mt-6 text-base leading-relaxed text-cream/75 sm:text-lg">
          We are taking you to Google now so you can leave a review. It takes
          about thirty seconds, and it genuinely helps other people in New York
          find us.
        </p>
        <a
          href={SITE.googleWriteReviewUrl}
          className="mt-10 inline-flex items-center rounded-pill bg-gold px-7 py-4 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          Write your review
        </a>
        <p className="mt-6 text-sm text-cream/60">
          If nothing happens, use the button above.
        </p>
      </div>
      <ReviewRedirect />
    </section>
  );
}
