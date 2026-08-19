import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You — We Got Your Request | Mirror Me Brooklyn",
  description:
    "Thanks for reaching out to Mirror Me Brooklyn. We have your request and will be back in touch shortly with photo booth pricing for your event.",
  alternates: { canonical: `${SITE.url}/thank-you` },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
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
          <CircleCheck className="mx-auto size-14 text-gold" aria-hidden="true" />
          <h1 className="mt-7 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Got it — thank you
          </h1>
          <p className="mt-6 text-base leading-relaxed text-cream/75 sm:text-lg">
            Your request is in and a real person is reading it. We will come
            back to you shortly with pricing for your date, usually the same
            day.
          </p>
          <p className="mt-4 text-base leading-relaxed text-cream/60">
            If your event is soon or you want to add anything, just reply to
            the confirmation email or write to{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-gold hover:underline"
            >
              {SITE.email}
            </a>
            .
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <Link
              href="/gallery"
              className="rounded-card border border-white/15 px-5 py-4 text-sm font-medium text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              Browse the gallery
            </Link>
            <Link
              href="/mirror-photo-booth"
              className="rounded-card border border-white/15 px-5 py-4 text-sm font-medium text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              See the mirror booth
            </Link>
            <Link
              href="/faq"
              className="rounded-card border border-white/15 px-5 py-4 text-sm font-medium text-cream/80 transition-colors hover:border-gold hover:text-gold"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-[16/7] overflow-hidden rounded-card">
            <Image
              src="/img/home-crowd.jpg"
              alt="Guests gathered around the photo booth at a New York City celebration"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
