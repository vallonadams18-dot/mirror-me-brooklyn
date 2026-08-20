import { SITE } from "@/lib/site";
import { CtaButton } from "./Button";

interface CtaSectionProps {
  heading: string;
  sub: string;
}

export function CtaSection({ heading, sub }: CtaSectionProps) {
  return (
    <section className="cv-auto relative overflow-hidden bg-ink px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(229,173,31,0.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl leading-[1.15] text-cream sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-cream/70 sm:text-lg">
          {sub}
        </p>
        <div className="mt-10 flex justify-center">
          <CtaButton>Get a Free Quote</CtaButton>
        </div>
        <p className="mt-6 text-sm text-cream/60">
          Or email us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-gold hover:underline"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
