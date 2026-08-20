import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
sharp.cache(false);

const BASE =
  "C:/Users/volda/AppData/Local/Temp/claude/C--Users-volda-Downloads-VALLON-FIST-CLAUDE/079f56e3-0f23-4435-a331-39b5b81c98f7/scratchpad/dropbox";
const EXTRACTED = path.join(BASE, "extracted");
const SHEETS = path.join(BASE, "sheets");
fs.mkdirSync(SHEETS, { recursive: true });

const IMG_EXT = /\.(jpe?g|png|heic|webp|gif)$/i;
const VIDEO_EXT = /\.(mp4|mov)$/i;
const skipDirs = new Set(["gif_from_photos", "raw"]);

function collectFiles(dir, matcher) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) out.push(...collectFiles(full, matcher));
    } else if (matcher.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}
const collectImages = (dir) => collectFiles(dir, IMG_EXT);
const collectVideos = (dir) => collectFiles(dir, VIDEO_EXT);

const FF = '"C:/Program Files/ImageMagick-7.0.8-Q16/ffmpeg"';
const { execSync } = await import("node:child_process");
function videoFrame(videoPath) {
  const tmp = path.join(SHEETS, "_frame.jpg");
  execSync(
    `${FF} -y -ss 0.5 -i "${videoPath}" -frames:v 1 -q:v 5 "${tmp}" -loglevel error`,
    { stdio: "ignore" }
  );
  const buf = fs.readFileSync(tmp);
  fs.unlinkSync(tmp);
  return buf;
}

const folders = fs
  .readdirSync(EXTRACTED)
  .filter((f) => fs.statSync(path.join(EXTRACTED, f)).isDirectory())
  .sort();

const TILE = 160;
const COLS = 8;

const onlyArgs = process.argv.slice(2);
for (const folder of folders) {
  if (onlyArgs.length && !onlyArgs.includes(folder)) continue;
  const dir = path.join(EXTRACTED, folder);
  let images = collectImages(dir);
  let isVideo = false;
  if (images.length === 0) {
    const videos = collectVideos(dir);
    if (videos.length === 0) {
      console.log(folder, "0 images, 0 videos — SKIP");
      continue;
    }
    images = videos;
    isVideo = true;
  }
  images.sort();
  const MAX = 96;
  let sample = images;
  if (images.length > MAX) {
    const step = images.length / MAX;
    sample = Array.from({ length: MAX }, (_, i) => images[Math.floor(i * step)]);
  }
  const rows = Math.ceil(sample.length / COLS);
  const canvas = sharp({
    create: { width: COLS * TILE, height: rows * TILE, channels: 3, background: "#222" },
  });
  const composites = [];
  for (let i = 0; i < sample.length; i++) {
    try {
      const raw = isVideo ? videoFrame(sample[i]) : sample[i];
      const buf = await sharp(raw)
        .rotate()
        .resize(TILE, TILE, { fit: "cover" })
        .jpeg({ quality: 60 })
        .toBuffer();
      composites.push({ input: buf, left: (i % COLS) * TILE, top: Math.floor(i / COLS) * TILE });
    } catch (err) {
      console.log("  skip bad file", sample[i], String(err).slice(0, 80));
    }
  }
  const out = path.join(SHEETS, `${folder}.jpg`);
  await canvas.composite(composites).jpeg({ quality: 72 }).toFile(out);
  console.log(folder, `${images.length} ${isVideo ? "videos" : "images"}, sheet ${sample.length} tiles ->`, out);
}
console.log("ALL_SHEETS_DONE");
