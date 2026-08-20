import sharp from "sharp";
import fs from "node:fs";
import crypto from "node:crypto";
import readline from "node:readline";
sharp.cache(false);
const rl = readline.createInterface({
  input: fs.createReadStream("C:/Users/volda/.claude/projects/C--Users-volda-Downloads-VALLON-FIST-CLAUDE/079f56e3-0f23-4435-a331-39b5b81c98f7.jsonl"),
  crlfDelay: Infinity,
});
let latest = null;
for await (const line of rl) {
  if (!line.includes("base64")) continue;
  let o; try { o = JSON.parse(line); } catch { continue; }
  if ((o.timestamp || "") < "2026-08-20T09:40") continue;
  const imgs = [];
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (n.type === "image" && n.source?.type === "base64") imgs.push(n);
    Object.values(n).forEach(walk);
  };
  walk(o);
  if (imgs.length >= 5) latest = { ts: o.timestamp, imgs };
}
if (!latest) { console.log("NOT_FLUSHED"); process.exit(2); }
console.log("batch", latest.ts, latest.imgs.length);
const seen = new Set();
let n = 0;
for (const img of latest.imgs) {
  const buf = Buffer.from(img.source.data, "base64");
  const h = crypto.createHash("sha1").update(buf).digest("hex");
  if (seen.has(h)) { console.log("dup skipped"); continue; }
  seen.add(h);
  n++;
  const out = `public/img/gallery-lo-${String(n).padStart(2, "0")}.jpg`;
  await sharp(buf).rotate().flatten({ background: "#111111" })
    .resize(1800, 1800, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  console.log(out, (fs.statSync(out).size / 1024).toFixed(0) + "KB");
}
console.log("kept", n);
