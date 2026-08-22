"use client";

import Script from "next/script";

// CheckCherry contact-form widget (booking system: magic-mirror-brooklyn-llc.checkcherry.com).
// The widget's own loader reads data-props as a URI-encoded JSON string.
const WIDGET_PROPS = encodeURIComponent(
  JSON.stringify({
    apiKey: "WNW-MYQC-2CM",
    contactFormId: 20601,
    iframe: false,
    host: "https://magic-mirror-brooklyn-llc.checkcherry.com",
  }),
);

export function CheckCherryForm() {
  return (
    <>
      <Script
        src="https://magic-mirror-brooklyn-llc.checkcherry.com/api/checkcherry_widgets"
        strategy="afterInteractive"
      />
      <div className="checkcherry__widget__contact-form" data-props={WIDGET_PROPS} />
    </>
  );
}
