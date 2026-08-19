# Mirror Me Brooklyn — Website

Rebuild of [mirrormebrooklyn.com](https://www.mirrormebrooklyn.com) as a clean, maintainable codebase.

**Stack:** Next.js 16 (App Router, static export) · React · TypeScript · Tailwind CSS v4 · lucide-react

The site builds to plain static files (`out/`) — no server required. It deploys
to GitHub Pages automatically via the included workflow, and can be hosted on
any static host.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Routes (42 pages)

| Group | Routes |
|---|---|
| Core | `/`, `/get-pricing`, `/gallery`, `/about`, `/testimonials`, `/faq`, `/contact`, `/privacy`, `/terms`, `/thank-you` (noindex) |
| Booths (16) | `/mirror-photo-booth`, `/360-photo-booth`, `/glam-booth`, `/vogue-booth`, `/roaming-photo-booth`, `/green-screen-photo-booth`, `/mosaic-wall`, `/branded-photo-booth`, `/ai-photo-booth`, `/glambot`, `/magazine-booth`, `/gif-booth`, `/3d-slider-booth`, `/studio-booth`, `/champagne-wall`, `/flower-wall-rental` |
| Events (4) | `/wedding-photo-booth`, `/corporate-events`, `/trade-show-photo-booth`, `/special-occasions` |
| Locations (12) | `/photo-booth-rental-{brooklyn,manhattan,queens,bronx,staten-island,long-island,westchester,new-jersey,connecticut,williamsburg,dumbo,long-island-city}` |
| Other | `/sitemap.xml`, `/robots.txt` |

The URL structure matches the original site exactly — no redirects needed.

## Project structure

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Fonts, header/footer, global metadata, org JSON-LD
│   ├── page.tsx              # Homepage
│   ├── [slug]/page.tsx       # All 24 booth/event/location pages (SSG)
│   ├── sitemap.ts            # sitemap.xml
│   ├── robots.ts             # robots.txt
│   └── <page>/page.tsx       # about, contact, faq, gallery, get-pricing, ...
├── components/
│   ├── templates/            # BoothPage, LocationPage, EventPage
│   ├── Header.tsx            # Sticky nav with hover dropdowns
│   ├── MobileNav.tsx         # Full-screen accordion menu (client)
│   ├── Footer.tsx
│   ├── Button.tsx            # Gold pill CTA
│   ├── SectionHeading.tsx    # Eyebrow + heading + sub
│   ├── StarRating.tsx        # Stars + "4.9 from 210 Google reviews"
│   ├── Reviews.tsx           # ReviewCard + ReviewsSection
│   ├── StepsSection.tsx      # "How it works" 3 steps
│   ├── FaqSection.tsx        # <details> accordion + section wrapper
│   ├── ServiceAreas.tsx      # Location chip grid
│   ├── PhotoCarousel.tsx     # Mobile snap strip / desktop grid (client)
│   ├── VideoPlayer.tsx       # Poster + play overlay (client)
│   ├── CtaSection.tsx        # Dark end-of-page CTA band
│   ├── QuoteForm.tsx         # Native quote form with validation (client)
│   ├── Breadcrumbs.tsx
│   └── JsonLd.tsx
├── data/
│   ├── booths.json           # All copy for the 9 booth pages
│   ├── locations.json        # All copy for the 12 location pages
│   ├── events.json           # All copy for the 3 event pages
│   ├── faq-page.json         # /faq questions & answers
│   ├── home-faqs.json        # Homepage FAQ
│   ├── home.ts               # Homepage booth cards, features, event cards
│   ├── reviews.ts            # Google reviews (word for word) + gallery alts
│   ├── types.ts              # Data interfaces
│   └── index.ts              # Typed accessors
└── lib/
    ├── site.ts               # Business constants + nav data (single source)
    └── jsonld.ts             # Schema.org builders (LocalBusiness, FAQ, ...)
```

To edit page copy, edit the JSON/TS files in `src/data/` — the booth, event
and location pages are fully data-driven.

## Environment variables

Copy `.env.example` to `.env.local`. All variables are optional.

The site is a **static export**, so all `NEXT_PUBLIC_*` values are baked in
at build time. For GitHub Pages deploys, set them as repository **Variables**
(Settings → Secrets and variables → Actions → Variables); the deploy workflow
passes them to the build.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/JSON-LD. Defaults to `https://www.mirrormebrooklyn.com`. |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | Where the quote form sends submissions as JSON, straight from the browser. Accepts any inbound webhook: **GoHighLevel** inbound-webhook trigger, Zapier Catch Hook, Make, or a custom API. Unset → the form falls back to opening a prefilled email. |
| `NEXT_PUBLIC_GHL_FORM_EMBED_URL` | Render an embedded **GoHighLevel form** on `/get-pricing` instead of the native form. Set the GHL form's redirect to `/thank-you`. Most reliable option on static hosting. |

### Connecting GoHighLevel

Two supported paths — pick one:

1. **Embedded GHL form (recommended on static hosting).** Set
   `NEXT_PUBLIC_GHL_FORM_EMBED_URL` to the form's embed URL (GHL → Sites →
   Forms → Embed) and set the form's redirect URL to `/thank-you`.
2. **Native form → GHL inbound webhook.** In GHL create a Workflow with an
   *Inbound Webhook* trigger, copy the webhook URL into
   `NEXT_PUBLIC_LEAD_WEBHOOK_URL`, and map the JSON fields (`name`, `email`,
   `phone`, `eventDate`, `eventType`, `booth`, `venueZip`, `guestCount`,
   `message`). The site keeps its own styling, validation and `/thank-you`
   conversion page. Note the webhook URL is visible in the page source (it
   fires from the browser), which is normal for public lead forms.

## Deploying to GitHub Pages

The repo ships with a deploy workflow (`.github/workflows/deploy.yml`).

1. Create a **public** GitHub repository and push this folder to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.
3. (Optional) Add the environment variables above as repository Variables.
4. Push to `main` — the workflow builds the site and deploys it. Your site
   appears at `https://<user>.github.io/<repo>/` until the custom domain is
   attached.
5. **Custom domain:** `public/CNAME` already contains
   `www.mirrormebrooklyn.com`. In **Settings → Pages → Custom domain**, enter
   `www.mirrormebrooklyn.com` and enable *Enforce HTTPS*. Then in GoDaddy DNS:
   - `www` → CNAME → `<your-github-username>.github.io`
   - apex `@` → A records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`

Every later push to `main` redeploys automatically.

## Notes

- Videos in `public/video/` total ~78 MB and are served statically with
  `preload="none"` (they only download when a visitor presses play).
- `/thank-you` is `noindex` and excluded in `robots.txt`, matching the
  original site.
- No analytics are wired in (the original site shipped none). Add your
  GA4/Meta scripts in `src/app/layout.tsx` when ready.
