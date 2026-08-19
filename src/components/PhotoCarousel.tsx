"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Img } from "@/data/types";

type CaptionedImg = Img & { caption?: string };

/**
 * Mobile/tablet: horizontally snapping strip with prev/next buttons.
 * Desktop (lg+): 3-column grid with subtle hover zoom.
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
      <div className="lg:hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img) => (
            <figure key={img.src} className="w-[78%] shrink-0 snap-center sm:w-[46%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface ring-1 ring-white/10">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, 46vw"
                  className="object-cover object-center"
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
      <div className="hidden gap-5 lg:grid lg:grid-cols-3">
        {images.map((img) => (
          <figure key={img.src} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface ring-1 ring-black/5">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {img.caption && (
              <figcaption className="mt-3 text-sm text-ink/60">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
