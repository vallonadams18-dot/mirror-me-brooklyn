import type { MetadataRoute } from "next";
import { booths, combos, events, locations } from "@/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    path: string,
    changeFrequency: "weekly" | "monthly" | "yearly",
    priority: number,
  ) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("", "weekly", 1),
    entry("/get-pricing", "monthly", 0.9),
    entry("/photo-booths", "monthly", 0.9),
    entry("/gallery", "monthly", 0.8),
    entry("/about", "yearly", 0.7),
    entry("/testimonials", "monthly", 0.7),
    entry("/faq", "monthly", 0.7),
    entry("/contact", "yearly", 0.6),
    entry("/privacy", "yearly", 0.2),
    entry("/terms", "yearly", 0.2),
    ...booths.map((b) => entry(`/${b.slug}`, "monthly" as const, 0.9)),
    ...events.map((e) => entry(`/${e.slug}`, "monthly" as const, 0.9)),
    ...locations.map((l) => entry(`/${l.slug}`, "monthly" as const, 0.8)),
    ...combos.map((c) => entry(`/${c.slug}`, "monthly" as const, 0.7)),
  ];
}
