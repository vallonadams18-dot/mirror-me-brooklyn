import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Magic Mirror Brooklyn",
  description:
    "The terms that apply to using the Magic Mirror Brooklyn website and requesting a photo booth rental quote.",
  alternates: { canonical: `${SITE.url}/terms` },
};

const email = (
  <a
    href={`mailto:${SITE.email}`}
    className="text-gold-dark hover:underline"
  >
    {SITE.email}
  </a>
);

export default function TermsPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl text-ink sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-ink/50">Last updated: August 2026</p>
          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/75">
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                These terms
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  These terms apply to your use of this website, operated by{" "}
                  {SITE.legalName}, trading as {SITE.name}. By using the site
                  you agree to them. If you do not agree, please do not use the
                  site.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Quotes and bookings
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  Information on this site — including descriptions of booths,
                  inclusions and service areas — is provided for general
                  guidance and does not constitute a binding offer. Pricing is
                  confirmed in a written quote for your specific event. A
                  booking is only confirmed once you have received a written
                  confirmation from us and any required retainer has been paid.
                </p>
                <p>
                  The terms governing an actual rental — including payment
                  schedule, cancellation, rescheduling, overtime, idle time and
                  damage — are set out in your booking agreement, which takes
                  precedence over anything on this site.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Availability and service areas
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  We serve New York City and the surrounding tri-state area.
                  Availability varies by date and location, and travel charges
                  may apply depending on your venue. Nothing on this site
                  guarantees that a particular date, booth or service area is
                  available.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Site content and intellectual property
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  All content on this site — text, photographs, video,
                  graphics, logos and page design — is owned by us or used with
                  permission, and is protected by copyright and trademark law.
                  You may view and share links to the site, but you may not
                  copy, reproduce or republish our content for commercial
                  purposes without written permission.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Event photography and likeness
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  Photographs and video captured at events are delivered to the
                  client. We may request permission to use selected images in
                  our marketing. If you appear in an image published on this
                  site or our social channels and want it removed, email{" "}
                  {email} and we will remove it.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Third-party links
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  This site may link to third-party websites and services. We
                  do not control them and are not responsible for their
                  content, availability or privacy practices.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Disclaimer and limitation of liability
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  This website is provided on an &ldquo;as is&rdquo; basis.
                  While we work to keep information accurate and current, we
                  make no warranty that it is complete or error-free. To the
                  fullest extent permitted by law, we are not liable for any
                  indirect or consequential loss arising from your use of this
                  site. Nothing here limits liability that cannot lawfully be
                  limited.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Governing law
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  These terms are governed by the laws of the State of New
                  York, and any dispute relating to them is subject to the
                  exclusive jurisdiction of the courts of New York.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Contact
              </h2>
              <div className="mt-3 space-y-3">
                <p>Questions about these terms can be sent to {email}.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
