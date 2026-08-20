import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a fully static site to ./out,
  // deployable to GitHub Pages or any static host.
  output: "export",
  images: {
    // No image-optimization server on static hosts. Responsive WebP variants
    // are pre-generated at build time (scripts/build-image-variants.mjs) and
    // this loader points srcsets at them.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 960, 1600],
  },
};

export default nextConfig;
