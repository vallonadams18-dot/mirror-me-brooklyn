import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy | Magic Mirror Brooklyn",
  description:
    "How Magic Mirror Brooklyn collects, uses and protects the information you share through this website.",
  path: "/privacy",
});

const email = (
  <a
    href={`mailto:${SITE.email}`}
    className="text-gold-dark hover:underline"
  >
    {SITE.email}
  </a>
);

export default function PrivacyPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl text-ink sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ink/50">Last updated: August 2026</p>
          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/75">
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Who we are
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  Magic Mirror Brooklyn ({SITE.legalName}) is a photo booth rental
                  company based in Brooklyn, NY, serving New York City and the
                  surrounding tri-state area. This policy explains what we do
                  with information you give us through this website. Questions
                  go to {email}.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Information we collect
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  When you submit our quote request form we collect the details
                  you enter — typically your name, email address, phone number,
                  event date, venue and anything else you choose to tell us. We
                  only ask for what we need to price and plan your event.
                </p>
                <p>
                  We also collect standard analytics data automatically: pages
                  viewed, how you arrived at the site, approximate location
                  derived from your IP address, browser and device type. This
                  is aggregate behavioral data, not something we use to
                  identify you personally.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                How we use it
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  We use your enquiry details to respond to you, prepare a
                  quote, and if you book, to plan and deliver your event. We
                  use analytics data to understand which parts of the site are
                  useful and to measure the performance of our advertising.
                </p>
                <p>
                  We do not sell your personal information, and we do not share
                  it with third parties for their own marketing.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Cookies and analytics
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  This site uses cookies and similar technologies through
                  Google Analytics, Google Tag Manager and advertising
                  platforms including Google Ads and Meta. These help us
                  measure traffic and understand which ads lead to enquiries.
                </p>
                <p>
                  You can block or delete cookies in your browser settings.
                  Doing so will not stop you using the site. You can also opt
                  out of Google Analytics using Google&apos;s browser add-on.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Service providers
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  We use third-party services to run the business — website
                  hosting, form and customer-relationship software, email, and
                  analytics and advertising platforms. These providers process
                  data on our behalf and are only permitted to use it to
                  provide their service to us.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Event photography
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  Photos and videos captured at an event are delivered to the
                  client and, where enabled, to guests through an online
                  gallery. We may ask permission to use selected images in our
                  own marketing. If you are a client or a guest and want an
                  image removed from our website or social media, email us and
                  we will take it down.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Data retention
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  We keep enquiry and booking records for as long as we need
                  them for business and accounting purposes. You can ask us to
                  delete your information at any time by emailing {email}.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Your rights
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  You can ask what information we hold about you, ask us to
                  correct it, or ask us to delete it. Email us and we will
                  respond. If you are a New York resident, you have rights
                  under applicable state privacy law; we honour those requests
                  regardless of where you live.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Children
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  This site is not directed at children under 13 and we do not
                  knowingly collect their information through it.
                </p>
              </div>
            </section>
            <section>
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                Changes
              </h2>
              <div className="mt-3 space-y-3">
                <p>
                  We may update this policy from time to time. The date at the
                  top reflects the most recent revision.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
