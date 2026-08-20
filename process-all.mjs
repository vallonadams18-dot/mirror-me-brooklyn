import sharp from "sharp";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
sharp.cache(false);

const raw =
  "C:/Users/volda/AppData/Local/Temp/claude/C--Users-volda-Downloads-VALLON-FIST-CLAUDE/079f56e3-0f23-4435-a331-39b5b81c98f7/scratchpad/uploads-raw";
const FF = "C:/Program Files/ImageMagick-7.0.8-Q16/ffmpeg.exe";
const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0) + "KB";

const jpg = async (src, dest, max = 1400, q = 78) => {
  await sharp(`${raw}/${src}`)
    .rotate()
    .resize(max, max, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(`public/img/${dest}`);
  console.log(dest, kb(`public/img/${dest}`));
};

// Mirror X booth
await jpg("nb1-04.jpg", "mirror-x-hero.jpg", 1600, 82);
let n = 1;
for (const f of ["nb1-01.jpg", "nb1-02.jpg", "nb1-03.jpg", "nb1-04.jpg"])
  await jpg(f, `mirror-x-${n++}.jpg`);

// Gallery: Hanky Panky (skip 17,18 - the green Nike shirt guest)
const hpIdx = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,19,20];
n = 1;
for (const i of hpIdx)
  await jpg(`nb3-${String(i).padStart(2,"0")}.jpg`, `gallery-hp-${String(n++).padStart(2,"0")}.jpg`);

// Gallery: Recognition Ceremony (nb4-05 is an exact dupe of 01)
n = 1;
for (const i of [1,2,3,4])
  await jpg(`nb4-${String(i).padStart(2,"0")}.jpg`, `gallery-rc-${String(n++).padStart(2,"0")}.jpg`);

// Gallery: Valence Care
n = 1;
for (const i of [1,2,3,4,5])
  await jpg(`nb2-${String(i).padStart(2,"0")}.jpg`, `gallery-vc-${String(n++).padStart(2,"0")}.jpg`);

// Hanky Panky videos + posters
const hpDir = "C:/Users/volda/Downloads/Hanky Panky mp4s (22_08, 9 Sep 2025 - 03_42, 20 Aug 2026)";
const hpVids = ["1757464184_21","1757464507_20","1757465701_22","1757464143_17","1757464271_18","1757464382_19"];
n = 1;
for (const v of hpVids) {
  const dest = `public/video/hanky-panky-${n}.mp4`;
  fs.copyFileSync(`${hpDir}/${v}.mp4`, dest);
  const frame = `${raw}/hpv-${n}.png`;
  execFileSync(FF, ["-y","-i",`${hpDir}/${v}.mp4`,"-frames:v","1",frame], { stdio: "pipe" });
  await sharp(frame).resize(700, 700, { fit: "inside" }).jpeg({ quality: 75, mozjpeg: true }).toFile(`public/img/hanky-panky-v${n}.jpg`);
  console.log(dest, kb(dest), `poster ${kb(`public/img/hanky-panky-v${n}.jpg`)}`);
  n++;
}

// Nora clips -> animated GIFs for the gif-booth gallery
const noraDir = "C:/Users/volda/Downloads/Nora mp4s (21_24, 13 Sep 2025 - 03_40, 20 Aug 2026)";
const nora = ["1757801391_4","1757801415_5","1757810723_7"];
let g = 8;
for (const v of nora) {
  const tmp = `${raw}/nora-${g}.gif`;
  execFileSync(FF, ["-y","-i",`${noraDir}/${v}.mp4`,"-filter_complex",
    "fps=8,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",tmp], { stdio: "pipe" });
  await sharp(tmp, { animated: true }).gif({ colours: 128, effort: 10 }).toFile(`public/img/gif-booth-${g}.gif`);
  const m = await sharp(`public/img/gif-booth-${g}.gif`, { animated: true }).metadata();
  console.log(`gif-booth-${g}.gif`, kb(`public/img/gif-booth-${g}.gif`), `frames:${m.pages}`);
  g++;
}
console.log("done");
