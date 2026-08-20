import Link from "next/link";
import { CtaButton } from "@/components/Button";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <LegacyRedirect />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(229,173,31,0.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          404
        </p>
        <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
          That page isn&apos;t here
        </h1>
        <p className="mt-6 text-base leading-relaxed text-cream/70 sm:text-lg">
          The page you were looking for doesn&apos;t exist or has moved. The
          booths, however, are all still here.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <CtaButton>Get a Free Quote</CtaButton>
          <Link
            href="/"
            className="text-sm font-medium text-cream/60 underline-offset-4 hover:text-gold hover:underline"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
