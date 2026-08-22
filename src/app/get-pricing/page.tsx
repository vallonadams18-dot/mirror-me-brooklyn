import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { CheckCherryForm } from "@/components/CheckCherryForm";
import { FaqAccordion } from "@/components/FaqSection";
import { RatingLine } from "@/components/StarRating";
import { SITE } from "@/lib/site";
import { faqPageFaqs } from "@/data";

const pricingFaqQuestions = [
  "How much lead time do you need to set up?",
  "How far does Magic Mirror Brooklyn travel?",
  "Are you insured?",
];
const pricingFaqs = faqPageFaqs.filter((faq) =>
  pricingFaqQuestions.includes(faq.q)
);

export const metadata: Metadata = pageMeta({
  title: "Get a Free Photo Booth Quote NYC | Magic Mirror Brooklyn",
  description:
    "Tell us your date, venue and guest count and get real photo booth pricing back. Takes about 30 seconds, no obligation. Serving NYC and the tri-state area.",
  path: "/get-pricing",
});

const checklist = [
  "Attendant included",
  "Unlimited prints",
  "Travel quoted up front",
  "$3M insured — same-day COI",
];

export default function GetPricingPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Get pricing by filling out the form below
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/65 sm:text-lg">
            Takes about 30 seconds — no commitment, and a real person reads
            every enquiry. We will come back with pricing built for your event,
            travel included.
          </p>
          <p className="mt-4 font-sans text-lg font-semibold text-gold-dark sm:text-xl">
            Starting at $899 for 3 hours
          </p>
          <p className="mt-1 text-sm text-ink/55">
            Custom packages priced to your event — get a free quote below.
          </p>
          <div className="mt-7 flex justify-center">
            <RatingLine tone="light" />
          </div>
        </div>
        <ul className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
          {checklist.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[15px] text-ink/75"
            >
              <Check className="size-4 shrink-0 text-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <div className="rounded-card border border-black/8 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8">
            <CheckCherryForm />
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-ink/55">
          Prefer email? Reach us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-gold-dark hover:underline"
          >
            {SITE.email}
          </a>
          , or call or text{" "}
          <a
            href={SITE.phoneHref}
            className="font-medium text-gold-dark hover:underline"
          >
            {SITE.phone}
          </a>
          .
        </p>
        <p className="mt-3 text-center text-sm text-ink/55">
          Already know what you want?{" "}
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-dark hover:underline"
          >
            Reserve your date directly online
          </a>
          .
        </p>
        <p className="mt-3 text-center text-sm text-ink/45">
          Rated {SITE.rating} from {SITE.reviewCount} {SITE.reviewSource}{" "}
          reviews · Brooklyn-based
        </p>

        <div className="mt-16 border-t border-black/8 pt-12">
          <h2 className="font-sans text-2xl font-semibold text-ink sm:text-[1.75rem]">
            What your price actually depends on
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
            Every quote is built for your event rather than pulled from a
            rate card, but the variables that move the number are
            consistent. The booth itself is usually the biggest one — a
            full-length mirror booth with studio lighting and an animated
            touchscreen is a different setup than a roaming attendant
            working the room with a handheld camera, and a branded
            activation or mosaic wall carries more production than a
            standard rental. Hours booked come next: three to four hours
            covers most receptions, and if your night runs long, additional
            hours beyond what you booked are $125 per hour. Travel is
            calculated from your venue&apos;s ZIP code and included in your
            number up front, so a Brooklyn wedding and a Westchester one
            won&apos;t carry the same line item. Add-ons — a flower wall or
            champagne wall backdrop, branded overlays for a corporate
            activation, an extra roaming attendant for a bigger guest list —
            move the total too, and every one of them is optional.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-sans text-2xl font-semibold text-ink sm:text-[1.75rem]">
            A few things worth knowing before you book
          </h2>
          <div className="mt-6">
            <FaqAccordion faqs={pricingFaqs} />
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/blog/photo-booth-rental-cost-nyc"
            className="group flex items-center justify-between gap-6 rounded-card border border-black/8 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                Related reading
              </p>
              <h2 className="mt-1.5 font-sans text-base font-semibold text-ink group-hover:text-gold-dark">
                How Much Does a Photo Booth Rental Cost in NYC?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                What actually drives the price — booth type, hours, travel
                and add-ons — before you fill out the form above.
              </p>
            </div>
            <ArrowUpRight
              className="size-5 shrink-0 text-ink/40 transition-colors group-hover:text-gold-dark"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
