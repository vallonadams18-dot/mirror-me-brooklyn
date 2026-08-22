# SEO Gap Analysis — ROUND 3: Magic Mirror Brooklyn vs. Luxe Booth

**Prepared:** August 22, 2026 (third round — evaluates work shipped after `seo-gap-analysis-followup.md`, dated August 21, 2026)
**Site A (client):** magicmirrorbrooklyn.com
**Site B (competitor):** luxebooth.com
**Prior reports:** `seo-gap-analysis.md` (baseline) and `seo-gap-analysis-followup.md` (round 2) — both left untouched. Read them for full methodology; this report doesn't restate it.

**How this report was built:** Live fetches only, performed today. Site A: fresh `sitemap.xml` fetch (raw XML, exact URL list, not AI-summarized), raw-HTML `curl`/`grep` extraction of JSON-LD schema and FAQ counts (WebFetch's markdown conversion under-reports schema and mis-counts FAQs, as noted in round 2 — confirmed again this round, see Data Limitations), a live browser render for one page to resolve a word-count discrepancy, and 25+ individual page fetches. Site B: fresh sitemap fetches for all 5 sub-sitemaps (raw XML `<loc>`/CDATA parsing), raw schema extraction on the 5 NYC borough pages and a sample of hub/combo/service pages, and re-checks of the 8 previously-flagged redirect pages. Every figure below is either raw-verified (exact) or explicitly labeled as an AI-model estimate.

---

## Executive summary

Most of what was claimed as shipped is real and verified. Some of it is overstated. One claimed feature turned out to be live but tripped a false negative on first check — worth explaining since it shapes how to read "verify, don't trust" results generally.

**What's genuinely done, verified by raw fetch:**
- All 18 booth pages: FAQs 7 → 11, confirmed on every single one via schema count, not sampling.
- Queens: FAQs 10 → 15, HowTo schema added — confirmed via raw JSON-LD.
- HowTo schema is now sitewide on all 21 location pages — confirmed, no exceptions.
- Pricing blog post now has a real anchor price: *"Our Studio Booth starts at $899 for 3 hours."*
- `/about` now has a "Why a Brooklyn company, not a national chain" section.
- Blog grew 3 → 7 posts; `/blog` index now carries `CollectionPage`+`Blog` schema (was missing in round 2).
- `/get-pricing` got a "What your price actually depends on" section and an embedded CheckCherry booking widget (`checkcherry.com/reservation`, live iframe).
- `/photo-booths` grew from ~800–900 words to ~2,500 words with a genuine new "Which Booth Fits Your Event" guide section (40–80+ word paragraphs per booth, not one-liners).
- 10 new Bronx/Staten Island combo pages (mirror, 360, glam, roaming, wedding × 2 boroughs) — live, schema-complete.
- 16 new Williamsburg/DUMBO combo pages (mirror, studio, ai, glam, enclosed, 360, wedding, roaming × 2 neighborhoods) — live, schema-complete. **Note on methodology:** the first check of 9 of these URLs returned HTTP 404 via both WebFetch and a rapid-fire `curl` loop. A second pass with a 0.3s delay between requests returned 200 for all 16. This was almost certainly a transient edge-cache/rate-limit blip on the host, not a real outage — re-verified twice more after the fact. Flagging the process here because it's exactly the kind of thing "verify, don't trust" is supposed to catch, and in this case the first verification pass itself needed re-verifying.
- A bonus, not on the brief's shipped list: **8 new Brooklyn neighborhood location pages** (Park Slope, Bushwick, Greenpoint, Downtown Brooklyn, Crown Heights, Bay Ridge, Red Hook, Gowanus), confirmed live in the sitemap and git log (`8abbfc0 Add 8 Brooklyn neighborhood pages`), genuinely local content (Park Slope's page references Prospect Park West, brownstone stairwells, shared electrical panels — not filler), and properly linked via a "Neighborhoods we cover in Brooklyn" grid on the main Brooklyn page. Not orphaned.
- Google Search Console verification meta tag confirmed live on the homepage.

