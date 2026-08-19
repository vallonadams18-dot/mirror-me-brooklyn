import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_BOOTHS, NAV_EVENTS, NAV_LOCATIONS } from "@/lib/site";
import { CtaButton } from "./Button";
import { MobileNav } from "./MobileNav";

function Dropdown({
  label,
  items,
  wide = false,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  wide?: boolean;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-cream/80 transition-colors group-hover:text-gold"
      >
        {label}
        <ChevronDown
          className="size-4 transition-transform group-hover:rotate-180"
          aria-hidden="true"
        />
      </button>
      <div
        className={`invisible absolute left-0 top-full z-50 ${wide ? "w-[26rem]" : "w-64"} translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}
      >
        <div
          className={`mt-2 rounded-xl border border-white/10 bg-surface p-2 shadow-2xl ${wide ? "grid grid-cols-2 gap-1" : "space-y-0.5"}`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Mirror Me Brooklyn home"
        >
          <Image
            src="/img/logo.png"
            alt="Mirror Me Brooklyn photo booth rental"
            width={190}
            height={62}
            className="h-9 w-auto sm:h-11"
            priority
          />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          <Dropdown label="Booths" items={NAV_BOOTHS} wide />
          <Dropdown label="Events" items={NAV_EVENTS} />
          <Dropdown label="Service Areas" items={NAV_LOCATIONS} wide />
          <Link
            href="/gallery"
            className="rounded-lg px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-gold"
          >
            Gallery
          </Link>
          <Link
            href="/testimonials"
            className="rounded-lg px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-gold"
          >
            Reviews
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-gold"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="rounded-lg px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-gold"
          >
            FAQ
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <span className="hidden sm:inline-flex">
            <CtaButton size="md">Get a Free Quote</CtaButton>
          </span>
          <span className="inline-flex sm:hidden">
            <CtaButton size="md" className="px-4 text-sm">
              Get a Quote
            </CtaButton>
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
