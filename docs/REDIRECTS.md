# Launch plan — magicmirrorbrooklyn.com

The new site launches on **magicmirrorbrooklyn.com** (replacing the WordPress
site on that domain). The old **mirrormebrooklyn.com** PHP site forwards into
it. Backlinks cannot be moved, but 301 redirects transfer most of their value.

## 1. Old WordPress URLs (same domain)

When the domain switches to the new site, old WordPress paths
(`/services/...`, blog posts, service-in-location pages) no longer exist.
Map: [`redirects-magicmirrorbrooklyn.csv`](./redirects-magicmirrorbrooklyn.csv)
(123 path-to-path rules).

- **Best (true 301s):** put the domain on Cloudflare's free plan and add
  these as Redirect Rules / Bulk Redirects.
- **Already built in (fallback):** the site's 404 page ships with a router
  that forwards every old WordPress path — and the old PHP paths — to the
  right new page automatically. Visitors and old links always land
  correctly even with no Cloudflare setup.
- **Also built in (crawler fallback):** `scripts/build-redirect-stubs.mjs`
  runs as `postbuild` and writes static stub pages into `out/` for every
  legacy path in the CSV *and* for the trailing-slash variant of every real
  page (`/faq/`, `/about/`, …), which `next build` otherwise leaves as 404s.
  Each stub is an HTTP 200 carrying `rel=canonical` plus a 0-second meta
  refresh, so Google follows it and passes ranking signals — unlike the JS
  router above, which only runs after a 404 status has already been sent.
  Stubs never overwrite a real page. Strictly weaker than a true 301; it is
  what a static host can do, and harmless once Cloudflare fronts the domain.

## 2. Old mirrormebrooklyn.com PHP site (cross-domain)

Map: [`redirects-old-php-site.csv`](./redirects-old-php-site.csv) (31 URLs).
Implement 301s on whatever currently hosts that domain (.htaccess), or move
its DNS to Cloudflare and use Redirect Rules. At minimum, set a
registrar-level domain forward to https://www.magicmirrorbrooklyn.com — and
keep the domain registered (email lives on it).

## 3. Owner checklist (highest impact, only you can do these)

- **DNS for magicmirrorbrooklyn.com → GitHub Pages** (this is the moment
  WordPress is replaced): `www` CNAME → `<github-username>.github.io`; apex
  `@` A records → 185.199.108.153 / 109.153 / 110.153 / 111.153. In the
  repo: Settings → Pages → Custom domain `www.magicmirrorbrooklyn.com`,
  enforce HTTPS.
- **Google Business Profile:** primary category → "Photo booth rental
  service"; website stays magicmirrorbrooklyn.com (now the new site);
  add booth experiences under Products/Services.
- **Phone number (NAP):** Google shows (518) 500-3034, Yelp (732) 663-9305,
  the site (347) 383-5851. Pick ONE and align the site, GBP, Yelp,
  WeddingWire, The Knot.
- **Google Search Console:** verify the domain, submit `/sitemap.xml`.
- Keep the WordPress hosting's files backed up before pointing DNS away.

## 4. Blog content worth migrating later

Eight real posts from WordPress (glambot, corporate engagement, wedding
ideas, mirror-vs-booth, etc.) can be rebuilt as a blog on the new site;
until then their old URLs route to the closest topical page.
