# Paid landing pages: visual redesign (2026-10-06)

Scope: **visual only**. The 20 live Google Ads landing pages under `public/lp/` were restyled to match the main site's brand (dark ink + gold,
Playfair Display headlines, Barlow body, gold pill buttons) and now lead with real photos of the booth being advertised.

Unchanged, by design (the Google Ads campaign is live):

- Every URL (`/lp/<slug>`, and the `?gads=1` variants the ads use).
- Tracking: GA4, the Google Ads tag and `LP_CONFIG` (conversion label), the lead-detection script, all `data-track` attributes.
- The CheckCherry form: same widget, same props, same prefill and attribution capture.
- All copy, titles, meta descriptions, `noindex`, FAQ, steps, reviews, final CTA, footer.
- The Google Ads campaign, ad groups, keywords and ads. Nothing on the Ads side is touched.

New: self-hosted fonts (the site's own, `public/lp/assets/fonts`), image variants for the few photos that had no resized versions
(`public/lp/assets/img`), and `scripts/lp-parity-check.mjs`.

## Safety check

```
node scripts/lp-parity-check.mjs main      # compares every page with the same page on main (what is live)
```

It fails if any tracking script, the form card, `data-track` attribute, link, id, title/description/robots tag, final CTA, footer, quick-contact
bar or sentence of original copy differs, if an outbound host appears that is not the site, Google Tag Manager or CheckCherry, if any image lacks
`alt` or `width`/`height`, or if a referenced file is missing.

## Browser test (pre-deploy, no real lead possible)

Each page, original and redesigned, was loaded from a local test server in a real browser with a simulated ad click
(`?gads=1&utm_source=google&utm_medium=cpc&utm_campaign=mmb-search-2026-10&utm_content=123&utm_term=test&gclid=TESTCLICKID123`).
The CheckCherry host was pointed at a **fake endpoint** (nothing forwarded) and the gtag.js loader was removed (no external pings).
The form was filled and submitted. Result for all 20 pages: the redesigned page is **identical to the original** in
 (a) the dataLayer events at load, (b) exactly one `generate_lead` and exactly one Google Ads `conversion` event
 (`send_to AW-779741160/2Wr6CMyknpMdEOjP5_MC`), (c) one lead POST whose payload carries the form fields, the booth prefill message, the service id,
 `utm_source/medium/campaign/content/term` and `gclid`, (d) the confirmation message "Your submission has been sent and we will be in touch shortly".

Layout and weight (vogue page, phone vs desktop, local): cumulative layout shift 0.0002 (phone) and 0 (desktop) versus 0 and 0.01 for the
original; no horizontal overflow at 390 px. Phone heroes are capped at the 960 px variant (50 to 130 KB).

## Rollback

`git revert` the redesign commit (or redeploy `0caf1c2`). All URLs stay valid at every step because only file contents change.

Photo map: see `image-map.md`.
