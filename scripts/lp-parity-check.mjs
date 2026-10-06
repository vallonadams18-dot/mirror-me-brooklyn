// Parity check for the paid landing pages under public/lp.
// Compares every page in the working tree with the same page at a base git ref (default: origin/main, i.e. what is live) and FAILS if
// anything functional drifted: tracking/analytics scripts, LP_CONFIG (Ads tag + conversion label), the CheckCherry form card, data-track
// attributes, links, element ids, SEO tags (title/description/noindex), the final CTA, footer, quick-contact bar, outbound hosts, or if any
// sentence of the original copy disappeared. It only reads; it changes nothing.
//   node scripts/lp-parity-check.mjs [baseRef]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const base = process.argv[2] || "origin/main";
const dir = "public/lp";
const git = (...a) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const norm = (s) => s.replace(/\r\n/g, "\n");
const text = (h) => norm(h).replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<noscript>[\s\S]*?<\/noscript>/g, (m) => m.replace(/<[^>]+>/g, " ")).replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&").replace(/&rsquo;/g, "’").replace(/&lsquo;/g, "‘").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”").replace(/&middot;/g, "·").replace(/&mdash;/g, "—").replace(/&#9733;/g, "★").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
const chunks = (h) => text(h).split("\n").map((x) => x.replace(/\s+/g, " ").trim()).filter((x) => x.length >= 6);
const all = (re, h) => [...norm(h).matchAll(re)].map((m) => (m[1] !== undefined ? m[1] : m[0]));
const slice = (h, a, b) => { const s = norm(h); const i = s.indexOf(a); const j = s.indexOf(b, i + 1); if (i < 0 || j < 0) throw new Error(`marker missing: ${a} .. ${b}`); return s.slice(i, j); };

const slugs = git("ls-tree", "--name-only", base, `${dir}/`).split("\n").filter((f) => f.endsWith(".html")).map((f) => path.basename(f, ".html")).sort();
if (!slugs.length) { console.error("no landing pages found at", base); process.exit(2); }
let failed = 0;
for (const slug of slugs) {
  const bad = [];
  let o, n;
  try { o = norm(git("show", `${base}:${dir}/${slug}.html`)); n = norm(fs.readFileSync(path.join(dir, `${slug}.html`), "utf8")); } catch (e) { console.log(`FAIL ${slug}: cannot read (${e.message.split("\n")[0]})`); failed++; continue; }
  const eq = (name, a, b) => { if (a !== b) bad.push(name); };
  const safe = (fn) => { try { return fn(); } catch (e) { bad.push(String(e.message)); return Math.random(); } };
  eq("title/meta/robots/preconnect", safe(() => slice(o, "<title>", "<style>").trimEnd()), safe(() => slice(n, "<title>", '<meta name="theme-color"').trimEnd()));
  eq("head scripts (GA4, LP_CONFIG, Ads tag)", safe(() => slice(o, "<!-- Google Analytics", "</head>").trimEnd()), safe(() => slice(n, "<!-- Google Analytics", "</head>").trimEnd()));
  const tail = '<script async src="https://magic-mirror-brooklyn-llc.checkcherry.com';
  eq("tail scripts (CheckCherry loader, lead tracking)", safe(() => slice(o, tail, "</body>").trimEnd()), safe(() => slice(n, tail, "</body>").trimEnd()));
  eq("form card (widget div, props, noscript)", safe(() => slice(o, '<div id="quote" class="card h-form">', "</noscript>")), safe(() => slice(n, '<div id="quote" class="card h-form">', "</noscript>")));
  eq("final CTA section", safe(() => slice(o, '<section class="cta"', "</main>").trimEnd()), safe(() => slice(n, '<section class="cta"', "</main>").trimEnd()));
  eq("footer", safe(() => slice(o, "<footer>", "</footer>")), safe(() => slice(n, "<footer>", "</footer>")));
  eq("quick-contact bar", safe(() => slice(o, '<nav class="bar"', "</nav>")), safe(() => slice(n, '<nav class="bar"', "</nav>")));
  eq("data-track attributes", JSON.stringify(all(/data-track="([^"]+)"/g, o).sort()), JSON.stringify(all(/data-track="([^"]+)"/g, n).sort()));
  eq("anchor hrefs", JSON.stringify(all(/<a [^>]*href="([^"]+)"/g, o).sort()), JSON.stringify(all(/<a [^>]*href="([^"]+)"/g, n).sort()));
  const nIds = new Set(all(/\sid="([^"]+)"/g, n));
  for (const id of new Set(all(/\sid="([^"]+)"/g, o))) if (!nIds.has(id)) bad.push(`missing id ${id}`);
  const nText = chunks(n).join(" | ");
  const missing = chunks(o).filter((c) => !nText.includes(c));
  if (missing.length) bad.push(`original copy missing x${missing.length}: ${missing.slice(0, 2).map((m) => JSON.stringify(m.slice(0, 48))).join(", ")}`);
  const allowed = new Set(["www.magicmirrorbrooklyn.com", "www.googletagmanager.com", "magic-mirror-brooklyn-llc.checkcherry.com"]);
  const hosts = [...new Set(all(/(?:src|href|action)="(https?:\/\/[^"/]+)/g, n).map((u) => u.replace(/^https?:\/\//, "")))].filter((h) => !allowed.has(h));
  if (hosts.length) bad.push("unexpected outbound hosts: " + hosts.join(","));
  if (/getfastpricing|eventbusinessmarketing|magicmirrorme\.|cafelastconsulting/i.test(n)) bad.push("agency reference");
  if (!/<meta name="robots" content="noindex/.test(n) || /rel="canonical"/.test(n)) bad.push("robots/canonical changed");
  const imgs = all(/<img\b[^>]*>/g, n);
  const noAlt = imgs.filter((i) => !/\balt="[^"]+"/.test(i)).length, noDim = imgs.filter((i) => !/\bwidth="\d+"/.test(i) || !/\bheight="\d+"/.test(i)).length;
  if (noAlt) bad.push(`${noAlt} <img> without alt`);
  if (noDim) bad.push(`${noDim} <img> without width/height (layout shift)`);
  const refs = new Set(all(/(?:src|srcset)="([^"]+)"/g, n).flatMap((v) => v.split(",").map((x) => x.trim().split(" ")[0])).filter((u) => u.startsWith("/") && !u.startsWith("//")));
  const missingFiles = [...refs].filter((u) => !fs.existsSync(path.join("public", u)));
  if (missingFiles.length) bad.push("referenced files missing: " + missingFiles.slice(0, 3).join(", "));
  if ((n.match(/<h1\b/g) || []).length !== 1) bad.push("h1 count != 1");
  if ((n.match(/checkcherry__widget__contact-form"/g) || []).length !== (o.match(/checkcherry__widget__contact-form"/g) || []).length) bad.push("form widget count differs from base");
  console.log(`${bad.length ? "FAIL" : "PASS"} ${slug.padEnd(42)} ${Math.round(Buffer.byteLength(n) / 1024)}KB ${imgs.length} imgs${bad.length ? " <- " + bad.join(" ; ") : ""}`);
  if (bad.length) failed++;
}
console.log(failed ? `\n${failed} of ${slugs.length} PAGE(S) FAILED vs ${base}` : `\nALL ${slugs.length} PAGES PASS parity vs ${base}`);
process.exit(failed ? 1 : 0);
