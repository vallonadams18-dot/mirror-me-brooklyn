# Launch-day redirect plan (SEO equity migration)

Backlinks cannot be moved, but **301 redirects transfer most of their value**.
Both old sites redirect into the new one so years of links, citations and
indexed pages keep working for you.

## 1. magicmirrorbrooklyn.com (WordPress) → new site

The full URL map is in [`redirects-magicmirrorbrooklyn.csv`](./redirects-magicmirrorbrooklyn.csv)
(123 URLs: every service page, all service-in-location pages, and all blog
posts — including the 8 lorem-ipsum demo posts, which redirect to the
homepage).

**How to implement:** on the WordPress site install the free **Redirection**
plugin (Tools → Redirection → Import), import the CSV, and set redirects to
`301 permanent`. Keep the WordPress hosting alive for at least 6–12 months so
the redirects can pass equity; after that the domain can simply be parked
with a registrar-level forward to the new site.

## 2. Old mirrormebrooklyn.com PHP pages → new pages

Map: [`redirects-old-php-site.csv`](./redirects-old-php-site.csv) (31 paths).

Because this domain will HOST the new site on GitHub Pages — which cannot
serve real 301s — use one of these, in order of preference:

1. **Cloudflare (recommended, free):** move mirrormebrooklyn.com DNS to
   Cloudflare's free plan, point it at GitHub Pages, then add the CSV
   entries under Rules → Redirect Rules (or Bulk Redirects). This gives true
   301s AND keeps static hosting.
2. **Fallback (already built in):** the site's 404 page contains a legacy
   router that forwards every old `.php` URL (including
   `corporate.php?page=N`) to the right new page. Visitors and old links
   always land correctly; Google treats this more weakly than a 301, which
   is why option 1 is preferred.

## 3. Things only the owner can do (highest impact)

- **Google Business Profile** (Magic Mirror Brooklyn Photo Booth Rental,
  4.9★ · 210 reviews): change the website URL to the new site at launch;
  change the primary category from "Photography service" to
  **"Photo booth rental service"**; add the booth experiences under
  Products/Services with links to their pages.
- **Phone number consistency (NAP):** Google shows (518) 500-3034, Yelp
  shows (732) 663-9305, and the old site (now the new site header) shows
  (347) 383-5851. Pick ONE primary number and use it on the site, GBP,
  Yelp, WeddingWire and The Knot. Mismatched numbers suppress local
  rankings.
- **Update website links** on existing profiles that already link to the
  old domains: Instagram bio, Yelp, WeddingWire, The Knot.
- **Google Search Console:** verify the new site, submit
  `/sitemap.xml`, and use Change of Address for magicmirrorbrooklyn.com
  after its 301s are live.

## 4. Blog content worth migrating later

Eight real posts on the WordPress site (glambot, corporate engagement,
wedding ideas, mirror-vs-booth, etc.) can be rewritten into a blog on the
new site; until then their URLs 301 to the closest topical page so no
equity is lost.
