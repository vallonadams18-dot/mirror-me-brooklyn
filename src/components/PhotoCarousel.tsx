"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Img } from "@/data/types";

type CaptionedImg = Img & { caption?: string };

/**
 * Filmstrip gallery: a horizontally scrolling, snap-aligned strip on every
 * screen size. Every photo renders at a uniform height in its natural
 * aspect ratio — nothing is cropped, wide shots stay wide, tall shots stay
 * tall.
 */
export function PhotoCarousel({ images }: { images: CaptionedImg[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-5"
      >
        {images.map((img) => (
          <figure key={img.src} className="group shrink-0 snap-center">
            <div className="overflow-hidden rounded-card bg-surface ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-auto max-h-72 w-auto max-w-[88vw] transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-80 lg:max-h-[26rem]"
              />
            </div>
            {img.caption && (
              <figcaption className="mt-2.5 text-sm text-ink/60">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <div className="mt-1 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous photos"
          onClick={() => scrollBy(-1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next photos"
          onClick={() => scrollBy(1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
