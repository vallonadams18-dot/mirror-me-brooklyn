import type { Faq } from "@/data/types";
import { CtaButton } from "./Button";
import { SectionHeading } from "./SectionHeading";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-black/8 border-y border-black/8">
      {faqs.map((faq) => (
        <details key={faq.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-sans text-base font-semibold text-ink marker:content-none sm:text-lg">
            {faq.q}
            <span
              className="relative inline-block size-5 shrink-0 text-gold"
              aria-hidden="true"
            >
              <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink/70">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}

interface FaqSectionProps {
  heading: string;
  faqs: Faq[];
  bg?: "cream" | "white";
  eyebrow?: string;
  showCta?: boolean;
}

export function FaqSection({
  heading,
  faqs,
  bg = "cream",
  eyebrow = "Questions",
  showCta = true,
}: FaqSectionProps) {
  return (
    <section
      className={`cv-auto ${bg === "cream" ? "bg-cream" : "bg-white"} px-4 py-20 sm:px-6 sm:py-24 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} heading={heading} />
        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
        {showCta && (
          <div className="mt-12 flex justify-center">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
}
