/**
 * Converts the two redirect CSVs in docs/ into a single Cloudflare Bulk
 * Redirects import file (docs/cloudflare-bulk-redirects.csv) with columns:
 *   Source URL,Target URL,Status,Parameters
 * Every rule is a one-hop 301 to the canonical https://www host. Also fails
 * the build if any target is itself a source (redirect chain) or any source
 * repeats (loop/ambiguity).
 */
import fs from "node:fs";

const CANON = "https://www.magicmirrorbrooklyn.com";
const rows = [];

// Same-domain legacy paths (old WordPress URLs on the new domain).
const sameDomain = fs
  .readFileSync("docs/redirects-magicmirrorbrooklyn.csv", "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1);
for (const line of sameDomain) {
  const [oldPath, newPath] = line.split(",");
  if (!oldPath || newPath === undefined) continue;
  const target = `${CANON}${newPath === "/" ? "" : newPath}` || CANON;
  rows.push([`${CANON}${oldPath}`, target || CANON]);
  // also catch the non-trailing-slash variant (unless it IS the target)
  if (oldPath.endsWith("/") && oldPath !== "/") {
    const variant = `${CANON}${oldPath.slice(0, -1)}`;
    if (variant !== (target || CANON)) rows.push([variant, target || CANON]);
  }
}

// Cross-domain rules (old mirrormebrooklyn.com URLs).
const crossDomain = fs
  .readFileSync("docs/redirects-old-php-site.csv", "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1);
for (const line of crossDomain) {
  const [oldUrl, newUrl] = line.split(",");
  if (!oldUrl || !newUrl) continue;
  rows.push([oldUrl, newUrl]);
}

// Cloudflare Bulk Redirects cannot match a source URL that carries a query
// string ("matching url cannot have a query string"), and rejects the whole
// import if one is present. Pull those out here rather than having the upload
// fail, and list them so they are dropped loudly instead of silently — they
// need a Single Redirect rule with an expression, or the old host's .htaccess.
const withQuery = rows.filter(([src]) => src.includes("?"));
const clean = rows.filter(([src]) => !src.includes("?"));
if (withQuery.length) {
  console.warn(
    `\nEXCLUDED ${withQuery.length} rule(s) — Bulk Redirects cannot match a query string:`,
  );
  for (const [src, target] of withQuery) console.warn(`  ${src} -> ${target}`);
  console.warn("Handle these with a Single Redirect rule or at the old host.\n");
}

// Sanity: no duplicate sources, no chains (target that is also a source).
const sources = new Set();
let bad = 0;
for (const [src] of clean) {
  if (sources.has(src)) {
    console.error("duplicate source:", src);
    bad++;
  }
  sources.add(src);
}
for (const [, target] of clean) {
  if (sources.has(target)) {
    console.error("redirect chain: target is also a source:", target);
    bad++;
  }
}

const out = [
  "Source URL,Target URL,Status,Parameters",
  ...clean.map(([s, t]) => `${s},${t || CANON},301,`),
].join("\n");
fs.writeFileSync("docs/cloudflare-bulk-redirects.csv", out + "\n");
console.log(
  `cloudflare-bulk-redirects.csv: ${clean.length} rules${bad ? `, ${bad} PROBLEMS` : ", no chains or dupes"}`
);
process.exitCode = bad ? 1 : 0;