**What's overstated — the one finding to take seriously:**
- The brief claimed the Queens page should now be "~7,600+ words." It is not. Verified three independent ways — an AI-estimated read (~2,800–3,000 words), a raw HTML-tag-stripped text count (2,988 words, which includes the now-hidden-by-default FAQ accordion text), and a live browser DOM check (1,548 words of text actually painted to the page, the gap being the 15 FAQ answers sitting in closed `<details>` elements) — the real figure is **roughly 2,800–3,000 words**, not 7,600. That's real growth from round 2's ~2,100–2,300 words, and the FAQ/schema work is exactly as claimed, but the word-count claim is off by roughly 2.5x. Don't repeat it externally without correcting it.

**Site B, re-checked fresh:** no material change detected anywhere. `page-sitemap.xml` (242), `post-sitemap.xml` (65), `category-sitemap.xml` (11), `post_tag-sitemap.xml` (28) — all identical counts to round 2. The FAQPage+HowTo schema rollout is still confined to exactly the same 5 NYC borough pages (Brooklyn, Queens, Manhattan, Bronx, Staten Island); every city hub, combo page, and base service page checked this round still carries only `BreadcrumbList`/`WebPage`/`WebSite`. The 8 fake "new metro" pages still 301-redirect to `/locations-near-me/` (Temecula still redirects into San Diego). Newest blog post is still dated May 5, 2026. Given the two most recent audits are roughly a day apart, this is unsurprising — not enough time for a competitor to ship anything — but it's worth stating plainly rather than implying anything changed.

**Net read:** the client-side work is, with one word-count exaggeration aside, real, live, and schema-complete. Site A now has 102 combo pages (up from 76) spanning 19 service types across up to 6 NYC-tri-state markets, plus 21 location pages (up from 13) including 8 new hyperlocal Brooklyn neighborhoods that weren't even on this round's plan. Site B's footprint is frozen. The code-side gap that existed in round 1 is now closed and, on combo breadth within the client's own market, inverted in the client's favor. What's left is genuinely thin — see Step 4.

---

## STEP 1 — Site A re-inventory (verified)

Fresh `sitemap.xml` fetch, raw XML parsing (not AI-summarized): **163 URLs total**, not "~166" as stated in the brief. Close, but worth using the exact number.

| Category | Count | Change from round 2 (125 total) |
|---|---|---|
| Utility/home (incl. blog index) | 11 | unchanged |
| Booth (service) pages | 18 | unchanged (all now 11 FAQs, was 7) |
| Event/occasion pages | 4 | unchanged |
| Location pages | 21 | +8 (new Brooklyn neighborhoods — not on the brief's list) |
| Service+location combo pages | 102 | +26 (10 Bronx/SI + 16 Williamsburg/DUMBO) |
| Blog posts | 7 | +4 |
| **Total** | **163** | **+38** |

Combo breakdown by city, counted directly from the URL list (19 possible service types; Brooklyn/Manhattan/Queens/Jersey City get all 19, Bronx/Staten Island get 5, Williamsburg/DUMBO get 8):

| City | Combo pages |
|---|---|
| Brooklyn | 19 |
| Manhattan | 19 |
| Queens | 19 |
| Jersey City | 19 |
| Bronx | 5 (mirror, 360, glam, roaming, wedding) |
| Staten Island | 5 (same 5 services) |
| Williamsburg | 8 (mirror, studio, ai, glam, enclosed, 360, wedding, roaming) |
| DUMBO | 8 (same 8 services) |
| **Total** | **102** |

This matches the brief's claimed additions exactly (10 + 16 = 26 new combos on top of round 2's 76).

### Combo-page content spot check (12 pages fetched, across 4 areas and 6 booth types)

