# Paused landing pages

Pages in this folder are NOT served by the website. They were taken offline on purpose and
are kept here, byte-for-byte, so they can be put back at any time.

| Page | Paused | Why | Was in Google Ads? |
|---|---|---|---|
| corporate-headshot-booth-nyc | 2026-10-10 | Owner asked to pause it | No (no ad, keyword or sitelink used it) |

## What "paused" does

The address `/lp/<page>` returns "not found" until the page is restored. Nothing else changes.
The photo files the page used (`public/lp/assets/img/hs-*.webp`) were left in place so a restore
is a single move; they are not linked from anywhere.

## How to restore

1. `git mv docs/lp-redesign-2026-10-06/paused/<page>.html public/lp/<page>.html`
2. Remove the page's line from `paused-pages.txt`.
3. Commit and push to `main` (GitHub Pages deploys automatically).

`scripts/lp-parity-check.mjs` skips the slugs listed in `paused-pages.txt`.
