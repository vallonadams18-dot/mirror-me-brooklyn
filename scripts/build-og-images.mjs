/**
 * Generates a 1200x630 Open Graph image for every booth, event and location
 * page from its hero image (falling back to the first JPG in its gallery,
 * then to the site-wide og.jpg). Output: public/img/og/{slug}.jpg
 * Runs from the `prebuild` npm script; incremental by mtime.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);
const PUB = path.resolve("public");
const OUT = path.join(PUB, "img", "og");
fs.mkdirSync(OUT, { recursive: true });

const datasets = ["booths", "events", "locations"].map((name) =>
  JSON.parse(fs.readFileSync(path.join("src", "data", `${name}.json`), "utf8"))
);

const combosDir = path.join("src", "data", "combos");
const combos = fs
  .readdirSync(combosDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(combosDir, f), "utf8")));
datasets.push(combos);

const isStill = (src) => /\.(jpe?g|png)$/i.test(src || "");
const fallback = path.join(PUB, "img", "og.jpg");

let made = 0;
let skipped = 0;
for (const pages of datasets) {
  for (const page of pages) {
    const candidates = [
      page.heroImg?.src,
      ...(page.gallery || []).map((g) => g.src),
    ].filter(isStill);
    const source = candidates.length
      ? path.join(PUB, candidates[0].replace(/^\//, ""))
      : fallback;
    const out = path.join(OUT, `${page.slug}.jpg`);
    if (
      fs.existsSync(out) &&
      fs.existsSync(source) &&
      fs.statSync(out).mtimeMs >= fs.statSync(source).mtimeMs
    ) {
      skipped++;
      continue;
    }
    try {
      await sharp(fs.existsSync(source) ? source : fallback)
        .rotate()
        .resize(1200, 630, { fit: "cover", position: "attention" })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(out);
      made++;
    } catch (err) {
      console.error(`og image failed for ${page.slug}:`, String(err));
      process.exitCode = 1;
    }
  }
}
console.log(`og images: ${made} generated, ${skipped} up to date`);