Sampled `mirror-photo-booth` and `wedding-photo-booth` across all 4 new areas (Bronx, Staten Island, Williamsburg, DUMBO), plus `glam-booth-bronx`, `roaming-photo-booth-staten-island`, `studio-booth-dumbo`, `ai-photo-booth-williamsburg` for service-type breadth. All 12 are HTTP 200, have unique titles, and read as genuinely area-specific:

- Bronx mirror booth: *"set up on Riverdale estate lawns, inside Throggs Neck catering halls and up the stairs of Mott Haven lofts."*
- Staten Island mirror booth: *"set up in St. George ballrooms, on Todt Hill estate lawns and inside Great Kills waterfront halls."*
- Williamsburg mirror booth: *"we set up on Wythe and Kent Avenue rooftops... a loft freight elevator off Berry Street."*
- DUMBO mirror booth: *"carried in over DUMBO's cobblestone streets and set up inside waterfront lofts and archway venues."*
- DUMBO wedding booth references Vinegar Hill, Brooklyn Heights, Fulton Ferry, Water Street, Jay Street by name.
- Park Slope (new location page, not combo): references Prospect Park West, 7th/5th Avenue, Grand Army Plaza, "narrow brownstone stairwell," "shared brownstone electrical panel."

**One genuine templating flag, found and worth stating plainly rather than papering over:** the sentence *"[Neighborhood] halls especially tend to run tight Saturday turnovers, so we confirm timing before the day rather than showing up and hoping"* appears **verbatim, word-for-word except the venue names**, on both `/wedding-photo-booth-bronx` and `/wedding-photo-booth-staten-island`. Checked all 6 other wedding combo pages (Brooklyn, Manhattan, Queens, Jersey City, Williamsburg, DUMBO) for the same sentence — none of them have it. This is contained to exactly 2 of the 102 combo pages, is a single sentence rather than a whole-page template, and is nowhere near the scale of Site B's own templating (identical opening sentence + identical H2 outline across many pages, per round 1's finding) — but it is a real duplicate, it's new to this round's Bronx/SI work specifically, and it should be rewritten so it doesn't compound as more borough combos get added later. (Separately, an identical booth-dimensions sentence — "8ft x 8ft with 7.5ft of ceiling clearance... 110V outlet within 15 feet" — repeats across several pages; that one is a literal physical spec about the booth, not marketing prose pretending to be local color, so it's expected and not a concern.)

### Schema — checked at scale, no regression

| Page type | Schema found (raw JSON-LD) |
|---|---|
| All 18 booth pages | `Service`, `FAQPage` (11 Q&A each, confirmed on every one), `BreadcrumbList` |
| 10 sampled new combo pages (Bronx/SI/Williamsburg/DUMBO) | `Service`, `FAQPage`, `BreadcrumbList`, `Place`, `OfferCatalog`, `WebSite` — identical to the original 76 combo pages |
| All 21 location pages | `HowTo` confirmed present (1 per page) sitewide, no exceptions — the brief's "HowTo schema added sitewide to all location pages" claim checks out exactly |
| `/photo-booth-rental-queens` | 15 `Question` entries (raw count), `HowTo`, `LocalBusiness`, `Service`, `OfferCatalog` |
| `/blog` index | `Blog`, `BlogPosting`, `CollectionPage` — the round 2 gap is closed |
| `/get-pricing` | CheckCherry iframe/widget confirmed present in raw HTML |

FAQ counts by location-page tier (raw count, all 21 checked): Brooklyn/Manhattan 10, Queens 15, the 8 new Brooklyn neighborhoods 8 each, Bronx/Staten Island/Williamsburg/DUMBO/Long Island/Westchester/NJ/CT/Jersey City/LIC still at 7 (untouched this round, consistent with the brief — only Queens was targeted for FAQ depth this round).

---

## STEP 2 — Site B re-check: no material change

| Sub-sitemap | Round 2 count | Round 3 count |
|---|---|---|
| `page-sitemap.xml` | 242 | 242 |
| `post-sitemap.xml` | 65 | 65 |
| `category-sitemap.xml` | 11 | 11 |
| `post_tag-sitemap.xml` | 28 | 28 |
| `bafg-sitemap.xml` | 1 | 1 |
| **Total** | **347** | **347** |

