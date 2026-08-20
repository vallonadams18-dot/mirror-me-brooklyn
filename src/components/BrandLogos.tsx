import Image from "next/image";

/**
 * Client logos, newest/biggest-name first. Logos supplied as light-on-
 * transparent artwork (Tamron Hall, PulsePoint, Hollywood Pop, EBIN) are
 * pre-composited onto a dark chip so they stay legible on the cream band.
 */
const logos = [
  { src: "/img/logos/good-morning-america.png", alt: "Good Morning America (ABC)" },
  { src: "/img/logos/tamron-hall.png", alt: "The Tamron Hall Show (ABC)" },
  { src: "/img/logos/adidas.png", alt: "adidas" },
  { src: "/img/logos/google-cloud.png", alt: "Google Cloud" },
  { src: "/img/logos/figma.png", alt: "Figma" },
  { src: "/img/logos/macys.png", alt: "Macy's" },
  { src: "/img/logos/hellmanns.png", alt: "Hellmann's" },
  { src: "/img/logos/sexyhair.png", alt: "SexyHair" },
  { src: "/img/logos/ebin-new-york.png", alt: "EBIN New York" },
  { src: "/img/logos/botify.png", alt: "Botify" },
  { src: "/img/logos/pulsepoint.png", alt: "PulsePoint" },
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

interface BrandLogosProps {
  bg?: "cream" | "white";
}

export function BrandLogos({ bg = "cream" }: BrandLogosProps) {
  return (
    <section
      className={`${bg === "cream" ? "bg-cream" : "bg-white"} px-4 py-14 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
          Brands we have worked with
        </p>
        <ul className="mt-8 flex snap-x snap-mandatory items-center gap-x-10 gap-y-8 overflow-x-auto pb-3 [scrollbar-width:none] sm:gap-x-12 [&::-webkit-scrollbar]:hidden">
          {logos.map((logo) => (
            <li key={logo.src} className="shrink-0 snap-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="h-12 w-auto opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
