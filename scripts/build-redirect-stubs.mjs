/**
 * Post-build: emit static redirect stubs into ./out.
 *
 * GitHub Pages cannot issue server-side 301s, so two classes of URL currently
 * return a hard 404 to Googlebot even though the 404 page's LegacyRedirect
 * component forwards human visitors correctly:
 *
 *   1. Trailing-slash variants of real pages. `next build` emits `/faq.html`,
 *      so `/faq` is 200 but `/faq/` is 404 — and the old WordPress site linked
 *      everything with trailing slashes.
 *   2. Old WordPress paths from docs/redirects-magicmirrorbrooklyn.csv.
 *
 * Each stub is a 200 response carrying <link rel="canonical"> plus a 0-second
 * <meta http-equiv="refresh"> to the target. Google follows both and passes
 * ranking signals through. A true 301 via Cloudflare Bulk Redirects (see
 * docs/REDIRECTS.md) is still better; this is the best a static host can do
 * and is harmless if the domain later moves behind a proxy.
 *
 * Stubs never overwrite a file the build already produced.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const CANON = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.magicmirrorbrooklyn.com").replace(/\/$/, "");

if (!fs.existsSync(OUT)) {
  console.error(`${OUT}/ not found — run this after \`next build\`.`);
  process.exit(1);
}

const stub = (target) => {
  const abs = `${CANON}${target === "/" ? "/" : target}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${abs}">
<meta http-equiv="refresh" content="0; url=${abs}">
<meta name="robots" content="follow">
</head>
<body>
<p>This page has moved. <a href="${abs}">Continue to ${abs}</a>.</p>
</body>
</html>
`;
};

let written = 0;
let skipped = 0;

/** Write `file` unless the build already emitted something there. */
function write(file, target) {
  if (fs.existsSync(file)) {
    skipped++;
    return;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, stub(target));
  written++;
}

// ---------------------------------------------------------------------------
// 1. Trailing-slash variants of every page the build emitted.
// ---------------------------------------------------------------------------
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next" || entry.name.startsWith("__next")) continue;
      walk(full);
    } else if (entry.name.endsWith(".html") && entry.name !== "404.html" && entry.name !== "index.html") {
      const route = "/" + path.relative(OUT, full).replace(/\\/g, "/").replace(/\.html$/, "");
      write(path.join(OUT, route, "index.html"), route);
    }
  }
}
walk(OUT);
const slashStubs = written;

// ---------------------------------------------------------------------------
// 2. Old WordPress paths.
// ---------------------------------------------------------------------------
const csv = fs.readFileSync("docs/redirects-magicmirrorbrooklyn.csv", "utf8").trim().split(/\r?\n/).slice(1);

for (const line of csv) {
  const [oldPath, newPath] = line.split(",");
  if (!oldPath || newPath === undefined) continue;
  const target = newPath || "/";
  const bare = oldPath.replace(/\/+$/, "");
  if (!bare) continue; // never stub the site root
  // `/old/path/` -> out/old/path/index.html ; `/old/path` -> out/old/path.html
  write(path.join(OUT, bare, "index.html"), target);
  write(path.join(OUT, `${bare}.html`), target);
}

console.log(
  `redirect stubs: ${slashStubs} trailing-slash, ${written - slashStubs} legacy WordPress, ` +
    `${written} written, ${skipped} skipped (real page already there)`,
);
