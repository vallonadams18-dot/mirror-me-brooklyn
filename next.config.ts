import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a fully static site to ./out,
  // deployable to GitHub Pages or any static host.
  output: "export",
  images: {
    // No image-optimization server on static hosts; images are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
