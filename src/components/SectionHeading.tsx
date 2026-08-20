interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  sub?: string;
  /** dark = on ink background, light = on cream/white background */
  tone?: "dark" | "light";
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  heading,
  sub,
  tone = "light",
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p
          className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-gold" : "text-gold-deep"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${tone === "dark" ? "text-cream" : "text-ink"}`}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-cream/70" : "text-ink/65"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
