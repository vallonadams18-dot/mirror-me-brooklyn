import type { Metadata } from "next";
import Image from "next/image";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoPlayer } from "@/components/VideoPlayer";
import { homeGallery } from "@/data/reviews";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photo Booth Gallery | Real NYC Events | Magic Mirror Brooklyn",
  description:
    "Photos and video from real Magic Mirror Brooklyn events — weddings, mitzvahs, proms, showers and brand activations across NYC and the tri-state area.",
  alternates: { canonical: `${SITE.url}/gallery` },
};

const captions = [
  "Wedding reception, Brooklyn",
  "Mirror booth touchscreen",
  "Props and prints",
  "Wedding, New York",
  "Instant 4x6 prints",
  "LED-lit booth",
  "Red carpet setup",
  "Tri-state wedding",
  "Birthday party, Brooklyn",
];

const galleryImages = homeGallery.map((img, i) => ({
  ...img,
  caption: captions[i],
}));

const videos = [
  {
    src: "/video/mirror-photo-booth.mp4",
    poster: "/img/mirror-booth-poster.jpg",
    label: "Mirror photo booth",
  },
  {
    src: "/video/360-photo-booth.mp4",
    poster: "/img/360-booth-poster.jpg",
    label: "360 photo booth",
  },
  {
    src: "/video/roaming-photo-booth.mp4",
    poster: "/img/roamer-poster.jpg",
    label: "Roaming photo booth",
  },
  {
    src: "/video/branded-photo-booth.mp4",
    poster: "/img/branded-poster.jpg",
    label: "Branded photo booth",
  },
];

const templates = [
  {
    src: "/img/template-1.jpg",
    alt: "Custom wedding photo booth print template designed for a New York couple",
  },
  {
    src: "/img/template-2.jpg",
    alt: "Branded corporate photo booth print template for an NYC event",
  },
  {
    src: "/img/template-3.jpg",
    alt: "Custom photo booth print layout with names and event date",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Gallery
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Photo Booth Gallery — Real NYC Events
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Weddings, mitzvahs, proms, bridal showers and brand activations
            across New York and the tri-state area.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PhotoCarousel images={galleryImages} />
        </div>
      </section>

      <section className="bg-ink px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="On video"
            heading="The booths in motion"
            sub="Footage from real events. The mirror, the 360 platform, the roamer and the branded activation booth."
            tone="dark"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {videos.map((video) => (
              <VideoPlayer key={video.src} {...video} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Print templates"
            heading="Every layout designed for the event"
            sub="Names, dates, colors, monograms or a company logo — your template is built for you, not picked from a dropdown."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.src}
                className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface ring-1 ring-black/5"
              >
                <Image
                  src={template.src}
                  alt={template.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Want your event to look like this?"
        sub="Tell us the date and venue and we will come back with pricing for the booth that fits your room."
      />
    </>
  );
}
