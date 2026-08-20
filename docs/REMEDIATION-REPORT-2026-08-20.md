# Audit remediation report — August 20, 2026

Remediates `SITE_AUDIT_2026-08-20.md`. Everything below is committed and
deployed; owner-only account work is listed at the end.

## Before / after (mobile Lighthouse, local lab)

| Metric | Audit baseline | After remediation |
|---|---:|---:|
| Performance | 70 | 79–92 across runs (best 1.8 s LCP; see caveat) |
| Accessibility | 90 | **100** (every run) |
| Best Practices | 100 | 100 in production (96 locally — a `serve` prefetch artifact, see notes) |
| SEO | 100 | **100** |
| LCP | 4.4 s | 1.8–3.9 s (machine-noise bound; re-verify on PSI) |
| TBT | 600 ms | 130–450 ms (median ≈ 250 ms) |
| CLS | 0 | 0 |
| Image transfer (est. savings) | 1,136 KiB flagged | responsive WebP served at 480/960/1600 w |

**Caveat, stated plainly:** these lab numbers came from an 8 GB Windows
machine that was also running the build tooling; run-to-run LCP varied
1.8 s → 3.9 s on identical builds. The code-level LCP blockers found by the
audit are fixed and verified (hero preloaded 480/960 w WebP with
`fetchpriority=high`, no entrance animation gating paint, below-fold sections
under `content-visibility:auto`). Certify the ≥95 target with three
PageSpeed Insights runs against production, which tests from consistent
Google hardware.

## What was fixed

