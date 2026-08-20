"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ArrowRight } from "lucide-react";

const EVENT_TYPES = [
  "Wedding",
  "Corporate event",
  "Trade show / brand activation",
  "Birthday",
  "Sweet Sixteen",
  "Bar / Bat Mitzvah",
  "Quinceañera",
  "Baby / bridal shower",
  "Graduation",
  "Other",
];

const BOOTHS = [
  "Not sure yet — recommend one",
  "Mirror Photo Booth",
  "360 Photo Booth",
  "Glam Booth",
  "Vogue Booth",
  "Roaming Photo Booth",
  "Green Screen Booth",
  "Mosaic Wall",
  "Branded Booth",
  "Flower Wall",
];

interface FieldErrors {
  [key: string]: string | undefined;
}

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const labelClass = "block text-sm font-semibold text-ink";
const errorClass = "mt-1.5 text-sm text-red-600";

/** Attribution captured on first paint so it survives in-site navigation. */
function readAttribution() {
  try {
    const stored = sessionStorage.getItem("mmb-attribution");
    if (stored) return JSON.parse(stored) as Record<string, string>;
  } catch {
    /* storage unavailable */
  }
  return {};
}

export function captureAttribution() {
  try {
    if (sessionStorage.getItem("mmb-attribution")) return;
    const params = new URLSearchParams(window.location.search);
    const attribution: Record<string, string> = {
      landingPage: window.location.pathname,
      referrer: document.referrer || "",
    };
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "gbraid",
      "wbraid",
      "fbclid",
    ]) {
      const value = params.get(key);
      if (value) attribution[key] = value;
    }
    sessionStorage.setItem("mmb-attribution", JSON.stringify(attribution));
  } catch {
    /* storage unavailable */
  }
}

export function QuoteForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    captureAttribution();
  }, []);

  function validate(data: FormData): FieldErrors {
    const errs: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const eventDate = String(data.get("eventDate") ?? "").trim();
    const zip = String(data.get("venueZip") ?? "").trim();

    if (!name) errs.name = "Please tell us your name.";
    if (!email) errs.email = "We need an email to send your quote to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "That email doesn't look right.";
    if (phone && !/^[\d\s()+.-]{7,20}$/.test(phone))
      errs.phone = "That phone number doesn't look right.";
    if (!eventDate) errs.eventDate = "Please pick your event date.";
    if (!zip) errs.venueZip = "The venue ZIP code lets us include travel in your quote.";
    else if (!/^\d{5}(-\d{4})?$/.test(zip))
      errs.venueZip = "Please enter a 5-digit ZIP code.";
    return errs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots that fill the hidden field get a silent no-op.
    if (String(data.get("company_website") ?? "") !== "") {
      router.push("/thank-you");
      return;
    }

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      (form.elements.namedItem(firstKey) as HTMLElement | null)?.focus();
      return;
    }

    data.delete("company_website");
    const lead = {
      ...Object.fromEntries(data.entries()),
      ...readAttribution(),
      source: "magicmirrorbrooklyn.com quote form",
      submittedAt: new Date().toISOString(),
      // FormSubmit config (ignored by other webhook targets)
      _subject: "New photo booth quote request",
      _template: "table",
      _captcha: "false",
    };

    // Delivery target, in order of preference:
    // 1. NEXT_PUBLIC_LEAD_ENDPOINT — our Cloudflare Worker (see workers/lead-worker.js),
    //    which validates server-side, checks Turnstile, rate-limits and logs.
    // 2. NEXT_PUBLIC_LEAD_WEBHOOK_URL — a CRM inbound webhook (GoHighLevel, Zapier...).
    // 3. FormSubmit relay to the business inbox (interim default).
    // These are public endpoints by design — secrets live in the Worker, never here.
    const webhook =
      process.env.NEXT_PUBLIC_LEAD_ENDPOINT ||
      process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
      "https://formsubmit.co/ajax/hello@mirrormebrooklyn.com";

    setStatus("submitting");
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      // Only a readable 2xx counts as delivered. No opaque "assume success".
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      try {
        // Conversion event only after confirmed delivery.
        (
          window as unknown as {
            gtag?: (...args: unknown[]) => void;
          }
        ).gtag?.("event", "generate_lead", { method: "quote_form" });
      } catch {
        /* analytics not installed */
      }
      router.push("/thank-you");
    } catch {
      setStatus("error");
      statusRef.current?.focus();
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 text-left">
      {/* Honeypot — hidden from real users, tempting for bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_website">
          Leave this field empty
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`${inputClass} mt-2`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`${inputClass} mt-2`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${inputClass} mt-2`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event date *
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            className={`${inputClass} mt-2`}
            aria-invalid={!!errors.eventDate}
            aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
          />
          {errors.eventDate && (
            <p id="eventDate-error" className={errorClass}>
              {errors.eventDate}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event type
          </label>
          <select id="eventType" name="eventType" className={`${inputClass} mt-2`}>
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="booth" className={labelClass}>
            Booth you&apos;re interested in
          </label>
          <select id="booth" name="booth" className={`${inputClass} mt-2`}>
            {BOOTHS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="venueZip" className={labelClass}>
            Venue ZIP code *
          </label>
          <input
            id="venueZip"
            name="venueZip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            className={`${inputClass} mt-2`}
            aria-invalid={!!errors.venueZip}
            aria-describedby={errors.venueZip ? "venueZip-error" : undefined}
          />
          {errors.venueZip && (
            <p id="venueZip-error" className={errorClass}>
              {errors.venueZip}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="guestCount" className={labelClass}>
            Rough guest count
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            min={1}
            className={`${inputClass} mt-2`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} mt-2`}
          placeholder="Venue name, timings, theme — whatever helps."
        />
      </div>
      <div aria-live="polite">
        {status === "error" && (
          <p
            ref={statusRef}
            role="alert"
            tabIndex={-1}
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            Something went wrong sending your request — your message was not
            delivered. Please try again, or email us directly at{" "}
            <a
              href="mailto:hello@mirrormebrooklyn.com"
              className="font-semibold underline"
            >
              hello@mirrormebrooklyn.com
            </a>
            .
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-gold font-semibold tracking-tight text-ink shadow-[0_6px_24px_-8px_rgba(229,173,31,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_10px_32px_-8px_rgba(229,173,31,0.85)] focus-visible:outline-2 focus-visible:outline-offset-3 active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 min-h-14 px-8 text-base sm:text-[17px]"
      >
        {status === "submitting" ? (
          <>
            Sending…
            <Loader2 className="size-[1.1em] animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Get My Free Quote
            <ArrowRight
              className="size-[1.1em] shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>
      <p className="text-center text-xs text-ink/60">
        No obligation, no pushy follow-up. A real person reads every enquiry.{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-ink"
        >
          Privacy policy
        </Link>
      </p>
    </form>
  );
}
