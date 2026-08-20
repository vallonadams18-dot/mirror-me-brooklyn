import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import { Camera, CalendarCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact Us | Photo Booth Rental NYC | Magic Mirror Brooklyn",
  description:
    "Get in touch with Magic Mirror Brooklyn about photo booth rental for your NYC or tri-state event. Email us, or request pricing in about 30 seconds.",
  path: "/contact",
});

const serviceAreas = [
  "Brooklyn",
  "Manhattan",
  "Queens",
  "The Bronx",
  "Staten Island",
  "Long Island",
  "Westchester",
  "New Jersey",
  "Connecticut",
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Contact Magic Mirror Brooklyn
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            The fastest route to an answer is the quote form — it gives us the
            details we need to price your event properly. For anything else,
            email works.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            <div className="rounded-card border border-black/8 bg-white p-7">
              <Mail className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-ink/50">
                Email
              </h2>
              <div className="mt-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-gold-dark hover:underline"
                >
                  {SITE.email}
                </a>
                <p className="mt-2 text-sm text-ink/55">
                  We read every message and usually reply the same day.
                </p>
              </div>
            </div>
            <div className="rounded-card border border-black/8 bg-white p-7">
              <Phone className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-ink/50">
                Call or text
              </h2>
              <div className="mt-2">
                <a
                  href={SITE.phoneHref}
                  className="font-medium text-gold-dark hover:underline"
                >
                  {SITE.phone}
                </a>
                <p className="mt-2 text-sm text-ink/55">
                  Fastest for last-minute dates and quick questions.
                </p>
              </div>
            </div>
            <div className="rounded-card border border-black/8 bg-white p-7">
              <CalendarCheck className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-ink/50">
                Book online
              </h2>
              <div className="mt-2">
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-dark hover:underline"
                >
                  Reserve your date
                </a>
                <p className="mt-2 text-sm text-ink/55">
                  Already know what you want? Book your booth directly.
                </p>
              </div>
            </div>
            <div className="rounded-card border border-black/8 bg-white p-7">
              <MapPin className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-ink/50">
                Based in
              </h2>
              <div className="mt-2">
                <p className="font-medium text-ink">Brooklyn, NY</p>
                <p className="mt-2 text-sm text-ink/55">
                  A service-area business — we come to your venue rather than
                  hosting events at a storefront.
                </p>
              </div>
            </div>
            <div className="rounded-card border border-black/8 bg-white p-7">
              <Camera className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-ink/50">
                Instagram
              </h2>
              <div className="mt-2">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-dark hover:underline"
                >
                  @magicmirrorbk
                </a>
                <p className="mt-2 text-sm text-ink/55">
                  Recent events, booth setups and behind-the-scenes.
                </p>
              </div>
            </div>
            <div className="rounded-card border border-black/8 bg-white p-7">
              <Clock className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-ink/50">
                Booking
              </h2>
              <div className="mt-2">
                <p className="font-medium text-ink">Book as early as you can</p>
                <p className="mt-2 text-sm text-ink/55">
                  Peak season and weekend dates fill first. Last-minute
                  requests are welcome when we have availability.
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-card border border-black/8 bg-white p-8">
            <h2 className="font-display text-2xl text-ink">Where we work</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
              Based in Brooklyn and out across the region most weekends of the
              season. Travel is quoted from your venue ZIP code before you
              book.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-pill border border-black/10 bg-cream px-3.5 py-1.5 text-sm text-ink/70"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink/55">
              Somewhere not on the list?{" "}
              <Link
                href="/get-pricing"
                className="font-medium text-gold-dark hover:underline"
              >
                Ask anyway
              </Link>{" "}
              — we will tell you honestly whether we can get there.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Ready for real numbers?"
        sub="Tell us the date, the venue and roughly how many guests. Thirty seconds, no obligation."
      />
    </>
  );
}
