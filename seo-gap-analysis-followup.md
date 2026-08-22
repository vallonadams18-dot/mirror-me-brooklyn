# SEO Gap Analysis — FOLLOW-UP: Magic Mirror Brooklyn vs. Luxe Booth

**Prepared:** August 21, 2026 (follow-up to the audit dated the same day — this report evaluates work shipped after that audit)
**Site A (client):** magicmirrorbrooklyn.com
**Site B (competitor):** luxebooth.com
**Prior report:** `seo-gap-analysis.md` in this same folder — left untouched as the historical baseline. This document supersedes it for current priorities but does not restate everything; read the original for full methodology notes.

**How this report was built:** Everything below comes from live fetches performed today — `sitemap.xml` and sub-sitemaps for both sites (via WebFetch and direct `curl`), raw-HTML JSON-LD extraction via `curl | grep` (more reliable than markdown-converted fetches for detecting `<script type="application/ld+json">`, which several WebFetch calls under-reported), and 20+ individual page fetches per site for word counts, FAQ content, titles/metas, and HTTP status codes. Nothing here is guessed; where a figure is an estimate (word counts), it's labeled as such, same as the original report.

---

## Executive summary

The client-side work shipped. It's real, it's live, and it's mostly good. Site A went from 44 URLs to **125** (verified via fresh sitemap fetch, not the "~128" estimate in the brief), the 76 combo pages are genuinely differentiated per-city content (not template swaps — verified with specific quotes below), schema is intact on every new page type including the blog, and the stale pricing figures are corrected sitewide with no stragglers found.

But the competitive gap has **not closed as much as the page-count math suggests**, for two reasons that only show up by re-checking Site B rather than assuming it sat still:

