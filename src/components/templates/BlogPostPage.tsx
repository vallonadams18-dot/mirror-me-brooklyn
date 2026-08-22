import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/Button";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import type { BlogPost } from "@/data/types";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 0%, rgba(229,173,31,0.15) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/60">
            <Link prefetch={false} href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link prefetch={false} href="/blog" className="hover:text-gold">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">{post.h1}</span>
          </nav>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-4 text-[2rem] leading-[1.12] text-cream sm:text-4xl lg:text-[3.1rem]">
            {post.h1}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {post.excerpt}
          </p>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card ring-1 ring-white/15">
            <Image
              src={post.heroImg.src}
              alt={post.heroImg.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {post.body.map((block, i) => (
            <div key={block.heading} className={i === 0 ? "" : "mt-12"}>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                {block.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/75 sm:text-base">
                {block.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-10">
            <CtaButton>Get a Free Quote</CtaButton>
          </div>
        </div>
      </section>

      {post.faqs && post.faqs.length > 0 && (
        <FaqSection
          heading="Frequently asked questions"
          faqs={post.faqs}
          bg="cream"
        />
      )}

      <CtaSection heading={post.cta.heading} sub={post.cta.sub} />

      <JsonLd
        data={articleJsonLd({
          headline: post.h1,
          description: post.meta.description,
          datePublished: post.date,
          path: `/blog/${post.slug}`,
          image: post.heroImg.src,
        })}
      />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd data={faqJsonLd(post.faqs)} />
      )}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.h1, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
