import Image from "next/image";

/**
 * Client logos, biggest/newest names first within each half. Split across
 * two rows that sandwich the booth grid — row 1 (top) scrolls left, row 2
 * (bottom) scrolls right, so the page doesn't front-load all 28 at once.
 * Logos supplied as light-on-transparent artwork (Tamron Hall, PulsePoint,
 * Hollywood Pop, EBIN) are pre-composited onto a dark chip so they stay
 * legible on the cream band.
 */
const rowA = [
  { src: "/img/logos/good-morning-america.png", alt: "Good Morning America (ABC)" },
  { src: "/img/logos/tamron-hall.png", alt: "The Tamron Hall Show (ABC)" },
  { src: "/img/logos/adidas.png", alt: "adidas" },
  { src: "/img/logos/google-cloud.png", alt: "Google Cloud" },
  { src: "/img/logos/figma.png", alt: "Figma" },
  { src: "/img/logos/macys.png", alt: "Macy's" },
  { src: "/img/logos/hellmanns.png", alt: "Hellmann's" },
  { src: "/img/logos/sexyhair.png", alt: "SexyHair" },
  { src: "/img/logos/ebin-new-york.png", alt: "EBIN New York" },
  { src: "/img/logos/servicenow.png", alt: "ServiceNow" },
  { src: "/img/logos/farmacy-beauty.png", alt: "Farmacy Beauty" },
  { src: "/img/logos/prabal-gurung.png", alt: "Prabal Gurung" },
  { src: "/img/logos/botify.png", alt: "Botify" },
  { src: "/img/logos/pulsepoint.png", alt: "PulsePoint" },
];

const rowB = [
  { src: "/img/logos/the-guarantors.png", alt: "The Guarantors" },
  { src: "/img/logos/flow-traders.png", alt: "Flow Traders" },
  { src: "/img/logos/enterprise-alumni.png", alt: "EnterpriseAlumni" },
  { src: "/img/logos/oak-street-health.png", alt: "Oak St. Health" },
  { src: "/img/logos/spectrum-news-1.png", alt: "Spectrum News 1" },
  { src: "/img/logos/wellcare.png", alt: "WellCare" },
  { src: "/img/logos/lockton.png", alt: "Lockton" },
  { src: "/img/logos/nyc-shrm.png", alt: "New York City SHRM" },
  { src: "/img/logos/maine-bankers.png", alt: "Maine Bankers Association" },
  { src: "/img/logos/graham.png", alt: "Graham — Caring for Kids & Families" },
  { src: "/img/logos/rye-country-day.png", alt: "Rye Country Day School" },
  { src: "/img/logos/ps-335.png", alt: "P.S. 335 Granville T. Woods" },
  { src: "/img/logos/hollywood-pop.png", alt: "Hollywood Pop Gallery" },
  { src: "/img/logos/client-hearts.png", alt: "Client logo" },
];

function MarqueeRow({
  logos,
  direction,
}: {
  logos: { src: string; alt: string }[];
  direction: "left" | "right";
}) {
  return (
    <div
      role="list"
      aria-label="Brand logos"
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <ul
        className={`marquee-track flex w-max items-center gap-x-10 sm:gap-x-12 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } hover:[animation-play-state:paused]`}
      >
        {logos.map((logo) => (
          <li key={logo.src} role="listitem" className="shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={80}
              className="h-9 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-11"
            />
          </li>
        ))}
        {/* Exact visual duplicate for the seamless loop, hidden from
            assistive tech and tab order so each logo is only announced once. */}
        {logos.map((logo) => (
          <li key={logo.src + "-dup"} aria-hidden="true" className="shrink-0">
            <Image
              src={logo.src}
              alt=""
              width={160}
              height={80}
              className="h-9 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-11"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface BrandLogosProps {
  bg?: "cream" | "white";
  /** "a" or "b" renders just that half as one marquee (used in pairs to
   * sandwich the homepage booth grid). Omitted = both rows stacked, for
   * every other page that shows the full client list in one place. */
  row?: "a" | "b";
  showLabel?: boolean;
}

export function BrandLogos({ bg = "cream", row, showLabel = true }: BrandLogosProps) {
  return (
    <section
      className={`${bg === "cream" ? "bg-cream" : "bg-white"} px-4 py-10 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        {showLabel && (
          <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
            Brands we have worked with
          </p>
        )}
        <div className={`${showLabel ? "mt-7" : ""} space-y-5`}>
          {row !== "b" && <MarqueeRow logos={rowA} direction="left" />}
          {row !== "a" && <MarqueeRow logos={rowB} direction="right" />}
        </div>
      </div>
    </section>
  );
}
