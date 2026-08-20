import sharp from "sharp";
import fs from "node:fs";
import crypto from "node:crypto";
import readline from "node:readline";
sharp.cache(false);

const rl = readline.createInterface({
  input: fs.createReadStream("C:/Users/volda/.claude/projects/C--Users-volda-Downloads-VALLON-FIST-CLAUDE/079f56e3-0f23-4435-a331-39b5b81c98f7.jsonl"),
  crlfDelay: Infinity,
});
const batches = [];
for await (const line of rl) {
  if (!line.includes("base64")) continue;
  let o; try { o = JSON.parse(line); } catch { continue; }
  if ((o.timestamp || "") <= "2026-08-20T10:30") continue;
  const imgs = [];
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (n.type === "image" && n.source?.type === "base64") imgs.push(n);
    Object.values(n).forEach(walk);
  };
  walk(o);
  if (imgs.length >= 5) batches.push({ ts: o.timestamp, imgs });
}
console.log("found:", batches.map((b) => b.ts + ":" + b.imgs.length).join(" | ") || "none");

// arrival order: Nurse of Distinction, superhero birthday, SexyHair (whiten),
// Oak St. Health, Oria by Airo, EBIN New York
const plan = [
  { prefix: "nd", whiten: false },
  { prefix: "mb", whiten: false },
  { prefix: "sh", whiten: true },
  { prefix: "os", whiten: false },
  { prefix: "oa", whiten: false },
  { prefix: "eb", whiten: false },
];
for (let bi = 0; bi < batches.length && bi < plan.length; bi++) {
  const { prefix, whiten } = plan[bi];
  if (fs.existsSync(`public/img/gallery-${prefix}-01.jpg`)) { console.log(prefix, "already done"); continue; }
  const seen = new Set();
  let n = 0;
  for (const img of batches[bi].imgs) {
    const buf = Buffer.from(img.source.data, "base64");
    const h = crypto.createHash("sha1").update(buf).digest("hex");
    if (seen.has(h)) continue;
    seen.add(h);
    n++;
    let s = sharp(buf).rotate();
    if (whiten) {
      const meta = await sharp(buf).metadata();
      const stats = await sharp(buf).extract({
        left: Math.round(meta.width * 0.3),
        top: Math.round(meta.height * 0.17),
        width: Math.round(meta.width * 0.4),
        height: Math.round(meta.height * 0.06),
      }).stats();
      const gains = stats.channels.slice(0, 3).map((c) => Math.min(250 / Math.max(c.mean, 1), 1.35));
      s = s.linear(gains, [0, 0, 0]);
    }
    const out = `public/img/gallery-${prefix}-${String(n).padStart(2, "0")}.jpg`;
    await s.flatten({ background: "#111111" })
      .resize(1800, 1800, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  }
  console.log(prefix, "kept", n, "of", batches[bi].imgs.length);
}
process.exit(batches.length >= plan.length ? 0 : 2);
