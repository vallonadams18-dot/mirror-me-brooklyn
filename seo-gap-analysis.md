# SEO Gap Analysis: Magic Mirror Brooklyn vs. Luxe Booth

**Prepared:** August 21, 2026
**Site A (client):** magicmirrorbrooklyn.com — Brooklyn-based, serves NYC's five boroughs + tri-state area
**Site B (competitor):** luxebooth.com — national operator, 14+ metro markets

**How this report was built:** Site A was audited by reading the client's own Next.js source repository (this repo) directly — `src/data/locations.json`, `booths.json`, `events.json`, every `src/app/**/page.tsx`, `Header.tsx`, `Footer.tsx`, `lib/jsonld.ts` — cross-checked against the live `sitemap.xml`. This is the ground truth for titles, metas, H1s, schema and internal linking; nothing here is guessed. Site B was audited entirely externally: `sitemap.xml` / sitemap index, the site's own human-readable `/sitemap/` page, and 24 individual page fetches (title/meta/H1/H2/word-count/schema/links), plus a live, actually-clicked navigation trace in a browser to measure click depth. Every data point below traces to one of those sources.

---

## PRIORITIZED ACTION LIST — Top 10, ranked by likely traffic gain ÷ effort

| # | Action | Exact spec | Why it's high-value / low-effort |
|---|---|---|---|
| **1** | Build 9 new service+location combo pages for the 3 highest-demand booths × the 3 highest-value boroughs | New URLs: `/mirror-photo-booth-brooklyn`, `/mirror-photo-booth-manhattan`, `/mirror-photo-booth-queens`, `/360-photo-booth-brooklyn`, `/360-photo-booth-manhattan`, `/360-photo-booth-queens`, `/wedding-photo-booth-brooklyn`, `/wedding-photo-booth-manhattan`, `/wedding-photo-booth-queens`. Example — **Title:** "Mirror Photo Booth Rental in Brooklyn \| Magic Mirror Brooklyn" (61 chars). **Meta:** "Rent the magic mirror photo booth in Brooklyn for weddings, corporate events and parties. Unlimited prints, an attendant, no travel fee anywhere in Brooklyn." (159 chars). **H1:** "Mirror Photo Booth Rental in Brooklyn." | This is the single structural gap in the whole audit: Site A has **zero** combo pages while Luxe Booth has built this exact page type (`/{city}/services/{booth}/`) across 9+ cities. The client's own data model (`locations.json` × `booths.json`) already contains everything needed — venue notes, FAQs, neighborhood lists — to assemble these pages with a new template, not new copywriting from scratch. |
| **2** | Deepen the Brooklyn location page to out-content Luxe Booth's Brooklyn-borough page | Add 3 more FAQs (currently 7) and a "Recent Brooklyn events" mini-list to `/photo-booth-rental-brooklyn`. Target 1,400+ words, up from ~950. | Luxe Booth runs a dedicated `/photo-booth-rental-nyc/brooklyn/` page at roughly **2,100 words** — nearly double the client's Brooklyn page — competing directly for "photo booth rental Brooklyn," the client's home-turf query. Site A still wins on schema (Luxe's page carries none) but is behind on depth. |
| **3** | Same treatment for Manhattan and Queens pages | Add 2–3 FAQs each to `/photo-booth-rental-manhattan` and `/photo-booth-rental-queens`; target 1,200+ words each. | Luxe's equivalent Manhattan/Queens borough sub-pages ran **~1,850–3,500 words** in our sample. These are the 2nd/3rd highest-population boroughs and the next most contested queries after Brooklyn. |
| **4** | Expand `/get-pricing` beyond its current ~300–350 words | Add a short "what pricing typically depends on" paragraph and 2–3 FAQ snippets (reuse existing FAQ copy from `faq-page.json`) without changing the lead-form layout. | It's the thinnest page on the site by a wide margin and a natural landing page for "photo booth rental cost NYC" style queries — currently offers almost nothing for that intent besides the form. |
| **5** | Expand `/photo-booths` (the all-booths hub) from ~650–700 words to 1,200+ | Add one short paragraph (40–60 words) per booth category above/below the existing cards, explaining when to pick that booth. | It's the page most likely to rank for the broad "photo booth rental NYC" head term alongside the homepage, but currently reads as a card grid with little unique text — thin relative to its intended ranking role. |
| **6** | Publish 3 short blog/insight posts repurposing FAQ content already on the site | Suggested first post — **URL:** `/blog/photo-booth-rental-cost-nyc`. **Title:** "How Much Does a Photo Booth Rental Cost in NYC? (2026 Guide) \| Magic Mirror Brooklyn". **H1:** "How Much Does a Photo Booth Rental Cost in NYC?" Content: expand the existing pricing FAQ answer with ranges by booth type and borough. | Site A currently has **zero** informational/blog content; Luxe Booth has 67 published posts capturing top-of-funnel searches ("how much does a photo booth cost," "photo booth ideas for corporate events," etc.) the client currently cedes entirely. Three posts is a low-risk pilot, not a full content program. |
| **7** | Add 3–5 more FAQ entries to each of the 18 booth pages and 12 location pages | Push FAQ counts from 7 to 10–12 per page, focused on booth-specific edge cases (e.g., outdoor setup, multi-day rentals). | The FAQPage schema is already wired in (`lib/jsonld.ts` → `faqJsonLd`) on every booth and location page — more well-formed Q&As is close to a free lever for additional "People Also Ask" and FAQ rich-result real estate, with no new page/template needed. |
| **8** | Add 2 more combo pages defending the neighborhoods Luxe cannot easily match: Williamsburg and DUMBO wedding-intent content | New URLs: `/wedding-photo-booth-williamsburg`, `/mirror-photo-booth-williamsburg`. | Luxe Booth has no neighborhood-level NYC pages at all (only the 5 borough level) and no NY tri-state suburb coverage (Long Island, Westchester, Connecticut, New Jersey). Williamsburg/DUMBO are the client's strongest, most defensible ground — worth extending rather than only defending. |
| **9** | Add a short "why local beats national" content block or standalone page contrasting a Brooklyn-based operator against multi-city chains | Suggested **URL:** `/about` (add a section) or new short page `/why-local`. **H2:** "Why a Brooklyn photo booth company, not a national chain." | Directly monetizes the competitive finding in this report (Luxe's templated, city-name-swapped copy — see Section 4f) as a trust/differentiation argument aimed at comparison-shopping searchers. |
| **10** | Verify and, if needed, submit an updated `sitemap.xml` after adding the pages above | No content change — technical housekeeping once pages 1, 6 and 8 exist. | Site A's current sitemap is already clean (44/44 URLs, no orphans). Confirming it captures every new URL costs nothing and avoids repeating Luxe Booth's own mistake (see Section 4e) of building pages that never make it into the sitemap. |

---

## Step 1 — Page Inventories

### Site A: magicmirrorbrooklyn.com

Fetched `sitemap.xml` directly — a flat, single-file sitemap, no index. **Total: 44 URLs.** Because this is under the ~150-URL sampling threshold, all 44 were read in full (cross-referenced against the live Next.js repo, which is the authoritative source for this site). No sampling was necessary.

| Category | Count | Pages |
|---|---|---|
| Service-type (booth) pages | 18 | mirror-photo-booth, mirror-x-photo-booth, 360-photo-booth, glam-booth, vogue-booth, roaming-photo-booth, green-screen-photo-booth, mosaic-wall, branded-photo-booth, ai-photo-booth, glambot, magazine-booth, gif-booth, 3d-slider-booth, studio-booth, champagne-wall, enclosed-photo-booth, flower-wall-rental |
| Occasion/event-type pages | 4 | wedding-photo-booth, corporate-events, special-occasions, trade-show-photo-booth |
| Location pages | 12 | photo-booth-rental-brooklyn, -manhattan, -queens, -bronx, -staten-island, -long-island, -westchester, -new-jersey, -connecticut, -williamsburg, -dumbo, -long-island-city |
| Non-commercial / utility | 10 | home, get-pricing, photo-booths (hub), gallery, about, testimonials, faq, contact, privacy, terms |
| **Service + location combo** | **0** | **none exist** |
| **Total** | **44** | |

### Site B: luxebooth.com

`sitemap.xml` is a sitemap **index** pointing to 5 sub-sitemaps:

| Sub-sitemap | URL count |
|---|---|
| `page-sitemap.xml` (commercial/service/location pages) | 25 |
| `post-sitemap.xml` (blog posts) | 67 |
| `category-sitemap.xml` (taxonomy archives) | 11 |
| `post_tag-sitemap.xml` (taxonomy archives) | 28 |
| `bafg-sitemap.xml` (misc, 1 param URL) | 1 |
| **XML sitemap total** | **132** |

**This XML total understates the real site.** The site publishes its own human-readable `/sitemap/` page, which lists roughly **300 URLs**, including an entire tier of service+location combo pages and NYC borough sub-pages that **do not appear anywhere in the XML sitemaps** (verified: none of the `/{city}/services/{booth}/` URLs, the `/enclosed-photo-booth-rental-{city}/` pages beyond the 2 already in `page-sitemap.xml`, or the `/photo-booth-rental-nyc/{borough}/` pages are present in `page-sitemap.xml`). This is itself a finding (Section 4e) — Luxe Booth has built a large number of pages that a search engine's sitemap-based crawl would never discover.

**Sampling disclosure (Site B):** True inventory (~300+ URLs) exceeds the 150-URL threshold, so a representative sample was fetched rather than every page — chosen to cover every distinct category at least twice:
- **Location hubs (6 of 16):** nyc, atlanta, chicago, los-angeles, san-diego (title/meta only), miami (title/meta only)
- **NYC borough sub-pages (2 of 5):** brooklyn, queens
- **Base service pages (5):** ai-photo-booth-rental, black-and-white-photo-booth, enclosed-photo-booth-rental, trading-card-photo-booth, rental-services/corporate-photo-booth
- **Dedicated service+location combo pages (2):** enclosed-photo-booth-rental-atlanta, enclosed-photo-booth-rental-los-angeles
- **Nested service+location combo pages, `/services/` pattern (3):** photo-booth-rental-atlanta/services/360-photo-booth, ai-photo-booth-atlanta, photo-booth-rental-los-angeles/services/wedding-photo-booth
- **Blog (1 of 67):** luxe-booth-expands-to-new-cities
- **Category archive (1 of 11):** category/dallas-events
- **Hub/index pages (2):** homepage, explore-our-photo-booth-experiences
- **Total individually fetched: 24 pages**, plus the full URL list of the site's own `/sitemap/` page and `/locations-near-me/` directory page for structural analysis.

Category breakdown from the combined XML + HTML sitemap evidence:

| Category | Approx. count | Basis |
|---|---|---|
| Location hub pages (top-level city) | 16 | HTML sitemap: Atlanta, Austin, Birmingham, Charlotte, Chicago, Dallas, Houston, Las Vegas, LA, Miami, Minneapolis, NYC, Orange County, Orlando, Philadelphia, San Diego |
| NYC borough sub-pages | 5 | brooklyn, queens, manhattan, bronx, staten-island |
| Service+location combo pages (`/{city}/services/{service}/` pattern) | ~90+ | Up to 9 service slugs × up to 13 cities with a `/services/` directory, confirmed present on Atlanta, Chicago, Dallas, Houston, NYC, Orlando, Austin, Philadelphia, Orange County, San Diego, Los Angeles |
| Dedicated service+location combo pages (flat URL pattern) | 4 | enclosed-photo-booth-rental-atlanta, -los-angeles, -nyc, ai-photo-booth-atlanta |
| Base service pages (no location) | ~13 | ai-photo-booth-rental, black-and-white-photo-booth, enclosed-photo-booth-rental, trading-card-photo-booth, brand-activation-photo-booth, backdrop-options, 360-photo-booth-rental, audio-guest-book, rental-services/* (7) |
| Blog posts | 67 | post-sitemap.xml |
| Category/tag taxonomy archives | 39 | category-sitemap.xml + post_tag-sitemap.xml |
| Utility/company pages | ~20 | about, contact, gallery, sample-photos, rental-prices, package-builder, faq, sitemap, privacy, terms, employment, shop/cart/checkout, etc. |
| **Estimated true total** | **~300** | HTML `/sitemap/` page |

---

## Step 2 & 3 — Per-page data and classification (sampled detail)

### Site A — representative extraction (full data read from source for all 44 pages; table shows a representative cross-section)

| URL | Depth | Title (chars) | Meta (chars) | H1 | Words (est.) | Schema |
|---|---|---|---|---|---|---|
| `/` (home) | 1 | Interactive Photo Booth Experiences NYC \| Magic Mirror Brooklyn (65) | Photo booth rental and interactive event experiences for corporate events, trade shows, brand activations and weddings across NYC and the tri-state area. (154) | Photo Booth Rentals & Interactive Event Experiences in NYC | ~2,100 | LocalBusiness+EntertainmentBusiness, WebSite |
| `/mirror-photo-booth` | 1 | Magic Mirror Photo Booth Rental NYC \| Magic Mirror Brooklyn (61) | Rent the full-length magic mirror photo booth in NYC... (151) | Magic Mirror Photo Booth Rental in NYC | ~1,000 | + Service, FAQPage, BreadcrumbList |
| `/photo-booth-rental-brooklyn` | 1 | Photo Booth Rental Brooklyn \| Magic Mirror Brooklyn (52) | Photo booth rental in Brooklyn for weddings, corporate events and parties... (152) | Photo Booth Rental in Brooklyn | ~950 | + LocalBusiness(area), FAQPage, BreadcrumbList |
| `/wedding-photo-booth` | 1 | Wedding Photo Booth Rental NYC \| Magic Mirror Brooklyn (56) | Wedding photo booth rental across NYC and the tri-state area... (150) | Wedding Photo Booth Rental in NYC | ~1,100 | + Service-equivalent (event page), FAQPage, BreadcrumbList |
| `/get-pricing` | 1 | Get a Free Photo Booth Quote NYC \| Magic Mirror Brooklyn (58) | Tell us your date, venue and guest count and get real photo booth pricing back... (159) | Get pricing by filling out the form below | ~320 | none (form page) |
| `/photo-booths` | 1 | All Photo Booth Rentals NYC \| Magic Mirror Brooklyn (52) | Every photo booth we rent in NYC — mirror, 360, glam... (150) | Every Photo Booth Experience We Rent | ~650 | none |
| `/faq` | 1 | Photo Booth Rental FAQ NYC \| Magic Mirror Brooklyn (52) | Cost, space, setup time, attendants, insurance and travel... (142) | Frequently Asked Questions | ~1,850 | FAQPage |

**Confirmed for all 44 pages (read from source, not sampled):** every page has a unique `<title>` and unique meta description — zero duplicates, zero missing. Every booth/event page carries `Service`/`FAQPage`/`BreadcrumbList` JSON-LD; every location page carries `LocalBusiness`(area)/`FAQPage`/`BreadcrumbList`; every page site-wide carries `LocalBusiness`+`EntertainmentBusiness`+`WebSite` via the root layout. No `AggregateRating`/`Review` schema anywhere — this is a **deliberate choice**, documented in the code (`lib/jsonld.ts`): "Google treats a business marking up its own Google-review score as self-serving review markup and may issue a manual action." The 4.9★/210-review figure is displayed in the UI but not marked up — a defensible, correct call, not an oversight.

**Internal links:** every one of the 44 pages carries the full site navigation (`Header.tsx` + `Footer.tsx`), which link to all 18 booths + 4 events + 12 locations = 34 internal links present on literally every page, site-wide. **Zero orphan pages** — confirmed from source, not estimated.

### Site B — sampled extraction

| URL | Depth | Title (chars) | Meta | H1 | Words (est.) | Schema |
|---|---|---|---|---|---|---|
| `/` (home) | 1 | Luxe Booth \| Photo Booth Rentals \| Modern & Stylish (54) | MISSING | The Premier Photo Booth Experience | ~1,850 | NONE |
| `/photo-booth-rental-nyc/` | 1 | Luxe Booth \| Photo Booth Rental NYC (43) | MISSING | Luxury Photo Booth Rentals / PHOTO BOOTH RENTAL NYC | ~1,850 | NONE |
| `/photo-booth-rental-nyc/brooklyn/` | 2 | Photo Booth Rental Brooklyn \| Luxe Booth (47) | MISSING | Photo Booth Rental Brooklyn | ~2,100 | NONE |
| `/photo-booth-rental-nyc/queens/` | 2 | Photo Booth Rental Queens \| Luxe Booth (41) | MISSING | Photo Booth Rental Queens | ~3,200–3,500 | NONE |
| `/photo-booth-rental-atlanta/` | 1 | Photo Booth Rental Atlanta (28) | MISSING | Luxury Photo Booth Rentals / PHOTO BOOTH RENTAL ATLANTA | ~1,850 | NONE |
| `/photo-booth-rental-atlanta/services/360-photo-booth/` | 3 | 360 Photo Booth Atlanta \| Luxe Booth (44) | MISSING | 360 Photo Booth Atlanta | ~2,200 | NONE |
| `/photo-booth-rental-los-angeles/services/wedding-photo-booth/` | 3 | Wedding Photo Booth Los Angeles - Luxe Booth \| Photo Booth Rental (76) | MISSING | Wedding Photo Booth | ~850 | NONE |
| `/enclosed-photo-booth-rental-atlanta/` | 1 | Enclosed Photo Booth Rental Atlanta \| Luxe Booth (56) | MISSING | Enclosed Photo Booth Rentals Atlanta | ~1,200 | NONE |
| `/enclosed-photo-booth-rental-los-angeles/` | 1 | Enclosed Photo Booth Rental Los Angeles \| Luxe Booth (57) | MISSING | Enclosed Photo Booth Rentals Los Angeles | ~1,200 | NONE |
| `/ai-photo-booth-rental/` | 1 | AI Photo Booth Rentals \| Custom AI Filters & Event Activations (73) | MISSING | Ai Photo Booth Rentals | ~2,400 | NONE |
| `/rental-services/corporate-photo-booth/` | 2 | Corporate Photo Booth - Luxe Booth \| Photo Booth Rental (59) | MISSING | Corporate Photo Booth Rentals | ~2,100 | NONE |

**Confirmed across every one of the 24 pages fetched: meta description is absent (0/24 had one).** JSON-LD schema of any type (`LocalBusiness`, `Service`, `FAQPage`, `Review`, `AggregateRating`, `BreadcrumbList`) was **not detected on a single one of the 24 pages checked**, despite most pages containing visible FAQ sections and customer-review blocks that are exactly the kind of content `FAQPage` and `Review` schema exist for.

**Internal-links-in caveat:** true "links in" counts for either site cannot be measured precisely without crawling the entire live web graph. For Site A this is not a limitation — the global nav (read from source) proves every page is linked from every other page. For Site B, "links in" is approximated only from the outbound links observed on the ~24 pages fetched; this is a lower bound, not a full crawl, and is stated as such rather than presented as precise.

---

## Step 4 — Gap Analysis

### 4a. Service+location combos Luxe Booth has that Magic Mirror Brooklyn does not

Site A has **no service+location combo pages at all** — a structural gap across the board. Luxe Booth uses two URL patterns for this page type:

1. **Nested pattern:** `/{location-slug}/services/{service-slug}/` — confirmed live on Atlanta, Chicago, Dallas, Houston, NYC, Orlando, Austin, Philadelphia, Orange County, San Diego and Los Angeles, for services including wedding-photo-booth, 360-photo-booth, gif-photo-booth, green-screen-photo-booth, corporate-event-photo-booth and audio-guest-book. That's up to 9 services × 11 cities.
2. **Flat pattern:** `/enclosed-photo-booth-rental-{city}/` (Atlanta, Los Angeles, NYC) and `/ai-photo-booth-{city}/` (at minimum Atlanta) — these are the only combo pages that made it into the actual XML sitemap.

Most directly relevant to the client: `/photo-booth-rental-nyc/brooklyn/`, `/queens/`, `/manhattan/`, `/bronx/`, `/staten-island/` — Luxe Booth has built borough-level pages inside the client's own core market.

### 4b. Locations Magic Mirror Brooklyn covers that Luxe Booth doesn't

Confirmed defensible ground — none of the following appear anywhere in Luxe Booth's location footprint (16 city hubs, per their own `/locations-near-me/` page and footer):

- **NY tri-state suburbs:** Long Island, Westchester, Connecticut, New Jersey — Luxe Booth has zero presence in any of these.
- **NYC neighborhood-level pages:** Williamsburg, DUMBO, Long Island City — Luxe Booth's NYC coverage stops at the 5-borough level; it has no neighborhood-granularity pages anywhere in its footprint (confirmed via the site's own `/sitemap/` listing — NYC's sub-pages are boroughs only, no neighborhoods).

### 4c. Head-to-head depth comparison

| Topic | Site A page | Site A words / schema | Site B page | Site B words / schema |
|---|---|---|---|---|
| Brooklyn | `/photo-booth-rental-brooklyn` | ~950 / LocalBusiness+FAQPage+Breadcrumb | `/photo-booth-rental-nyc/brooklyn/` | ~2,100 / none |
| Queens | `/photo-booth-rental-queens` | ~950 / LocalBusiness+FAQPage+Breadcrumb | `/photo-booth-rental-nyc/queens/` | ~3,200–3,500 / none |
| AI booth | `/ai-photo-booth` | ~900 / Service+FAQPage+Breadcrumb | `/ai-photo-booth-rental/` | ~2,400 / none |
| Enclosed booth | `/enclosed-photo-booth` | ~900 / Service+FAQPage+Breadcrumb | `/enclosed-photo-booth-rental/` | ~1,200 / none |
| Corporate events | `/corporate-events` | ~1,000+ / event schema+FAQPage+Breadcrumb | `/rental-services/corporate-photo-booth/` | ~2,100 / none |

**Reading it honestly:** Luxe Booth's word counts win on 4 of 5 topics sampled, often by a wide margin — their pages are not thin in the aggregate, contrary to the initial hypothesis. Site A wins on every page for structured data (schema) and on titles/metas being fully present (Luxe Booth is missing a meta description on 100% of pages sampled). The real opportunity isn't "Luxe Booth's content is thin" as a blanket claim — it's that **Luxe Booth has zero schema markup anywhere** and that its deepest, highest-volume combo pages are **structurally hard to reach and excluded from its own sitemap** (Section 4e), while Site A's problem is the **combo page type not existing at all** (Section 4a), not thinness of what does exist.

### 4d. Magic Mirror Brooklyn pages with weak signals

Read directly from source for all 44 pages — the list is short because the site's technical foundation is solid:

- **Thin content:** `/get-pricing` (~300–350 words) and `/photo-booths` (~650–700 words) are both under or near the 400-word thin-content threshold. Both are addressed in the Action List (items 4 and 5).
- **Duplicate/missing titles or metas:** none found — all 44 pages have unique, present titles and meta descriptions, verified against `src/data/*.json` and each `page.tsx`.
- **Orphaned pages:** none — confirmed from `Header.tsx`/`Footer.tsx`, which place all 34 booth/event/location links on every page site-wide.
- **Missing schema:** none of the templated pages are missing schema; the two thin utility pages (`/get-pricing`, `/photo-booths`) and the legal pages (`/privacy`, `/terms`) carry no page-specific schema beyond the sitewide `LocalBusiness`/`WebSite`, which is normal for that page type.

### 4e. Internal linking structure — actual traced click depth

**Site A (verified from source, not estimated):** `Header.tsx` and `Footer.tsx` both render the complete `NAV_BOOTHS` (18), `NAV_EVENTS` (4) and `NAV_LOCATIONS` (12) link lists on every single page. Result: **every page on the site is 1 click from the homepage, and 1 click from every other page.** There is no deeper page to trace to.

**Site B (live-traced in-browser, click by click):** to reach a representative service+location combo page —
`Home` → click **"Locations"** in main nav → lands on `/locations-near-me/` → click **"Atlanta, GA"** → lands on `/photo-booth-rental-atlanta/` → click **"Rental Services"** → lands on `/photo-booth-rental-atlanta/services/` → click the **"Wedding Booth"** tile → lands on `/photo-booth-rental-atlanta/services/wedding-photo-booth/`.
**That is 4 clicks from the homepage**, confirmed by live navigation (not inferred from link lists). The footer's global nav only links to 16 city hubs and ~7 generic service pages — it never links directly to a combo page, so 4 clicks is the shortest path for any of the ~90+ nested combo pages. Combined with the sitemap-exclusion finding in Section 1, this means Luxe Booth's largest, most content-rich page type is both hard for users to browse to and absent from the sitemap search engines use for discovery — a real technical weakness despite the sheer page volume.

### 4f. Templated-content evidence

Comparing the opening descriptive paragraph across three of Luxe Booth's city hub pages (NYC, Atlanta, Los Angeles — fetched independently), the identical sentence appears on all three with only the city name changed: Luxe Booth's own pages state it is "a mobile photo experience company located in the heart of" each city, verbatim except for the city name (quoted here under 15 words, attributed to luxebooth.com).

Beyond that single verbatim sentence, the templating goes deeper structurally: the Brooklyn and Queens borough pages use an **identical H2 outline** — "What you get with our [Borough] photo booth rentals," "Popular activations in [Borough]," "Black & White Photo Booth Rentals," "360 Photo Booths," "Why Luxebooth.com," "Premium Features," "Recent Events in [Borough]," "STRAIGHTFORWARD RENTAL PRICES," "How we work in [Borough] (5 steps)," "FAQ — [Borough]," "Nearby areas we serve" — on both pages, in the same order, with only the borough name substituted into each heading. The two dedicated `enclosed-photo-booth-rental-atlanta` and `-los-angeles` pages follow the same pattern one level up: same section order ("How To Rent Your Enclosed Photo Booth in [City]," "Premium Features For Our Enclosed Booth Rental," "Why the enclosed booth stands out," "Other Popular Photo Booth Options," "Why Luxe booth of [City]"), same marketing claims (custom exterior wrap, integrated display screen, studio lighting) reworded city to city rather than copy-pasted verbatim.

**Pages this pattern appears on (confirmed in this sample):** the NYC, Atlanta and Los Angeles city hub pages (verbatim opening sentence); the Brooklyn and Queens borough pages (identical H2 template, city-specific prose); the Atlanta and Los Angeles enclosed-booth combo pages (identical section structure, reworded claims). Given the same city-hub template is used for at least 16 cities per the site's own `/sitemap/` listing, it is reasonable to infer the same opening-sentence pattern repeats across the other city hubs not directly sampled here, though that was not independently verified for every city.

---

## Data limitations, stated plainly

- **Site B's true total page count (~300)** comes from the site's own human-readable `/sitemap/` page, not from a full crawl — it is the most complete list available but could omit pages that are neither in the XML sitemap nor linked from that directory page.
- **Word counts** for both sites are estimates produced by an AI model reading rendered/converted page content (for Site A, cross-checked against the literal JSON/TSX source; for Site B, from WebFetch's HTML-to-markdown conversion) — treat them as directionally accurate to roughly ±15%, not exact.
- **Internal "links in" counts** are a real limitation for Site B specifically: only the ~24 pages fetched were inspected for outbound links, so any combo page's true inbound link count from the full ~300-page site could be higher than what was observed here.
- **Indexability (noindex) status** of Luxe Booth's sitemap-excluded pages was not confirmed — WebFetch cannot reliably surface `<meta name="robots">` tags. The pages are publicly reachable and were live when fetched; whether search engines are instructed to skip them specifically could not be verified with the tools available.
