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

// Sanity: no duplicate sources, no chains (target that is also a source).
const sources = new Set();
let bad = 0;
for (const [src] of rows) {
  if (sources.has(src)) {
    console.error("duplicate source:", src);
    bad++;
  }
  sources.add(src);
}
for (const [, target] of rows) {
  if (sources.has(target)) {
    console.error("redirect chain: target is also a source:", target);
    bad++;
  }
}

const out = [
  "Source URL,Target URL,Status,Parameters",
  ...rows.map(([s, t]) => `${s},${t || CANON},301,`),
].join("\n");
fs.writeFileSync("docs/cloudflare-bulk-redirects.csv", out + "\n");
console.log(
  `cloudflare-bulk-redirects.csv: ${rows.length} rules${bad ? `, ${bad} PROBLEMS` : ", no chains or dupes"}`
);
process.exitCode = bad ? 1 : 0;
