import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { faqPageFaqs } from "@/data";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMeta({
  title: "Photo Booth Rental FAQ NYC | Magic Mirror Brooklyn",
  description:
    "Cost, space, setup time, attendants, insurance and travel — answers to the questions people ask before booking a photo booth in NYC.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <section className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            FAQ
          </p>
          <h1 className="mt-4 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Planning a corporate event, trade show, brand activation,
            wedding, or special celebration? Here are answers to some of the
            questions we receive most often about Magic Mirror Brooklyn
            experiences.
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