### Phase 1 — Accessibility (Lighthouse 100, verified 5 consecutive runs)
- New `--color-gold-deep` (#8a6a0d, ≥4.5:1 on white and cream) for all
  eyebrow text on light backgrounds; bright gold kept on dark backgrounds.
- `text-cream/45` → `/60` (footer, CTA note, breadcrumbs); `text-ink/45` →
  `/70` (brand-logo strip).
- Review stars: `role="img"` + `aria-label="Rated 5 out of 5 stars"`.
- Heading order fixed (hero feature titles are no longer `h3` after `h1`).
- Decorative step numerals moved into CSS pseudo-elements (out of the
  accessibility tree entirely).
- Quote form: every error is `aria-describedby`-linked to its field, the
  submission status region is `aria-live`, the failure alert takes focus.

### Phase 2 — Images and performance
- Build step `scripts/build-image-variants.mjs` generates 1,194 WebP variants
  (480/960/1600 w) for all 398 JPG/PNGs; a custom `next/image` loader
  (`src/lib/image-loader.ts`) serves them via real `srcset`/`sizes` on every
  image — no runtime optimizer needed on GitHub Pages.
- Hero image: preloaded, `fetchpriority=high`, correctly sized per viewport.
- Removed the hero entrance animation that held the LCP at `opacity: 0`
  until hydration.
- `content-visibility: auto` on below-the-fold sections (~22,500 px page).
- All five animated GIFs re-encoded as looping MP4 (`6 MB → 1.4 MB`); they
  autoplay muted exactly like GIFs (booth hero, gallery, home card).
- Barlow 700 font weight dropped (unused).
- Header/footer/mobile-nav links no longer prefetch ~40 routes per page view.
- Homepage curated from 18 booth cards to the 8 most-booked (DOM and
  hydration cut); showreel unchanged (`preload="none"`).

### Phase 3 — Metadata and technical SEO
- All 43 titles ≤62 chars (was 40 over 60), keywords/location first, all
  unique. All descriptions ≤155 chars, trimmed at sentence boundaries.
- `pageMeta()` helper gives **every** page canonical + Open Graph + Twitter
  card with a real 1200×630 image (34 per-page images generated from hero
  shots by `scripts/build-og-images.mjs`; verified to exist in the export).
- Removed self-serving `aggregateRating` schema from LocalBusiness (Google
  policy); the visible 4.9★ UI is untouched.
- New `/photo-booths` catalog page added to the sitemap; thank-you stays
  noindex.
- Export-wide crawl (`npm run audit:export`): 47 pages, one H1 each, zero
  broken internal links, zero missing images, zero duplicate titles.

### Phase 4 — Quote form reliability
- The `no-cors` “assume success” path is **gone**: the thank-you page only
  shows after a readable 2xx.
- Honeypot field; landing page, referrer, UTM/gclid/gbraid/wbraid/fbclid
  captured on first touch and attached to the lead; privacy-policy link at
  the submit button; `generate_lead` fires only after confirmed delivery
  (no-ops until analytics is installed).
- `workers/lead-worker.js`: complete Cloudflare Worker (server-side
  validation, Turnstile hook, IP rate limiting, 90-day delivery log, mock
  mode, durable-ack forwarding). **10/10 contract tests pass**
  (`npm test`): validation, spam, success, upstream failure, timeout, rate
  limit, mock mode, misconfiguration.
- Secret names documented in the worker header; nothing secret is in
  `NEXT_PUBLIC_*`. Interim delivery continues via FormSubmit until the
  worker is provisioned.

### Phase 5 — Homepage conversion
- “The booths people book most” (8 cards) + “View all 18 booth experiences”
  → `/photo-booths`; footer keeps every booth crawlable.
- New “Which booth is right for me?” comparison table (best for / space /
  output), every claim sourced from the booth pages’ own FAQs.
- No prices, response times, or review counts invented.

### Phases 6–7 — Edge configuration and redirects (deployable, owner applies)
- `docs/EDGE-CONFIG.md`: cache rules (immutable `/_next/static`, 30-day
  media), security headers (HSTS/nosniff/referrer/permissions/frame),
  report-only CSP with the full origin inventory.
- `docs/cloudflare-bulk-redirects.csv`: 274 one-hop 301 rules generated from
  the existing maps (`npm run redirects:build`), machine-verified free of
  chains, loops, and duplicate sources; includes non-trailing-slash variants
  and the old-domain rules (email-preserving instructions included).
- `npm run redirects:test` validates every rule against production once the
  list is imported (single-hop 301, exact target, target returns 200).
- The client-side `LegacyRedirect` stays as a safety net only.

## Test matrix (all passing)
- `npx tsc --noEmit` — clean
- `npm run lint` — clean (fixed a pre-existing React setState-in-effect error)
- `npm test` — 10/10 worker contract tests
- `npm run build` — clean static export, 47 pages
- `npm run audit:export` — 0 problems
- Lighthouse a11y=100 / SEO=100 on every one of the final 5 runs

## Notes
- Local `serve` returns 404 for Next’s segment-prefetch `.txt` URLs, which
  costs Best Practices 4 points locally; production GitHub Pages serves the
  same URLs with 200 (verified in the original live audit data). Expect
  BP=100 on PSI.
- `sitemap.xml` lastmod is the build date (honest limitation of a static
  export without per-page content dates).

## Owner-only actions (nothing here was changed by code)
1. **Fix apex DNS**: A records must be `185.199.108.153`–`.111.153`
   (currently `.53` — this is why apex HTTPS fails). Then enable
   **Enforce HTTPS** in GitHub Pages.
2. Move DNS to Cloudflare and apply `docs/EDGE-CONFIG.md` (headers, cache,
   HSTS after HTTPS works).
3. Import `docs/cloudflare-bulk-redirects.csv` as a Bulk Redirect list; run
   `npm run redirects:test`; add the old-domain catch-all (email untouched).
4. Decide the one canonical phone number — site uses **(917) 724-6051**;
   Google previously showed 518-500-3034, Yelp 732-663-9305, old pages
   347-383-5851 — and align GBP, Yelp, Yahoo, Birdeye, WeddingWire, The
   Knot, D&B.
5. Confirm the review count (site says 210; Birdeye reports 219) and the
   address/service-area policy (51 Bradford St vs 142 E 95th St appear in
   old citations).
6. Provide, when ready: GoHighLevel webhook URL, Turnstile keys, GA4/ads
   IDs, and approved pricing ranges. Worker deploy:
   `npx wrangler deploy workers/lead-worker.js --name mmb-lead`, set
   secrets, then rebuild with `NEXT_PUBLIC_LEAD_ENDPOINT`.
7. Click the FormSubmit activation link in hello@mirrormebrooklyn.com (still
   gating interim lead delivery).

## Rollback
Every change is in git on `main`. To roll back the whole remediation:
`git revert <merge-range>` or reset to commit `030b630` (pre-remediation)
and push; GitHub Actions redeploys the previous state in ~2 minutes.
