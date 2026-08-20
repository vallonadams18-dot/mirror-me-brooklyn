import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { BoothCard } from "@/components/BoothCard";
import { BrandLogos } from "@/components/BrandLogos";
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
import { VideoPlayer } from "@/components/VideoPlayer";
import { homeFaqs } from "@/data";
import { eventHighlight, galleryEvents } from "@/data/galleryEvents";
import { boothCards, eventCards, heroFeatures } from "@/data/home";
import { faqJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Photo Booth Rental NYC & Tri-State | Magic Mirror Brooklyn",
  description:
    "Photo booth rental across NYC and the tri-state area. Mirror, 360, glam and roaming booths with unlimited prints, a pro attendant and instant sharing.",
  path: "",
});

// The nine most-booked experiences lead the homepage (three rows of three);
// /photo-booths and the footer keep every booth crawlable.
const FEATURED_SLUGS = [
  "/studio-booth",
  "/glam-booth",
  "/ai-photo-booth",
  "/mirror-photo-booth",
  "/branded-photo-booth",
  "/enclosed-photo-booth",
  "/glambot",
  "/mosaic-wall",
  "/flower-wall-rental",
];
const featuredBooths = FEATURED_SLUGS.map(
  (slug) => boothCards.find((b) => b.href === slug)!
).filter(Boolean);

// Every claim below comes from the booth pages themselves — footprints from
// the space FAQs, outputs from the included lists.
const boothComparison = [
  {
    href: "/mirror-photo-booth",
    booth: "Magic Mirror Booth",
    bestFor: "Weddings, mitzvahs & Sweet Sixteens",
    space: "10×10 ft ideal, 8×8 ft minimum",
    output: "Unlimited 4×6 prints + instant sharing",
  },
  {
    href: "/360-photo-booth",
    booth: "360 Photo Booth",
    bestFor: "Sweet Sixteens, nightlife & brand events",
    space: "8×8 ft clear, plus room for the crowd",
    output: "Slow-motion 360 video reels",
  },
  {
    href: "/glam-booth",
    booth: "Glam Booth",
    bestFor: "Weddings, galas & fashion events",
    space: "10×10 ft ideal, 8×8 ft minimum",
    output: "Black-and-white glam prints",
  },
  {
    href: "/roaming-photo-booth",
    booth: "Roaming Booth",
    bestFor: "Cocktail hours, trade shows & tight venues",
    space: "None — the booth walks the room",
    output: "Instant digital shares",
  },
  {
    href: "/branded-photo-booth",
    booth: "Branded Booth",
    bestFor: "Product launches & sponsorships",
    space: "Sized to the activation",
    output: "Branded prints, GIFs + data capture",
  },
  {
    href: "/ai-photo-booth",
    booth: "AI Photo Booth",
    bestFor: "Brand activations & corporate parties",
    space: "10×10 ft ideal, 8×8 ft minimum",
    output: "AI-styled portraits",
  },
  {
    href: "/enclosed-photo-booth",
    booth: "Enclosed Booth",
    bestFor: "Weddings, birthdays & corporate parties",
    space: "Compact cabinet footprint",
    output: "Classic photo strips",
  },
  {
    href: "/flower-wall-rental",
    booth: "Flower Wall",
    bestFor: "Weddings, showers & brand moments",
    space: "Pairs with any booth setup",
    output: "A lush backdrop in every shot",
  },
];

