import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { NAV_BOOTHS, NAV_EVENTS, NAV_LOCATIONS, SITE } from "@/lib/site";
import { CtaButton } from "./Button";

const eventsColumn = [
  ...NAV_EVENTS,
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {heading}
      </h2>
      <ul className="mt-5 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link prefetch={false} href={item.href} className="transition-colors hover:text-gold">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-cream/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/img/logo.png"
              alt="Magic Mirror Brooklyn photo booth rental Brooklyn"
              width={190}
              height={62}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Brooklyn-based photo booth rentals and interactive experiences
              for corporate events, weddings and celebrations across all five
              boroughs and the tri-state area.
            </p>
            <div className="mt-6">
              <CtaButton size="md">Get a Free Quote</CtaButton>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                aria-label="Magic Mirror Brooklyn on Instagram"
              >
                <Camera className="size-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                aria-label="Email Magic Mirror Brooklyn"
              >
                <Mail className="size-5" aria-hidden="true" />
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                aria-label={`Call Magic Mirror Brooklyn at ${SITE.phone}`}
              >
                <Phone className="size-5" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-sm">
              <a href={SITE.phoneHref} className="transition-colors hover:text-gold">
                {SITE.phone}
              </a>
            </p>
          </div>
          <FooterColumn heading="Booths" items={NAV_BOOTHS} />
          <FooterColumn heading="Events" items={eventsColumn} />
          <FooterColumn heading="Service Areas" items={NAV_LOCATIONS} />
        </div>
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
              Serving {SITE.basedIn}, NYC &amp; the tri-state area
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Book Online
              </a>
              <Link prefetch={false} href="/privacy" className="hover:text-gold">
                Privacy Policy
              </Link>
              <Link prefetch={false} href="/terms" className="hover:text-gold">
                Terms of Service
              </Link>
              <Link prefetch={false} href="/contact" className="hover:text-gold">
                Contact Us
              </Link>
              <Link prefetch={false} href="/about" className="hover:text-gold">
                About Us
              </Link>
            </div>
          </div>
          <p className="mt-6 text-xs text-cream/60">
            © {new Date().getFullYear()} {SITE.legalName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
