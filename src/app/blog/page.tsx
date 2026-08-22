import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/data";
import { collectionPageJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/metadata";

const PAGE_TITLE = "Photo Booth Rental Guides & Ideas NYC | Magic Mirror Brooklyn";
const PAGE_DESCRIPTION =
  "Guides on photo booth pricing, corporate event ideas and choosing the right wedding photo booth in NYC, from the Brooklyn-based team that runs them.";

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/blog",
});

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 0%, rgba(229,173,31,0.15) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Guides & ideas
          </p>
          <h1 className="mt-3 text-3xl leading-[1.15] text-cream sm:text-4xl lg:text-[2.75rem]">
            The Magic Mirror Brooklyn blog
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Straight answers on pricing, planning and choosing the right
            booth, pulled from what we actually tell couples and event
            planners.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-card border border-black/8 bg-white transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={post.heroImg.src}
                    alt={post.heroImg.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 flex items-center gap-1.5 font-sans text-lg font-semibold text-ink group-hover:text-gold-dark">
                    {post.h1}
                    <ArrowUpRight
                      className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Have a date in mind?"
        sub="Tell us your event and we'll send pricing built around it — travel included, nothing hidden."
      />

      <JsonLd
        data={collectionPageJsonLd({
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          path: "/blog",
          posts: blogPosts.map((post) => ({
            slug: post.slug,
            headline: post.h1,
            datePublished: post.date,
            image: post.heroImg.src,
          })),
        })}
      />
    </div>
  );
}
