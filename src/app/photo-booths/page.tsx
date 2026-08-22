import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/metadata";
import { BoothCard } from "@/components/BoothCard";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { boothCards } from "@/data/home";
import { breadcrumbJsonLd } from "@/lib/jsonld";

const boothGuidance: Record<string, string> = {
  "/mirror-photo-booth":
    "Pick the magic mirror booth when you want one experience the whole guest list uses. The full-length touchscreen and animated overlays make it our most-booked option for weddings, Sweet Sixteens and bar and bat mitzvahs, where a wide range of ages needs one obvious, easy-to-use focal point.",
  "/mirror-x-photo-booth":
    "Choose the Mirror X for corporate floors where the booth has to match a designed space rather than decorate it. Same touchscreen, DSLR and unlimited prints as the original mirror, but the frameless glass profile reads modern rather than ornate — built for product launches, trade shows and brand activations.",
  "/360-photo-booth":
    "Book the 360 when the goal is content people actually share. The branded platform and slow-motion orbiting camera turn each guest into a short video rather than a print, which is why it's the most-requested booth at Sweet Sixteens, brand activations and galas where energy matters as much as a keepsake.",
  "/glam-booth":
    "Choose the glam booth for dressed-up events where you want every photo to match — a black-tie wedding, a gala, a milestone birthday. The signature black-and-white edit and studio lighting produce one consistent, red-carpet look across the whole night rather than a mix of styles.",
  "/vogue-booth":
    "Pick the Vogue booth for events built around energy and light — Sweet Sixteens, proms, brand launches. Guests step into a 3D, LED-lit backdrop and walk away with a boomerang, clip or GIF in about ten seconds, which reads dramatically in a dark room in a way a still print can't.",
  "/roaming-photo-booth":
    "Book the roaming booth for tight venues or cocktail hours with no dead space to spare — it needs no floor space at all. An attendant carries a handheld capture system to seated tables, the bar and anywhere else a static booth's queue would never reach.",
  "/green-screen-photo-booth":
    "Choose the green screen booth when the backdrop itself is the point — a themed party, a school event, a trade show stand built around one idea. Our design team builds custom digital backgrounds with you in advance, so every guest photo drops them into a set built for that event.",
  "/mosaic-wall":
    "Pick the mosaic wall for an event that needs one big collective payoff — a fundraiser, a conference, a company party. Every guest photo prints as a peel-and-place sticker, and by the end of the night the wall has built into one large image, often a company logo.",
  "/branded-photo-booth":
    "Choose the branded booth when consistency is the actual deliverable — a product launch, a sponsorship activation, a retail event. The full wrap, custom start screen, branded overlays and opt-in contact capture turn the booth into a marketing channel your team can report on, not just a party favor.",
  "/ai-photo-booth":
    "Book the AI photo booth when you want the booth people talk about on the way home — brand activations, corporate parties, trade shows. Real-time AI transformations and virtual backgrounds turn a standard photo into something guests haven't seen before, with opt-in data capture available for marketing teams.",
  "/glambot":
    "Choose the Glambot for galas and brand activations built around a red-carpet moment. A robotic camera arm sweeps past guests in cinematic slow motion — the award-show shot — with a trained operator running it and a logo watermark on every clip that goes out.",
  "/magazine-booth":
    "Pick the magazine booth for events with a milestone worth putting on a cover — Sweet Sixteens, galas, corporate parties. Guests pose and get a custom magazine cover, masthead and headlines included, designed for the specific event rather than a generic template.",
  "/gif-booth":
    "Choose the GIF booth for casual, high-energy events — birthdays, corporate parties, brand activations — where guests want something shareable fast. A quick burst of shots becomes a branded, looping GIF guests can post before they've even left the booth.",
  "/3d-slider-booth":
    "Book the 3D slider for events where a single still photo undersells the moment — proms, weddings, brand activations. A camera glides across a track mid-pose, capturing multiple angles in one take for a shot with real depth a fixed booth can't produce.",
  "/studio-booth":
    "Choose the studio booth for networking events and corporate galas where portraits matter more than props. Pro-grade DSLR and creative studio lighting produce the kind of headshot-quality portrait guests would otherwise pay a studio for, with custom overlays carrying names or a company logo.",
  "/champagne-wall":
    "Add a champagne wall for weddings and galas that want a photographed moment beyond the booth itself. We deliver, style and pick up a wall of filled glasses that pairs with any booth or flower wall, with branding options available for corporate events.",
  "/enclosed-photo-booth":
    "Pick the enclosed booth for events that want the classic, curtained experience — weddings, birthdays, bar and bat mitzvahs. The privacy of a closed curtain tends to bring out looser, more unguarded photos than an open-air setup, printed as unlimited classic strips.",
  "/flower-wall-rental":
    "Add a flower wall when you want a backdrop that photographs well on its own or behind any of our booths — weddings, bridal and baby showers, brand events. With 30-plus styles in stock and delivery, setup and pickup handled for you, it's the lowest-effort way to upgrade a plain wall.",
};

export const metadata: Metadata = pageMeta({
  title: "All Photo Booth Rentals NYC | Magic Mirror Brooklyn",
  description:
    "Every photo booth we rent in NYC — mirror, 360, glam, roaming, AI, enclosed and more. All with an attendant, unlimited prints and instant sharing.",
  path: "/photo-booths",
  image: "/img/og/mirror-photo-booth.jpg",
  imageAlt: "Magic Mirror Brooklyn photo booth lineup",
});

export default function PhotoBoothsPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The full lineup
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Every Photo Booth Experience We Rent
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Eighteen booths, one standard: a trained attendant, a
            custom-designed print template and unlimited prints with every
            single one.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boothCards.map((booth) => (
              <BoothCard key={booth.href} booth={booth} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl border-t border-black/8 pt-16">
          <SectionHeading
            eyebrow="How to choose"
            heading="Which Booth Fits Your Event"
            sub="Every booth here does something the others don't. Here's the real reason to pick each one, not just what it looks like."
          />
          <dl className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-10 sm:grid-cols-2">
            {boothCards.map((booth) => (
              <div key={booth.href}>
                <dt className="font-sans text-base font-semibold text-ink">
                  <Link
                    href={booth.href}
                    className="hover:text-gold-dark hover:underline"
                  >
                    {booth.title}
                  </Link>
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink/65">
                  {boothGuidance[booth.href]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaSection
        heading="Not sure which one fits your room?"
        sub="Tell us the venue, the date and the crowd. We will recommend the booth that actually suits the night — no upselling, no pressure."
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Photo Booths", path: "/photo-booths" },
        ])}
      />
    </>
  );
}
