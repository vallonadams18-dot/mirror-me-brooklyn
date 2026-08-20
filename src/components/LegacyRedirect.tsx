"use client";

import { useEffect } from "react";

/**
 * Safety net for links to BOTH old sites.
 *
 * The new site launches on magicmirrorbrooklyn.com (replacing WordPress), so
 * old WordPress URLs hit this site directly and land on the 404 page, where
 * this router forwards them. Old mirrormebrooklyn.com PHP URLs arrive via
 * domain forwarding. True 301s at the DNS/proxy layer are still preferred —
 * see docs/REDIRECTS.md — this catches whatever falls through.
 */

// Old PHP site paths (mirrormebrooklyn.com)
const PHP: Record<string, string> = {
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

// Old WordPress paths (previously served on magicmirrorbrooklyn.com)
const WP: Record<string, string> = {
  "/services": "/",
  "/services/corporate-experience": "/corporate-events",
  "/services/corporate-experience/ai-photobooth": "/ai-photo-booth",
  "/services/corporate-experience/3d-slider-booth-experience": "/3d-slider-booth",
  "/services/corporate-experience/gif-booth": "/gif-booth",
  "/services/corporate-experience/360-video-booth": "/360-photo-booth",
  "/services/corporate-experience/green-screen-booth-experience": "/green-screen-photo-booth",
  "/services/corporate-experience/magazine-booth": "/magazine-booth",
  "/services/corporate-experience/mosaic-photo-wall": "/mosaic-wall",
  "/services/corporate-experience/roaming-experience": "/roaming-photo-booth",
  "/services/corporate-experience/vogue-booth-corporate": "/vogue-booth",
  "/services/corporate-experience/studion-booth-corporate": "/studio-booth",
  "/services/corporate-experience/champagne-experience": "/champagne-wall",
  "/services/corporate-experience/branded-photobooth": "/branded-photo-booth",
  "/services/weddings": "/wedding-photo-booth",
  "/services/weddings/360-photo-experience": "/360-photo-booth",
  "/services/weddings/flower-wall-experience": "/flower-wall-rental",
  "/services/weddings/flower-wall-experience/flower-arch": "/flower-wall-rental",
  "/services/weddings/flower-wall-experience/flower-booth": "/flower-wall-rental",
  "/services/weddings/flower-wall-experience/flower-wall": "/flower-wall-rental",
  "/services/weddings/champagne-wall": "/champagne-wall",
  "/services/weddings/glam-booth": "/glam-booth",
  "/services/weddings/magazine-booth": "/magazine-booth",
  "/services/weddings/mirror-experience": "/mirror-photo-booth",
  "/services/weddings/mosaic-photo-wall-corporate": "/mosaic-wall",
  "/services/weddings/roaming-booth": "/roaming-photo-booth",
  "/services/weddings/vogue-booth": "/vogue-booth",
  "/services/brand-activation": "/branded-photo-booth",
  "/services/trade-show-experiences": "/trade-show-photo-booth",
  "/services/custom-signs-services": "/contact",
  "/services/custom-signs-services/acrylic-sign": "/contact",
  "/services/custom-signs-services/neon-sign": "/contact",
  "/services/custom-signs-services/pvc-sign": "/contact",
  "/services/custom-signs-services/wooden-sign": "/contact",
  "/services/flower-walls": "/flower-wall-rental",
  "/services/ai-photobooth-experience": "/ai-photo-booth",
  "/services/glambot": "/glambot",
  "/services/event-rentals": "/corporate-events",
  "/template-designs": "/gallery",
  "/about-us": "/about",
  "/photo-booth-team-brooklyn": "/about",
  "/blog": "/",
  "/why-corporate-photo-booths-boost-engagement": "/corporate-events",
  "/glambot-red-carpet-experience": "/glambot",
  "/photo-booth-events": "/special-occasions",
  "/luxury-wedding-photo-booth-ideas-guests-remember": "/wedding-photo-booth",
  "/how-brand-activation-photo-booths-drive-real-consumer-engagement": "/branded-photo-booth",
  "/top-10-reasons-to-rent-a-magic-mirror-photo-booth-for-your-event-in-brooklyn": "/mirror-photo-booth",
  "/photo-booth-vs-magic-mirror-which-is-best-for-your-event": "/mirror-photo-booth",
  "/magic-mirror-photo-booth-at-weddings-elevating-every-moment": "/wedding-photo-booth",
};

// Old WP service-in-location pages, e.g.
// /ai-photo-booth-experience-in-brooklyn-ny -> /photo-booth-rental-brooklyn
const LOC_SUFFIX: Record<string, string> = {
  "brooklyn-ny": "/photo-booth-rental-brooklyn",
  "manhattan-ny": "/photo-booth-rental-manhattan",
  "queens-ny": "/photo-booth-rental-queens",
  "bronx-ny": "/photo-booth-rental-bronx",
  "staten-island-ny": "/photo-booth-rental-staten-island",
  "new-york-city-ny": "/",
  "new-york-city": "/",
};

function resolve(pathRaw: string, page: string): string | undefined {
  const path = pathRaw.replace(/\/+$/, "") || "/";
  if (path === "/corporate.php") return CORPORATE_PAGES[page] ?? "/corporate-events";
  if (path === "/experience.php") return page === "10" ? "/branded-photo-booth" : "/";
  if (PHP[path]) return PHP[path];
  if (WP[path]) return WP[path];
  const inMatch = path.match(/-in-([a-z-]+)$/);
  if (inMatch && LOC_SUFFIX[inMatch[1]]) return LOC_SUFFIX[inMatch[1]];
  return undefined;
}

export function LegacyRedirect() {
  useEffect(() => {
    const target = resolve(
      window.location.pathname.toLowerCase(),
      new URLSearchParams(window.location.search).get("page") ?? "",
    );
    if (target) window.location.replace(target);
  }, []);

  return null;
}
