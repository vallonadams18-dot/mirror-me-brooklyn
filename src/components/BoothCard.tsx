import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FillMedia } from "@/components/Media";

export interface BoothCardData {
  href: string;
  img: string;
  title: string;
  video: boolean;
  desc: string;
}

export function BoothCard({ booth }: { booth: BoothCardData }) {
  return (
    <Link
      href={booth.href}
      className="group overflow-hidden rounded-card border border-black/8 bg-white transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <FillMedia
          src={booth.img}
          alt={`${booth.title} rental in NYC`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {booth.video && (
          <span className="absolute left-3 top-3 rounded-pill bg-ink/75 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
            Video
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="flex items-center gap-1.5 font-sans text-lg font-semibold text-ink group-hover:text-gold-dark">
          {booth.title}
          <ArrowUpRight
            className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
          {booth.desc}
        </p>
      </div>
    </Link>
  );
}
