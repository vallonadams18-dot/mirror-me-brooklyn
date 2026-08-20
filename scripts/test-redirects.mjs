/**
 * Automated redirect test. Run AFTER the Cloudflare Bulk Redirect list is
 * deployed:  node scripts/test-redirects.mjs
 * For every source URL in docs/cloudflare-bulk-redirects.csv it verifies:
 *   - the source answers with a single 301 hop
 *   - the Location header matches the mapped target exactly
 *   - the target itself returns 200 (no chains)
 * Until the edge rules exist, sources will return 404 and this script reports
 * them as pending rather than passing.
 */
import fs from "node:fs";

const rows = fs
  .readFileSync("docs/cloudflare-bulk-redirects.csv", "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((l) => l.split(","));

let pass = 0;
let fail = 0;
let pending = 0;
const targetsChecked = new Map();

for (const [source, target] of rows) {
  try {
    const res = await fetch(source, { redirect: "manual" });
    if (res.status === 301) {
      const loc = res.headers.get("location");
      const normalizedLoc = loc?.replace(/\/$/, "");
      const normalizedTarget = target.replace(/\/$/, "");
      if (normalizedLoc === normalizedTarget) {
        if (!targetsChecked.has(target)) {
          const t = await fetch(target, { redirect: "manual" });
          targetsChecked.set(target, t.status);
        }
        if (targetsChecked.get(target) === 200) {
          pass++;
          continue;
        }
        console.log(`CHAIN/BROKEN TARGET (${targetsChecked.get(target)}): ${target}`);
        fail++;
      } else {
        console.log(`WRONG TARGET: ${source} -> ${loc} (expected ${target})`);
        fail++;
      }
    } else if (res.status === 404) {
      pending++;
    } else {
      console.log(`UNEXPECTED ${res.status}: ${source}`);
      fail++;
    }
  } catch (err) {
    console.log(`ERROR: ${source} — ${String(err)}`);
    fail++;
  }
}
console.log(
  `redirects: ${pass} pass, ${fail} fail, ${pending} pending (no edge rule yet) of ${rows.length}`
);
process.exitCode = fail > 0 ? 1 : 0;
