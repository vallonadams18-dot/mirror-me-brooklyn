"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Img } from "@/data/types";
import { variantPath } from "@/lib/image-loader";

type CaptionedImg = Img & { caption?: string };

const ADVANCE_MS = 3500;
const RESUME_AFTER_TOUCH_MS = 8000;

/**
 * Filmstrip gallery: a horizontally scrolling, snap-aligned strip on every
 * screen size. Every photo renders at a uniform height in its natural
 * aspect ratio — nothing is cropped, wide shots stay wide, tall shots stay
 * tall. Auto-advances like a slideshow; pauses while the visitor hovers,
 * touches, or scrolls it, and stays static under prefers-reduced-motion.
 */
export function PhotoCarousel({ images }: { images: CaptionedImg[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const holdAuto = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_AFTER_TOUCH_MS);
  };

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    holdAuto();
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", holdAuto, { passive: true });
    track.addEventListener("wheel", holdAuto, { passive: true });

    const id = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      const nearEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (nearEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else
        track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
    }, ADVANCE_MS);

    return () => {
      clearInterval(id);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", holdAuto);
      track.removeEventListener("wheel", holdAuto);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-5"
      >
        {images.map((img) => (
          <figure key={img.src} className="group shrink-0 snap-center">
            <div className="overflow-hidden rounded-card bg-surface ring-1 ring-black/5">
              {img.src.endsWith(".gif") ? (
                <video
                  src={img.src.replace(/\.gif$/, ".mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={img.alt}
                  className="h-auto max-h-72 w-auto max-w-[88vw] sm:max-h-80 lg:max-h-[26rem]"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  srcSet={
                    /\.(jpe?g|png)$/i.test(img.src)
                      ? `${variantPath(img.src, 480)} 480w, ${variantPath(img.src, 960)} 960w`
                      : undefined
                  }
                  sizes="(max-width: 640px) 88vw, 640px"
                  alt={img.alt}
                  loading="lazy"
                  className="h-auto max-h-72 w-auto max-w-[88vw] transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-80 lg:max-h-[26rem]"
                />
              )}
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
