"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ArrowRight } from "lucide-react";

const EVENT_TYPES = [
  "Wedding",
  "Corporate event",
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

export function QuoteForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

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
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      (form.elements.namedItem(firstKey) as HTMLElement | null)?.focus();
      return;
    }

    const lead = {
      ...Object.fromEntries(data.entries()),
      source: "mirrormebrooklyn.com quote form",
      submittedAt: new Date().toISOString(),
    };

    // Static-host friendly delivery: the webhook URL (GoHighLevel inbound
    // webhook, Zapier, Make, ...) is baked in at build time. Without one,
    // fall back to a prefilled email so the form never dead-ends.
    const webhook = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
    if (!webhook) {
      const body = Object.entries(lead)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:hello@mirrormebrooklyn.com?subject=${encodeURIComponent(
        "Photo booth quote request",
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("submitting");
    const payload = JSON.stringify(lead);
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      router.push("/thank-you");
    } catch {
      // Webhook hosts without CORS headers reject readable cross-origin
      // requests; retry opaque (fire-and-forget) before giving up.
      try {
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: payload,
        });
        router.push("/thank-you");
      } catch {
        setStatus("error");
      }
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 text-left">
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
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
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
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
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
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
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
          />
          {errors.eventDate && <p className={errorClass}>{errors.eventDate}</p>}
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
          />
          {errors.venueZip && <p className={errorClass}>{errors.venueZip}</p>}
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
      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Something went wrong sending your request. Please try again, or email
          us at{" "}
          <a href="mailto:hello@mirrormebrooklyn.com" className="font-semibold underline">
            hello@mirrormebrooklyn.com
          </a>
          .
        </p>
      )}
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
      <p className="text-center text-xs text-ink/45">
        No obligation, no pushy follow-up. A real person reads every enquiry.
      </p>
    </form>
  );
}
