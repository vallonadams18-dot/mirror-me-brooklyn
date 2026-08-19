"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Img } from "@/data/types";

type CaptionedImg = Img & { caption?: string };

/**
 * Horizontally scrolling, snap-aligned gallery strip on every screen size,
 * with prev/next buttons. ~1 card visible on phones, ~2 on tablets, ~3 on
 * desktop.
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-5"
      >
        {images.map((img) => (
          <figure
            key={img.src}
            className="group w-[78%] shrink-0 snap-center sm:w-[46%] lg:w-[31.5%]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface ring-1 ring-black/5">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
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
