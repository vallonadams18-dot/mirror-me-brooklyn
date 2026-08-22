import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Image from "next/image";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { Stars } from "@/components/StarRating";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Magic Mirror Brooklyn | NYC Photo Booth Rental",
  description:
    "Magic Mirror Brooklyn is a Brooklyn-based photo booth rental and interactive event experience company serving all five boroughs and the tri-state area.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                About us
              </p>
              <h1 className="mt-4 text-3xl leading-[1.12] text-cream sm:text-4xl lg:text-5xl">
                Brooklyn-built, for every kind of event
              </h1>
              <p className="mt-6 text-base leading-relaxed text-cream/75 sm:text-lg">
                We create photo booth rentals and interactive event
                experiences across all five boroughs and the tri-state area —
                for companies, brands and agencies as often as couples and
                private clients. We have been doing it long enough to know
                that the equipment is the easy part.
              </p>
              <div className="mt-8">
                <CtaButton>Get a Free Quote</CtaButton>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/15">
              <Image
                src="/img/about-hero.jpg"
                alt="Guests enjoying the Magic Mirror Brooklyn photo booth at a New York City event"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-[15px] leading-relaxed text-ink/75 sm:text-base">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                We start with your guests, not our equipment
              </h2>
              <p>
                Any company can wheel a machine into a room. What decides
                whether the booth becomes the thing people talk about
                afterwards is who is standing next to it, how the line is
                managed, and whether the print lands in someone&apos;s hand
                while they are still laughing about the photo.
              </p>
              <p>
                So every event we plan starts with the same question: who is
                actually in this room? A corporate holiday party in Midtown, a
                Brooklyn wedding where half the guests flew in, a Sweet Sixteen
                where the crowd is fifteen — those are three completely
                different jobs, even if the booth looks the same in the corner.
              </p>
              <h2 className="pt-4 font-display text-2xl text-ink sm:text-3xl">
                Rooted in Brooklyn, built for the whole city
              </h2>
              <p>
                We take our cues from the people, brands and culture around us,
                and channel that into events guests remember long after the
                night ends. Brooklyn is home — Williamsburg rooftops, Bushwick
                warehouses, Park Slope brownstones — but the van goes out to
                Manhattan, Queens, the Bronx, Staten Island, Long Island,
                Westchester, New Jersey and Connecticut just as regularly.
              </p>
              <p>
                We have invested in the equipment that makes the experience
                worth having: pro-grade Canon DSLRs, studio ring lighting,
                dye-sublimation printers, the 360 platform, the mosaic wall,
                the roaming handheld system. Eighteen distinct booth
                experiences, all run by people who have set them up hundreds
                of times.
              </p>
              <h2 className="pt-4 font-display text-2xl text-ink sm:text-3xl">
                The unglamorous things we take seriously
              </h2>
              <p>
                We carry a $3 million insurance policy and turn certificates of
                insurance around the same day your venue asks — which, if you
                have ever chased a vendor for a COI two days before a wedding,
                you will recognize as a real feature. We arrive a full hour
                before start time and set up in about twenty minutes, so the
                booth is tested and quiet before your first guest sees it. We
                quote travel from your venue ZIP code up front rather than
                surprising you with it later.
              </p>
              <p>
                None of that is exciting. All of it is why the reviews read the
                way they do.
              </p>
              <h2 className="pt-4 font-display text-2xl text-ink sm:text-3xl">
                Why a Brooklyn company, not a national chain
              </h2>
              <p>
                Some national operators list a page for every metro they want
                to rank in, but a listed city and a real local presence are
                not the same thing. We checked one competitor&apos;s newest
                &quot;expansion&quot; markets and found that most of those
                city pages are not pages at all — they redirect straight to a
                generic locations directory with no local content behind
                them. A sitemap can claim a dozen new cities in a week;
                staffing them is a different thing entirely.
              </p>
              <p>
                We would rather cover ten Brooklyn neighborhoods for real
                than list fifty cities we do not actually work. Williamsburg,
                DUMBO, Park Slope, Bushwick, Greenpoint, Downtown Brooklyn,
                Crown Heights, Bay Ridge, Red Hook and Gowanus each have
                their own dedicated page on this site, because a Bushwick
                loft&apos;s freight-elevator hours and a Park Slope
                brownstone&apos;s street parking are genuinely different
                logistics problems, and we plan around both because we have
                actually worked both.
              </p>
              <p>
                It shows in the writing, too. On one national competitor&apos;s
                site, the same opening line — a description of being
                &quot;located in the heart of&quot; the city — runs almost
                word for word across multiple metro pages, with only the
                city name swapped. We would rather write fewer pages that
                are actually true. That is also why a real person answers
                when you reach out, why we quote travel from your actual
                venue ZIP code instead of a citywide average, and why
                certificates of insurance go out the same day your
                venue&apos;s coordinator asks for one.
              </p>
            </div>
            <div className="mt-12 flex flex-col items-start gap-6">
              <a
                href={SITE.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-pill border border-black/10 bg-white px-5 py-3 text-sm transition-colors hover:border-gold"
              >
                <Stars />
                <span className="text-ink/75">
                  <strong className="font-semibold text-ink">
                    {SITE.rating}
                  </strong>{" "}
                  from {SITE.reviewCount} {SITE.reviewSource} reviews
                </span>
              </a>
              <p className="text-sm text-ink/55">
                {SITE.rating} stars across {SITE.reviewCount}{" "}
                {SITE.reviewSource} reviews for {SITE.name}.
              </p>
              <CtaButton>Get a Free Quote</CtaButton>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Tell us about your event"
        sub="Date, venue and a rough guest count is all we need to come back with real numbers."
      />
    </>
  );
}
