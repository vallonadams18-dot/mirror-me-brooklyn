import { CalendarCheck, Clock, MessageSquare } from "lucide-react";
import { CtaButton } from "./Button";
import { SectionHeading } from "./SectionHeading";

interface StepsSectionProps {
  bg?: "cream" | "white";
  /** Override for the first step's description (location pages mention the area). */
  step1Desc?: string;
}

/** Shared "how it works" step copy, reused for the visual section below and
 * for HowTo structured data (see lib/jsonld.ts) so the two never drift apart. */
export const HOW_IT_WORKS_STEPS = [
  {
    title: "Tell us about your event",
    desc: "Date, venue, rough guest count. The form takes about 30 seconds and there is no obligation.",
  },
  {
    title: "Get a real quote back",
    desc: "We come back with pricing for the booth that actually suits your room, your guest count and your budget — travel included, nothing hidden.",
  },
  {
    title: "We handle the rest",
    desc: "We design your print template, send the venue their certificate of insurance, arrive an hour early, and run the booth all night.",
  },
];

export function StepsSection({ bg = "cream", step1Desc }: StepsSectionProps) {
  const icons = [MessageSquare, Clock, CalendarCheck];
  const steps = HOW_IT_WORKS_STEPS.map((step, i) => ({
    ...step,
    desc: i === 0 && step1Desc ? step1Desc : step.desc,
    icon: icons[i],
  }));

  return (
    <section
      className={`cv-auto ${bg === "cream" ? "bg-cream" : "bg-white"} px-4 py-20 sm:px-6 sm:py-24 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          heading="Three steps, and none of them are stressful"
          sub="No pressure, no commitment, and a real person reading your enquiry."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              {/* Decorative numeral drawn via pseudo-element so it stays out
                  of the accessibility tree and contrast checks */}
              <span
                aria-hidden="true"
                style={
                  {
                    "--step-n": `"${String(i + 1).padStart(2, "0")}"`,
                  } as React.CSSProperties
                }
                className="block font-display text-5xl font-semibold leading-none text-gold/25 before:content-[var(--step-n)]"
              />
              <step.icon className="mt-4 size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-sans text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <CtaButton>Get a Free Quote</CtaButton>
        </div>
      </div>
    </section>
  );
}
