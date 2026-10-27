/**
 * Generates smaller width variants of the phone mockups so 1x screens don't
 * download 714px-wide images to show them at ~280px.
 *
 *   npm run mockups
 *
 * Outputs sit next to the originals as `<name>-<width>.webp` and are
 * committed, so the build and deploy pipeline needs nothing extra.
 * Keep the TARGETS table in sync with src/components/ui/MockupImage.tsx.
 */
import sharp from "sharp";
import path from "node:path";
import { stat } from "node:fs/promises";

const dir = path.resolve("public/assets/mockups");

// Rendered sizes: the animated phone is 282 CSS px wide, the static mobile
// phone 226-266 px, the hand up to 480 px. 320 serves 1x screens, 480 covers
// 1.25-1.5x, and the original covers 2x and above.
const TARGETS = {
  "phone_about.webp": [320, 480],
  "phone_metric.webp": [320, 480],
  "phone_features.webp": [320, 480],
  "hand.webp": [480],
};

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

for (const [file, widths] of Object.entries(TARGETS)) {
  const input = path.join(dir, file);
  const meta = await sharp(input).metadata();
  const inputSize = (await stat(input)).size;

  for (const width of widths) {
    if (!meta.width || meta.width <= width) {
      console.log(`skip ${file}: already ${meta.width}px wide`);
      continue;
    }
    const out = path.join(dir, file.replace(/\.webp$/, `-${width}.webp`));
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(out);
    const outSize = (await stat(out)).size;
    console.log(`${file} ${meta.width}px (${kb(inputSize)}) -> ${path.basename(out)} ${width}px (${kb(outSize)})`);
  }
}
