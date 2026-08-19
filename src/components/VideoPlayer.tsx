"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

export function VideoPlayer({ src, poster, label, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.controls = true;
    void video.play();
    setPlaying(true);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-card bg-ink ring-1 ring-white/10 aspect-video ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        muted
        playsInline
        loop
        className="size-full object-cover"
        aria-label={label}
      />
      {!playing && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 flex items-center justify-center bg-ink/35 transition-colors hover:bg-ink/20"
          aria-label={`Play video: ${label}`}
        >
          <span className="inline-flex size-20 items-center justify-center rounded-full bg-gold text-ink shadow-[0_8px_32px_-6px_rgba(229,173,31,0.8)] transition-transform duration-200 group-hover:scale-105">
            <Play className="ml-1 size-8 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
