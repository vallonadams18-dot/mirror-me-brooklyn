import Image from "next/image";

/**
 * Fill-mode media that renders animated sources as looping MP4 video.
 * Every animated .gif in /public/img has an MP4 twin (built with ffmpeg,
 * roughly half the bytes); chat-style motion is preserved without shipping
 * multi-megabyte GIFs.
 */
export function FillMedia({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover object-center",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src.endsWith(".gif")) {
    return (
      <video
        src={src.replace(/\.gif$/, ".mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={alt}
        className={`absolute inset-0 size-full ${className}`}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      sizes={sizes}
      className={className}
    />
  );
}
