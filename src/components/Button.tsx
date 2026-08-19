import Link from "next/link";
import { ArrowRight } from "lucide-react";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 bg-gold text-ink shadow-[0_6px_24px_-8px_rgba(229,173,31,0.7)] hover:bg-gold-light hover:shadow-[0_10px_32px_-8px_rgba(229,173,31,0.85)] hover:-translate-y-0.5 active:translate-y-0";

const sizes = {
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-14 px-8 text-base sm:text-[17px]",
} as const;

interface CtaButtonProps {
  href?: string;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}

export function CtaButton({
  href = "/get-pricing",
  size = "lg",
  className = "",
  children,
}: CtaButtonProps) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${className}`}>
      {children}
      <ArrowRight
        className="size-[1.1em] shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