// One standout real photo per event — no stock filler.
const homeEventShowcase = galleryEvents.map((event) => eventHighlight(event));

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 60% at 15% 0%, rgba(229,173,31,0.16) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            {/* No entrance animation here: animating the hero from opacity 0
                delays LCP until hydration finishes */}
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Brooklyn-based · Women-owned
              </p>
              <h1 className="mt-4 text-[2.1rem] leading-[1.1] text-cream sm:text-5xl lg:text-[3.4rem]">
                Photo Booth Rental in NYC &amp; the Tri-State Area
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
                Mirror, 360, glam and roaming booths for weddings, corporate
                events and celebrations across all five boroughs. Real
                attendants, unlimited prints, zero stress.
              </p>
              <RatingLine className="mt-6" />
              <div className="mt-7">
                <CtaButton>Get a Free Quote</CtaButton>
              </div>
              <p className="mt-4 text-sm text-cream/50">
                Takes about 30 seconds. No obligation, no pushy follow-up.
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/15 sm:aspect-[5/4]">
                <Image
                  src="/img/hero-gold-wall.jpg"
                  alt="Guests posing in front of a gold sequin wall beside the ring-light photo booth at a New York gala"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-card border border-gold/30 bg-ink px-5 py-3.5 shadow-xl lg:flex">
                <span className="font-display text-3xl leading-none text-gold">
                  18
                </span>
                <span className="text-xs uppercase leading-tight tracking-wider text-cream/70">
                  Booth
                  <br />
                  experiences
                </span>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <div className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {heroFeatures.map((feature) => (
                <div key={feature.title} className="bg-ink p-6">
                  <Check className="size-5 text-gold" aria-hidden="true" />
                  <p className="mt-3 font-sans text-base font-semibold text-cream">
                    {feature.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="bg-cream px-4 !py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-ink/80 sm:text-xl">
            <strong className="font-semibold text-ink">
              Magic Mirror Brooklyn
            </strong>{" "}
            is a Brooklyn-based, women-owned photo booth rental company serving
            all five boroughs of New York City and the tri-state area, rated{" "}
            <strong className="font-semibold text-ink">
              4.9 stars across 210 Google reviews
            </strong>
            . Every rental includes a professional on-site attendant, unlimited
            prints and instant text or email sharing, and the company carries a
            $2 million insurance policy with same-day certificates of insurance
            for venues.
          </p>
        </div>
      </section>

      {/* Client logos sandwich the booth grid: row A scrolls left just
          above it, row B scrolls right just below it. */}
      <BrandLogos bg="cream" row="a" />

      {/* Booth grid — curated to the most-booked eight; the full lineup
          lives at /photo-booths and every booth stays linked in the footer */}
      <section className="cv-auto bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Choose your experience"
            heading="The booths people book most"
            sub="Every booth ships with a trained operator, a custom-designed print template and unlimited prints. Start with the favorites below, or browse all eighteen."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooths.map((booth) => (
              <BoothCard key={booth.href} booth={booth} />
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <CtaButton>Get a Free Quote</CtaButton>
            <Link
              href="/photo-booths"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 underline-offset-4 hover:text-gold-dark hover:underline"
            >
              View all 18 booth experiences
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <BrandLogos bg="cream" row="b" showLabel={false} />

      {/* Booth chooser */}
      <section className="cv-auto bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Quick comparison"
            heading="Which booth is right for me?"
            sub="The honest one-glance version. When in doubt, tell us the room and the crowd and we will recommend one."
          />
          <div className="mt-12 overflow-x-auto rounded-card border border-black/8 bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-black/10 bg-cream/60 text-xs font-semibold uppercase tracking-wider text-ink/70">
                  <th scope="col" className="px-5 py-4">
                    Booth
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Best for
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Space needed
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Guests walk away with
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-ink/75">
                {boothComparison.map((row) => (
                  <tr key={row.href}>
                    <th scope="row" className="px-5 py-4 font-semibold">
                      <Link
                        href={row.href}
                        className="text-ink underline-offset-4 hover:text-gold-dark hover:underline"
                      >
                        {row.booth}
                      </Link>
                    </th>
                    <td className="px-5 py-4">{row.bestFor}</td>
                    <td className="px-5 py-4">{row.space}</td>
                    <td className="px-5 py-4">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section className="cv-auto bg-ink px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="See it running"
                heading="This is what it looks like at 11pm"
                sub="Booth footage from real events — the mirror, the 360 platform, the roamer working a room. Sound on if you want the full effect."
                tone="dark"
                align="left"
              />
              <div className="mt-8">
                <CtaButton>Get a Free Quote</CtaButton>
              </div>
            </div>
            <VideoPlayer
              src="/video/showreel.mp4"
              poster="/img/showreel-poster.jpg"
              label="Magic Mirror Brooklyn showreel"
            />
          </div>
        </div>
      </section>

      {/* What you actually get */}
      <section className="cv-auto bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="What you actually get"
                heading="A photo booth rental that runs itself"
                align="left"
              />
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink/70 sm:text-base">
                <p>
                  The difference between a photo booth people queue for and one
                  that sits in a corner is almost never the machine. It is
                  whether someone is standing next to it who knows how to start
                  a line, keep the prop table from turning into a jumble, and
                  hand a print to a guest before they walk away. Every rental
                  we do includes that person.
                </p>
                <p>
                  Underneath, the equipment is genuinely good: pro-grade Canon
                  DSLRs, studio-powered ring lighting, dye-sublimation printers
                  that produce a dry 4x6 in seconds rather than a damp strip.
                  Guests get unlimited sessions and unlimited prints for the
                  whole rental, plus instant delivery to their phone by text,
                  email or QR code, and an online gallery of everything shot at
                  your event.
                </p>
                <p>
                  Your print template is designed for your event rather than
                  picked from a dropdown — names and date for a wedding, a
                  monogram for a Sweet Sixteen, a logo and campaign lockup for
                  a brand activation. Backdrops, digital props, animated
                  overlays, beauty filters and green screen backgrounds are all
                  on the table depending on which booth you choose.
                </p>
                <p>
                  We set up in about 20 minutes and arrive a full hour before
                  your start time, so the booth is tested and quietly ready
                  before your first guest sees it. We carry a $2 million policy
                  and turn certificates of insurance around the same day your
                  venue asks.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:mt-10">
                <Image
                  src="/img/home-mirror.jpg"
                  alt="LED-framed mirror photo booth set up at a New York City event venue"
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-card">
                <Image
                  src="/img/home-360.jpg"
                  alt="Guest on the 360 photo booth platform under string lights at an NYC event"
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-full aspect-[16/9] overflow-hidden rounded-card">
                <Image
                  src="/img/home-crowd.jpg"
                  alt="Crowd gathered around the photo booth at a Brooklyn celebration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event types — no cv-auto: axe cannot resolve text-over-image contrast inside a content-visibility section */}
      <section className="cv-auto bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Built for the night"
            heading="Corporate events, trade shows, weddings and everything in between"
            sub="Different rooms, different crowds, different reasons to book. Pick the one closest to yours."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {eventCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group overflow-hidden rounded-card bg-ink transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                </div>
                {/* Solid ink panel (no image overlap) so contrast checkers can
                    resolve the cream text even inside a cv-auto section */}
                <div className="relative -mt-px bg-ink p-7">
                  <h3 className="font-display text-2xl text-cream">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream/65">
                    {card.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    See {card.seeLabel} details
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="cv-auto bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Real events"
            heading="Nights we have already run"
            sub="Corporate events, trade shows, brand activations, and special occasions."
          />
          <div className="mt-14">
            <PhotoCarousel images={homeEventShowcase} />
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <CtaButton>Get a Free Quote</CtaButton>
            <Link
              href="/gallery"
              className="text-sm font-medium text-ink/60 underline-offset-4 hover:text-gold-dark hover:underline"
            >
              See the full photo booth gallery
            </Link>
          </div>
        </div>
      </section>

      <ServiceAreasSection />

      <ReviewsSection
        bg="cream"
        count={6}
        sub="Reviews left by the people who booked us, reproduced word for word."
        showGoogleLink
        showCta
      />

      <StepsSection bg="white" />

      <FaqSection
        heading="The things people ask before booking"
        faqs={homeFaqs}
        bg="cream"
      />

      <CtaSection
        heading="Your guests will remember the booth"
        sub="Tell us your date, your venue and roughly how many people are coming. We will come back with real pricing for the booth that actually fits your room — travel included, nothing hidden."
      />

      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
