import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/45">
      <Link href="/" className="hover:text-gold">
        Home
      </Link>
      <span className="mx-2">/</span>
      <span className="text-cream/70">{current}</span>
    </nav>
  );
}
