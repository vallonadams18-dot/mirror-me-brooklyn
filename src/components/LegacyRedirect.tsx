"use client";

import { useEffect } from "react";

/**
 * Safety net for links to the OLD mirrormebrooklyn.com PHP site.
 * GitHub Pages serves the 404 page for unknown paths; this router forwards
 * known legacy URLs to their new equivalents so old links and bookmarks
 * still land somewhere useful. (True 301s should be configured at the DNS/
 * proxy layer — see docs/REDIRECTS.md.)
 */
const LEGACY: Record<string, string> = {
  "/index.php": "/",
  "/services.php": "/",
  "/products.php": "/",
  "/gallery.php": "/gallery",
  "/gallery-list.php": "/gallery",
  "/about.php": "/about",
  "/faq.php": "/faq",
  "/testimonials.php": "/testimonials",
  "/blogs.php": "/",
  "/blog-details.php": "/",
  "/inquiry.php": "/get-pricing",
  "/contact-us.php": "/contact",
  "/privacy.php": "/privacy",
  "/packages.php": "/get-pricing",
  "/flower_walls.php": "/flower-wall-rental",
  "/wov_mirror.php": "/mirror-photo-booth",
  "/wov_digital.php": "/studio-booth",
  "/wov_360x.php": "/360-photo-booth",
  "/wov_xceptiona.php": "/mirror-photo-booth",
};

const CORPORATE_PAGES: Record<string, string> = {
  "9": "/wedding-photo-booth",
  "10": "/special-occasions",
  "12": "/branded-photo-booth",
  "19": "/vogue-booth",
  "20": "/roaming-photo-booth",
  "21": "/mosaic-wall",
  "22": "/mirror-photo-booth",
  "23": "/green-screen-photo-booth",
  "24": "/360-photo-booth",
};

export function LegacyRedirect() {
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const page = new URLSearchParams(window.location.search).get("page") ?? "";

    let target: string | undefined;
    if (path === "/corporate.php") {
      target = CORPORATE_PAGES[page] ?? "/corporate-events";
    } else if (path === "/experience.php") {
      target = page === "10" ? "/branded-photo-booth" : "/";
    } else {
      target = LEGACY[path];
    }
    if (target) window.location.replace(target);
  }, []);

  return null;
}