Schema on the 5 NYC borough pages (Brooklyn, Queens, Manhattan, Bronx, Staten Island) — re-checked, identical to round 2: `FAQPage`, `HowTo`, `AggregateOffer`/`Offer`, `AdministrativeArea`, `ProfessionalService` (Manhattan/Bronx/Staten Island), `BreadcrumbList`. Queens raw `Question` count: 15 — unchanged from round 2 (an AI-estimate this round briefly suggested 21, which the raw schema count disproves; noted in Data Limitations).

Checked 8 other page types this round (homepage, NYC hub, Atlanta hub, NYC `/services/wedding-photo-booth/`, Atlanta `/services/360-photo-booth/`, `enclosed-photo-booth-rental-atlanta`, `ai-photo-booth-rental`, `rental-services/corporate-photo-booth`) — **all still carry only `BreadcrumbList`/`WebPage`/`WebSite`**. The schema rollout has not expanded beyond the 5 boroughs.

Combo footprint: 91 URLs under the `/services/` pattern across the same 11 cities (Atlanta, Austin, Chicago, Dallas, Houston, LA, NYC, Orange County, Orlando, Philadelphia, San Diego), the same real service slugs (360-photo-booth, wedding-photo-booth, corporate-event-photo-booth, gif-photo-booth, green-screen-photo-booth, array-photo-booths, plus Atlanta-only audio-guest-book), plus the same 4 flat combo pages (enclosed-Atlanta/LA/NYC, ai-Atlanta). Unchanged from round 2.

The 8 previously-flagged "new metro" pages (Boston, Seattle, DC, Denver, Portland, St. Louis, New Haven, Temecula): re-checked, all still 301-redirect to `/locations-near-me/` (Temecula still redirects into San Diego specifically). Still not real.

Blog: newest post still dated May 5, 2026 per the sitemap's own `lastmod` — no new posts since round 2.

**Read this plainly:** the two most recent audits are roughly a day apart, so "Site B didn't change" is the expected result, not a meaningful competitive signal either way. It's included for completeness and because the task asked for a fresh check, not because it indicates a trend.

---

## STEP 3 — Updated gap analysis

### 3a. Round 2's action list — verified status this round

