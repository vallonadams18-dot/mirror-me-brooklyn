/**
 * Pre-generates responsive WebP variants for every JPG/PNG under public/img
 * into public/img/_r/, matching the naming in src/lib/image-loader.ts:
 *   /img/foo/bar.jpg -> /img/_r/foo_bar-w{480,960,1600}.webp
 * Incremental: a variant is skipped when it is newer than its source.
 * Run automatically via the `prebuild` npm script.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);
const WIDTHS = [480, 960, 1600];
const ROOT = path.resolve("public/img");
const OUT = path.join(ROOT, "_r");
fs.mkdirSync(OUT, { recursive: true });

const sources = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // _r holds generated variants; og holds social images served at full size
      if (full !== OUT && entry.name !== "og") walk(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      sources.push(full);
    }
  }
})(ROOT);

let made = 0;
let skipped = 0;
for (const file of sources) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const base = rel.replace(/\//g, "_").replace(/\.(jpe?g|png)$/i, "");
  const srcStat = fs.statSync(file);
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${base}-w${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcStat.mtimeMs) {
      skipped++;
      continue;
    }
    try {
      await sharp(file)
        .rotate()
        .resize(w, undefined, { withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toFile(out);
      made++;
    } catch (err) {
      console.error(`variant failed: ${rel} @${w}`, String(err));
      process.exitCode = 1;
    }
  }
}
console.log(
  `image variants: ${made} generated, ${skipped} up to date, ${sources.length} sources`
);
