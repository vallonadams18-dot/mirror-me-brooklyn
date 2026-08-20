/**
 * Group an event folder's photos by their print frame, so two events that
 * happen to share a Dropbox folder don't get mixed into one gallery.
 *   node cluster.mjs <folder>
 * Hashes the outer border of each photo (the print template area, which is
 * identical within one event and different across events), clusters, and
 * writes one preview strip per cluster to the sheets dir.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
sharp.cache(false);

const BASE =
  "C:/Users/volda/AppData/Local/Temp/claude/C--Users-volda-Downloads-VALLON-FIST-CLAUDE/079f56e3-0f23-4435-a331-39b5b81c98f7/scratchpad/dropbox";
const folder = process.argv[2];
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

/** Signature of the print frame: a coarse hash of the bottom + side margins. */
async function frameSig(file) {
  const m = await sharp(file).metadata();
  const bh = Math.max(8, Math.round(m.height * 0.18));
  const { data } = await sharp(file)
    .extract({ left: 0, top: m.height - bh, width: m.width, height: bh })
    .greyscale()
    .resize(16, 4, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return Array.from(data);
}
const dist = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return s / a.length;
};

const files = collect(path.join(BASE, "extracted", folder)).sort();
console.log(`${folder}: ${files.length} stills`);

const clusters = [];
for (const f of files) {
  try {
    const sig = await frameSig(f);
    const hit = clusters.find((c) => dist(c.sig, sig) < 12);
    if (hit) hit.files.push(f);
    else clusters.push({ sig, files: [f] });
  } catch {
    /* skip unreadable */
  }
}
clusters.sort((a, b) => b.files.length - a.files.length);

const SHEETS = path.join(BASE, "sheets");
console.log(`  ${clusters.length} frame cluster(s):`);
for (let i = 0; i < clusters.length; i++) {
  const c = clusters[i];
  console.log(`   [${i}] ${c.files.length} photos  e.g. ${path.basename(c.files[0])}`);
  // preview: 4 tiles from this cluster, full frame (not cropped) so the
  // print template is readable
  const picks = [0, 1, 2, 3]
    .map((k) => c.files[Math.floor((k * c.files.length) / 4)])
    .filter(Boolean);
  const tiles = [];
  for (const p of picks) {
    try {
      tiles.push(
        await sharp(p).resize(220, 330, { fit: "contain", background: "#fff" }).jpeg({ quality: 70 }).toBuffer()
      );
    } catch {
      /* skip */
    }
  }
  if (!tiles.length) continue;
  await sharp({ create: { width: 220 * tiles.length, height: 330, channels: 3, background: "#fff" } })
    .composite(tiles.map((t, k) => ({ input: t, left: k * 220, top: 0 })))
    .jpeg({ quality: 78 })
    .toFile(path.join(SHEETS, `cluster-${folder}-${i}.jpg`));
}
fs.writeFileSync(
  path.join(SHEETS, `cluster-${folder}.json`),
  JSON.stringify(clusters.map((c) => c.files), null, 1)
);
console.log("  wrote cluster previews + json");
