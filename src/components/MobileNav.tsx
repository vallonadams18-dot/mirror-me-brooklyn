"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_BOOTHS, NAV_EVENTS, NAV_LOCATIONS, SITE } from "@/lib/site";
import { CtaButton } from "./Button";

function AccordionGroup({
  label,
  items,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-cream"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`size-5 text-gold transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="grid grid-cols-2 gap-1 pb-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm text-cream/75 hover:bg-white/5 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-lg text-cream lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>
      {/* Portaled to <body>: the header's backdrop-blur creates a CSS
          containing block that would trap and zero-out this fixed panel. */}
      {open && createPortal(
        <div
          id="mobile-nav"
          className="fixed inset-0 top-16 z-50 overflow-y-auto overscroll-contain bg-ink sm:top-20 lg:hidden"
        >
          <div className="flex justify-end px-4 pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-lg text-cream/70"
              aria-label="Close menu"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="space-y-1 px-4 pb-16" aria-label="Mobile">
            <AccordionGroup label="Booths" items={NAV_BOOTHS} />
            <AccordionGroup label="Events" items={NAV_EVENTS} />
            <AccordionGroup label="Service Areas" items={NAV_LOCATIONS} />
            <Link
              href="/gallery"
              className="block border-b border-white/10 py-4 text-base font-medium text-cream hover:text-gold"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="block border-b border-white/10 py-4 text-base font-medium text-cream hover:text-gold"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="block border-b border-white/10 py-4 text-base font-medium text-cream hover:text-gold"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="block border-b border-white/10 py-4 text-base font-medium text-cream hover:text-gold"
            >
              Contact
            </Link>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2.5 border-b border-white/10 py-4 text-base font-medium text-cream hover:text-gold"
            >
              <Phone className="size-5 text-gold" aria-hidden="true" />
              Call {SITE.phone}
            </a>
            <div className="pt-5">
              <CtaButton className="w-full">Get a Free Quote</CtaButton>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