1. **Site B fixed its own biggest weakness in the same window.** Its `page-sitemap.xml` grew from 25 URLs to **242**, now including ~55+ service+location combo pages that were previously excluded from any XML sitemap (the original audit's Section 4e finding). Site B also **added rich schema** (FAQPage, HowTo, Service, Offer) — but pointedly, only to its 5 NYC borough pages (Brooklyn, Queens, Manhattan, Bronx, Staten Island), i.e., exactly the client's home turf. That is a targeted move, not a general schema rollout — everywhere else on Site B (city hubs, combo pages, blog) still carries no schema beyond a generic BreadcrumbList.
2. **Site B's much-touted geographic expansion is partly fake.** Of the "new" cities now listed in its sitemap and `/locations-near-me/` page (Boston, Seattle, Washington DC, Denver, Portland, St. Louis, New Haven, Temecula), **7 of 8 return HTTP 301 redirects to a generic locations stub page**, and the 8th (Temecula) redirects into the San Diego page. None of these are real, indexable city pages — they inflate Site B's apparent footprint without adding content. Worth knowing, not worth reacting to.

Net read: Site A closed the structural gap (combo pages exist now) and the depth gap on its three core boroughs. Site B responded by closing its sitemap-exclusion gap and hardening schema specifically where it competes with the client. The fight over Brooklyn/Manhattan/Queens is closer now, not over.

---

## STEP 1 — Site A re-inventory (verified)

Fetched `sitemap.xml` fresh: **125 URLs total**, not the ~128 estimated in the brief. Breakdown, cross-checked against the raw list:

| Category | Count | Change from prior audit |
|---|---|---|
| Utility/home (incl. new `/blog` index) | 11 | +1 (blog index) |
| Booth (service) pages | 18 | unchanged |
| Event/occasion pages | 4 | unchanged |
| Location pages (added Jersey City) | 13 | +1 |
| **Service+location combo pages** | **76** | **+76 (new)** |
| Blog posts | 3 | +3 (new) |
| **Total** | **125** | +81 |

76 = 19 combo bases (18 booths + wedding-photo-booth, which also got combo'd) × 4 cities (Brooklyn, Manhattan, Queens, Jersey City). Confirmed by listing every URL in the sitemap, not sampling.

**Spot checks, all live and substantive (8 combo pages + Jersey City hub + all 3 blog posts fetched):**

- `/mirror-photo-booth-brooklyn`: ~2,200–2,500 words, 8 FAQs referencing "Park Slope brownstone," "Bushwick warehouse's freight elevator," "Williamsburg rooftop" — genuinely Brooklyn-specific, not filler.
- `/mirror-photo-booth-manhattan`: ~1,850 words, references "Midtown and Financial District hotel ballrooms, SoHo gallery spaces and Tribeca lofts" and building-engineer/freight-elevator logistics distinct from the Brooklyn version.
- `/360-photo-booth-queens`: ~1,800–2,000 words, references Astoria, Long Island City, Forest Hills, Jamaica catering halls — real neighborhood detail, though the reviewing model flagged the underlying section structure (3-step process, FAQ scaffold) as a reusable template with city-specific data dropped in. That's a normal, acceptable pattern for this page type — the prose itself isn't copy-pasted.
- `/wedding-photo-booth-jersey-city`: ~1,800–2,000 words, references Exchange Place, Paulus Hook, Newport, Journal Square, PATH access, Hudson waterfront/Manhattan-skyline backdrop shots — specific, not generic.
- `/glam-booth-queens`: ~1,200–1,400 words, real spec details (10×10ft space, 7.5ft clearance) and named testimonials.
- `/photo-booth-rental-jersey-city`: ~2,200–2,400 words, live, real content — not a placeholder page.
- Titles/metas checked directly from raw `<title>`/`<meta>` tags (not AI-summarized) across 8 combo URLs: **every one is unique and substantively different**, not a city-name find/replace. Example — Brooklyn mirror-booth meta: *"full-length touchscreen, unlimited prints, no travel fee anywhere in the borough"*; Queens mirror-booth meta: *"built for big catering-hall crowds"*; Jersey City meta: *"waterfront weddings and galas near Exchange Place and Newport."* Different selling angle per city, not just a swapped noun.
- `/blog` index: lists all 3 posts, real intro copy, sitewide nav present, no orphaning.
- `/blog/photo-booth-rental-cost-nyc`: ~900–1,000 words. **Weakest of the three** — explicitly declines to give real price ranges ("a page like this can't hand you a table of exact dollar figures and have them mean anything"), which undercuts the exact search intent ("how much does it cost") the post targets. Reads more like a funnel page dressed as a guide than a genuine pricing resource.
- `/blog/corporate-event-photo-booth-ideas`: ~800–900 words, genuinely useful — concrete lead-time guidance, internal-vs-external event framing, booth-type recommendations by use case.
- `/blog/how-to-choose-a-wedding-photo-booth`: ~900–1,100 words, genuinely useful — specific booth recommendations by wedding size/format, spacing and power requirements, timing advice ("as cocktail hour ends... through the heart of the dance floor").

**Pricing correction:** confirmed sitewide. Homepage, FAQ, and all sampled location/combo pages consistently show **"$3 million policy"** insurance and **"$150 per hour"** idle fee. No instance of the old $2M/$55 figures was found anywhere sampled.

**Tone fix:** confirmed. No nightlife/club-coded phrasing ("11pm" or similar) found on the homepage; copy reads event-neutral (weddings, corporate, trade shows, special occasions).

**Schema — the one thing worth double-checking closely, and it checks out.** Raw JSON-LD extraction via `curl` (not WebFetch's markdown conversion, which unreliably reported "not visible" on page after page) confirms **no regression**:

| Page type | Schema found |
|---|---|
| Combo pages (e.g. `/mirror-photo-booth-brooklyn`) | Service, FAQPage (8 Q&A), BreadcrumbList, Place, OfferCatalog, sitewide WebSite |
| Jersey City location page | LocalBusiness, FAQPage (7 Q&A), BreadcrumbList, same base schema |
| Blog posts | **BlogPosting**, FAQPage, BreadcrumbList, WebPage — full schema, not just sitewide boilerplate |
| Blog index (`/blog`) | Only sitewide Service/WebSite catalog — no CollectionPage/Blog-level schema. Minor, low-priority gap. |

Every new page type carries the same schema rigor as the original 44 pages. This is a real engineering win worth calling out explicitly since it's exactly the kind of thing that regresses silently.

---

## STEP 2 — Site B re-check (material changes found — competitor did not sit still)

### Sitemap: the exclusion problem from the original audit is now substantially fixed

- `page-sitemap.xml`: **25 → 242 URLs** (verified via raw XML `<loc>` count, excluding `<image:loc>` entries). This sub-sitemap now includes at least **55 genuine `/{city}/services/{service}/` combo pages** across 11 cities (Atlanta, Austin, Chicago, Dallas, Houston, LA, NYC, Orange County, Orlando, Philadelphia, San Diego) — previously zero of these were in any XML sitemap.
- `post-sitemap.xml`: **65 URLs** (precise raw count; the original audit reported 67 — a small net change, direction unclear, not worth over-reading). Newest post dated May 5, 2026; several posts from 2025 remain, so posting cadence looks slow/sporadic (3 posts in the last ~3.5 months per the sitemap's own lastmod dates).
- Total XML-sitemap footprint: 242 + 65 + 11 (category) + 28 (tag) + 1 (misc) = **347 URLs**, up from 132 at the time of the original audit. Most of that growth is the combo pages moving into the sitemap, not new content being created.

### Schema: no longer "zero anywhere" — but the addition is narrow and telling

Direct JSON-LD extraction found:

| Page | Schema now present |
|---|---|
| Homepage | BreadcrumbList, WebPage, WebSite only |
| `/photo-booth-rental-nyc/brooklyn/` | **FAQPage (10 Q&A), HowTo (5 steps), Service, Offer, AdministrativeArea, BreadcrumbList** |
| `/photo-booth-rental-nyc/queens/` | FAQPage (15 Q&A), HowTo, AggregateOffer, AdministrativeArea, BreadcrumbList |
| `/photo-booth-rental-nyc/manhattan/` | FAQPage (8 Q&A), HowTo, AggregateOffer, ProfessionalService, AdministrativeArea |
| `/photo-booth-rental-nyc/bronx/`, `/staten-island/` | Same rich schema pattern as Brooklyn/Queens/Manhattan |
| `/photo-booth-rental-nyc/` (city hub), Atlanta hub, Chicago hub | BreadcrumbList/WebPage/WebSite only — no FAQPage/Service |
| `/photo-booth-rental-nyc/services/wedding-photo-booth/` (combo page) | BreadcrumbList/WebPage/WebSite only — no FAQPage despite having FAQ content |
| `/photo-booth-rental-atlanta/services/360-photo-booth/` | Same — basic only |
| `/ai-photo-booth-rental/` | Basic only |

**This is a targeted rollout, not a general fix.** All 5 NYC borough pages — Brooklyn, Queens, Manhattan, Bronx, Staten Island — got full FAQPage+HowTo+Service/Offer schema. Every other page type checked (city hubs, the 55+ combo pages, base service pages) still has nothing beyond a generic breadcrumb. Whether deliberate competitive response or coincidence, the effect is the same: Site B closed the schema gap specifically where it fights the client, and nowhere else.

### The "expansion" cities are mostly redirects, not real pages

Site B's own `/locations-near-me/` and sitemap now list Boston, Seattle, Washington DC, Denver, Portland, St. Louis, New Haven, and Temecula alongside the original 16 metros. Checked HTTP status on all 8:

| URL | Status |
|---|---|
| `/photo-booth-rental-boston/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-seattle/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-washington-dc/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-denver/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-portland/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-st-louis-mo/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-new-haven-ct/` | 301 → `/locations-near-me/` |
| `/photo-booth-rental-temecula/` | 301 → `/photo-booth-rental-san-diego/` |

All 8 are dead ends — none serve real, unique city content. The original 16 city pages (Atlanta, Austin, Birmingham, Charlotte, Chicago, Dallas, Houston, Las Vegas, LA, Miami, Minneapolis, NYC, Orange County, Orlando, Philadelphia, San Diego) were spot-checked and all still return 200. **Site B's real geographic footprint is unchanged; only its sitemap noise increased.** Not an action item for the client, but worth knowing so "Luxe Booth is expanding into 8 new metros" isn't mistakenly treated as a competitive threat — it isn't, yet.

### Blog

Blog index (`/blog/`) shows pagination across ~7 pages at 10 posts/page, consistent with the ~65 confirmed post count. No new content-strategy shift detected beyond the slow, sporadic posting cadence noted above.

---

## STEP 3 — Updated gap analysis

### 3a. Original top-10 action items — verified status

| # | Original action | Status | Evidence |
|---|---|---|---|
| 1 | Build 9 combo pages (3 booths × 3 boroughs) | **Done, exceeded scope** | 76 combo pages shipped (19 services × 4 cities incl. Jersey City) vs. the 9 requested |
| 2 | Deepen Brooklyn location page | **Done** | `/photo-booth-rental-brooklyn` now ~2,800–3,200 words (was ~950), FAQs 7→10 |
| 3 | Deepen Manhattan/Queens pages | **Done** | Manhattan ~2,800–3,200 words, Queens ~2,100–2,300 words (both up from ~950); FAQs both to ~10 |
| 4 | Expand `/get-pricing` beyond ~300–350 words | **Not done** | Still ~450–500 words; still form-first with minimal text. One new internal link to the pricing blog post, but no "what pricing depends on" paragraph or FAQ snippets was added to the page itself |
| 5 | Expand `/photo-booths` hub to 1,200+ words | **Not done / minimal progress** | ~800–900 words (up slightly from ~650–700), but still a card grid with one-line-per-booth descriptions, not the 40–60 word explanatory paragraphs specified |
| 6 | Publish 3 blog posts | **Done, mixed quality** | All 3 live with schema; 2 of 3 (corporate ideas, wedding guide) are genuinely useful; the pricing-cost post is thin relative to its own premise (explicitly avoids giving real numbers) |
| 7 | Push FAQ counts to 10–12 across booth + location pages | **Partially done** | Location pages (Brooklyn/Manhattan/Queens) now ~10 FAQs — done. Booth pages spot-checked (`/mirror-photo-booth`) still have only 7 FAQs — not done |
| 8 | Williamsburg/DUMBO combo pages | **Not done** | No `/wedding-photo-booth-williamsburg` or `/mirror-photo-booth-williamsburg` in the sitemap; combo coverage is Brooklyn/Manhattan/Queens/Jersey City only, no neighborhood-level combos |
| 9 | "Why local beats national" content block | **Not done** | `/about` has only a passing tagline ("Rooted in Brooklyn, built for the whole city"), no explicit local-vs-chain contrast section or page |
| 10 | Verify/update sitemap | **Done** | Fresh fetch confirms all 125 URLs present, no orphans, combo pages and blog posts all indexable |

**Score: 4 fully done (1, 2, 3, 10), 1 done-but-mixed-quality (6), 2 partial (7, and arguably 5), 3 untouched (4, 8, 9).**

### 3b. Combo coverage comparison

Site A: 76 combo pages (19 services × 4 cities: Brooklyn, Manhattan, Queens, Jersey City).
Site B: **~55+ confirmed in its sitemap** (up to 9 service types × 11 cities, verified this session), plus additional combo pages that may still exist outside the XML sitemap per the original audit's HTML-sitemap finding (not re-verified this session in full).

Where Site B still beats Site A on combo coverage:
- **Geographic breadth**: Site B has combo pages in 11 metros nationally; Site A's combos are NYC-tri-state only (by design — different business model, not a gap to close).
- **Service breadth within NYC specifically**: Site B's NYC combo set covers 360-photo-booth, wedding, corporate-event, gif, green-screen, array-photo-booths — 6 service types. Site A's NYC-area combo set covers 19 service types, a wider service catalog than Site B offers anywhere. **Site A is now ahead on combo depth within its own market**, which is the relevant comparison.

Where Site A still has open combo gaps:
- No Williamsburg, DUMBO, or Long Island City combo pages (per unfulfilled action item 8) — Site B has no neighborhood-level combos either, so this remains defensible/optional ground rather than an urgent gap.
- No Bronx or Staten Island combo pages, while Site B now has rich, schema-backed borough pages for both (with FAQPage/HowTo markup, per Step 2). Site A has plain location pages for Bronx/Staten Island (not touched in this round) but no combo pages there.

### 3c. Brooklyn/Manhattan/Queens depth — has the gap closed?

| Borough | Site A now | Site A before | Site B now | Site B before | Verdict |
|---|---|---|---|---|---|
| Brooklyn | ~2,800–3,200 words / FAQPage+LocalBusiness+Breadcrumb | ~950 words | ~2,800–3,200 words / **FAQPage+HowTo+Service+Offer** (new) | ~2,100 words / no schema | **Word-count gap closed. Schema: Site A still had the edge, but Site B just matched it on these 3 pages specifically.** |
| Manhattan | ~2,800–3,200 words / same schema stack | ~950 words (est., same page template) | ~2,200–2,400 words / FAQPage+HowTo+ProfessionalService+AggregateOffer (new) | ~1,850–3,500 words (wide range in original sample) / no schema | Site A now leads on words; schema now roughly even |
| Queens | ~2,100–2,300 words / same schema stack | ~950 words | ~3,500–4,000 words / FAQPage (15 Q&A!)+HowTo+AggregateOffer (new) | ~3,200–3,500 words / no schema | **Site B still wins on raw word count here, and now also has rich schema** — this is the one borough where Site A hasn't caught up |

Honest read: the word-count gap that was the headline finding last time has mostly closed for Brooklyn and Manhattan, and narrowed for Queens. But Site B didn't stand still — it added real content to Queens/Manhattan in the same window and, more importantly, added exactly the schema type (FAQPage/HowTo) that was previously Site A's clearest structural advantage. Queens is now Site A's weakest of the three boroughs on both axes.

### 3d. Blog quality assessment

3 posts vs. Site B's 65 (not 67 — corrected count). Spot-checked all 3 for substance rather than just counting them as shipped:

- **Genuinely helpful (2 of 3):** the corporate-events and wedding-selection posts give concrete, non-generic advice (lead times, spacing requirements, booth-type-by-scenario recommendations) — these read as content a real event planner would find useful, not filler.
- **Weak (1 of 3):** the pricing-cost post is the one post most likely to convert search intent directly ("how much does a photo booth cost") and it's the one that pulls back from giving actual numbers, repeatedly deferring to the quote form instead. This undercuts its own SEO purpose — searchers looking for a price range will bounce to a competitor's post that actually has one.
- All 3 carry full BlogPosting + FAQPage + BreadcrumbList schema — technically sound regardless of content quality.
- Three posts in one shipment vs. a stated pilot is fine as a start, but at Site B's cadence (well over 60 posts accumulated over years) this remains a token presence, not a program.

### 3e. Schema regression check

No regression found. See Step 1 detail above — every new Site A page type (combo, Jersey City, blog posts) carries full schema matching or exceeding the original 44 pages' rigor. The one minor gap is the `/blog` index page itself lacking CollectionPage-level schema, which is low priority.

Site B: confirmed **not** "zero schema anywhere" anymore — it added FAQPage/HowTo/Service/Offer schema specifically to its 5 NYC borough pages. Everywhere else on Site B (16+ city hubs, 55+ combo pages, blog, utility pages) still has no schema beyond a generic BreadcrumbList/WebPage/WebSite, so the broad "Luxe Booth has no schema" framing from the original audit needs updating to "Luxe Booth added schema only where it competes with Magic Mirror Brooklyn directly."

### 3f. New orphans / duplicate titles / thin content from the new work

None found. Specifically checked:
- **Orphans**: all 76 combo pages, the Jersey City page, and all 3 blog posts are in the sitemap and reachable through the sitewide nav (same `Header`/`Footer` link pattern documented in the original audit) — no orphaning introduced.
- **Duplicate titles/metas**: checked raw `<title>`/`<meta>` tags (not AI-summarized) across 8 combo URLs spanning different services and different cities — all unique, all substantively differentiated (different selling point per city, not just a swapped city name).
- **Templated content**: 8 combo pages fetched with an explicit "does this read as genuinely distinct or templated" check. Verdict was consistently "real, city-specific detail woven into a reusable structure" — the FAQ *structure* and 3-step process framework repeat across pages (expected, and reasonable for this page type), but the actual prose, neighborhood references, and venue-type details differ per page. This is a meaningfully different outcome than Site B's own templating pattern flagged in the original audit (Section 4f), where even the opening sentence repeated verbatim city to city.

---

## STEP 4 — Updated prioritized action list

Ranked by likely traffic gain ÷ effort, reflecting what's actually left after this round.

| # | Action | Exact spec | Why it matters now |
|---|---|---|---|
| **1** | Add FAQPage-equivalent depth to the Queens combo/location content specifically | Push `/photo-booth-rental-queens` and the 19 Queens combo pages toward Site B's ~3,500–4,000 word / 15-question FAQ depth on `/photo-booth-rental-nyc/queens/`. Reuse existing FAQ content from `faq-page.json` per the original audit's approach. | Queens is now the one borough where Site B leads on both word count and schema richness (it just added HowTo+AggregateOffer there). This is the most exposed flank right now. |
| **2** | Finish action item 7: push booth-page FAQs (not just location pages) to 10–12 | `/mirror-photo-booth` and the other 17 base booth pages are still at 7 FAQs while the 3 boroughs went to ~10. Extend the same FAQ-expansion work to the booth-type pages. | Half-finished work from last round; schema (`FAQPage`) is already wired in, so this is close to a free lever, same rationale as before. |
| **3** | Rewrite `/blog/photo-booth-rental-cost-nyc` to include real price ranges by booth type/borough | Add a table or list with actual $ ranges (reuse pricing data already live on combo pages — e.g., the $895–$1,550 tier structure competitors publish, and Site A's own $150/hr, $125/hr figures) instead of deferring to the form. | This is the single post most likely to capture high-intent "how much does X cost" search traffic, and it's currently the weakest of the 3 — actively working against its own purpose. |
| **4** | Expand `/get-pricing` and `/photo-booths` — still outstanding from last round | `/get-pricing`: add the "what pricing typically depends on" paragraph and FAQ snippets as originally specified (still ~450–500 words). `/photo-booths`: add 40–60 word explanatory paragraphs per booth category (still a card grid at ~800–900 words). | Both were flagged last time, both remain the thinnest pages on the site, and neither was touched despite being lower-effort than the combo-page work that did get done. |
| **5** | Extend combo coverage to Bronx and Staten Island | At minimum, add combo pages for the highest-demand 3–5 services (mirror, 360, wedding, glam, roaming) × Bronx/Staten Island. | Site B now has full FAQPage+HowTo schema on Bronx and Staten Island borough pages — the same treatment it gave Brooklyn/Manhattan/Queens. If Site B extends combo pages there too, Site A's two remaining un-combo'd boroughs become the next exposed flank. |
| **6** | Grow the blog beyond the 3-post pilot | 4–6 more posts, prioritizing genuinely answerable, high-intent queries (e.g., "photo booth insurance requirements NYC venues," "photo booth space requirements by venue type," "Brooklyn wedding venues that require a COI") rather than broad topics that invite the vagueness seen in the pricing post. | Site B's ~65-post archive is still a 20x content gap. This isn't closable in one round, but the 3-post pilot proved the template (schema, structure) works — the marginal cost of the next batch is lower than the first. |
| **7** | Williamsburg/DUMBO combo pages (carried over from original item 8) | `/wedding-photo-booth-williamsburg`, `/mirror-photo-booth-williamsburg`, similar for DUMBO. | Still undefended, still true that Site B has zero neighborhood-level pages anywhere — this remains uncontested ground worth claiming, just correctly lower priority than the borough-level work above. |
| **8** | "Why local, not national" content (carried over from original item 9) | Add a section to `/about` or a short new page, now with a concrete, current hook: Site B's own "14+ metro" claim is partly padded with 7 dead-redirect city pages (verified this session) — a factual, citable contrast point about real local presence vs. sitemap padding. | Same rationale as before, now with sharper ammunition from this audit's findings. |
| **9** | Add CollectionPage/Blog schema to the `/blog` index | Minor addition to `lib/jsonld.ts` for the blog index route. | Small, cheap, closes the one schema gap found in the new work. |
| **10** | Non-code / login-gated items — still outstanding, unchanged since the original audit | Google Business Profile optimization, Search Console Change-of-Address / URL inspection for the 81 new URLs, Yelp profile, Instagram bio link, directory listings (The Knot, WeddingWire, etc.). | These were never in scope for a code-only audit and remain untouched. Flagging again because they're genuinely high-value and easy to lose track of once the code-side work starts looking "done." None of this can be verified by this audit (login-gated) — someone with account access needs to check current state. |

---

## Data limitations, stated plainly

- Word counts for both sites remain AI-model estimates from rendered content, accurate to roughly ±15%, same caveat as the original audit — except where cross-checked against raw HTML via `curl`/`grep` (schema types, title/meta tags, HTTP status codes), which are exact.
- Site B's true total page count is not fully re-verified against its human-readable `/sitemap/` page this session in the same exhaustive way as the original audit; the XML-sitemap counts (242+65+11+28+1=347) are exact, but pages that exist only in the HTML sitemap (not XML) were not re-audited in full — the original audit's finding that such pages exist may still partly apply outside the ~55 combo pages now confirmed in the XML sitemap.
- Indexability (`noindex` tags) was not directly verified for either site's new pages — same limitation as the original audit.
- The 7 Site B "new city" redirect findings are current as of this fetch (August 21, 2026) and could change if Site B builds out those pages later; they should not be treated as permanent competitive intelligence.
