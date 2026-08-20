/**
 * Curate the best N photos from an extracted Dropbox event folder.
 *   node curate.mjs <folder> <prefix> <count>
 * Scores each photo on sharpness + exposure, drops near-duplicate burst
 * frames via a perceptual hash, spreads the picks across the event timeline,
 * then writes web-sized JPEGs to public/img/gallery-<prefix>-NN.jpg.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
sharp.cache(false);

const BASE =
  "C:/Users/volda/AppData/Local/Temp/claude/C--Users-volda-Downloads-VALLON-FIST-CLAUDE/079f56e3-0f23-4435-a331-39b5b81c98f7/scratchpad/dropbox/extracted";

const [folder, prefix, countArg] = process.argv.slice(2);
const COUNT = Number(countArg || 10);
const skipDirs = new Set(["gif_from_photos", "raw"]);

function collect(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!skipDirs.has(e.name)) out.push(...collect(p));
    } else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

/** 8x8 average-hash for near-duplicate detection. */
async function pHash(buf) {
  const { data } = await sharp(buf)
    .greyscale()
    .resize(8, 8, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const avg = data.reduce((a, v) => a + v, 0) / data.length;
  let bits = 0n;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > avg) bits |= 1n << BigInt(i);
  }
  return bits;
}
const hamming = (a, b) => {
  let x = a ^ b, c = 0;
  while (x) { c += Number(x & 1n); x >>= 1n; }
  return c;
};

/** Edge energy on a downscaled grey copy — a decent sharpness proxy. */
async function quality(file) {
  const { data, info } = await sharp(file)
    .greyscale()
    .resize(160, 160, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  let edge = 0, sum = 0;
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      const lap = 4 * data[i] - data[i - 1] - data[i + 1] - data[i - W] - data[i + W];
      edge += lap * lap;
      sum += data[i];
    }
  }
  const px = (W - 2) * (H - 2);
  const sharpness = Math.sqrt(edge / px);
  const mean = sum / px;
  // penalise very dark / blown-out frames; 110-165 is the sweet spot
  const exposure = 1 - Math.min(1, Math.abs(mean - 138) / 110);
  return { score: sharpness * (0.45 + 0.55 * exposure), sharpness, mean };
}

// Optional 4th arg: index into the frame-cluster json from cluster.mjs, so a
// folder holding two events only contributes the one we want.
const clusterIdx = process.argv[5];
let files;
if (clusterIdx !== undefined) {
  const jsonPath = path.join(
    BASE,
    "..",
    "sheets",
    `cluster-${folder}.json`
  );
  files = JSON.parse(fs.readFileSync(jsonPath, "utf8"))[Number(clusterIdx)];
  console.log(`${folder} cluster ${clusterIdx}: ${files.length} candidates`);
} else {
  files = collect(path.join(BASE, folder)).sort();
  console.log(`${folder}: ${files.length} candidates`);
}
if (!files?.length) {
  console.log("no stills in", folder);
  process.exit(1);
}

const scored = [];
const hashes = [];
for (const f of files) {
  try {
    const buf = fs.readFileSync(f);
    const h = await pHash(buf);
    // near-duplicate (burst frame) if within 6 bits of something already kept
    if (hashes.some((prev) => hamming(prev, h) <= 6)) continue;
    hashes.push(h);
    const q = await quality(f);
    scored.push({ file: f, ...q });
  } catch {
    /* unreadable file */
  }
}
console.log(`  ${scored.length} unique after dedupe`);

// Spread across the event: split the (time-ordered) unique set into COUNT
// buckets and take the best-scoring photo from each.
const picks = [];
const bucket = Math.max(1, Math.floor(scored.length / COUNT));
for (let i = 0; i < COUNT && i * bucket < scored.length; i++) {
  const slice = scored.slice(i * bucket, i === COUNT - 1 ? undefined : (i + 1) * bucket);
  if (!slice.length) break;
  picks.push(slice.reduce((a, b) => (b.score > a.score ? b : a)));
}

let n = 0;
for (const p of picks) {
  n++;
  const out = `public/img/gallery-${prefix}-${String(n).padStart(2, "0")}.jpg`;
  await sharp(p.file)
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(out);
  console.log(
    `  ${out}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB  sharp=${p.sharpness.toFixed(1)} lum=${p.mean.toFixed(0)}`
  );
}
console.log(`kept ${n}`);
