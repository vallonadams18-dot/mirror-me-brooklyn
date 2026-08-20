// Crawl the static export: internal links, canonicals, og/twitter images,
// exactly one h1, title/description lengths.
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith(".html")) pages.push(full);
  }
})(OUT);

let problems = 0;
const titles = new Map();
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const rel = "/" + path.relative(OUT, page).replace(/\\/g, "/");
  const is404 = rel === "/404.html" || rel === "/_not-found.html";

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) {
    console.log(`H1x${h1s}: ${rel}`);
    problems++;
  }

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!is404) {
    if (titles.has(title)) {
      console.log(`DUPE TITLE: ${rel} == ${titles.get(title)}`);
      problems++;
    }
    titles.set(title, rel);
    if (title.length > 65) {
      console.log(`LONG TITLE ${title.length}: ${rel}`);
      problems++;
    }
    if (!html.includes('rel="canonical"')) {
      console.log(`NO CANONICAL: ${rel}`);
      problems++;
    }
    if (!html.includes('property="og:image"')) {
      console.log(`NO OG IMAGE: ${rel}`);
      problems++;
    }
    if (!html.includes('name="twitter:image"')) {
      console.log(`NO TW IMAGE: ${rel}`);
      problems++;
    }
    const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || "";
    if (desc.length > 160) {
      console.log(`LONG DESC ${desc.length}: ${rel}`);
      problems++;
    }
    const ogimg = (html.match(/property="og:image" content="([^"]*)"/) || [])[1] || "";
    if (ogimg.startsWith("https://www.magicmirrorbrooklyn.com/")) {
      const local = path.join(
        OUT,
        ogimg.replace("https://www.magicmirrorbrooklyn.com/", "")
      );
      if (!fs.existsSync(local)) {
        console.log(`OG IMAGE 404: ${rel} -> ${ogimg}`);
        problems++;
      }
    }
  }

  for (const m of html.matchAll(/href="(\/[^"#?]*)[#?"]/g)) {
    const href = m[1];
    if (
      href.startsWith("/_next") ||
      href.startsWith("/img") ||
      href.startsWith("/video")
    )
      continue;
    const bare = href.replace(/^\//, "").replace(/\/$/, "");
    const candidates = [
      href === "/" ? "index.html" : bare + ".html",
      bare + "/index.html",
      bare, // real files (favicon.ico, sitemap.xml, robots.txt...)
    ];
    if (!candidates.some((c) => fs.existsSync(path.join(OUT, c)))) {
      console.log(`BROKEN LINK in ${rel}: ${href}`);
      problems++;
    }
  }

  for (const m of html.matchAll(/(?:src|srcSet|imageSrcSet)="(\/img\/[^"\s]+)/g)) {
    const img = m[1].split(" ")[0];
    if (!fs.existsSync(path.join(OUT, img.replace(/^\//, "")))) {
      console.log(`MISSING IMG in ${rel}: ${img}`);
      problems++;
    }
  }
}
console.log(`\naudit: ${pages.length} pages, ${problems} problems`);
process.exitCode = problems ? 1 : 0;
