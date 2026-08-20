"use client";

/**
 * Static-export image loader. Build-time script
 * (scripts/build-image-variants.mjs) pre-generates WebP variants of every
 * /img asset at these widths; this loader points next/image srcsets at them.
 * Anything without a variant (gifs, svgs, already-webp files, non-/img paths)
 * is served untouched.
 */
export const VARIANT_WIDTHS = [480, 960, 1600] as const;

export function variantPath(src: string, width: number): string {
  const bucket =
    VARIANT_WIDTHS.find((w) => width <= w) ??
    VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
  const name = src
    .replace(/^\/img\//, "")
    .replace(/\//g, "_")
    .replace(/\.(jpe?g|png)$/i, "");
  return `/img/_r/${name}-w${bucket}.webp`;
}

export default function staticVariantLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!src.startsWith("/img/") || !/\.(jpe?g|png)$/i.test(src)) return src;
  return variantPath(src, width);
}
