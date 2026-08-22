import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { Check } from "lucide-react";
import { CheckCherryForm } from "@/components/CheckCherryForm";
import { RatingLine } from "@/components/StarRating";
import { SITE } from "@/lib/site";

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
  "$2M insured — same-day COI",
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
      </section>
    </div>
  );
}
