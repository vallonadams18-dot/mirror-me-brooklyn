import { Star } from "lucide-react";
import { SITE } from "@/lib/site";

export function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-gold text-gold`} />
      ))}
    </span>
  );
}

export function RatingLine({
  tone = "dark",
  className = "",
}: {
  /** dark = on ink background, light = on cream/white background */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}
    >
      <Stars />
      <span
        className={
          tone === "dark"
            ? "text-sm font-medium text-cream/85"
            : "text-sm font-medium text-ink/75"
        }
      >
        <strong className="font-semibold">{SITE.rating}</strong> from{" "}
        {SITE.reviewCount} {SITE.reviewSource} reviews
      </span>
    </div>
  );
}