| # | Round 2 action | Status | Evidence |
|---|---|---|---|
| 1 | Deepen Queens combo/location content toward Site B's depth | **Partially done, overstated** | FAQs 10→15 ✓, HowTo schema ✓ — both exactly as claimed. Word count: real growth (~2,100–2,300 → ~2,800–3,000) but nowhere near the "~7,600+" claimed in this round's brief. See Executive Summary. |
| 2 | Push booth-page FAQs 7→10-12 | **Done** | All 18 booth pages confirmed at 11 FAQs via raw schema count. |
| 3 | Rewrite pricing blog post with real price ranges | **Done** | "$899 for 3 hours" (Studio Booth) confirmed live. |
| 4 | Expand `/get-pricing` and `/photo-booths` | **Done** | `/photo-booths`: real expansion (~800–900 → ~2,500 words, new per-booth guide section). `/get-pricing`: "what pricing depends on" section added as specified; still relatively lean overall (~450–500 words), but the specific gap flagged in rounds 1 & 2 is closed, and the CheckCherry widget is a separate, business-driven addition on top. |
| 5 | Extend combo coverage to Bronx/Staten Island | **Done** | 10 new combo pages, live, full schema, genuinely differentiated content (see 3a duplicate-sentence flag). |
| 6 | Grow the blog beyond 3 posts | **Done** | 3 → 7 posts. New topics (space requirements, insurance/COI, trade show checklist, Brooklyn neighborhoods) are genuinely different angles, not filler restating the first 3. |
| 7 | Williamsburg/DUMBO combo pages | **Done** | 16 new pages, confirmed live after resolving a transient false-404 (see Executive Summary). |
| 8 | "Why local, not national" content | **Done** | `/about` now has the section, using almost exactly the framing suggested in round 2. |
| 9 | CollectionPage schema on `/blog` | **Done** | Confirmed via raw JSON-LD. |
| 10 | Off-site/login-gated items (GBP, Search Console, Yelp, Instagram, directories) | **Partially done** | Search Console verification meta tag confirmed live. Instagram link present in footer (content of the Instagram bio itself isn't independently verifiable by this audit). No Yelp link found anywhere in footer/site. GBP and directory listings remain unverifiable without account access — same limitation as rounds 1 and 2. |

**Score: 8 of 10 fully done, 1 overstated-but-real-progress (#1), 1 partially done for reasons outside code scope (#10).** This is a materially better completion rate than round 2's "4 done, 1 mixed, 2 partial, 3 untouched."

### 3b. Combo coverage: Site A now leads decisively within its own market

Site A: 102 combo pages, 19 service types, up to 6 NYC-tri-state markets per service.
Site B: ~87–95 genuine combo-type pages (91 raw `/services/` URLs minus a handful of non-combo utility slugs like `/services/prices/`, plus 4 flat combos), ~6–7 service types, 11 metros nationally.

Site B still wins on raw geographic breadth (11 metros vs. Site A's NYC-tri-state focus — by design, not a gap). Within NYC specifically, Site A's 19-service combo catalog dwarfs Site B's 6–7-service NYC combo set, and that gap widened this round (76→102 vs. Site B's unchanged ~91). Site A also now has combo pages in 8 markets (Brooklyn, Manhattan, Queens, Jersey City, Bronx, Staten Island, Williamsburg, DUMBO) vs. Site B's zero neighborhood-level combos anywhere and borough-level combos that don't actually exist as a `/services/` pattern for NYC boroughs (Site B's NYC combos are city-wide, not borough-specific — the borough pages themselves carry FAQ/HowTo schema but aren't crossed with service type the way Site A's are).

### 3c. Content-quality spot check at scale — the honest answer

With 163 pages now built across 3+ separate work sessions, this is the single most important thing to verify rather than assume. The honest finding: **quality is holding up well, with one small, real exception.**

- No orphans: every new page type (combo, location, blog) sampled is reachable from the sitewide nav or a "neighborhoods we cover" / "also serving" grid — confirmed for the Bronx/SI/Williamsburg/DUMBO combos and the 8 new Brooklyn neighborhood pages specifically.
- No duplicate titles/metas found in the ~25+ pages fetched this round.
- Content genuinely differs by area, not just by swapped place-name — confirmed with side-by-side quotes above (Riverdale/Throggs Neck/Mott Haven vs. St. George/Todt Hill/Great Kills vs. Wythe/Kent/Berry Street vs. Vinegar Hill/Water Street — each area's venue types, transit, and physical constraints are described differently, not just relabeled).
- **The one real issue:** the "tight Saturday turnovers" sentence duplicated verbatim across the 2 newest wedding combo pages (Bronx, Staten Island) — see 3a. This is a small, contained instance of exactly the failure mode to watch for as more combo pages get built by reusing a working template; worth a five-minute fix, and worth having someone spot-check for the same pattern before the next batch of combo pages ships.

### 3d. Schema — no regressions found across the full page set

Checked all 18 booth pages (11 FAQs, consistent schema), a 10-page sample of the newest combo pages, all 21 location pages (HowTo confirmed sitewide), and the blog index (CollectionPage added). No page type checked this round has weaker or missing schema relative to the established pattern. This is the second consecutive round with no schema regression — worth noting as a sign the underlying template/component approach is holding up as the page count scales.

### 3e. Blog: 7 posts vs. Site B's 65 — gap direction unchanged

Site A's 7 posts (up from 3) now cover: pricing (fixed to include a real number), corporate event ideas, wedding booth selection, space requirements, insurance/COI, trade show checklist, and Brooklyn neighborhoods. That's a reasonable spread of genuinely different high-intent topics, not 7 posts circling the same idea. Not independently re-graded post-by-post this round (rounds 1–2 already did close reads on the first 3; the 4 new ones weren't spot-checked for prose quality here — see Data Limitations).

Site B's post count (65) hasn't moved and its posting cadence is still stalled (newest post May 5, 2026, same as round 2). In raw count terms the gap is still roughly 9:1. But the gap in *velocity* has flipped: Site A shipped 4 new posts between rounds 2 and 3 while Site B shipped zero. If that relative pace holds, the raw-count gap closes slowly but steadily rather than staying frozen at 9:1 forever. Worth watching, not worth over-claiming yet.

### 3f. New gaps/opportunities not flagged in either prior round

- **The Bronx/Staten Island duplicate sentence (3a/3c)** — new finding, not previously flagged, low effort to fix.
- **`/get-pricing` is still the thinnest page on the site by word count** (~450–500 words) even after this round's addition — it's no longer *missing* the requested content, but it's still short relative to everything else on the site, and it's now also the page carrying the CheckCherry conversion widget, which arguably makes its SEO performance more (not less) important than when it was flagged in round 1.
- **Long Island, Westchester, Connecticut, and Long Island City still have zero combo pages** — they were location pages in round 1 and remain location-page-only through 3 rounds of combo-page work, while Jersey City (added same round as Brooklyn/Manhattan/Queens) got the full 19-service combo treatment. If there's real lead volume from the tri-state suburbs, this is now the most conspicuous gap in Site A's own combo pattern — every other location page either has full 19-service combos (Brooklyn/Manhattan/Queens/Jersey City) or partial combos (Bronx/SI at 5, Williamsburg/DUMBO at 8); these four have none.
- **No AggregateOffer/pricing-range schema anywhere on Site A**, while Site B's Queens page schema now explicitly encodes pricing tiers ($895–$1,550) via `AggregateOffer`. Site A shows a real anchor price in the pricing blog post (good) but doesn't mark it up as structured pricing data anywhere — a low-effort schema addition that Site B is quietly ahead on.

---

## STEP 4 — Updated prioritized action list

The code-side combo-page and content-depth work from the original two plans is now largely exhausted. This list reflects that honestly rather than inventing busywork.

| # | Action | Exact spec | Why it matters now |
|---|---|---|---|
| **1** | Fix the duplicated "tight Saturday turnovers" sentence on the Bronx and Staten Island wedding combo pages | Rewrite the sentence on `/wedding-photo-booth-bronx` and/or `/wedding-photo-booth-staten-island` so it isn't verbatim-identical (venue names aside). Five-minute fix. | The only concrete duplication found across 163 pages. Cheap to fix now while it's 2 pages; worth catching before the same template gets reused for the next batch of combo pages (Long Island/Westchester/CT, if those get combo'd later). |
| **2** | Correct the internal "Queens is ~7,600 words" expectation | Not a code change — a process note. If word-count targets like this are being tracked/reported internally, Queens is actually ~2,800–3,000 words; recalibrate whatever generated the ~7,600 figure before it's repeated elsewhere. | Prevents a wrong number from propagating into future planning or being repeated externally. |
| **3** | Add `AggregateOffer`/pricing schema to at least the highest-traffic pages | Mark up the real prices that now exist in copy (Studio Booth $899/3hr from the blog post, and whatever tiered pricing exists) as `AggregateOffer` or `Offer` schema on `/get-pricing`, the booth pages, or the blog pricing post. | Site B already does this on its NYC borough pages. It's a genuine, verifiable schema gap and a relatively small addition given the JSON-LD infrastructure already exists sitewide. |
| **4** | Decide deliberately on Long Island / Westchester / Connecticut / LIC combo coverage | Either extend combo pages there (lowest-effort: mirror/wedding/roaming × these 4 areas, matching the Bronx/SI pattern) or explicitly decide it's out of scope because lead volume doesn't justify it. | These are now the only location pages on the site with zero combo pages, which is inconsistent with every other location page's treatment. Not urgent — Site B has no presence there either — but it's an open question rather than a settled one. |
| **5** | Google Business Profile, Yelp, and directory listings (The Knot, WeddingWire, etc.) | Login-gated, unchanged status since round 1. No Yelp link found anywhere on the site this round. | This is now the largest verified gap that hasn't been touched across all 3 rounds. GBP in particular typically drives more local-intent conversion than incremental combo pages at this point in the site's maturity — this is where the next real traffic gain likely lives, not in more code. |
| **6** | Ongoing Search Console monitoring for the newest 38 URLs | Confirm the 10 Bronx/SI combos, 16 Williamsburg/DUMBO combos, 8 new Brooklyn neighborhood pages, and 4 new blog posts are indexed (not just crawled) via Search Console's URL inspection or coverage report. | GSC verification is confirmed live (meta tag present), but actual indexing status can't be checked without account access — this is the natural next step now that verification is done. |
| **7** | Grow the blog beyond 7 posts, same pace as this round | 3–4 more posts at the same genuinely-different-angle standard as the last batch (avoid 2 posts both being generic "tips" listicles). | The raw-count gap to Site B's 65 is still large, but Site A is now shipping posts while Site B has shipped zero since round 2 — worth sustaining that relative momentum rather than treating the blog as "done" at 7. |

**What's not on this list, deliberately:** more combo pages for Brooklyn/Manhattan/Queens/Jersey City (already at full 19-service coverage), more booth-page FAQ expansion (already at 11, matches the plan), further `/photo-booths` or `/about` work (both were the target of real, verified expansion this round). The original two reports' code-side punch list is close to exhausted; padding this list further would be manufacturing work rather than reporting a genuine gap.

---

## Data limitations, stated plainly

- **Word counts are still the least reliable number in this report, more so than in rounds 1–2.** This round surfaced a real divergence between AI-estimated word counts (WebFetch's markdown-converted read) and raw HTML-tag-stripped counts — sometimes by more than 2x on the same page (Site A Queens: AI estimate ~2,800–3,000 vs. a browser-rendered-visible-text count of 1,548, reconciled only by accounting for collapsed FAQ-accordion text). Where this report gives a word count, treat it as directionally useful, not precise, and prefer the raw-count figures (explicitly labeled) over AI estimates where both are given.
- **One AI-estimate FAQ count (Site B Queens, "21 questions") was checked against the raw schema count and found wrong (actual: 15, unchanged from round 2).** This is called out specifically because it's a case where trusting the AI-summarized fetch over the raw fetch would have produced a false "Site B added content" finding. Raw `curl`/`grep` counts were used for every FAQ/schema figure that matters in this report's conclusions.
- **The Williamsburg/DUMBO combo pages returned false-negative 404s on first check** (both via WebFetch and a rapid `curl` loop), resolved on retest with request spacing. Documented in the Executive Summary because it's a reminder that even a "verify by fetching" methodology can produce a wrong answer on the first pass, especially under rapid-fire requests against what looks like a CDN/edge-cached static host.
- **Site B's true total page count (~300+ per its own HTML `/sitemap/` page, established in round 1)** was not re-verified this round — only the XML sitemaps were re-checked (347 URLs, unchanged). If pages exist outside the XML sitemap beyond what round 1 already found, they weren't re-audited here.
- **Indexability (`noindex` tags) was not directly verified for either site** — same limitation as rounds 1 and 2.
- **GBP, Yelp, and directory listing status remain entirely unverified** — login-gated, outside what any fetch-based audit can check.
- **The 4 newest blog posts (space requirements, insurance/COI, trade show checklist, Brooklyn neighborhoods) were confirmed to exist and carry full schema, but were not individually quality-graded** the way rounds 1–2 graded the first 3 posts sentence-by-sentence. If a future round wants a substance check on these specifically, that's still open.
