import type { Metadata } from "next";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { faqPageFaqs } from "@/data";
import { faqJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Photo Booth Rental FAQ | Pricing, Space, Setup & Insurance | Magic Mirror Brooklyn",
  description:
    "Answers to the questions people ask before booking a photo booth in NYC: cost, space needed, setup time, attendants, insurance, COIs and travel across the tri-state area.",
  alternates: { canonical: `${SITE.url}/faq` },
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            FAQ
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Photo Booth Rental Questions, Answered
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Cost, space, setup, insurance and travel — the practical things
            worth knowing before you book.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FaqAccordion faqs={faqPageFaqs} />
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Still have a question?"
        sub="Ask it on the quote form — we answer every enquiry personally, and there is no obligation to book."
      />

      <JsonLd data={faqJsonLd(faqPageFaqs)} />
    </>
  );
}
