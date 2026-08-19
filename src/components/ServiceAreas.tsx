import Link from "next/link";
import { MapPin } from "lucide-react";
import { NAV_LOCATIONS } from "@/lib/site";
import { CtaButton } from "./Button";
import { SectionHeading } from "./SectionHeading";

interface ServiceAreasSectionProps {
  heading?: string;
  sub?: string;
  /** Number of areas to show (booth pages show the first 8; home shows all 12). */
  count?: number;
}

export function ServiceAreasSection({
  heading = "All five boroughs and across the tri-state area",
  sub = "Based in Brooklyn, out most weekends across New York, New Jersey and Connecticut. Travel is quoted from your venue ZIP code before you book — never added afterwards.",
  count = NAV_LOCATIONS.length,
}: ServiceAreasSectionProps) {
  return (
    <section className="bg-ink px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Where we serve"
          heading={heading}
          sub={sub}
          tone="dark"
        />
        <div className="mt-14">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {NAV_LOCATIONS.slice(0, count).map((loc) => (
              <li key={loc.href}>
                <Link
                  href={loc.href}
                  className="group flex h-full items-center gap-3 rounded-card border border-white/10 bg-surface/60 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-surface"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium leading-tight text-cream">
                    {loc.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex justify-center">
          <CtaButton>Get a Free Quote</CtaButton>
        </div>
      </div>
    </section>
  );
}
